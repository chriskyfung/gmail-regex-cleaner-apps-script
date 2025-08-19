# Gemini Project Instructions: gmail-regex-cleaner-apps-script

This document provides instructions for Gemini on how to work with this project.

## Project Overview

This is a Google Apps Script project for cleaning old emails in Gmail based on regular expressions.

-   **Source Code**: The main logic is in `src/code.js`. Usage examples are in `src/examples.js`.
-   **Management**: The project is managed using `@google/clasp`. See `package.json` for commands.
-   **Language**: The project is written in JavaScript.

## Development Guidelines

1.  **Caution with Deletion Logic**: The script can permanently delete emails. Any changes to the core logic in `src/code.js` must be tested carefully. When running tests or new example functions, always default to `isDryRun = true`.
2.  **Testing**: The project currently lacks an automated test suite. When adding new features or fixing bugs, consider adding tests. Jest can be used with mocks for Google Apps Script services.
3.  **Code Style**: The project does not have a linter or formatter configured. Please maintain the existing code style and conventions.
4.  **TypeScript Migration**: The project is a good candidate for migration to TypeScript for improved type safety. If significant changes are made, consider proposing this migration.
5.  **Commit Messages**: Use the GitMoji convention for commit messages (e.g., `✨ feat: ...`, `🐛 fix: ...`).
