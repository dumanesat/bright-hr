// Scrub credential values before reports are uploaded or generated.
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const AdmZip = require('adm-zip');
// Redact credentials from every local environment, not only the selected one.
const secrets = [process.env.USERNAME, process.env.PASSWORD, process.env.BRIGHTHR_EMAIL, process.env.BRIGHTHR_PASSWORD].filter(Boolean);
for (const name of ['.env', '.env.dev', '.env.test', '.env.staging', '.env.prod']) {
  if (!fs.existsSync(name)) continue;
  const values = dotenv.parse(fs.readFileSync(name));
  secrets.push(...[values.USERNAME, values.PASSWORD, values.BRIGHTHR_EMAIL, values.BRIGHTHR_PASSWORD].filter(Boolean));
}
function redact(text) {
  for (const secret of secrets) {
    for (const value of [secret, JSON.stringify(secret).slice(1, -1), encodeURIComponent(secret)]) {
      text = text.split(value).join('[REDACTED]');
    }
  }
  return text;
}
function cleanZip(buffer) {
  const zip = new AdmZip(buffer);
  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;
    const data = entry.getData();
    if (/\.(json|trace|network|stacks|txt|html|md)$/.test(entry.entryName) || entry.entryName.includes('resources/') && !/\.(png|jpg|jpeg|webm)$/.test(entry.entryName)) {
      // Do not decode binary screenshot resources.
      if (!data.includes(0)) zip.updateFile(entry.entryName, Buffer.from(redact(data.toString('utf8'))));
    }
  }
  return zip.toBuffer();
}
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (file.endsWith('.zip')) fs.writeFileSync(file, cleanZip(fs.readFileSync(file)));
    else if (/\.(json|txt|md|html)$/.test(file)) {
      let content = fs.readFileSync(file, 'utf8');
      // Playwright HTML bundles the test data as a base64 ZIP.
      content = content.replace(/data:application\/zip;base64,([A-Za-z0-9+/=]+)/g,
        (_, data) => `data:application/zip;base64,${cleanZip(Buffer.from(data, 'base64')).toString('base64')}`);
      fs.writeFileSync(file, redact(content));
    }
  }
}
if (require.main === module) {
  for (const dir of ['allure-results', 'playwright-report', 'test-results']) walk(dir);
  console.log('Credential values redacted from report text and trace archives.');
}
module.exports = { redact, cleanZip };
