import { Client } from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const config = {
  host: process.env.FTP_HOST || '',
  user: process.env.FTP_USER || '',
  password: process.env.FTP_PASS || '',
  secure: false,
};

const files = [
  // PC
  { local: 'skin/layout/basic/layout.html',    remote: '/sde_design/layout/basic/layout.html' },
  { local: 'skin/layout/basic/css/layout.css', remote: '/sde_design/layout/basic/css/layout.css' },
  // Mobile
  { local: 'mobile/layout/basic/footer.html',         remote: '/sde_design_m/layout/basic/footer.html' },
  { local: 'mobile/layout/basic/css/lb-mobile.css',   remote: '/sde_design_m/layout/basic/css/lb-mobile.css' },
];

async function upload() {
  const client = new Client();
  try {
    await client.access(config);
    console.log('FTP connected');
    for (const f of files) {
      const localPath = path.join(ROOT, f.local);
      if (!fs.existsSync(localPath)) { console.warn('SKIP (not found):', f.local); continue; }
      console.log(`Uploading ${f.local} → ${f.remote}`);
      await client.uploadFrom(localPath, f.remote);
      console.log('  OK');
    }
    console.log('\n✅ 푸터 업로드 완료');
  } catch (err) {
    console.error('FTP error:', err.message);
  } finally {
    client.close();
  }
}

upload();
