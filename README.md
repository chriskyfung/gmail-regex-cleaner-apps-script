# Gmail Regex Cleaner

[![Build Status](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/ci.yml/badge.svg)](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](/LICENSE)

This is a Google Apps Script project that helps you delete old emails in Gmail that match your custom regex filters. This can help you save space and keep your inbox organized.

## Features

- Delete old emails in Gmail that match a regular expression
- Specify the number of days to keep the emails
- Exclude starred, important, or labeled emails from deletion
- Run the script manually or on a schedule
- Log the deleted emails and errors

## How to use

For detailed instructions on how to set up and use this script, please see the [**Usage Guide**](./docs/usage.md).

## Development

This project uses ESLint for linting, Prettier for formatting, Jest for testing, and Rollup for building. For more details on the development setup and build process, please see the [**Development Guide**](./docs/development.md).

## Contributing

Contributions are welcome! Please read the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

If you have a bug report or a feature request, please open an issue on the [GitHub Issues page](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/issues).

## Disclaimer

This script is provided as is, without any warranty or liability. Use it at your own risk. Make sure to test the script before using it on your Gmail account. The script may delete emails that you want to keep, or fail to delete emails that you want to remove. The script may also exceed the quota limits of Google Apps Script or Gmail API, resulting in errors or partial execution. The author is not responsible for any loss or damage caused by the use of this script.

## License

This project is distributed under the AGPL-3.0 license. You can use, modify, and distribute this project, as long as you comply with the terms and conditions in the [LICENSE](/LICENSE) file.