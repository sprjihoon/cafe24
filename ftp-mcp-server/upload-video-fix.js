import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  { local: 'skin/index.html',   remote: '/sde_design/base/index.html' },
  { local: 'mobile/index.html', remote: '/sde_design/mobile/index.html' },
];

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  await client.access({ host: config.host, user: config.user, password: config.pass, port: 21 });
  for (const { local, remote } of files) {
    await client.uploadFrom(path.join(root, local), remote);
    console.log('OK', local);
  }
  client.close();
  console.log('Done');
}
main().catch(e => { console.error(e.message); process.exit(1); });
