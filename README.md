# Gmail Regex Cleaner

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![Build Status](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/ci.yml/badge.svg)](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/ci.yml)
[![CodeQL](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/actions/workflows/github-code-scanning/codeql)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](/LICENSE)
[![GitHub Sponsors Default](https://img.shields.io/badge/Sponsor-GitHub-blue?logo=github-sponsors&colorA=263238&colorB=EC407A)](https://github.com/sponsors/chriskyfung "Sponsor on GitHub")
[![Buy Me A Coffee](https://img.shields.io/badge/Support-Coffee-ffdd00?logo=buy-me-a-coffee&logoColor=ffdd00&colorA=263238)](https://www.buymeacoffee.com/chriskyfung "Support Coffee")

A Google Apps Script that helps you delete old emails in Gmail that match your custom regex filters. This can help you save space and keep your inbox organized.

## Table of Contents

* [About The Project](#about-the-project)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)
* [Disclaimer](#disclaimer)

## About The Project

This project provides a flexible way to automatically clean up your Gmail inbox by deleting old emails that match specific criteria defined by regular expressions. It's perfect for managing recurring emails like newsletters, notifications, and alerts that you don't need to keep forever.

### ✨ Features

* Delete old emails in Gmail that match a regular expression
* Specify the number of days to keep the emails
* Exclude starred, important, or labeled emails from deletion
* Run the script manually or on a schedule
* Log the deleted emails and errors

## 🚀 Getting Started

> [!WARNING]
> This script will delete your emails permanently, without moving them to the trash. Please use it with caution and make sure you have a backup of your important emails. You can run the script with the `isDryRun` option set to `true` first to see what emails will be deleted.

This section will guide you through the process of setting up and running the script.

### 📋 1. Prerequisites

* A Google account with access to Gmail and Google Drive.

### 📦 2. Installation

1. Create a new Google Apps Script project in Google Drive.
2. Copy and paste the code from `dist/code.js` and `dist/examples.js` into the script editor.
3. From the `examples.js` file, choose a function that matches your needs, or create a new one. You can then run this function from the Apps Script editor.

    For example, to run one of the pre-made functions, you would select it in the editor's function list and click **Run**.

> [!IMPORTANT]
> When running the script for the first time, you may need to authorize it to access your Gmail account.

1. Optionally, set up a trigger to run a function periodically. You can do this by clicking the **Triggers** icon in the left sidebar, then clicking the **Add a trigger** button, and choosing the options you want. For example, you can set the script to run every day, week, or month.

### 💻 3. Usage

For detailed instructions on how to set up and use this script, please see the [**Usage Guide**](./docs/usage.md).

## 👨‍💻 Development

This project uses ESLint for linting, Prettier for formatting, Jest for testing, and Rollup for building. For more details on the development setup and build process, please see the [**Development Guide**](./docs/development.md).

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

If you have a bug report or a feature request, please open an issue on the [GitHub Issues page](https://github.com/chriskyfung/gmail-regex-cleaner-apps-script/issues).

## 📄 License

This project is distributed under the AGPL-3.0 license. You can use, modify, and distribute this project, as long as you comply with the terms and conditions in the [LICENSE](/LICENSE) file.

## 📜 Disclaimer

This script is provided as is, without any warranty or liability. Use it at your own risk. Make sure to test the script before using it on your Gmail account. The script may delete emails that you want to keep, or fail to delete emails that you want to remove. The script may also exceed the quota limits of Google Apps Script or Gmail API, resulting in errors or partial execution. The author is not responsible for any loss or damage caused by the use of this script.
