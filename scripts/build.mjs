import { rollup } from 'rollup';
import config from '../rollup.config.mjs';
import fs from 'fs';
import path from 'path';

async function build() {
  // Ensure dist directory exists
  const distDir = 'dist';
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  // 1. Handle code.js with Rollup
  const bundle = await rollup(config);
  await bundle.write(config.output);
  await bundle.close();

  // Post-process dist/code.js to remove Node-specific code
  const codePath = path.join(distDir, 'code.js');
  let code = fs.readFileSync(codePath, 'utf8');
  const startIndex = code.indexOf(
    "if (typeof module !== 'undefined' && module.exports)"
  );
  const endIndex = code.indexOf('	}\n', startIndex);
  if (startIndex !== -1 && endIndex !== -1) {
    code = code.slice(0, startIndex) + code.slice(endIndex + 3);
    fs.writeFileSync(codePath, code.trim());
  }

  // 2. Handle examples.js
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const excludeList = packageJson.config?.examples?.exclude || [];

  const examplesSrcPath = 'src/examples.js';
  const examplesDestPath = path.join(distDir, 'examples.js');
  const examplesSrc = fs.readFileSync(examplesSrcPath, 'utf8');

  // Split by the pattern that separates functions (JSDoc + function)
  const functionBlocks = examplesSrc.split(/\r?\n\r?\n(?=\/\*\*)/);

  const includedFunctions = functionBlocks.filter((block) => {
    const match = block.match(/function\s+([a-zA-Z0-9_]+)/);
    if (match) {
      const functionName = match[1];
      return !excludeList.includes(functionName);
    }
    return true; // Keep blocks without function definitions (like file-level comments)
  });

  fs.writeFileSync(examplesDestPath, includedFunctions.join('\n\n'));

  // 3. Copy appsscript.json
  fs.copyFileSync('src/appsscript.json', path.join(distDir, 'appsscript.json'));

  console.log('Build complete.');
  if (excludeList.length > 0) {
    console.log(
      `Excluded functions from examples.js: ${excludeList.join(', ')}`
    );
  }
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
