import ftp from 'basic-ftp';

async function uploadAtelierNav() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: 'ftp.cafe24.com',
      user: 'onejustone',
      password: 'Snfms26!#',
      secure: false
    });

    console.log('\n=== Atelier Nav Upload 시작 ===\n');

    // 업로드 파일 목록
    const files = [
      {
        local: './skin/layout/basic/layout.html',
        remote: '/www/skin/layout/basic/layout.html',
        desc: 'Layout HTML (드롭다운 구조 수정)'
      },
      {
        local: './skin/layout/basic/css/atelier-nav.css',
        remote: '/www/skin/layout/basic/css/atelier-nav.css',
        desc: 'Atelier Nav CSS (헤더 기준 드롭다운)'
      },
      {
        local: './skin/layout/basic/js/atelier-nav.js',
        remote: '/www/skin/layout/basic/js/atelier-nav.js',
        desc: 'Atelier Nav JS (hover 이벤트)'
      }
    ];

    // 각 파일 업로드
    for (const file of files) {
      console.log(`⬆️  ${file.desc}`);
      console.log(`   로컬: ${file.local}`);
      console.log(`   원격: ${file.remote}`);
      
      await client.uploadFrom(file.local, file.remote);
      console.log('   ✅ 업로드 완료\n');
    }

    console.log('=== 모든 파일 업로드 완료 ===\n');
    console.log('📌 브라우저 강력 새로고침 필요:');
    console.log('   - Windows: Ctrl + Shift + R');
    console.log('   - Mac: Cmd + Shift + R\n');

  } catch (err) {
    console.error('❌ 업로드 실패:', err);
  }

  client.close();
}

uploadAtelierNav();
