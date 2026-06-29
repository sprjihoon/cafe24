import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  { local: 'mobile/layout/basic/css/lb-mobile.css', remote: '/sde_design/mobile/layout/basic/css/lb-mobile.css' },
];

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  await client.access({
    host: config.host,
    user: config.user,
    password: config.pass,
    port: config.port || 21,
    secure: config.secure || false,
  });

  const root = path.resolve('..');
  for (const f of files) {
    await client.ensureDir(path.dirname(f.remote));
    await client.uploadFrom(path.join(root, f.local), f.remote);
    console.log('✅', f.remote);
  }

  client.close();
  console.log('완료!');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
