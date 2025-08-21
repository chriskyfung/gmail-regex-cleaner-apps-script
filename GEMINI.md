# Gemini Project Instructions: gmail-regex-cleaner-apps-script

This document provides instructions for Gemini on how to work with this project.

## Project Overview

This is a Google Apps Script project for cleaning old emails in Gmail based on regular expressions.

-   **Source Code**: The main logic is in `src/code.js`. Usage examples are in `src/examples.js`.
-   **Management**: The project is managed using `@google/clasp`. See `package.json` for commands.
-   **Language**: The project is written in JavaScript.

## Development Guidelines

1.  **Caution with Deletion Logic**: The script can permanently delete emails. Any changes to the core logic in `src/code.js` must be tested carefully. When running tests or new example functions, always default to `isDryRun = true`.
2.  **Testing**: This project uses [Jest](https://jestjs.io/) for automated testing. Run `npm test` to execute the test suite.
3.  **Code Style**: The project is configured with ESLint and Prettier for code quality and consistent formatting. Run `npm run lint` to check for any linting issues. Please adhere to the existing code style.
4.  **TypeScript Migration**: The project is a good candidate for migration to TypeScript for improved type safety. If significant changes are made, consider proposing this migration.
5.  **Commit Messages**: Follow the GitMoji convention for commit messages. The format is `emoji type(scope): subject`. For a complete list of emojis and their meanings, refer to the [GitMoji website](https://gitmoji.dev).
    -   Use lowercase for the subject line (after the colon).
    -   **CI/Build System (`ci`, `chore`):**
        -   Use `👷` for adding or updating the CI build system (e.g., GitHub Actions).
        -   Use `🔧` for configuration file changes.
        -   Use `🔨` for development script updates.
        -   Example: `👷 ci: add new workflow`
        -   Example: `🔧 chore(eslint): update eslint config`
    -   **Documentation (`docs`):**
        -   Use `📝` for adding or updating documentation.
        -   Example: `📝 docs(readme): update installation instructions`
