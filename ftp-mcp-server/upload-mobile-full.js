import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  // 메인: PC와 동일 섹션 순서
  { local: 'mobile/index.html',                                  remote: '/sde_design/mobile/index.html' },
  // CSS: PC layout.css 이식 + 모바일 오버라이드
  { local: 'mobile/layout/basic/css/layout.css',                remote: '/sde_design/mobile/layout/basic/css/layout.css' },
  { local: 'mobile/layout/basic/css/leblanc.css',               remote: '/sde_design/mobile/layout/basic/css/leblanc.css' },
  { local: 'mobile/layout/basic/css/lb-mobile.css',             remote: '/sde_design/mobile/layout/basic/css/lb-mobile.css' },
  // 레이아웃 (Swiper + ATELIER SHORTS JS 포함)
  { local: 'mobile/layout/basic/main.html',                     remote: '/sde_design/mobile/layout/basic/main.html' },
  // JS
  { local: 'mobile/layout/basic/js/atelier-shorts.js',          remote: '/sde_design/mobile/layout/basic/js/atelier-shorts.js' },
  { local: 'mobile/layout/basic/js/atelier-shorts-data.js',     remote: '/sde_design/mobile/layout/basic/js/atelier-shorts-data.js' },
  { local: 'mobile/layout/basic/js/atelier-review-demo-data.js',remote: '/sde_design/mobile/layout/basic/js/atelier-review-demo-data.js' },
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
    console.log('OK', local);
  }

  client.close();
  console.log('\nDone:', files.length, 'files');
}

main().catch((e) => { console.error('FTP ERROR:', e.message); process.exit(1); });
