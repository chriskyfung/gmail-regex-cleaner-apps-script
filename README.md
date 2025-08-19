# Gmail Old Email Cleaner

This is a Google Apps Script project that helps you delete old emails in Gmail that match your custom regex filters. This can help you save space and keep your inbox organized.

## Features

- Delete old emails in Gmail that match a regular expression
- Specify the number of days to keep the emails
- Exclude starred, important, or labeled emails from deletion
- Run the script manually or on a schedule
- Log the deleted emails and errors

## How to use

1. Create a new Google Apps Script project in Google Drive.
2. Copy and paste the code from `src/code.js` and `src/examples.js` into the script editor.
3. From the `examples.js` file, choose a function that matches your needs, or create a new one. You can then run this function from the Apps Script editor.

   For example, to run one of the pre-made functions, you would select it in the editor's function list and click **Run**.

   The `main` function, which does the core work, has been updated to be more flexible. Here is how you would call it inside a custom function:

   ```js
   function removeOldGoogleAlerts() {
      const query = 'from:(Google Alerts <googlealerts-noreply@google.com>)';
      const regex = /[0-9]{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/m;

      // Call main with an options object for configuration
      main(query, regex, {
        tresholdInDays: 90, // Optional: default is 60
        isDryRun: true,     // Optional: default is true
        dateFormatter: (textWithDate, lastMessageDate) => {
          /*
            Your code to extract and format the date part to a date string
            that can be parsed by the Date constructor.
          */
          // This is just an example, a real implementation is needed here.
          return new Date().toISOString();
        }
      });
   }
   ```

> [!NOTE]
> **`query`**: A string that specifies the search criteria for the emails you want to delete. It should follow the same syntax as the Gmail search box. For example, `from:(Google Alerts <googlealerts-noreply@google.com>)` will match all emails from Google Alerts. You can find more examples and tips on how to use the Gmail search operators [here](https://developers.google.com/codelabs/apps-script-fundamentals-1).
>
> **`regex`**: A regular expression that matches the date part of the email subject or body. It should be enclosed in slashes and follow the JavaScript regex syntax. For example, `/[0-9]{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/m` will match a date like “8 Feb” or “23 Nov” in the email.
>
> The third parameter to `main` is now an **options object** with the following optional properties:
>
> - **`tresholdInDays`**: The number of days to keep emails. Defaults to `60`.
> - **`isDryRun`**: A boolean value that indicates whether to run the script in test mode or not. If `true` (the default), the script will only log the emails that match the query and the regex, but will not delete them. If `false`, the script will delete the emails permanently. It is recommended to run the script with `isDryRun` set to `true` first to make sure it works as expected.
> - **`dateFormatter`**: A function that takes two parameters: `textWithDate` and `lastMessageDate`. The `textWithDate` is a string that contains the date part extracted from the email body. The `lastMessageDate` is a date object that represents the latest date of the email thread. The function should return a date string like `yyyy-MM-dd` that can be parsed by `new Date()`.

4. Save and run the desired function from the script editor. You can use the **Run** menu or the **Run** button in the toolbar.

> [!IMPORTANT]
> When running the script for the first time, you may need to authorize it to access your Gmail account.

5. Optionally, set up a trigger to run a function periodically. You can do this by clicking the **Triggers** icon in the left sidebar, then clicking the **Add a trigger** button, and choosing the options you want. For example, you can set the script to run every day, week, or month.

> [!WARNING]
> This script will delete your emails permanently, without moving them to the trash. Please use it with caution and make sure you have a backup of your important emails. You can run the script with the `isDryRun` option set to `true` first to see what emails will be deleted.

## Development

This project uses [Jest](https://jestjs.io/) for automated testing.

To run the tests, use the following command:

```bash
npm test
```

## Disclaimer

This script is provided as is, without any warranty or liability. Use it at your own risk. Make sure to test the script before using it on your Gmail account. The script may delete emails that you want to keep, or fail to delete emails that you want to remove. The script may also exceed the quota limits of Google Apps Script or Gmail API, resulting in errors or partial execution. The author is not responsible for any loss or damage caused by the use of this script.

## License

This project is distributed under the AGPL-3.0 license. You can use, modify, and distribute this project, as long as you comply with the terms and conditions in the [LICENSE](/LICENSE) file.