# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-08-20

### Added
- ✨ feat: add `mode` option to process emails as plain text or HTML
- ✨ feat: implement testing and refactor core logic
- 🔧 chore: Add build process for examples with exclusion
- 🔧 chore(deps): add and configure ESLint and Prettier
- 💚 ci(github): create dependabot.yml
- Create FUNDING.yml

### Fixed
- 🔒️ fix: sanitize `<script>` tags from HTML using regex in `findMessages`
- 🐛 fix: handle undefined mode in `findMessages`
- 🐛 fix(examples): update queries for `removeAffiliatesOne` and `removeMoneyHeroInfo`
- 🐛 fix(eslint): resolve all linting errors

### Changed
- 💡 refactor(examples): simplify query for `removeNamecheapAffiliateInfo`
- build(deps-dev): Bump @types/google-apps-script from 1.0.78 to 1.0.99
- build(deps-dev): Bump @google/clasp from 2.4.2 to 2.5.0
- build(deps-dev): Bump braces from 3.0.2 to 3.0.3

### Documentation
- 📝 docs: update `README.md` with `mode` option
- 📝 docs: update development guidelines
- 📝 docs: update documentation and project files

## [0.1.0] - 2024-03-12

### Added
- ✨ feat: add example for GitHub Dependabot alerts
- 🎉 Initial commit

### Changed
- 💡 refactor: comment regex patterns in `examples.js`

### Documentation
- 📄 docs: create code of conduct
- 📝 docs: add author's website URL to `package.json`
