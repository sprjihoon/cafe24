# ATELIER SHORTS 가이드

## 개요

메인페이지에 추가된 세로형 영상 카드 슬라이더 섹션입니다.  
PC에서는 hover 시 영상이 자동 재생되며, 영상 재생 중 하단에 상품 링크 카드가 나타납니다.

---

## 주요 기능

### 1. 영상 자동 재생 (PC)
- 카드에 마우스를 올리면 영상이 자동으로 재생됩니다
- 다른 카드로 이동하면 기존 영상은 즉시 정지됩니다
- `prefers-reduced-motion` 환경에서는 자동 재생하지 않습니다

### 2. 수동 재생 (모바일)
- 모바일 및 터치 기기에서는 재생 버튼을 눌러야 재생됩니다
- 영상 재생 중 버튼을 다시 누르면 정지됩니다

### 3. 상품 링크 카드
- 영상 재생 중 또는 hover 시 하단에 상품 정보가 나타납니다
- 클릭하면 해당 상품상세 페이지로 이동합니다
- 모바일에서는 항상 표시됩니다

### 4. 반응형 디자인
- **데스크톱 (1440px+)**: 4개 카드 노출
- **태블릿 (1024px)**: 3개 카드 노출
- **모바일 (640px)**: 2.2개 카드 노출
- **모바일 (480px 미만)**: 1.2~1.35개 카드 노출

### 5. 접근성
- 키보드 탭 이동 시 상품 링크가 자동으로 표시됩니다
- 스크린 리더를 위한 aria-label 속성이 포함되어 있습니다
- 좌우 화살표 키로도 슬라이드 이동이 가능합니다

---

## 파일 구조

### 변경된 파일

```
skin/
├── index.html                              # ATELIER SHORTS 섹션 추가
└── layout/basic/
    ├── layout.html                         # JS 파일 로드 추가
    ├── css/
    │   └── layout.css                      # ATELIER SHORTS 스타일 추가
    └── js/
        ├── atelier-shorts-data.js          # 영상 및 상품 데이터
        └── atelier-shorts.js               # 기능 구현
```

### 새로 생성된 파일

1. **`/skin/layout/basic/js/atelier-shorts-data.js`**
   - 영상 및 상품 정보를 관리하는 데이터 파일
   - 이 파일만 수정하면 콘텐츠를 쉽게 교체할 수 있습니다

2. **`/skin/layout/basic/js/atelier-shorts.js`**
   - 영상 재생, 상품 링크 표시, Swiper 초기화 등의 기능 구현
   - 직접 수정할 필요는 없습니다

---

## 콘텐츠 관리 방법

### 데이터 파일 수정

`/skin/layout/basic/js/atelier-shorts-data.js` 파일을 열어 아래 형식으로 데이터를 수정합니다:

```javascript
window.ATELIER_SHORTS_DATA = [
  {
    id: "shorts-01",                                    // 고유 식별자
    video: "/web/upload/atelier-shorts/shorts-01.mp4", // 영상 파일 경로
    poster: "/web/upload/atelier-shorts/shorts-01.jpg", // 썸네일 이미지
    productUrl: "/product/detail.html?product_no=1",   // 상품 URL
    productThumb: "/web/product/medium/sample.png",    // 상품 썸네일
    productName: "Marlow Wool Jacket",                 // 상품명
    price: "159,000원"                                  // 가격
  },
  // ... 추가 데이터
];
```

### 영상 파일 업로드

1. **영상 파일 요구사항**
   - 형식: MP4
   - 비율: 9:16 (세로형)
   - 해상도: 1080x1920 권장
   - 용량: 10MB 이하 권장
   - 길이: 15~60초 권장

2. **업로드 경로**
   ```
   /web/upload/atelier-shorts/
   ├── shorts-01.mp4
   ├── shorts-01.jpg  (포스터 이미지)
   ├── shorts-02.mp4
   ├── shorts-02.jpg
   └── ...
   ```

3. **FTP 업로드**
   - 로컬 경로: `c:\Users\one\cafe24d\web\upload\atelier-shorts\`
   - 서버 경로: `/ecudemo394315/www/web/upload/atelier-shorts/`

### 상품 정보 연결

1. 카페24 관리자 페이지에서 상품 번호를 확인합니다
2. `productUrl`에 해당 상품 번호를 입력합니다:
   ```javascript
   productUrl: "/product/detail.html?product_no=123"
   ```
3. 상품 썸네일은 카페24에서 자동 생성된 이미지 경로를 사용합니다:
   ```javascript
   productThumb: "/web/product/medium/[이미지파일명].jpg"
   ```

### 상품 링크가 없는 영상

상품 연결이 없는 영상은 아래와 같이 설정합니다:

```javascript
{
  id: "shorts-brand",
  video: "/web/upload/atelier-shorts/brand-story.mp4",
  poster: "/web/upload/atelier-shorts/brand-story.jpg",
  productUrl: "",          // 빈 문자열
  productThumb: "",        // 빈 문자열
  productName: "",         // 빈 문자열
  price: ""                // 빈 문자열
}
```

상품 정보가 비어있으면 하단 상품 링크 카드가 자동으로 숨겨집니다.

---

## 스타일 커스터마이징

### 색상 변경

`/skin/layout/basic/css/layout.css` 파일에서 아래 부분을 수정합니다:

```css
/* 제목 색상 */
.atelier-shorts__title {
  color: #1d1d1f;  /* 변경 가능 */
}

/* 상품 카드 배경 */
.atelier-shorts__product-link {
  background: rgba(255, 255, 255, 0.96);  /* 변경 가능 */
}

/* 네비게이션 버튼 테두리 */
.atelier-shorts__nav-btn {
  border: 1px solid #d2d2d7;  /* 변경 가능 */
}
```

### 간격 조정

```css
/* 섹션 상하 여백 */
.atelier-shorts {
  padding: 120px 40px 160px;  /* 상 좌우 하 */
}

/* 카드 간격 */
.atelier-shorts__slider {
  /* breakpoints에서 spaceBetween 값 조정 */
}
```

### 카드 모서리 변경

```css
/* 카드 둥근 모서리 */
.atelier-shorts__card {
  border-radius: 14px;  /* 변경 가능 */
}
```

---

## 테스트 체크리스트

### PC (1440px)
- [ ] 4개 카드가 한 화면에 표시됨
- [ ] 카드 hover 시 영상이 자동 재생됨
- [ ] 영상 재생 중 하단 상품 링크가 나타남
- [ ] 다른 카드 hover 시 기존 영상이 정지됨
- [ ] 좌우 네비게이션 버튼이 정상 작동함
- [ ] 상품 링크 클릭 시 상세 페이지로 이동함

### 태블릿 (768px - 1023px)
- [ ] 3개 카드가 노출됨
- [ ] 상품 링크가 항상 표시됨
- [ ] 터치 스와이프가 정상 작동함

### 모바일 (640px 미만)
- [ ] 1.2~1.35개 카드가 보이며 다음 카드가 살짝 보임
- [ ] 재생 버튼 클릭 시 영상이 재생됨
- [ ] 상품 링크가 항상 표시되고 클릭 가능함
- [ ] 가로 스크롤바가 숨겨져 있음

### 접근성
- [ ] 키보드 Tab 키로 상품 링크에 포커스됨
- [ ] 포커스 시 상품 링크가 표시됨
- [ ] 좌우 화살표 키로 슬라이드 이동됨
- [ ] 스크린 리더에서 aria-label이 읽힘

### 에러 처리
- [ ] 영상 로드 실패 시 포스터 이미지만 표시됨
- [ ] 상품 정보가 없으면 상품 링크가 숨겨짐
- [ ] 데이터 파일이 없어도 페이지가 정상 작동함

---

## 문제 해결

### 영상이 재생되지 않음

1. **영상 파일 경로 확인**
   ```javascript
   // 올바른 경로 예시
   video: "/web/upload/atelier-shorts/shorts-01.mp4"
   
   // 잘못된 경로
   video: "shorts-01.mp4"  // 절대 경로 필요
   ```

2. **영상 파일 형식 확인**
   - MP4 형식이어야 합니다
   - 브라우저 개발자 도구 콘솔에서 에러 메시지를 확인하세요

3. **영상 인코딩 확인**
   - H.264 코덱 사용 권장
   - 프로파일: High / Main
   - 레벨: 4.0 이상

### 상품 링크가 표시되지 않음

1. **데이터 확인**
   ```javascript
   // 모든 필드가 채워져 있어야 함
   productUrl: "/product/detail.html?product_no=1",  // 비어있으면 안됨
   productName: "상품명",                             // 비어있으면 안됨
   ```

2. **CSS 확인**
   - 브라우저 개발자 도구에서 `.atelier-shorts__product-link` 요소가 존재하는지 확인
   - `opacity: 0`이 아닌 `opacity: 1`로 되어 있는지 확인

### Swiper가 초기화되지 않음

1. **Swiper 라이브러리 로드 확인**
   ```html
   <!-- layout.html에 포함되어 있어야 함 -->
   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
   ```

2. **콘솔 에러 확인**
   - 브라우저 개발자 도구 콘솔에서 에러 메시지 확인
   - "Swiper is not defined" 에러가 나면 라이브러리 로드 순서 문제

3. **JS 파일 로드 순서 확인**
   ```html
   <!-- 순서가 중요함 -->
   1. swiper-bundle.min.js
   2. atelier-shorts-data.js
   3. atelier-shorts.js
   ```

### 모바일에서 상품 링크가 안보임

1. **CSS 미디어 쿼리 확인**
   ```css
   @media (max-width: 1023px) {
     .atelier-shorts__product-link {
       opacity: 1;        /* 항상 표시 */
       transform: translateY(0);
       pointer-events: auto;
     }
   }
   ```

2. **브라우저 캐시 삭제**
   - 모바일에서 페이지 새로고침 (Ctrl+Shift+R)
   - 또는 시크릿/프라이빗 모드에서 확인

---

## 업데이트 이력

### 2026-06-26
- 초기 구현 완료
- 6개 샘플 데이터 추가
- PC/태블릿/모바일 반응형 지원
- 접근성 및 에러 처리 구현

---

## 참고사항

### 성능 최적화

1. **영상 파일 최적화**
   - 용량을 10MB 이하로 유지하세요
   - 길이는 15~60초가 적당합니다
   - 필요시 HandBrake 등의 도구로 압축하세요

2. **Lazy Loading**
   - 영상은 `preload="metadata"`로 설정되어 메타데이터만 미리 로드됩니다
   - 실제 영상은 hover 시 로드되어 초기 로딩 속도에 영향을 주지 않습니다

3. **이미지 최적화**
   - 포스터 이미지는 WebP 형식 권장
   - 해상도: 1080x1920 또는 720x1280

### 브라우저 호환성

- Chrome: ✓ 완전 지원
- Safari: ✓ 완전 지원
- Firefox: ✓ 완전 지원
- Edge: ✓ 완전 지원
- IE11: ✗ 지원 안함 (Swiper 11 미지원)

### 카페24 모듈과의 관계

이 섹션은 카페24 기존 모듈과 독립적으로 작동합니다:
- 상품 데이터를 직접 불러오지 않습니다
- `module=""` 속성을 사용하지 않습니다
- 전역 CSS/JS를 오염시키지 않습니다

따라서 카페24 업데이트의 영향을 받지 않으며, 다른 기능에도 영향을 주지 않습니다.

---

## 문의

기술 지원이 필요하거나 추가 기능을 원하시면 개발팀에 문의하세요.

- 영상 재생 관련: `atelier-shorts.js` 파일 참조
- 스타일 관련: `layout.css` 파일의 "ATELIER SHORTS" 섹션 참조
- 데이터 관련: `atelier-shorts-data.js` 파일 참조
