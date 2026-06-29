/**
 * 포토리뷰 섹션 파일 FTP 업로드 스크립트
 * 실행: node upload-review-section.js
 */

import * as ftp from "basic-ftp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FTP 설정 로드
const configPath = path.join(__dirname, "watcher.config.json");
let config = {};

if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  console.log("✅ FTP 설정 로드 완료");
} else {
  console.error("❌ watcher.config.json 파일을 찾을 수 없습니다.");
  process.exit(1);
}

// 프로젝트 루트 경로 (ftp-mcp-server의 상위 폴더)
const projectRoot = path.join(__dirname, "..");

// 업로드할 파일 목록
const files = [
  {
    local: path.join(projectRoot, "skin/index.html"),
    remote: "/sde_design/base/index.html"
  },
  {
    local: path.join(projectRoot, "skin/layout/basic/css/layout.css"),
    remote: "/sde_design/base/layout/basic/css/layout.css"
  },
  {
    local: path.join(projectRoot, "skin/layout/basic/js/atelier-review-demo-data.js"),
    remote: "/sde_design/base/layout/basic/js/atelier-review-demo-data.js"
  }
];

async function uploadFiles() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`\n🔗 FTP 연결 중: ${config.host}:${config.port || 21}`);
    await client.access({
      host: config.host,
      port: config.port || 21,
      user: config.user,
      password: config.pass,
      secure: config.secure || false
    });
    console.log("✅ FTP 연결 성공\n");

    for (const file of files) {
      if (!fs.existsSync(file.local)) {
        console.log(`⚠️  파일 없음: ${file.local} (건너뜀)`);
        continue;
      }

      const fileName = path.basename(file.local);
      console.log(`📤 업로드 중: ${fileName}`);
      console.log(`   로컬: ${file.local}`);
      console.log(`   원격: ${file.remote}`);
      
      try {
        await client.uploadFrom(file.local, file.remote);
        console.log(`✅ 업로드 완료\n`);
      } catch (err) {
        console.error(`❌ 업로드 실패: ${file.remote}`);
        console.error(`   에러: ${err.message}\n`);
      }
    }

  } catch (err) {
    console.error(`❌ FTP 오류: ${err.message}`);
  } finally {
    client.close();
    console.log("\n🔌 FTP 연결 종료");
  }
}

console.log("====================================");
console.log("  포토리뷰 섹션 FTP 업로드");
console.log("====================================\n");

uploadFiles().then(() => {
  console.log("\n✅ 모든 작업 완료!");
  console.log("\n📋 업로드 후 확인사항:");
  console.log("  1. 메인페이지 접속");
  console.log("  2. 리뷰 섹션에 빈 상태 메시지 표시 확인");
  console.log("  3. 브라우저 콘솔(F12)에서 데모 모드 테스트:");
  console.log("     window.ATELIER_DEMO_MODE = true;");
  console.log("     location.reload();");
  console.log("\n📄 상세 가이드: /docs/REVIEW_SECTION_UPLOAD_LIST.md\n");
});
