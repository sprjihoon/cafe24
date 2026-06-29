import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  { local: 'mobile/layout/basic/js/slide_menu.js',  remote: '/sde_design/mobile/layout/basic/js/slide_menu.js' },
  { local: 'mobile/layout/basic/css/slideMenu.css',  remote: '/sde_design/mobile/layout/basic/css/slideMenu.css' },
  { local: 'mobile/layout/basic/sidebar.html',       remote: '/sde_design/mobile/layout/basic/sidebar.html' },
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
    const localPath = path.join(root, f.local);
    await client.ensureDir(path.dirname(f.remote));
    await client.uploadFrom(localPath, f.remote);
    console.log('✅', f.remote);
  }

  client.close();
  console.log('\n사이드바 배포 완료!');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
