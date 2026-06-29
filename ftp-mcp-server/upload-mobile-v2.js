import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

// 오늘 추가한 모바일 파일 3개
const files = [
  { local: 'mobile/index.html',                          remote: '/sde_design/mobile/index.html' },
  { local: 'mobile/layout/basic/css/lb-mobile.css',      remote: '/sde_design/mobile/layout/basic/css/lb-mobile.css' },
  { local: 'mobile/layout/basic/main.html',              remote: '/sde_design/mobile/layout/basic/main.html' },
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

  for (const { local, remote } of files) {
    const localPath = path.join(root, local);
    if (!fs.existsSync(localPath)) { console.warn('SKIP (not found):', local); continue; }
    await client.ensureDir(path.posix.dirname(remote));
    await client.uploadFrom(localPath, remote);
    console.log('OK', local, '->', remote);
  }

  client.close();
  console.log('Done:', files.length, 'files');
}

main().catch((e) => {
  console.error('FTP ERROR:', e.message);
  process.exit(1);
});
