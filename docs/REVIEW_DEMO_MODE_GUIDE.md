# 포토리뷰 데모 모드 설정 가이드

**작성일**: 2026-06-26  
**목적**: 디자인센터 샘플몰에서 데모 리뷰를 표시하기 위한 설정 가이드

---

## 1. 데모 모드란?

**데모 모드**는 실제 고객 리뷰가 0개일 때 샘플 리뷰 카드를 표시하는 기능입니다.

### 사용 목적
- 디자인센터에서 스킨을 시연할 때 빈 화면 대신 완성된 모습을 보여주기 위함
- 실제 쇼핑몰 운영 중에는 **절대 사용하지 않음**

### 중요 원칙
1. **실제 쇼핑몰에서는 기본값 `false`로 유지**
2. **실제 리뷰가 1개라도 있으면 데모 리뷰는 표시되지 않음**
3. 데모 데이터는 실제 리뷰 모듈과 완전히 분리됨

---

## 2. 데모 모드 활성화 방법

### A. 일시적 활성화 (브라우저 콘솔)

브라우저 개발자 도구(F12) 콘솔에서 실행:

```javascript
// 데모 모드 활성화
window.ATELIER_DEMO_MODE = true;

// 페이지 새로고침
location.reload();
```

**특징**:
- 페이지를 새로고침하면 다시 `false`로 돌아감
- 빠른 테스트용

---

### B. 영구 활성화 (파일 수정)

#### 방법 1: HTML에서 직접 설정

`/skin/index.html` 파일에서 다음 스크립트를 추가:

```html
<!-- 포토리뷰 데모 데이터 (디자인센터 전용) -->
<script src="/layout/basic/js/atelier-review-demo-data.js"></script>

<!-- 데모 모드 활성화 -->
<script>
window.ATELIER_DEMO_MODE = true; // ← 이 줄 추가
</script>

<script>
/**
 * ATELIER N - 포토리뷰 슬라이더 초기화
 */
(function() {
  // ... 나머지 코드
</script>
```

#### 방법 2: 데모 데이터 파일에서 설정

`/skin/layout/basic/js/atelier-review-demo-data.js` 파일 수정:

```javascript
// 데모 모드 토글 (기본값: false)
window.ATELIER_DEMO_MODE = true; // ← false를 true로 변경
```

**주의**: 실제 쇼핑몰 오픈 전에 반드시 `false`로 되돌려야 합니다.

---

## 3. 동작 흐름

### Case 1: 실제 리뷰 0개 + 데모 모드 OFF (기본)
```
실제 리뷰 확인 → 0개
→ 데모 모드 확인 → false
→ 빈 상태 메시지 표시
→ 화살표, 페이지네이션 숨김
```

**화면**:
```
아직 첫 번째 착용 후기를 기다리고 있습니다.
상품을 경험하신 뒤, 당신의 일상을 들려주세요.
```

---

### Case 2: 실제 리뷰 0개 + 데모 모드 ON (디자인센터 전용)
```
실제 리뷰 확인 → 0개
→ 데모 모드 확인 → true
→ 데모 리뷰 5개 삽입
→ 슬라이더 초기화
→ 화살표, 페이지네이션 표시
```

**화면**: 5개의 샘플 리뷰 카드가 슬라이더로 표시됨

---

### Case 3: 실제 리뷰 1개 이상
```
실제 리뷰 확인 → 1개 이상
→ 데모 모드 무시
→ 실제 리뷰만 표시
→ 슬라이더 초기화
```

**중요**: 실제 리뷰가 있으면 데모 모드 설정과 관계없이 실제 리뷰만 표시됩니다.

---

## 4. 데모 리뷰 데이터 수정

### 파일 위치
`/skin/layout/basic/js/atelier-review-demo-data.js`

### 데이터 구조
```javascript
{
  id: 'demo-review-01',              // 고유 ID
  image: '/web/upload/...',          // 리뷰 이미지 경로
  imageFallback: '/web/upload/...',  // 이미지 없을 때 대체 이미지
  title: '리뷰 제목',
  body: '리뷰 본문 (2-3줄 권장)',
  rating: 5,                         // 1~5 별점
  author: '작성자명',
  date: '2026.06.20',
  productName: '상품명',
  productThumb: '/web/product/...',  // 상품 썸네일
  productThumbFallback: '/web/upload/...', // 썸네일 대체 이미지
  productUrl: '/product/detail.html?product_no=1' // 상품 링크
}
```

### 이미지 준비
1. 리뷰 이미지: `/web/upload/atelier-demo-reviews/review-01.jpg` ~ `review-05.jpg`
2. 이미지 크기: 정사각형 (1:1 비율, 최소 600x600px 권장)
3. 파일 형식: JPG, PNG

**Fallback**: 이미지가 없으면 자동으로 `imageFallback` 경로의 이미지를 사용합니다.

---

## 5. 테스트 체크리스트

### 실제 리뷰 0개 상태 테스트
- [ ] 데모 모드 OFF → 빈 상태 메시지 표시
- [ ] 데모 모드 OFF → 화살표, 페이지네이션 숨김
- [ ] 데모 모드 ON → 데모 리뷰 5개 표시
- [ ] 데모 모드 ON → 슬라이더 작동 확인
- [ ] 데모 모드 ON → 화살표 클릭 테스트
- [ ] 데모 모드 ON → 드래그 스와이프 테스트

### 실제 리뷰 존재 시나리오
- [ ] 실제 리뷰 1개 → 슬라이더 비활성화, 화살표 숨김
- [ ] 실제 리뷰 2개 → 슬라이더 비활성화, 화살표 숨김
- [ ] 실제 리뷰 3개 이상 → 슬라이더 활성화, 화살표 표시
- [ ] 데모 모드 ON이어도 실제 리뷰만 표시되는지 확인

### 반응형 테스트
- [ ] PC (1280px 이상) → 5개 카드 표시
- [ ] 태블릿 (768~1023px) → 3개 카드 표시
- [ ] 모바일 (640px 이하) → 1.2개 카드 표시 (스와이프 힌트)

---

## 6. 주의사항

### ⚠️ 반드시 지켜야 할 사항
1. **실제 쇼핑몰 오픈 전에 데모 모드를 `false`로 설정**
2. 실제 리뷰 게시판 링크(`/board/review/list.html?board_no=4`)는 절대 삭제/변경 금지
3. 카페24 모듈(`board_listpackage_4`, `board_list_4`)은 절대 삭제 금지
4. 데모 리뷰에 실제 고객 정보를 사용하지 않음

### 🔍 확인 방법
브라우저 콘솔(F12)에서 확인:

```javascript
// 현재 데모 모드 상태 확인
console.log('DEMO MODE:', window.ATELIER_DEMO_MODE);

// 실제 리뷰 개수 확인
var realReviews = document.querySelectorAll('#lb-review-list .xans-record-:not(.atelier-demo-review)');
console.log('실제 리뷰 개수:', realReviews.length);

// 데모 리뷰 개수 확인
var demoReviews = document.querySelectorAll('.atelier-demo-review');
console.log('데모 리뷰 개수:', demoReviews.length);
```

---

## 7. 문제 해결

### Q. 데모 모드를 `true`로 설정했는데 빈 상태만 보입니다.
**A.** 다음을 확인하세요:
1. 페이지를 새로고침했는지 확인
2. 브라우저 콘솔에서 `window.ATELIER_DEMO_MODE` 값 확인
3. JavaScript 오류가 없는지 확인 (F12 → Console 탭)
4. `/layout/basic/js/atelier-review-demo-data.js` 파일이 로드되는지 확인

### Q. 실제 리뷰를 추가했는데 데모 리뷰도 함께 표시됩니다.
**A.** 이것은 버그입니다. 실제 리뷰가 1개라도 있으면 데모 리뷰는 절대 표시되지 않아야 합니다. 코드를 확인하세요.

### Q. 슬라이더가 작동하지 않습니다.
**A.** 다음을 확인하세요:
1. Swiper 라이브러리가 로드되었는지 확인
2. 리뷰 개수가 3개 이상인지 확인 (2개 이하면 슬라이더 비활성화)
3. 브라우저 콘솔에서 에러 메시지 확인

### Q. 이미지가 표시되지 않습니다.
**A.** 다음을 확인하세요:
1. 이미지 파일이 실제로 서버에 업로드되었는지 확인
2. 이미지 경로가 정확한지 확인
3. Fallback 이미지 경로도 확인

---

## 8. 커스터마이징

### 데모 리뷰 개수 변경
`atelier-review-demo-data.js` 파일에서 배열에 데이터를 추가/삭제:

```javascript
window.ATELIER_DEMO_REVIEWS = [
  { /* 리뷰 1 */ },
  { /* 리뷰 2 */ },
  // 더 추가하거나 삭제
];
```

### 빈 상태 문구 변경
`/skin/index.html` 파일에서 수정:

```html
<div class="lb-review-empty-state" id="lb-review-empty-state">
    <div class="lb-review-empty-content">
        <p class="lb-review-empty-title">여기에 원하는 제목</p>
        <p class="lb-review-empty-desc">여기에 원하는 설명</p>
    </div>
</div>
```

### 슬라이더 설정 변경
`/skin/index.html` 파일의 `initSwiper()` 함수에서 Swiper 옵션 수정:

```javascript
breakpoints: {
  640: { slidesPerView: 2 },  // 모바일
  768: { slidesPerView: 3 },  // 태블릿
  1024: { slidesPerView: 4 }, // 작은 데스크톱
  1280: { slidesPerView: 5 }  // 큰 데스크톱
}
```

---

## 9. 연락처

문의사항이 있으시면 개발 담당자에게 연락하세요.
