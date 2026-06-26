# UI Design System — Changelog

## Phase 2 (2026-06-24) — 전역 연결 + 구매 퍼널 적용

### 목표
- `design-tokens.css` / `components.css`를 layout에 연결
- `product-detail.css` 전역 로드 제거 → 상품 상세 페이지만 로드
- Cafe24 `btnSubmit` / `btnNormal` 등과 `.btn` 시스템 병행
- 구매 퍼널(상품상세 → 장바구니 → 주문 → 로그인) 버튼 통일

### layout.html
| 변경 | 내용 |
|------|------|
| 추가 | `<!--@css(/css/design-tokens.css)-->` (leblanc.css 다음) |
| 추가 | `<!--@css(/css/components.css)-->` (ec-base-*.css 다음) |
| 제거 | 전역 `product-detail.css`, `product-detail.js` |

### product/detail.html
| 변경 | 내용 |
|------|------|
| 추가 | 페이지 레벨 `@css(/product/product-detail.css)`, `@js(/product/product-detail.js)` |
| HTML | 구매 CTA에 `.btn .btn-primary/.btn-outline/.btn-danger .btn--lg` 병행 추가 |

### components.css — Cafe24 매핑 활성화
- `[class*="btnSubmit"]` → Primary (44px, `#2d2825`)
- `[class*="btnNormal"]`, `[class*="btnNormalFix"]` → Outline
- `[class*="btnEmFix"]` → Outline (선택상품주문)
- `[class*="btnEm"]` (Fix 제외) → Danger (품절)
- `[class*="btnBasic"]` → Secondary
- `.btnLogin` → Primary block
- `.ec-base-tab` 전역 탭 스타일
- `.ec-base-box` / `.typeWrite` 폼 입력
- `.ec-base-card` 기본 카드
- `.orderListArea td.button a` → 텍스트 링크 (테이블 행 액션)

### product-detail.css
- 제거: 전역 버튼/폼/테이블/카드 규칙 (~310–436행)
- 유지: sticky 탭, 갤러리, infoArea, 옵션, `.ec-base-button` flex 레이아웃

### basket.css
- 제거: 중복 `.ec-base-tab`, `.btnSubmitFix` 색상 블록
- 유지: `.ec-base-button.justify` 레이아웃, 테이블 텍스트 링크
- `#1d1d1f` → `var(--ds-color-brand-primary)` (일부)

### HTML 클래스 추가 (Cafe24 클래스 유지)
| 파일 | 요소 |
|------|------|
| `order/basket.html` | 전체/선택/쇼핑계속하기 footer |
| `member/login.html` | `.btnLogin` + `.btn.btn-primary.btn--block` |
| `order/orderform.html` | 결제 `.btnSubmit` + `.btn.btn-primary.btn--lg.btn--block` |

### Before → After
| 영역 | Before | After |
|------|--------|-------|
| 버튼 색상 | `#1d1d1f` (product-detail 전역) | `#2d2825` (`--ds-*`) |
| product-detail.css | 모든 페이지 | 상품 상세만 |
| 장바구니 footer | basket.css 개별 규칙 | components + `.btn` |
| 탭 | 페이지별 중복 | components 전역 + 상세 sticky |

### 미적용 (Phase 3+)
- board / myshop 전 페이지 `.btn` 추가
- `layout.css` ↔ `leblanc.css` 헤더 중복 정리
- marketing `lb-hero-btn` DS 정렬
- `lb-*` CTA 일괄 `.btn` 적용

### 검증 체크리스트
- [ ] PC 상품상세: 구매/장바구니 44px, 한 줄
- [ ] 모바일 상품상세: 버튼 wrap 없음
- [ ] 장바구니 footer 3버튼 정렬
- [ ] 장바구니 테이블 행: 텍스트 링크 (박스 버튼 아님)
- [ ] 로그인: full-width primary
- [ ] 주문서: 결제하기 full-width
- [ ] Cafe24 `onclick` / `{$action_*}` 동작 유지
