The `main` function, which does the core work, has been updated to be more flexible. Here is how you would call it inside a custom function:

    ```js
    function removeOldGoogleAlerts() {
       const query = 'from:(Google Alerts <googlealerts-noreply@google.com>)';
       const regex = /[0-9]{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/m;

       // Call main with an options object for configuration
       main(query, regex, {
         tresholdInDays: 90, // Optional: default is 60
         isDryRun: true,     // Optional: default is true
         mode: 'html',       // Optional: default is 'plain'
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
> - **`mode`**: A string that specifies whether to process the email body as plain text or HTML. Can be either `'plain'` (default) or `'html'`. If set to `'html'`, the script will strip all HTML tags from the email body before searching for the regex pattern.
> - **`dateFormatter`**: A function that takes two parameters: `textWithDate` and `lastMessageDate`. The `textWithDate` is a string that contains the date part extracted from the email body. The `lastMessageDate` is a date object that represents the latest date of the email thread. The function should return a date string like `yyyy-MM-dd` that can be parsed by `new Date()`.
> > [!TIP]
> > For common date formats, you can use the `dateFormatterFactory` function to create a `dateFormatter` for you. See the [Development Guide](./development.md#dateformatterfactory) for more details.

4.  Save and run the desired function from the script editor. You can use the **Run** menu or the **Run** button in the toolbar.
