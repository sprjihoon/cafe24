/**
 * Footer 하단 공백 제거 - CSS 파일 FTP 업로드
 * 실행: node upload-footer-fix.js
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

// 프로젝트 루트 경로
const projectRoot = path.join(__dirname, "..");

// 업로드할 파일 목록
const files = [
  {
    local: path.join(projectRoot, "skin/layout/basic/css/layout.css"),
    remote: "/sde_design/base/layout/basic/css/layout.css"
  },
  {
    local: path.join(projectRoot, "skin/layout/basic/css/leblanc.css"),
    remote: "/sde_design/base/layout/basic/css/leblanc.css"
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
console.log("  Footer 하단 공백 제거");
console.log("====================================\n");

uploadFiles().then(() => {
  console.log("\n✅ 모든 작업 완료!");
  console.log("\n📋 수정 내역:");
  console.log("  1. #footer border-bottom: 45px → 0");
  console.log("  2. .lb-footer-bottom padding: 24px 0 → 24px 0 0 0");
  console.log("  3. body, html margin/padding 0으로 설정");
  console.log("  4. footer 관련 모든 요소 margin-bottom, padding-bottom 0 강제");
  console.log("\n🔍 확인:");
  console.log("  메인페이지 접속 → 하단으로 스크롤 → Copyright 아래 빈 공백 제거 확인\n");
});
