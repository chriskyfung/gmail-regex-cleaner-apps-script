/**
 * The function `getLastMessageDate` formats a given date in the 'yyyy-MM-dd' format.
 * @param dummy - The "dummy" parameter is a placeholder variable that is not used in the function. It
 * is included in the function signature to maintain consistency with the expected number of
 * parameters.
 * @param lastMessageDate - The `lastMessageDate` parameter is a date object representing the date of
 * the last message.
 * @returns The formatted last message date in the format 'yyyy-MM-dd'.
 */
const getLastMessageDate = (dummy, lastMessageDate) => {
  return Utilities.formatDate(lastMessageDate, 'GMT', 'yyyy-MM-dd');
};

/**
 * The function `findMessages` searches for Gmail threads based on a query string and returns an array
 * of objects containing information about each thread's first message subject, last message date,
 * plain body, and a function to move the thread to the trash.
 * @param queryString - The `queryString` parameter is a string that represents the search query to be used
 * for finding messages in Gmail. It can be any valid Gmail search query, such as
 * "from:example@gmail.com" or "subject:important".
 * @returns The function `findMessages` returns an array of objects. Each object represents a thread in
 * Gmail and contains the following properties:
 */
function findMessages(queryString, mode = 'plain') {
  const threads = GmailApp.search(queryString);

  return threads.map((thread) => {
    const messages = thread.getMessages();
    const body =
      mode.toLowerCase() !== 'html'
        ? messages[messages.length - 1].getPlainBody()
        : messages[messages.length - 1]
            .getBody()
            .split('</head>')
            .filter((item) => item.includes('<body'))[0]
            .replace(/<[^>]*>/g, '');
    return {
      firstMessageSubject: thread.getFirstMessageSubject(),
      lastMessageDate: thread.getLastMessageDate(),
      plainBody: body,
      moveToTrash: thread.moveToTrash,
    };
  });
}

/**
 * The function checks if a given date is overdue based on a threshold and returns the expiry date, the
 * number of days difference, and a boolean indicating if it is overdue.
 * @param {string} dateString - The `dateString` parameter is a string representing a date in a specific format.
 * @param {Date} lastMessageDate - The date of the last message in the thread, used for context.
 * @param {number} tresholdInDays - The number of days to use as the overdue threshold.
 * @returns an object with three properties: "expiryDate", "daysDiff", and "isOverdue".
 */
function checkOverdue(dateString, lastMessageDate, tresholdInDays) {
  const now = Date.now();
  const millisecondsPerDay = 86400000;
  const containsYear = /\d{4}/.test(dateString);

  const date = new Date(dateString);

  if (!containsYear) {
    // If no year is in the string, set it to the year of the last message for context.
    date.setFullYear(lastMessageDate.getFullYear());

    // If the resulting date is in the future relative to the last message,
    // it must be from the previous year.
    if (date > lastMessageDate) {
      date.setFullYear(date.getFullYear() - 1);
    }
  }

  const diff = (now - date) / millisecondsPerDay;

  return {
    expiryDate: date,
    daysDiff: diff,
    isOverdue: diff > tresholdInDays,
  };
}

/**
 * The function `findMatchGroup` searches for a pattern in a given text and returns the matched group
 * or `true` if there is a match.
 * @param {string} text - The `text` parameter is a string that represents the text in which you want to search
 * for a match.
 * @param {RegExp} pattern - The `pattern` parameter is a regular expression (RegExp) object that defines the
 * pattern you want to search for in the `text` parameter.
 * @returns The function `findMatchGroup` returns either `null`, `true`, or the value of the `exp`
 * named capture group from the first match found in the `text` string.
 */
function findMatchGroup(text, pattern) {
  if ((!pattern) instanceof RegExp) {
    throw 'Invalid type: `pattern` is not a RegExp!';
  }
  const result = pattern.exec(text);
  return result === null ? null : result.groups?.exp || true;
}

/**
 * The function subtracts a specified number of years from a given date without mutating the original date.
 * @param {Date} date - The date parameter is a JavaScript Date object, representing a specific date and time.
 * @param {number} years - The "years" parameter is the number of years that you want to subtract from the given
 * date.
 * @returns {Date} the updated date after subtracting the specified number of years.
 */
function subtractYears(date, years) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - years);
  return newDate;
}

/**
 * The main function searches for messages that match a given query string, extracts text using a
 * pattern, and checks if the extracted text is overdue based on a date formatter function.
 * @param {string} queryString - The `queryString` parameter is a string that represents the search query used
 * to find messages. It is used in the `findMessages` function to retrieve a list of threads that match
 * the query.
 * @param {RegExp} pattern - The `pattern` parameter is a regular expression pattern that is used to search for
 * a specific text pattern within the `plainBody` of each thread. It is used in the `findMatchGroup`
 * function to extract a specific text group from the `plainBody` that matches the pattern.
 * @param {object} [options] - Optional parameters.
 * @param {number} [options.tresholdInDays=60] - The number of days to keep emails.
 * @param {boolean} [options.isDryRun=true] - Whether to run in test mode without deleting emails.
 * @param {string} [options.mode='plain'] - The mode to use for processing emails (e.g., 'plain' or 'html').
 * @param {function} [options.dateFormatter] - A function to format the extracted date string.
 */
function main(
  queryString,
  pattern,
  {
    tresholdInDays = 60,
    isDryRun = true,
    mode = 'plain',
    dateFormatter = getLastMessageDate,
  } = {}
) {
  if ((!dateFormatter) instanceof Function) {
    throw 'Invalid type: `dateFormatter` is not a function!';
  }

  const threads = findMessages(queryString, mode);
  threads.forEach((thread) => {
    try {
      const { firstMessageSubject, lastMessageDate, plainBody } = thread;
      console.log(firstMessageSubject);

      const textExtracted = findMatchGroup(plainBody, pattern);
      if (textExtracted === null) {
        return;
      }
      const dateString = dateFormatter(textExtracted, lastMessageDate);
      if (!dateString) {
        return;
      }

      const { expiryDate, daysDiff, isOverdue } = checkOverdue(
        dateString,
        lastMessageDate,
        tresholdInDays
      );
      console.log({
        expiryDate: Utilities.formatDate(expiryDate, 'GMT', 'yyyy-MMM-dd'),
        daysAgo: daysDiff,
        overdue: isOverdue,
      });
      if (isOverdue && !isDryRun) {
        thread.moveToTrash();
        console.log('Moved to trash');
      }
    } catch (e) {
      console.error(
        `Error processing thread with subject: "${thread.firstMessageSubject}". Error: ${e.message}`
      );
    }
  });
}

if (typeof module !== 'undefined') {
  module.exports = {
    subtractYears,
    checkOverdue,
    findMatchGroup,
    getLastMessageDate,
    findMessages,
    main,
  };
}
