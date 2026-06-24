import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as ftp from "basic-ftp";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import archiver from "archiver";
import fse from "fs-extra";

const server = new McpServer({
  name: "cafe24-ftp",
  version: "1.0.0",
});

// FTP 클라이언트 인스턴스 (세션 유지)
let client = new ftp.Client();
client.ftp.verbose = false;

// 현재 연결 정보 저장
let currentConnection = null;

// ──────────────────────────────────────────────
// 유틸리티
// ──────────────────────────────────────────────

function ok(text) {
  return { content: [{ type: "text", text }] };
}

function err(text) {
  return { content: [{ type: "text", text: `❌ 오류: ${text}` }] };
}

async function ensureConnected() {
  if (client.closed) {
    if (!currentConnection) throw new Error("FTP 서버에 먼저 연결해주세요. ftp_connect를 사용하세요.");
    await client.access(currentConnection);
  }
}

function fileMd5(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(data).digest("hex");
}

async function listAllRemoteFiles(remotePath) {
  const result = [];
  const items = await client.list(remotePath);
  for (const item of items) {
    const fullPath = remotePath.replace(/\/$/, "") + "/" + item.name;
    if (item.isDirectory) {
      const sub = await listAllRemoteFiles(fullPath);
      result.push(...sub);
    } else {
      result.push({ path: fullPath, size: item.size, date: item.modifiedAt });
    }
  }
  return result;
}

function listAllLocalFiles(localDir, baseDir = localDir) {
  const result = [];
  if (!fs.existsSync(localDir)) return result;
  const items = fs.readdirSync(localDir);
  for (const item of items) {
    const fullPath = path.join(localDir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      result.push(...listAllLocalFiles(fullPath, baseDir));
    } else {
      result.push({
        localPath: fullPath,
        relativePath: path.relative(baseDir, fullPath).replace(/\\/g, "/"),
        size: stat.size,
        mtime: stat.mtimeMs,
      });
    }
  }
  return result;
}

// ──────────────────────────────────────────────
// 1. FTP 연결/해제
// ──────────────────────────────────────────────

server.tool(
  "ftp_connect",
  "FTP 서버에 연결합니다",
  {
    host: z.string().describe("FTP 호스트 주소"),
    user: z.string().describe("FTP 사용자 아이디"),
    password: z.string().describe("FTP 비밀번호"),
    port: z.number().optional().default(21).describe("FTP 포트 (기본: 21)"),
    secure: z.boolean().optional().default(false).describe("FTPS 사용 여부"),
  },
  async ({ host, user, password, port, secure }) => {
    try {
      if (!client.closed) client.close();
      client = new ftp.Client();
      client.ftp.verbose = false;
      await client.access({ host, user, password, port, secure });
      currentConnection = { host, user, password, port, secure };
      const list = await client.list("/");
      return ok(`✅ 연결 성공!\n호스트: ${host}\n사용자: ${user}\n루트 목록: ${list.map((f) => f.name).join(", ")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

server.tool("ftp_disconnect", "FTP 연결을 종료합니다", {}, async () => {
  try {
    client.close();
    currentConnection = null;
    return ok("✅ 연결이 종료되었습니다.");
  } catch (e) {
    return err(e.message);
  }
});

// ──────────────────────────────────────────────
// 2. 파일/디렉토리 탐색
// ──────────────────────────────────────────────

server.tool(
  "ftp_list",
  "서버의 디렉토리 목록을 조회합니다",
  {
    remotePath: z.string().optional().default("/www").describe("조회할 서버 경로"),
  },
  async ({ remotePath }) => {
    try {
      await ensureConnected();
      const items = await client.list(remotePath);
      if (items.length === 0) return ok(`📂 ${remotePath} — 비어 있습니다.`);
      const lines = items.map((f) => {
        const type = f.isDirectory ? "📁" : "📄";
        const size = f.isDirectory ? "" : ` (${(f.size / 1024).toFixed(1)}KB)`;
        return `${type} ${f.name}${size}`;
      });
      return ok(`📂 ${remotePath}\n${lines.join("\n")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 3. 단일 파일 업로드/다운로드
// ──────────────────────────────────────────────

server.tool(
  "ftp_upload",
  "로컬 파일 하나를 서버에 업로드합니다",
  {
    localPath: z.string().describe("업로드할 로컬 파일 경로"),
    remotePath: z.string().describe("서버 업로드 경로 (파일명 포함)"),
  },
  async ({ localPath, remotePath }) => {
    try {
      await ensureConnected();
      if (!fs.existsSync(localPath)) return err(`로컬 파일이 없습니다: ${localPath}`);
      const remoteDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
      await client.ensureDir(remoteDir);
      await client.uploadFrom(localPath, remotePath);
      const stat = fs.statSync(localPath);
      return ok(`✅ 업로드 완료\n로컬: ${localPath}\n서버: ${remotePath}\n크기: ${(stat.size / 1024).toFixed(1)}KB`);
    } catch (e) {
      return err(e.message);
    }
  }
);

server.tool(
  "ftp_download",
  "서버 파일을 로컬로 다운로드합니다",
  {
    remotePath: z.string().describe("다운로드할 서버 파일 경로"),
    localPath: z.string().describe("저장할 로컬 경로"),
  },
  async ({ remotePath, localPath }) => {
    try {
      await ensureConnected();
      fse.ensureDirSync(path.dirname(localPath));
      await client.downloadTo(localPath, remotePath);
      const stat = fs.statSync(localPath);
      return ok(`✅ 다운로드 완료\n서버: ${remotePath}\n로컬: ${localPath}\n크기: ${(stat.size / 1024).toFixed(1)}KB`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 4. 파일/폴더 관리
// ──────────────────────────────────────────────

server.tool(
  "ftp_delete",
  "서버의 파일 또는 폴더를 삭제합니다",
  {
    remotePath: z.string().describe("삭제할 서버 경로"),
    isDirectory: z.boolean().optional().default(false).describe("폴더 여부"),
  },
  async ({ remotePath, isDirectory }) => {
    try {
      await ensureConnected();
      if (isDirectory) {
        await client.removeDir(remotePath);
      } else {
        await client.remove(remotePath);
      }
      return ok(`✅ 삭제 완료: ${remotePath}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

server.tool(
  "ftp_mkdir",
  "서버에 디렉토리를 생성합니다",
  {
    remotePath: z.string().describe("생성할 서버 디렉토리 경로"),
  },
  async ({ remotePath }) => {
    try {
      await ensureConnected();
      await client.ensureDir(remotePath);
      return ok(`✅ 디렉토리 생성 완료: ${remotePath}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

server.tool(
  "ftp_rename",
  "서버의 파일 또는 폴더 이름을 변경합니다",
  {
    fromPath: z.string().describe("변경 전 서버 경로"),
    toPath: z.string().describe("변경 후 서버 경로"),
  },
  async ({ fromPath, toPath }) => {
    try {
      await ensureConnected();
      await client.rename(fromPath, toPath);
      return ok(`✅ 이름 변경 완료\n${fromPath} → ${toPath}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 5. 스킨 개발 전용 — 폴더 동기화
// ──────────────────────────────────────────────

server.tool(
  "ftp_sync_folder",
  "로컬 스킨 폴더 전체를 서버와 동기화합니다 (로컬 → 서버)",
  {
    localDir: z.string().describe("동기화할 로컬 폴더 경로"),
    remoteDir: z.string().describe("동기화할 서버 폴더 경로"),
    dryRun: z.boolean().optional().default(false).describe("true이면 실제 업로드 없이 변경 목록만 확인"),
  },
  async ({ localDir, remoteDir, dryRun }) => {
    try {
      await ensureConnected();
      const localFiles = listAllLocalFiles(localDir);
      if (localFiles.length === 0) return err(`로컬 폴더가 비어 있거나 없습니다: ${localDir}`);

      const uploaded = [];
      for (const file of localFiles) {
        const remotePath = remoteDir.replace(/\/$/, "") + "/" + file.relativePath;
        if (!dryRun) {
          const remoteFileDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
          await client.ensureDir(remoteFileDir);
          await client.uploadFrom(file.localPath, remotePath);
        }
        uploaded.push(`  ${dryRun ? "[예정]" : "✅"} ${file.relativePath}`);
      }

      const summary = dryRun ? `[DRY RUN] 업로드 예정 파일 ${uploaded.length}개:` : `✅ 동기화 완료! ${uploaded.length}개 파일 업로드:`;
      return ok(`${summary}\n${uploaded.join("\n")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 6. 스킨 개발 전용 — 변경 파일만 업로드
// ──────────────────────────────────────────────

server.tool(
  "ftp_upload_changed",
  "마지막 업로드 이후 변경된 파일만 서버에 업로드합니다",
  {
    localDir: z.string().describe("로컬 스킨 폴더 경로"),
    remoteDir: z.string().describe("서버 스킨 폴더 경로"),
    sinceMinutes: z.number().optional().default(60).describe("최근 몇 분 이내 변경된 파일만 (기본: 60분)"),
  },
  async ({ localDir, remoteDir, sinceMinutes }) => {
    try {
      await ensureConnected();
      const allFiles = listAllLocalFiles(localDir);
      const cutoff = Date.now() - sinceMinutes * 60 * 1000;
      const changedFiles = allFiles.filter((f) => f.mtime >= cutoff);

      if (changedFiles.length === 0) {
        return ok(`ℹ️ 최근 ${sinceMinutes}분 이내 변경된 파일이 없습니다.`);
      }

      const uploaded = [];
      for (const file of changedFiles) {
        const remotePath = remoteDir.replace(/\/$/, "") + "/" + file.relativePath;
        const remoteFileDir = remotePath.substring(0, remotePath.lastIndexOf("/"));
        await client.ensureDir(remoteFileDir);
        await client.uploadFrom(file.localPath, remotePath);
        uploaded.push(`  ✅ ${file.relativePath}`);
      }

      return ok(`✅ 변경 파일 ${uploaded.length}개 업로드 완료:\n${uploaded.join("\n")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 7. 스킨 개발 전용 — 로컬 vs 서버 비교
// ──────────────────────────────────────────────

server.tool(
  "ftp_diff",
  "로컬과 서버 파일을 비교해 차이점을 보여줍니다",
  {
    localDir: z.string().describe("비교할 로컬 폴더"),
    remoteDir: z.string().describe("비교할 서버 폴더"),
  },
  async ({ localDir, remoteDir }) => {
    try {
      await ensureConnected();
      const localFiles = listAllLocalFiles(localDir);
      const remoteFiles = await listAllRemoteFiles(remoteDir);

      const localMap = new Map(localFiles.map((f) => [f.relativePath, f]));
      const remoteMap = new Map(
        remoteFiles.map((f) => {
          const rel = f.path.replace(remoteDir.replace(/\/$/, "") + "/", "");
          return [rel, f];
        })
      );

      const onlyLocal = [];
      const onlyRemote = [];
      const different = [];
      const same = [];

      for (const [rel, local] of localMap) {
        if (!remoteMap.has(rel)) {
          onlyLocal.push(rel);
        } else {
          const remote = remoteMap.get(rel);
          if (local.size !== remote.size) {
            different.push(`  ~ ${rel} (로컬 ${local.size}B / 서버 ${remote.size}B)`);
          } else {
            same.push(rel);
          }
        }
      }

      for (const [rel] of remoteMap) {
        if (!localMap.has(rel)) onlyRemote.push(rel);
      }

      const lines = [];
      if (different.length > 0) lines.push(`🔄 크기가 다른 파일 ${different.length}개:\n${different.join("\n")}`);
      if (onlyLocal.length > 0) lines.push(`📤 로컬에만 있는 파일 ${onlyLocal.length}개 (서버에 없음):\n${onlyLocal.map((f) => `  + ${f}`).join("\n")}`);
      if (onlyRemote.length > 0) lines.push(`📥 서버에만 있는 파일 ${onlyRemote.length}개 (로컬에 없음):\n${onlyRemote.map((f) => `  - ${f}`).join("\n")}`);
      if (lines.length === 0) lines.push(`✅ 로컬과 서버가 동일합니다. (${same.length}개 파일)`);

      return ok(lines.join("\n\n"));
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 8. 카페24 스킨 템플릿 생성
// ──────────────────────────────────────────────

server.tool(
  "ftp_create_skin_template",
  "카페24 스킨 기본 폴더 구조를 로컬에 생성합니다",
  {
    skinName: z.string().describe("스킨 이름 (폴더명으로 사용됨)"),
    targetDir: z.string().describe("생성할 부모 디렉토리 경로"),
  },
  async ({ skinName, targetDir }) => {
    try {
      const skinDir = path.join(targetDir, skinName);
      const structure = {
        "index.html": "<!-- 메인 페이지 -->\n{$layout_header}\n\n<div id=\"main\">\n  {$module_content}\n</div>\n\n{$layout_footer}\n",
        "layout/layout1.html": "<!DOCTYPE html>\n<html lang=\"ko\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>{$shop_name}</title>\n  <link rel=\"stylesheet\" href=\"{$skin_path}/css/style.css\">\n</head>\n<body>\n{$content}\n<script src=\"{$skin_path}/js/main.js\"></script>\n</body>\n</html>\n",
        "css/style.css": "/* 카페24 스킨 스타일 */\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: 'Noto Sans KR', sans-serif; }\n",
        "css/mobile.css": "/* 모바일 스타일 */\n@media (max-width: 768px) {\n}\n",
        "js/main.js": "// 카페24 스킨 메인 스크립트\ndocument.addEventListener('DOMContentLoaded', function() {\n});\n",
        "images/.gitkeep": "",
        "product/product_list.html": "<!-- 상품 목록 -->\n{$module_list}\n",
        "product/product_detail.html": "<!-- 상품 상세 -->\n{$module_product}\n",
        "board/board_list.html": "<!-- 게시판 목록 -->\n{$module_board}\n",
        "myshop/myshop_main.html": "<!-- 마이쇼핑 메인 -->\n{$module_myshop}\n",
        "order/order_form.html": "<!-- 주문서 -->\n{$module_order}\n",
        "skin.info": `skin_name=${skinName}\nversion=1.0.0\nauthor=\ndescription=\n`,
      };

      for (const [filePath, content] of Object.entries(structure)) {
        const fullPath = path.join(skinDir, filePath);
        fse.ensureDirSync(path.dirname(fullPath));
        fs.writeFileSync(fullPath, content, "utf-8");
      }

      return ok(`✅ 카페24 스킨 템플릿 생성 완료!\n경로: ${skinDir}\n\n생성된 파일:\n${Object.keys(structure).map((f) => `  📄 ${f}`).join("\n")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 9. 스킨 패키징 (ZIP)
// ──────────────────────────────────────────────

server.tool(
  "ftp_package_skin",
  "스킨 폴더를 판매용 ZIP 파일로 패키징합니다",
  {
    skinDir: z.string().describe("패키징할 스킨 폴더 경로"),
    outputDir: z.string().optional().describe("ZIP 저장 경로 (기본: 스킨 폴더 상위)"),
    version: z.string().optional().default("1.0.0").describe("스킨 버전"),
  },
  async ({ skinDir, outputDir, version }) => {
    try {
      if (!fs.existsSync(skinDir)) return err(`스킨 폴더가 없습니다: ${skinDir}`);

      const skinName = path.basename(skinDir);
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const zipName = `${skinName}_v${version}_${timestamp}.zip`;
      const outDir = outputDir || path.dirname(skinDir);
      const zipPath = path.join(outDir, zipName);

      fse.ensureDirSync(outDir);

      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver("zip", { zlib: { level: 9 } });
        output.on("close", resolve);
        archive.on("error", reject);
        archive.pipe(output);
        archive.directory(skinDir, skinName);
        archive.finalize();
      });

      const stat = fs.statSync(zipPath);
      return ok(`✅ 패키징 완료!\n파일명: ${zipName}\n경로: ${zipPath}\n크기: ${(stat.size / 1024).toFixed(1)}KB`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 10. 스킨 버전 백업
// ──────────────────────────────────────────────

server.tool(
  "ftp_version_backup",
  "현재 스킨을 버전 폴더에 백업합니다",
  {
    skinDir: z.string().describe("백업할 스킨 폴더 경로"),
    version: z.string().optional().describe("버전 태그 (미입력 시 날짜+시간 자동 생성)"),
  },
  async ({ skinDir, version }) => {
    try {
      if (!fs.existsSync(skinDir)) return err(`스킨 폴더가 없습니다: ${skinDir}`);

      const skinName = path.basename(skinDir);
      const tag = version || new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const backupDir = path.join(path.dirname(skinDir), ".backups", skinName, tag);

      fse.copySync(skinDir, backupDir);

      const files = listAllLocalFiles(backupDir);
      return ok(`✅ 백업 완료!\n버전: ${tag}\n경로: ${backupDir}\n파일 수: ${files.length}개`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 11. 백업 목록 조회
// ──────────────────────────────────────────────

server.tool(
  "ftp_list_backups",
  "스킨의 백업 목록을 조회합니다",
  {
    skinDir: z.string().describe("스킨 폴더 경로"),
  },
  async ({ skinDir }) => {
    try {
      const skinName = path.basename(skinDir);
      const backupsDir = path.join(path.dirname(skinDir), ".backups", skinName);

      if (!fs.existsSync(backupsDir)) return ok(`ℹ️ 백업이 없습니다.`);

      const versions = fs.readdirSync(backupsDir).sort().reverse();
      const lines = versions.map((v) => {
        const vDir = path.join(backupsDir, v);
        const files = listAllLocalFiles(vDir);
        return `  📦 ${v} (${files.length}개 파일)`;
      });

      return ok(`백업 목록 (${versions.length}개):\n${lines.join("\n")}`);
    } catch (e) {
      return err(e.message);
    }
  }
);

// ──────────────────────────────────────────────
// 12. 서버 상태 확인
// ──────────────────────────────────────────────

server.tool(
  "ftp_status",
  "현재 FTP 연결 상태를 확인합니다",
  {},
  async () => {
    if (!currentConnection) return ok("🔴 연결 없음 — ftp_connect로 연결하세요.");
    const status = client.closed ? "🔴 연결 끊김 (재연결 필요)" : "🟢 연결 중";
    return ok(`${status}\n호스트: ${currentConnection.host}\n사용자: ${currentConnection.user}`);
  }
);

// ──────────────────────────────────────────────
// 서버 시작
// ──────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
