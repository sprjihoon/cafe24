import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  // PC CSS 그대로 이식
  { local: 'mobile/layout/basic/css/layout.css',   remote: '/sde_design/mobile/layout/basic/css/layout.css' },
  { local: 'mobile/layout/basic/css/leblanc.css',  remote: '/sde_design/mobile/layout/basic/css/leblanc.css' },
  // 모바일 오버라이드 전용 (새로 작성)
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

  for (const { local, remote } of files) {
    const localPath = path.join(root, local);
    if (!fs.existsSync(localPath)) { console.warn('SKIP:', local); continue; }
    await client.ensureDir(path.posix.dirname(remote));
    await client.uploadFrom(localPath, remote);
    console.log('OK', local, '->', remote);
  }

  client.close();
  console.log('Done:', files.length, 'files');
}

main().catch((e) => { console.error('FTP ERROR:', e.message); process.exit(1); });
