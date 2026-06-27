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

## 개발/배포 현황 (2026-06-26)

- 숏츠(`atelier-shorts.js`) 초기 진입 3번 자동재생 기준(`START_INDEX = 2`) 반영
- 숏츠 카드 상품 링크 배너 노출 조건 보완(hover/focus/active/playing)
- FTP 업로드 정상 동작 확인
- 운영 페이지는 카페24 최적화 번들(`optimizer_user.php`) 경유 로드 가능성이 있으므로, **업로드 직후 즉시 반영되지 않을 수 있음**

### 운영 반영 체크리스트

1. 수정 파일 업로드 (`ftp_upload`)
2. 운영 경로 다중 반영 필요 시 아래 경로 모두 업로드
   - `/sde_design/base/layout/basic/js/atelier-shorts.js`
   - `/sde_design/base/layout/basic/css/layout.css`
   - `/www/skin/layout/basic/js/atelier-shorts.js`
   - `/www/skin/layout/basic/css/layout.css`
   - `/ecudemo394315/www/skin/layout/basic/js/atelier-shorts.js`
   - `/ecudemo394315/www/skin/layout/basic/css/layout.css`
   - `/ecudemo394315/layout/basic/js/atelier-shorts.js`
   - `/ecudemo394315/layout/basic/css/layout.css`
3. 브라우저 강력 새로고침(`Ctrl+F5`)으로 캐시 제거
4. 여전히 미반영이면 카페24 디자인 관리자에서 사용 스킨/캐시 상태 확인

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
