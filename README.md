# Gmail Old Email Cleaner

This is a Google Apps Script project that helps you delete old emails in Gmail that match your custom regex filters. This can help you save space and keep your inbox organized.

## Features

- Delete old emails in Gmail that match a regular expression
- Specify the number of days to keep the emails
- Exclude starred, important, or labeled emails from deletion
- Run the script manually or on a schedule
- Log the deleted emails and errors

## How to use

1. Create a new Google Apps Script project in Google Drive
2. Copy and paste the code from `src/code.js` into the script editor
3. Edit the variables at the top of the script to suit your needs
4. Create a new void function to set the variables and call the `main()` function in the code.js file. For example:

   ```js
   function removeOldGoogleAlert() {
      const query = 'from:(Google Alerts <googlealerts-noreply@google.com>)';
      const regex = /[0-9]{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/m
      const dryRun = true;
      const dateFormatter = (textWithDate, lastMessageDate) => {
        /* 
          You code to extract and format the date part to a date string that can be parsed by the Date constructor
        */ 
      }
      main(query, regex, dryRun, dateFormatter);
   }
   ```

> [!NOTE]
> `query`: A string that specifies the search criteria for the emails you want to delete. It should follow the same syntax as the Gmail search box. For example, `from:(Google Alerts <googlealerts-noreply@google.com>)` will match all emails from Google Alerts. You can find more examples and tips on how to use the Gmail search operators [here](https://developers.google.com/codelabs/apps-script-fundamentals-1).
>
> `regex`: A regular expression that matches the date part of the email subject or body. It should be enclosed in slashes and follow the JavaScript regex syntax. For example, `/[0-9]{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/m` will match a date like “8 Feb” or “23 Nov” in the email.
>
> `dryRun`: Optional. A boolean value that indicates whether to run the script in test mode or not. If set to `true`, the script will only log the emails that match the query and the regex, but will not delete them. If set to `false`, the script will delete the emails permanently. It is recommended to run the script with dryRun set to true first to make sure it works as expected.
>
> `dateFormatter`: Optional. A function that takes two parameters: `textWithDate` and `lastMessageDate`. The `textWithDate` is a string that contains the date part extracted from the email body. The `lastMessageDate` is a date object that represents the latest date of the email thread. The function should return a date string like `yyyy-MM-dd`. For example, if the `textWithDate` is “8 Feb” and the `lastMessageDate` is “2021-02-10”, the function should return a date object for “2021-02-08”.

5. Save and run the script. You can use the Run menu or the Run button in the toolbar.

> [!IMPORTANT]
> When running the script for the first time, you may need to authorize it to access your Gmail account.

6. Optionally, set up a trigger to run the script periodically.You can do this by clicking the Triggers icon in the left sidebar, then clicking the Add a trigger button, and choosing the options you want. For example, you can set the script to run every day, week, or month.

> [!WARNING]
> This script will delete your emails permanently, without moving them to the trash. Please use it with caution and make sure you have a backup of your important emails. You can run the script with the dryRun option set to true first to see what emails will be deleted.

## Disclaimer

This script is provided as is, without any warranty or liability. Use it at your own risk. Make sure to test the script before using it on your Gmail account. The script may delete emails that you want to keep, or fail to delete emails that you want to remove. The script may also exceed the quota limits of Google Apps Script or Gmail API, resulting in errors or partial execution. The author is not responsible for any loss or damage caused by the use of this script.

## License

This project is distributed under the AGPL-3.0 license. You can use, modify, and distribute this project, as long as you comply with the terms and conditions in the [LICENSE](/LICENSE) file.
