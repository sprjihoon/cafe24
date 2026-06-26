# Product Detail Layout Fix

**Date:** 2026-06-24  
**Page:** `product/detail.html` (test2 상품)  
**Live URL:** https://ecudemo394315.cafe24.com/product/test2/12/category/24/display/1/

---

## 증상 (Before)

| 문제 | 원인 |
|------|------|
| 콘텐츠가 왼쪽으로 몰리고 오른쪽 빈 공간 | `#wrap .detailArea { max-width: 600px }` + Cafe24 float 레이아웃 |
| infoArea 폭 ~230px (46% 중첩) | `layout.css` `.xans-product-detail .infoArea { width: 46% }` 가 grid 셀 내부에서 재적용 |
| 상품명 `test2` 중복 | `headingArea` + `product_detaildesign` 표의 `상품명` 행 |
| 구매 버튼 99px 그리드 / 잘림 | infoArea 폭 붕괴 → `gColumn` 2열이 좁은 컨테이너 기준 계산 |
| 탭 파란색/회색 박스 | Cafe24 `additional.css` + 미스코프 `.ec-base-tab` |

---

## 적용 변경

### 1. `skin/product/detail.html`
- `headingArea` → `infoArea` **내부 최상단**으로 이동 (우측 정보 컬럼에 상품명 배치)
- `product-detail.css` 로드를 **module `detail.css` 뒤**로 이동 (Cafe24 float override 우선)
- `h2`에 `lb-product-title` 클래스 추가
- Cafe24 `module`, `{$변수}`, `onclick` **변경 없음**

### 2. `skin/product/product-detail.css` (전면 재스코프)
- 모든 규칙을 `.xans-product-detail` / `.xans-product-additional` 하위로 한정
- 전역 `#wrap`, `#contents`, `table`, `button` 선택자 **제거**
- **2열 grid:** `minmax(0, 1.15fr) minmax(400px, 0.85fr)`, gap 68px
- 컨테이너: padding 32px, `--max-width-product-detail: 1320px` (leblanc)
- `.detailArea .infoArea { width: 100% }` — layout.css 46% override
- 상품정보표: `tbody { grid-template-columns: 120px minmax(0,1fr) }` + `tr { display: contents }`
- 가격: `clamp(30px, 2.5vw, 36px)`, `white-space: nowrap`
- 총금액: `.totalPrice` (기존 `#totalPrice` 오선택 수정), 얇은 border + muted bg
- 구매 버튼: `grid` — 바로구매 full / 장바구니·관심 2열 (56px / 52px)
- 탭: `.xans-product-additional` 스코프, ATELIER N. 라인 스타일

### 3. `skin/product/product-detail.js`
- `dedupeProductNameRow()` — 표의 `상품명` 행이 제목과 같으면 `.is-duplicate-name` + `hidden`

### 4. `skin/layout/basic/css/leblanc.css`
- `--max-width-product-detail: 1320px`

---

## 검수 결과 (After)

| Viewport | infoArea width | buy button width | grid |
|----------|----------------|------------------|------|
| 1440px | ~502px | ~502px (full) | 678px + 502px |
| 1280px | 정상 | 2열 sub buttons | 1열 전환 @1024px |
| 390px | 100% | stacked 52px+ | 단일 열 |

### 스크린샷
- `docs/screenshots/product-detail/after-1440-test2.png`
- `docs/screenshots/product-detail/after-1280-test2.png`
- `docs/screenshots/product-detail/after-390-test2.png`

---

## Cafe24 보존 확인

- [x] `module="product_detail"`, `product_image`, `product_detaildesign`, `product_option`, `product_action` 유지
- [x] `{$action_buy}`, `{$action_basket}`, `{$action_wishlist}` 유지
- [x] `btnSubmit` / `btnNormal` 클래스 유지 (+ `.btn` 병행)
- [x] 옵션/수량/총금액 마크업 (`#totalProducts`, `.totalPrice`) 유지
- [x] `!important` 미사용

---

## 변경 파일

```
skin/product/detail.html
skin/product/product-detail.css
skin/product/product-detail.js
skin/layout/basic/css/leblanc.css
docs/screenshots/product-detail/after-*.png
```

---

## 잔여 (선택)

- `layout.css` L1138–1139 float 규칙 — product-detail.css로 override 중. 추후 layout.css에서 상품상세 float 제거 가능
- 포토리뷰 placeholder 이미지 (썸네일 broken icon) — 별도 콘텐츠/JS 이슈
- `layout.css` `!important` max-width — leblanc 토큰으로 1320px 적용
