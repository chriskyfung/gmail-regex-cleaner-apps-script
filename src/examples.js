/**
 * The function `removeAboutMeWeeklyStats()` removes weekly stats emails from about.me with the subject
 * line "your weekly stats from about.me" from the trash folder. The regex pattern looks for instances
 * where a digit is followed by "Page Visits" with potential newlines or spaces in between.
 */
function removeAboutMeWeeklyStats() {
  const query =
    'from:(about.me Stats <noreply@team.about.me>) subject:"your weekly stats from about.me"';
  const pattern = /\d[\n\s]*Page Visits/m;
  main(query, pattern, { isDryRun: false });
}

/**
 * The function `removeAffiliatesOne` removes emails with the subject "已暫停推廣" from the sender
 * "system@affiliates.one". The pattern matches the phrase "已暫停推 soension.
 */
function removeAffiliatesOne() {
  const query = 'from:(op@affiliates.one) subject:已暫停推廣';
  const pattern = /已暫停推廣/m;
  main(query, pattern, { isDryRun: false });
}

/**
 * The function `removeBrookstoneAffiliateInfo` removes Brookstone affiliate information from emails
 * based on specific criteria. The first regex pattern extracts date ranges following the "Brookstone:"
 * label in the format "Month Day-Month Day" into a named group "exp". And, the second regex pattern
 * capturs the start and end dates from the date range, with the end date being either a month followed
 * by a day or just a day (if the month is omitted).
 */
function removeBrookstoneAffiliateInfo() {
  const query = 'from:(owner-membermessaging@mx6.cj.com) subject:(Brookstone)';
  const datePattern =
    // eslint-disable-next-line no-useless-escape
    /Brookstone:[\w\s\d!$%\/-]*?(?<exp>(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\s?\d{1,2})/gm;
  const dateFormatter = dateFormatterFactory(
    /(?<month1>\w{3})\s\d+-(?<month2>\w{3})?\s?(?<enddate>\d+)/
  );
  main(query, datePattern, { isDryRun: false, dateFormatter });
}

/**
 * The function `removeCorelAffiliateInfo()` removes Corel Corporation affiliate information from
 * emails. The regex pattern looks for date ranges in the format "Date: dd/mm/yyyy - dd/mm/yyyy"
 * and captures the second date in a named group "exp".
 */
function removeCorelAffiliateInfo() {
  const query = 'from:(Corel Corporation <owner-membermessaging@mx6.cj.com>)';
  const datePattern =
    /Dates?\s?:.*(?<exp>(\d{1,2}|(January|February|March|April|May|June|July|August|September|October|November|December))[\s./]\d{1,2},?[\s./]\d{2,4})/gm;
  main(query, datePattern, { isDryRun: false });
}

/**
 * The function `removeGitHubDependabotAlerts()` removes "[GitHub] Your Dependabot alerts for the week of" from
 * emails. The regex pattern is tailored to identify and extract date ranges in the "Month Day - Month Day" format
 * from text data.
 */
function removeGitHubDependabotAlerts() {
  const query =
    '"[GitHub] Your Dependabot alerts for the week of" from:(GitHub <noreply@github.com>)';

  const pattern =
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2} - ((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2})/gm;
  main(query, pattern, { isDryRun: false });
}

/**
 * The function `removeIATeamInfo` removes newly launched affiliate offers from emails received from
 * hello@involve.asia. The regex pattern looks for "Check out these new live offers" in the text.
 */
function removeIATeamInfo() {
  const query =
    'from:(hello@involve.asia) subject:(Newly Launched Affiliate Offers)';
  const datePattern = /(?<exp>Check out these new live offers)/gm;
  main(query, datePattern, { isDryRun: false });
}

/**
 * The function `removeMoneyHeroInfo` removes emails from the MoneyHero sender that are in the trash
 * and have a date in the format "yyyy年mm月dd日或之前".
 */
function removeMoneyHeroInfo() {
  const query = 'from:(MoneyHero <noreply@promo.moneyhero.com.hk>) is:trash';
  const datePattern = /\d{4}年\d{1,2}月\d{1,2}日或之前/gm;
  const dateFormatter = dateFormatterFactory(
    /(?<year>\d{4})年(?<month1>\d{1,2})月(?<enddate>\d{1,2})日或之前/,
    false
  );
  main(query, datePattern, { isDryRun: false, dateFormatter });
}

/**
 * The function `removeNamecheapAffiliateInfo` removes Namecheap affiliate emails from a specific label
 * and formats the date in a specific way. The first regex pattern extracts date ranges in the format
 * of "Month DD-DD" into a named group "exp". The second regex pattern capture the month and the end date
 * into named groups "month1" and "enddate", respectively.
 */
function removeNamecheapAffiliateInfo() {
  const query = 'from:(Namecheap Affiliate Team) -label:affiliate-program';
  const datePattern =
    /(?<exp>(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}-\d{1,2}\.?$)/gm;
  const dateFormatter = dateFormatterFactory(
    /(?<month1>\w+)\s(\d+-)?s?(?<enddate>\d+)/
  );
  main(query, datePattern, { isDryRun: false, mode: 'html', dateFormatter });
}

/**
 * The function `removeWondershareAffiliateInfo` removes Wondershare affiliate information from emails
 * matching a specific query string and date pattern. The regex pattern matches date ranges in the format
 * of "Time: YYYY/MM/DD - YYYY/MM/DD" or "Period: YYYY.MM.DD - YYYY.MM.DD" or "Now - YYYY/MM/DD".
 */
function removeWondershareAffiliateInfo() {
  const query = 'from:(owner-membermessaging@mx6.cj.com) subject:(Wondershare)';
  const datePattern =
    /(Time|Period)?\s?:[\s?*]*(\d{4}[./]\d{1,2}[./]\d{1,2}|Now)\s?- [\s?*]*(?<exp>\d{4}[./]\d{1,2}[./]\d{1,2})/gm;
  main(query, datePattern, { isDryRun: false });
}

/**
 * The function `removeYandexWebmasterInfo` removes Yandex Webmaster information from a given query
 * string using a regular expression and a date formatter. The regex pattern captures dates in the
 * format "for the week of [DD MMM - DD MMM]".
 */
function removeYandexWebmasterInfo() {
  const query = 'from:(Yandex.Webmaster <devnull@webmaster.yandex.ru>)';
  const datePattern = /for the week of (?<exp>\d{1,2} ?\w* \W \d{1,2} \w+)/gm;
  const dateFormatter = dateFormatterFactory(
    /\d{1,2} ?(?<month1>\w*) \W ?(?<enddate>\d{1,2}) (?<month2>\w+)/
  );
  main(query, datePattern, { isDryRun: false, dateFormatter });
}
