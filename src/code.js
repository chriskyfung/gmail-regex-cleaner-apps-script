/* The `tresholdInDays` variable is used to set the threshold in days for determining if a date is
overdue. In this case, it is set to 60, meaning that if the number of days difference between the
current date and a given date is greater than 60, the date is considered overdue. */
const tresholdInDays = 60;

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
function findMessages(queryString) {
  const threads = GmailApp.search(queryString);

  return threads.map((thread) => {
    return {
      firstMessageSubject: thread.getFirstMessageSubject(),
      lastMessageDate: thread.getLastMessageDate(),
      plainBody: thread.getMessages()[0].getPlainBody(),
      moveToTrash: thread.moveToTrash
    }
  });
}

/**
 * The function checks if a given date is overdue based on a threshold and returns the expiry date, the
 * number of days difference, and a boolean indicating if it is overdue.
 * @param dateString - The `dateString` parameter is a string representing a date in a specific format.
 * It is used to create a `Date` object for comparison and calculation.
 * @returns an object with three properties: "expiryDate", "daysDiff", and "isOverdue".
 */
function checkOverdue(dateString) {
  const now = Date.now();
  const millisecondsPerDay = 86400000;

  let date = new Date(dateString);
  date = date > now ? date : subtractYears( date, 1 );
  
  const diff = (now - date)/millisecondsPerDay;

  return {
    expiryDate: date,
    daysDiff: diff,
    isOverdue: diff > tresholdInDays
  }
}

/**
 * The function `findMatchGroup` searches for a pattern in a given text and returns the matched group
 * or `true` if there is a match.
 * @param text - The `text` parameter is a string that represents the text in which you want to search
 * for a match.
 * @param pattern - The `pattern` parameter is a regular expression (RegExp) object that defines the
 * pattern you want to search for in the `text` parameter.
 * @returns The function `findMatchGroup` returns either `null`, `true`, or the value of the `exp`
 * named capture group from the first match found in the `text` string.
 */
function findMatchGroup(text, pattern) {
  if (!pattern instanceof RegExp) {
    throw 'Invalid type: `pattern` is not a RegExp!';
  }
  const regex = new RegExp(pattern.source, pattern.flags);
  const result = regex.exec(text);
  return result === null ? null : result.groups?.exp || true;
}

/**
 * The function subtracts a specified number of years from a given date.
 * @param date - The date parameter is a JavaScript Date object, representing a specific date and time.
 * @param years - The "years" parameter is the number of years that you want to subtract from the given
 * date.
 * @returns the updated date after subtracting the specified number of years.
 */
function subtractYears(date, years) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}


/**
 * The main function searches for messages that match a given query string, extracts text using a
 * pattern, and checks if the extracted text is overdue based on a date formatter function.
 * @param queryString - The `queryString` parameter is a string that represents the search query used
 * to find messages. It is used in the `findMessages` function to retrieve a list of threads that match
 * the query.
 * @param pattern - The `pattern` parameter is a regular expression pattern that is used to search for
 * a specific text pattern within the `plainBody` of each thread. It is used in the `findMatchGroup`
 * function to extract a specific text group from the `plainBody` that matches the pattern.
 * @param [isDryRun=true] - The `isDryRun` parameter is a boolean flag that determines whether the
 * function should perform the actual action of moving threads to trash or just simulate the action
 * without actually performing it. By default, it is set to `true`, meaning it is a dry run and no
 * threads will be moved to trash
 * @param [dateFormatter] - The `dateFormatter` parameter is a function that takes two arguments:
 * `textExtracted` and `lastMessageDate`. It is used to format the extracted text and the last message
 * date into a desired date format.
 */
function main(queryString, pattern, isDryRun=true, dateFormatter=getLastMessageDate) {
  if (! dateFormatter instanceof Function) {  
    throw 'Invalid type: `dateFormatter` is not a function!';
  }

  const threads = findMessages(queryString);  
  threads.forEach(thread => {
    const {firstMessageSubject, lastMessageDate, plainBody} = thread;
    console.log(firstMessageSubject);

    const textExtracted = findMatchGroup(plainBody, pattern);
    if (textExtracted === null) {
      return;
    }
    const dateString = dateFormatter(textExtracted, lastMessageDate);          
    
    const {expiryDate, daysDiff, isOverdue} = checkOverdue(dateString);
    console.log({
      expiryDate: Utilities.formatDate(expiryDate, 'GMT', 'yyyy-MMM-dd'),
      daysAgo: daysDiff,
      overdue: isOverdue
    });
    if (isOverdue && !isDryRun) {
      thread.moveToTrash();
      console.log('Moved to trash');
    }
  });
}
