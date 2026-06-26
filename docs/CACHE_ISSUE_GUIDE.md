# 네비게이션 시스템 캐시 문제 해결 가이드

## 문제 증상
- 서버에 업로드한 `layout.html`이 브라우저에서 반영되지 않음
- 구 네비게이션(`#lb-nav`) 여전히 표시
- 새 네비게이션(`#atelier-main-nav`) 보이지 않음

## 원인
Cafe24의 **스킨 캐시 시스템** 또는 **HTML 최적화 기능**이 이전 버전을 캐싱

## 해결 방법

### 1️⃣ Cafe24 관리자에서 스킨 캐시 삭제 (필수)

```
1. Cafe24 관리자 로그인
2. 상단 메뉴 → [쇼핑몰 설정]
3. 좌측 메뉴 → [디자인 설정] → [스킨 설정]
4. 현재 적용 중인 스킨 옆 [설정] 버튼 클릭
5. [스킨 캐시 삭제] 또는 [캐시 초기화] 버튼 클릭
6. 확인 후 대기 (30초~1분)
```

### 2️⃣ HTML 최적화 기능 확인

```
1. Cafe24 관리자 로그인
2. [쇼핑몰 설정] → [기본 설정] → [성능 최적화]
3. "HTML 압축" 또는 "소스 최적화" 항목 확인
4. 임시로 OFF 후 테스트
```

### 3️⃣ 브라우저 캐시 완전 삭제

```
Chrome:
1. Ctrl + Shift + Delete
2. "캐시된 이미지 및 파일" 체크
3. "전체 기간" 선택
4. [데이터 삭제]
5. 브라우저 완전 종료 후 재시작
```

### 4️⃣ 시크릿 모드에서 확인

```
1. Ctrl + Shift + N (Chrome)
2. 쇼핑몰 URL 접속
3. F12 → Console 확인
   - "Removed old nav element" 로그 확인
   - "MutationObserver started" 로그 확인
```

### 5️⃣ 서버 파일 직접 확인

FTP로 서버 파일이 정확히 업로드되었는지 확인:

```bash
# MCP 명령어
ftp_download /www/skin/layout/basic/layout.html ./temp-verify.html

# 확인 사항
- <nav id="atelier-main-nav" 존재 여부
- <div id="atelier-dropdowns" 존재 여부
- #lb-nav 완전히 제거되었는지
```

## 예상 결과

### ✅ 성공 시
- 브라우저에 `#atelier-main-nav` 표시
- `#lb-nav` 완전히 사라짐
- 콘솔에 제거 스크립트 로그 출력

### ❌ 여전히 안될 시
다음 조치가 필요:
1. Cafe24 고객센터 문의 (캐시 문제)
2. 스킨 재설치
3. 다른 템플릿 파일 수정 필요 (index.html 등)

## 긴급 우회 방법

만약 계속 안 될 경우, `index.html`에 직접 네비게이션 코드 삽입:

```html
<!-- index.html 상단에 추가 -->
<style>
  #lb-nav, #lb-fullmenu { display: none !important; }
</style>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var oldNav = document.querySelector('#lb-nav');
    if (oldNav) oldNav.remove();
    var oldMenu = document.querySelector('#lb-fullmenu');
    if (oldMenu) oldMenu.remove();
  });
</script>
```

## 문의
문제가 지속되면 다음 정보와 함께 문의:
- 쇼핑몰 URL
- 브라우저 콘솔 스크린샷
- 페이지 소스 (Ctrl+U) 스크린샷
