# Development

This project uses [ESLint](https://eslint.org/) for code linting and [Prettier](https://prettier.io/) for code formatting. It is recommended to run the linter before committing any changes.

To run the linter, use the following command:

```bash
npm run lint
```

This project uses [Jest](https://jestjs.io/) for automated testing.

To run the tests, use the following command:

```bash
npm test
```

## Build Process

This project uses [Rollup](https://rollupjs.org/) to bundle the source files from `src/` into the `dist/` directory, which is ready for deployment with `@google/clasp`.

To build the project, run:

```bash
npm run build
```

This command bundles `src/code.js` and processes `src/examples.js` into the `dist/` directory. It also removes a Node.js-specific code block from `code.js` that is used for testing with Jest.

### Excluding Example Functions

You can prevent specific functions from `src/examples.js` from being included in the final `dist/examples.js` file. This is useful if you only need a subset of the example functions for your deployment.

To exclude functions, add their names to the `config.examples.exclude` array in your `package.json` file:

```json
{
  "name": "gmail-regex-cleaner-apps-script",
  "version": "1.0.0",
  // ...
  "config": {
    "examples": {
      "exclude": [
        "removeAffiliatesOne",
        "removeCorelAffiliateInfo"
      ]
    }
  },
  // ...
}
```

When you run `npm run build`, the functions listed in the `exclude` array will be omitted from the output.

### Timezone Update

Optionally, you can update the timezone in the `dist/appsscript.json` manifest to match your local machine's timezone. This is useful to ensure that scheduled triggers run at the correct time.

To update the timezone, run the following command **after** the build command:

```bash
npm run update-timezone
```
