# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-10-15

### Added
- Introduced `dateFormatterFactory` to reduce code duplication.
- Added unit tests for `dateFormatterFactory`.

### Changed
- Updated numerous development dependencies to their latest versions.

### Documentation
- Improved README with Quick Start and professional restructure.
- Updated usage and development guides for `dateFormatterFactory`.
- Updated project name in README and added a "Contributing" section.

## [0.2.3] - 2025-10-15

### Fixed
- Potential fix for code scanning alert by adding `permissions` to the CI workflow.
- Removed `appssscript.json` from `.gitignore` to allow `clasp` deployments.

### Changed
- Improved build process and configuration.
- Grouped dependabot updates for npm and GitHub Actions.
- Updated numerous development dependencies to their latest versions.
- Implemented a new GitHub Actions workflow for continuous integration to improve code quality.

### Removed
- Removed the unused `subtractYears` function from the codebase.

### Documentation
- Added comprehensive `usage.md` and `development.md` guides.
- Expanded `GEMINI.md` with more details on gitmoji conventions.

## [0.2.2] - 2025-08-20

### Fixed
- Resolved test failures by exporting functions to be available in the Node.js test environment.

### Changed
- Updated the Rollup configuration to adjust the build process for a single entry point and IIFE output.
- Configured tree shaking in Rollup to potentially reduce bundle size.
- Improved the build script to more reliably remove Node.js-specific code from the final bundle.
- Enhanced the date matching pattern in the Corel affiliate email example to be more flexible.

## [0.2.1] - 2025-08-20

### Removed
- Removed `gas-mock-globals` to resolve a security vulnerability in `lodash.set`.

### Changed
- Moved test file from `src/` to `test/` directory for better project structure.

## [0.2.0] - 2025-08-20

### Added
- Add `mode` option to process emails as plain text or HTML.
- Implement testing and refactor core logic.
- Add build process for examples with exclusion.
- Add and configure ESLint and Prettier.
- Create `dependabot.yml` for CI.
- Create `FUNDING.yml`.

### Fixed
- Handle undefined mode in `findMessages`.
- Update queries for `removeAffiliatesOne` and `removeMoneyHeroInfo` examples.
- Resolve all linting errors.

### Security
- Sanitize `<script>` tags from HTML using regex in `findMessages`.

### Changed
- Simplify query for `removeNamecheapAffiliateInfo` example.
- Bump `@types/google-apps-script` from 1.0.78 to 1.0.99.
- Bump `@google/clasp` from 2.4.2 to 2.5.0.
- Bump `braces` from 3.0.2 to 3.0.3.

### Documentation
- Update `README.md` with `mode` option.
- Update development guidelines.
- Update documentation and project files.

## [0.1.0] - 2024-03-12

### Added
- Add example for GitHub Dependabot alerts.
- Initial commit.

### Changed
- Comment regex patterns in `examples.js`.

### Documentation
- Create code of conduct.
- Add author's website URL to `package.json`.
