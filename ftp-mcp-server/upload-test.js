import ftp from 'basic-ftp';

async function uploadTest() {
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

    console.log('\n=== 🧪 테스트 파일 업로드 ===\n');

    await client.uploadFrom('./nav-test.html', '/sde_design/base/nav-test.html');
    console.log('✅ nav-test.html 업로드 완료\n');

    console.log('📌 테스트 URL:');
    console.log('   https://ecudemo394315.cafe24.com/nav-test.html\n');

  } catch (err) {
    console.error('❌ 업로드 실패:', err);
  }

  client.close();
}

uploadTest();
