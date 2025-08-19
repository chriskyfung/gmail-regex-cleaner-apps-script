import fs from 'fs';

const filePath = 'dist/appsscript.json';
const appsscript = JSON.parse(fs.readFileSync(filePath, 'utf8'));

appsscript.runtimeVersion = 'V8';
appsscript.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

fs.writeFileSync(filePath, JSON.stringify(appsscript, null, 2));

console.log(`Updated timezone to ${appsscript.timezone} in ${filePath}`);
