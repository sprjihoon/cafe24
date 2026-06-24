/**
 * 파일 저장 시 자동 FTP 업로드 Watcher
 * 사용법: node watcher.js --local "C:/path/to/skin" --remote "/www/skin" --host "ftp.cafe24.com" --user "id" --pass "pw"
 */

import chokidar from "chokidar";
import * as ftp from "basic-ftp";
import path from "path";
import fs from "fs";

// ──────────────────────────────────────────────
// 인자 파싱
// ──────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace("--", "");
    result[key] = args[i + 1];
  }
  return result;
}

// 설정 파일 로드 (watcher.config.json 우선, 없으면 args)
function loadConfig() {
  const configPath = path.join(process.cwd(), "watcher.config.json");
  if (fs.existsSync(configPath)) {
    console.log(`⚙️  설정 파일 로드: ${configPath}`);
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }
  const args = parseArgs();
  if (!args.host || !args.user || !args.pass || !args.local || !args.remote) {
    console.error(`
❌ 설정이 없습니다.

방법 1) watcher.config.json 파일 생성:
{
  "host": "ftp.cafe24.com",
  "user": "your_id",
  "pass": "your_password",
  "local": "C:/Users/one/cafe24d/skin",
  "remote": "/www/skin",
  "port": 21
}

방법 2) 인자로 실행:
node watcher.js --host ftp.cafe24.com --user id --pass pw --local ./skin --remote /www/skin
`);
    process.exit(1);
  }
  return args;
}

// ──────────────────────────────────────────────
// FTP 업로드 큐 (동시 업로드 방지)
// ──────────────────────────────────────────────

const config = loadConfig();
const client = new ftp.Client();
client.ftp.verbose = false;

let connected = false;
let uploadQueue = [];
let isUploading = false;

async function ensureConnected() {
  if (!connected || client.closed) {
    console.log(`🔌 FTP 연결 중... ${config.host}`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.pass,
      port: Number(config.port || 21),
      secure: config.secure || false,
    });
    connected = true;
    console.log(`✅ FTP 연결 성공: ${config.host}`);
  }
}

async function processQueue() {
  if (isUploading || uploadQueue.length === 0) return;
  isUploading = true;

  while (uploadQueue.length > 0) {
    const { localPath, remotePath, event } = uploadQueue.shift();
    try {
      await ensureConnected();
      if (event === "unlink") {
        await client.remove(remotePath).catch(() => {});
        console.log(`🗑️  삭제: ${remotePath}`);
      } else {
        const remoteDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
        await client.ensureDir(remoteDir);
        await client.uploadFrom(localPath, remotePath);
        const size = fs.statSync(localPath).size;
        console.log(`✅ 업로드: ${remotePath} (${(size / 1024).toFixed(1)}KB)`);
      }
    } catch (e) {
      console.error(`❌ 실패: ${remotePath} — ${e.message}`);
      connected = false;
    }
  }

  isUploading = false;
}

// ──────────────────────────────────────────────
// 경로 변환
// ──────────────────────────────────────────────

function toRemotePath(localPath) {
  const localBase = path.resolve(config.local).replace(/\\/g, "/");
  const localNorm = localPath.replace(/\\/g, "/");
  const rel = localNorm.replace(localBase, "").replace(/^\//, "");
  return config.remote.replace(/\/$/, "") + "/" + rel;
}

// ──────────────────────────────────────────────
// Watcher 시작
// ──────────────────────────────────────────────

const localDir = path.resolve(config.local);

if (!fs.existsSync(localDir)) {
  console.error(`❌ 로컬 폴더가 없습니다: ${localDir}`);
  process.exit(1);
}

console.log(`
🚀 카페24 스킨 자동 업로드 Watcher 시작
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
로컬 폴더: ${localDir}
서버 경로: ${config.remote}
FTP 호스트: ${config.host}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
파일을 수정하면 자동으로 업로드됩니다.
종료: Ctrl+C
`);

const watcher = chokidar.watch(localDir, {
  ignored: [
    /(^|[/\\])\../, // 숨김파일
    /node_modules/,
    /\.backups/,
    /\.zip$/,
  ],
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

watcher
  .on("add", (localPath) => {
    const remotePath = toRemotePath(localPath);
    console.log(`📁 새 파일 감지: ${path.basename(localPath)}`);
    uploadQueue.push({ localPath, remotePath, event: "add" });
    processQueue();
  })
  .on("change", (localPath) => {
    const remotePath = toRemotePath(localPath);
    console.log(`✏️  변경 감지: ${path.basename(localPath)}`);
    // 동일 파일이 큐에 이미 있으면 교체
    const idx = uploadQueue.findIndex((q) => q.remotePath === remotePath);
    if (idx >= 0) uploadQueue[idx] = { localPath, remotePath, event: "change" };
    else uploadQueue.push({ localPath, remotePath, event: "change" });
    processQueue();
  })
  .on("unlink", (localPath) => {
    const remotePath = toRemotePath(localPath);
    console.log(`🗑️  삭제 감지: ${path.basename(localPath)}`);
    uploadQueue.push({ localPath, remotePath, event: "unlink" });
    processQueue();
  });

process.on("SIGINT", async () => {
  console.log("\n👋 Watcher 종료 중...");
  await watcher.close();
  client.close();
  process.exit(0);
});
