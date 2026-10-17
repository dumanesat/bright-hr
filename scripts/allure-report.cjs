const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const results = 'allure-results';
const report = 'allure-report';

if (process.argv[2] === 'clean') {
  fs.rmSync(results, { recursive: true, force: true });
} else if (process.argv[2] === 'generate') {
  if (!fs.existsSync(results) || !fs.readdirSync(results).some(name => name.endsWith('-result.json'))) {
    throw new Error('No Allure results. Run npm run test:employee first.');
  }
  const history = path.join(report, 'history');
  if (fs.existsSync(history)) {
    fs.cpSync(history, path.join(results, 'history'), { recursive: true });
  }
  const cli = require.resolve('allure-commandline/bin/allure');
  const generated = spawnSync(cli, ['generate', results, '--clean', '-o', report], { stdio: 'inherit' });
  process.exit(generated.status ?? 1);
} else {
  throw new Error('Expected clean or generate');
}
