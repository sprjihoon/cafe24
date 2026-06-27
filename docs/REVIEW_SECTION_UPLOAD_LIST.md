# 포토리뷰 섹션 업로드 파일 목록

**작성일**: 2026-06-26  
**작업**: 메인페이지 포토리뷰 카드 슬라이더 구현

---

## 업로드 필수 파일

### 1. HTML
```
/skin/index.html
```
- 리뷰 섹션 HTML 구조 수정
- 빈 상태 메시지 추가
- 데모 모드 로직 추가
- Swiper 초기화 스크립트 추가

### 2. CSS
```
/skin/layout/basic/css/layout.css
```
- 상품 정보 영역 스타일 추가 (`.lb-review-product`)
- 빈 상태 스타일 추가 (`.lb-review-empty-state`)
- 반응형 스타일 추가

### 3. JavaScript (신규 파일)
```
/skin/layout/basic/js/atelier-review-demo-data.js
```
- 데모 리뷰 데이터 정의
- 데모 모드 토글 변수
- 리뷰 카드 생성 함수

---

## 업로드 방법

### A. FTP Watcher 사용 (권장)
```bash
cd c:\Users\one\cafe24d\ftp-mcp-server
node watcher.js
```
- 파일 저장 시 자동 업로드
- `watcher.config.json` 설정 필요

### B. 수동 FTP 업로드
FTP 클라이언트(FileZilla 등)로 위 3개 파일 업로드

---

## 업로드 후 확인사항

### 1. 파일 경로 확인
- [ ] `/layout/basic/js/atelier-review-demo-data.js` 파일이 정상적으로 업로드되었는지
- [ ] 브라우저에서 직접 접근하여 404 오류가 없는지

### 2. 리뷰 0개 상태 확인 (데모 모드 OFF)
- [ ] 메인페이지 접속
- [ ] 리뷰 섹션에 빈 상태 메시지가 표시되는지
- [ ] 화살표, 페이지네이션이 숨겨져 있는지

### 3. 데모 모드 테스트
- [ ] 브라우저 콘솔(F12) 열기
- [ ] 다음 명령 실행:
  ```javascript
  window.ATELIER_DEMO_MODE = true;
  location.reload();
  ```
- [ ] 데모 리뷰 5개가 표시되는지
- [ ] 슬라이더가 정상 작동하는지
- [ ] 화살표 클릭 테스트
- [ ] 드래그 스와이프 테스트

### 4. 반응형 테스트
- [ ] PC 화면 (1280px 이상): 5개 카드
- [ ] 태블릿 (768~1023px): 3개 카드
- [ ] 모바일 (640px 이하): 1.2개 카드

### 5. 콘솔 로그 확인
브라우저 콘솔에서 다음 메시지 확인:
```
[ATELIER N] 포토리뷰 데모 데이터 로드 완료
[ATELIER N] DEMO MODE: false
[ATELIER N] Demo reviews: 5
[ATELIER N] 실제 리뷰 개수: 0
[ATELIER N] 리뷰 슬라이더 초기화 완료 (데모 모드 ON일 때)
```

---

## 문제 해결

### Q. 데모 데이터 파일 404 오류
**원인**: 파일이 업로드되지 않았거나 경로가 틀림  
**해결**: 
1. FTP에서 `/skin/layout/basic/js/atelier-review-demo-data.js` 파일 존재 확인
2. 파일 권한 확인 (644)

### Q. 빈 상태가 표시되지 않음
**원인**: 실제 리뷰가 존재하거나 JavaScript 오류  
**해결**:
1. 브라우저 콘솔에서 에러 확인
2. 리뷰 게시판에서 실제 리뷰 개수 확인

### Q. 슬라이더가 작동하지 않음
**원인**: Swiper 라이브러리 미로드 또는 리뷰 개수 부족  
**해결**:
1. Swiper 라이브러리 로드 확인
2. 리뷰 개수 3개 이상인지 확인 (2개 이하는 슬라이더 비활성화)

---

## 데모 모드 영구 활성화 (디자인센터 전용)

실제 쇼핑몰에서는 사용하지 말 것!

### 방법: index.html 수정
```html
<!-- 포토리뷰 데모 데이터 (디자인센터 전용) -->
<script src="/layout/basic/js/atelier-review-demo-data.js"></script>

<!-- 데모 모드 활성화 -->
<script>
window.ATELIER_DEMO_MODE = true; // ← 이 줄 추가
</script>
```

---

## 참고 문서

- 상세 가이드: `/docs/REVIEW_DEMO_MODE_GUIDE.md`
- 현재 상태 감사: `/docs/REVIEW_SECTION_AUDIT.md`
