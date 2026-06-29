import ftp from 'basic-ftp';

async function uploadNewNavigation() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: 'ftp.ecudemo394315.cafe24.com',
      user: 'ecudemo394315',
      password: 'A0425wjdtns!',
      port: 21,
      secure: false
    });

    console.log('\n=== 🚀 새 네비게이션 업로드 (드롭다운 + 전체메뉴) ===\n');

    // 업로드 파일 목록
    const files = [
      {
        local: '../skin/layout/basic/layout.html',
        remote: '/sde_design/base/layout/basic/layout.html',
        desc: 'Layout HTML (드롭다운 + 전체메뉴 구조)'
      },
      {
        local: '../skin/layout/basic/css/_new-navigation.css',
        remote: '/sde_design/base/layout/basic/css/_new-navigation.css',
        desc: 'Navigation CSS (드롭다운 + 전체메뉴 스타일)'
      },
      {
        local: '../skin/layout/basic/js/_new-navigation.js',
        remote: '/sde_design/base/layout/basic/js/_new-navigation.js',
        desc: 'Navigation JS (드롭다운 + 전체메뉴 제어)'
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

    console.log('=== ✅ 모든 파일 업로드 완료 ===\n');
    console.log('📌 기능:');
    console.log('   ✅ 호버 시 드롭다운 메뉴');
    console.log('   ✅ 전체메뉴 버튼 클릭 시 전체메뉴 패널');
    console.log('   ✅ 취소선 제거\n');
    console.log('📌 캐시 클리어:');
    console.log('   Ctrl + Shift + R (하드 리프레시)\n');

  } catch (err) {
    console.error('❌ 업로드 실패:', err);
  }

  client.close();
}

uploadNewNavigation();
