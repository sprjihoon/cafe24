import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  // 히어로 배경이미지 추가 + 섹션 수정
  { local: 'mobile/index.html',                                    remote: '/sde_design/mobile/index.html' },
  // 카테고리 탭바 + Swiper + ATELIER SHORTS JS 로딩 추가
  { local: 'mobile/layout/basic/main.html',                        remote: '/sde_design/mobile/layout/basic/main.html' },
  // CSS 업데이트
  { local: 'mobile/layout/basic/css/lb-mobile.css',                remote: '/sde_design/mobile/layout/basic/css/lb-mobile.css' },
  // JS 파일 (PC에서 복사)
  { local: 'mobile/layout/basic/js/atelier-shorts.js',             remote: '/sde_design/mobile/layout/basic/js/atelier-shorts.js' },
  { local: 'mobile/layout/basic/js/atelier-shorts-data.js',        remote: '/sde_design/mobile/layout/basic/js/atelier-shorts-data.js' },
  { local: 'mobile/layout/basic/js/atelier-review-demo-data.js',   remote: '/sde_design/mobile/layout/basic/js/atelier-review-demo-data.js' },
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
    console.log('OK', local);
  }

  client.close();
  console.log('Done:', files.length, 'files');
}

main().catch((e) => {
  console.error('FTP ERROR:', e.message);
  process.exit(1);
});
