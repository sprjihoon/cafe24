# 카페24 FTP MCP 서버

카페24 스킨 개발 및 판매를 위한 FTP MCP 서버입니다.  
Cursor AI가 직접 FTP를 제어해 파일 업로드, 동기화, 패키징을 자동으로 처리합니다.

---

## 설치

```bash
cd ftp-mcp-server
npm install
```

---

## Cursor MCP 등록

`Cursor 설정 → MCP → Edit Config (mcp.json)` 에 아래 내용 추가:

```json
{
  "mcpServers": {
    "cafe24-ftp": {
      "command": "node",
      "args": ["C:/Users/one/cafe24d/ftp-mcp-server/index.js"]
    }
  }
}
```

등록 후 Cursor를 재시작하면 AI가 FTP 도구를 사용할 수 있게 됩니다.

---

## 자동 업로드 Watcher 사용법

파일을 저장할 때마다 자동으로 카페24 서버에 업로드됩니다.

### 1단계: 설정 파일 생성

`watcher.config.example.json`을 복사해 `watcher.config.json`으로 저장하고 정보 입력:

```json
{
  "host": "ftp.cafe24.com",
  "user": "카페24_아이디",
  "pass": "카페24_FTP_비밀번호",
  "local": "C:/Users/one/cafe24d/skin",
  "remote": "/www/skin",
  "port": 21
}
```

### 2단계: Watcher 실행

```bash
npm run watch
```

이제 스킨 파일을 수정하면 자동으로 카페24 서버에 반영됩니다.

---

## AI가 사용할 수 있는 도구 목록

| 도구 | 설명 |
|------|------|
| `ftp_connect` | FTP 서버 연결 |
| `ftp_disconnect` | FTP 연결 종료 |
| `ftp_status` | 연결 상태 확인 |
| `ftp_list` | 서버 디렉토리 목록 |
| `ftp_upload` | 단일 파일 업로드 |
| `ftp_download` | 단일 파일 다운로드 |
| `ftp_delete` | 파일/폴더 삭제 |
| `ftp_mkdir` | 디렉토리 생성 |
| `ftp_rename` | 파일명 변경 |
| `ftp_sync_folder` | 폴더 전체 동기화 |
| `ftp_upload_changed` | 변경된 파일만 업로드 |
| `ftp_diff` | 로컬 vs 서버 비교 |
| `ftp_create_skin_template` | 카페24 스킨 템플릿 생성 |
| `ftp_package_skin` | 판매용 ZIP 패키징 |
| `ftp_version_backup` | 버전 백업 |
| `ftp_list_backups` | 백업 목록 조회 |

---

## 카페24 FTP 정보 확인 방법

1. 카페24 관리자 로그인
2. 상단 메뉴 → **호스팅 관리**
3. **FTP/SSH 정보** 탭에서 호스트, 아이디, 비밀번호 확인
