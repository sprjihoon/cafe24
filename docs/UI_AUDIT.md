# UI Audit — Cafe24 LE BLANC Skin

> **감사 일자:** 2026-06-25  
> **범위:** `skin/` 전체 (layout, index, product, order, member, myshop, board)  
> **목적:** 페이지별로 제각각인 UI를 공통 디자인 시스템으로 통합하기 위한 현황 파악  
> **상태:** 1단계 감사 완료 — **페이지 일괄 적용 전**

---

## 1. 요약

현재 스킨은 **두 개의 UI 스택**이 공존합니다.

| 스택 | 접두사 / 파일 | 특징 |
|------|----------------|------|
| **Cafe24 기본** | `ec-base-*`, `btnSubmit`, `btnNormal` | Gulim 12px, `#4a5164` 버튼, 2px radius |
| **LE BLANC 커스텀** | `lb-*`, `leblanc.css`, `layout.css` | 아이보리/차콜 팔레트, 마케팅 CTA |

**핵심 문제**

1. `product-detail.css`가 `layout.html`에서 **전 페이지 global 로드** → 장바구니·마이페이지·게시판 버튼/탭까지 덮어씀
2. `order/basket.css`, `product-detail.css`에 **하드코딩 `#1d1d1f`** (Apple 스타일) vs `leblanc.css` **`#2d2825`**
3. `layout.css` ↔ `leblanc.css` **헤더·네비·푸터 중복 정의**
4. Cafe24 `.badge` (`#009ffa`) vs LE BLANC `lb-badge` (taupe) **배지 2종**
5. `ec-base-card` HTML 사용처 있으나 **스킨 CSS 정의 없음**

---

## 2. CSS 로드 순서 (`layout/basic/layout.html`)

| 순서 | 파일 | 역할 |
|------|------|------|
| 1 | `layout/basic/css/common.css` | Cafe24 전역 reset |
| 2 | `layout/basic/css/layout.css` | LE BLANC 컴포넌트 (~4000줄) |
| 3–12 | `ec-base-ui.css` ~ `ec-base-desc.css` | Cafe24 UI 프레임워크 |
| 13 | `layout/basic/css/leblanc.css` | 디자인 토큰 + 헤더/네비/푸터 |
| 14 | **`product/product-detail.css`** | ⚠️ 전 페이지 로드 (상품상세 스타일) |
| 15 | Swiper CDN | 외부 |
| body | `widgets.css` | 플로팅 버튼 |
| 조건부 | `ec-base-layer.css` | 멀티샵 배송 등 |

**페이지별 추가 CSS 예시**

| 페이지 | 추가 파일 |
|--------|-----------|
| index | `css/module/layout/board_listpackage_*.css` |
| product/list | `menupackage.css`, `listnormal.css` |
| product/detail | `css/module/product/detail.css` (+ global 중복) |
| order/basket | `order/basket.css`, `basketPackage.css`, `dcInfo.css`, `wishlist.css` |
| member/login | `css/module/member/login.css` |
| member/join | `css/module/member/join.css` |
| myshop/index | `benefit.css`, `bankbook.css`, `orderState.css`, `main.css` |
| board/* | `writePackage.css`, `listPackage.css` 등 |

---

## 3. 컴포넌트별 수집 결과

### 3.1 버튼

#### Cafe24 표준 (`ec-base-button.css`)

| 클래스 | 용도 | 기본 스타일 |
|--------|------|-------------|
| `btnSubmit`, `btnSubmitFix` | 주문·구매·로그인 등 **primary** | `#4a5164` bg, white text, 2px radius |
| `btnNormal`, `btnNormalFix` | 장바구니·취소·보조 | white bg, `#d1d1d1` border |
| `btnEm`, `btnEmFix` | 강조·삭제·성인인증 | `#84868b` bg |
| `btnBasic`, `btnBasicFix` | 취소·닫기 | `#f0f0f0` bg |
| `btnLink` | 텍스트 링크형 | underline shadow |
| `btnLogin`, `btnAgree` | 로그인/약관 특수 | 70px 높이 고정 |
| `sizeS` / `sizeM` / `sizeL` | 크기 | padding만 변경 (터치 44px 미달) |

**사용 페이지:** product/detail, order/basket, member/*, myshop/*, board/*, layout sidebar 모듈

#### LE BLANC 마케팅 버튼 (`layout.css`)

| 클래스 | 용도 |
|--------|------|
| `lb-hero-btn` | 히어로 CTA |
| `lb-banner-btn`, `lb-banner-btn--outline` | 프로모 배너 |
| `lb-grid-btn`, `lb-grid-btn-outline` | 스플릿 그리드 |
| `lb-timesale-btn` | 타임세일 |
| `lb-promo-cta` | 프로모 섹션 |
| `lb-floating-btn` | 플로팅 (widgets.css) |

#### 충돌 사례

| 위치 | A | B | 결과 |
|------|---|---|------|
| 전역 | `ec-base-button.css` 12px Gulim | `product-detail.css` 16px bold `#1d1d1f` 8px radius | non-product 페이지 버튼 왜곡 |
| basket | `ec-base-button.css` | `order/basket.css` 재정의 | 장바구니만 다른 톤 |
| CTA 3종 | `btnSubmit` | `lb-hero-btn` | 구매 vs 마�eting 시각 언어 분리 |

---

### 3.2 입력·폼

| 패턴 | 클래스 / 선택자 | 파일 |
|------|-----------------|------|
| 전역 input | `input[type=text\|password\|...]`, `select`, `textarea` | `ec-base-ui.css` |
| 전체 너비 | `.fWidthFull` | module CSS |
| placeholder 라벨 | `.ePlaceholder` | member/login |
| 커스텀 체크 | `.ec-base-chk`, `.checkbox` | join, agreement |
| 수량 | `.ec-base-qty`, `.up`, `.down` | product, basket |
| 옵션 스와치 | `.ec-product-button`, `.ec-product-radio` | product/detail |
| (신규 예정) | `.form-input`, `.form-select`, `.form-checkbox` | `components.css` |

**충돌:** `product-detail.css`가 `#contents` max-width·input border를 전역 적용

---

### 3.3 탭

| 클래스 | 정의 | 사용처 |
|--------|------|--------|
| `.ec-base-tab` | `ec-base-tab.css` — gray bar, `#4a5164` selected | basket, myshop, regular delivery |
| `.ec-base-tab.typeLight` | border-bottom 스타일 | basket 국내/해외 |
| `.ec-base-tab.grid2~7` | 그리드 탭 | myshop |
| (오버라이드) | `product-detail.css` — flex, top border `#1d1d1f` | 상품상세 (전역 spill) |
| (오버라이드) | `order/basket.css` — flex `#1d1d1f` active | 장바구니 |

---

### 3.4 배지

| 클래스 | 색상 | 사용처 |
|--------|------|--------|
| `lb-badge` | taupe pill | 헤더 회원가입 +P |
| `lb-feature-badge` | bordered uppercase | 메인 feature 박스 |
| `lb-product-badge`, `lb-timesale-badge` | layout.css | 상품·타임세일 |
| `lb-nav-badge*` | nav 프로모 | (레거시) |
| `.badge` (Cafe24) | **`#009ffa` blue** | 정기배송, detail module |
| `prdIcon` | background-image | 상품 아이콘 |

---

### 3.5 카드 / 박스

| 클래스 | 상태 | 사용처 |
|--------|------|--------|
| `ec-base-box` + typeThin/Member/Product | Cafe24 표준 | login, myshop |
| `lb-product-card` | LE BLANC | index 상품 섹션 |
| `lb-feature-box` | LE BLANC | index feature 4열 |
| `ec-base-card`, `card-head`, `card-content` | **CSS 없음** | coupon, tax, store_pickup HTML |
| `cardList`, `cardInfo` | module CSS | 정기배송 결제카드 |

---

### 3.6 모달 / 레이어 / 알림

| 패턴 | 클래스 | 사용처 |
|------|--------|--------|
| 표준 레이어 | `ec-base-layer`, `.header`, `.content`, `.close`, `.dimmed` | basket, member, board |
| 할인 상세 | `totalDetail ec-base-layer` | basket |
| 옵션 변경 | `optionModify`, `#ec-basketOptionModifyLayer` | basket |
| 결제 진행 | `#progressPaybar`, `.layerProgress` | order |
| 상품 | `discount_layer`, `searchOption` | detail |
| 전체 메뉴 | `lb-fullmenu`, `role="dialog"` | layout (커스텀) |
| intro | `.alert` | adult 인트로 |

---

## 4. 페이지별 UI 스냅샷

### Layout / Header / Footer
- **버튼:** `lb-hamburger`, `lb-lang-btn`, `lb-floating-*`, hidden `btnSubmit`/`btnNormal`
- **배지:** `lb-badge`, `lb-cart-count`
- **모달:** `#lb-fullmenu`

### Index (`index.html`)
- **마케팅:** `lb-hero-btn`, feature/grid/promo/timesale 버튼 다수
- **상품:** `ec-base-product` + `lb-product-*` 혼합
- **Cafe24 모듈:** board preview `ec-base-table`

### Product List
- **버튼:** `btnSubmitFix`, `btnCompare`, `likeButton`
- **폼:** category `select`, compare checkbox
- **카드:** `ec-base-product` / `prdList`

### Product Detail
- **구매 CTA:** `btnSubmit sizeL` (바로구매), `btnNormal sizeL` (장바구니), `btnEm` (SOLD OUT)
- **탭:** `ec-base-tab` (상품정보/후기/Q&A)
- **레이어:** 할인·옵션 tooltip

### Order / Basket
- **Primary:** `btnSubmit`, `btnSubmitFix` (주문하기)
- **Secondary:** `btnNormal`, `btnNormalFix` (옵션변경, 삭제)
- **Destructive:** `btnEm`, `btnEmFix` (선택삭제)
- **탭:** `ec-base-tab typeLight`
- **커스텀:** `lb-order-steps`, `basket.css` 전면 오버라이드

### Member
- **로그인:** `btnLogin`, `btnSubmit`
- **가입:** `btnSubmitFix`, `btnNormalFix`, `btnToggle`, `btnBasicFix`
- **박스:** `ec-base-box typeThin`

### Myshop
- **버튼:** `btnNormal`, `btnSubmit`, `btnSubmitFix`, `btnEm`
- **탭:** order/mileage/like-it `ec-base-tab`
- **카드:** `ec-base-box`, `ec-base-card`(미스타일)

### Board
- **버튼:** `btnSubmitFix sizeS`, `btnNormalFix sizeS`, `btnBasicFix sizeS`, `btnEm sizeL`
- **테이블:** `ec-base-table typeList/typeWrite`

---

## 5. 중복·유사 UI 목록 (통합 대상)

| # | 유형 | 현재 변형 | 통합 목표 클래스 |
|---|------|-----------|------------------|
| 1 | Primary CTA | `btnSubmit`, `btnSubmitFix`, `lb-hero-btn`, `lb-timesale-btn` | `.btn.btn-primary` (+ 기존 클래스 유지) |
| 2 | Secondary | `btnNormal`, `btnNormalFix`, `lb-grid-btn-outline` | `.btn.btn-secondary` / `.btn-outline` |
| 3 | Ghost/Link | `btnLink`, `lb-section-more` | `.btn-text` |
| 4 | Destructive | `btnEm`, `btnEmFix`, 삭제 아이콘 버튼 | `.btn.btn-danger` |
| 5 | Icon | `lb-floating-btn`, `lb-util-icon`, `icoDelete` | `.btn-icon` |
| 6 | Tab | `ec-base-tab` 3종 오버라이드 | `.ui-tab` (래핑 또는 병행) |
| 7 | Badge promo | `lb-badge`, `lb-feature-badge`, `.badge` | `.ui-badge` |
| 8 | Card | `ec-base-box`, `lb-product-card`, `lb-feature-box` | `.ui-card` |
| 9 | Input | global input + module overrides | `.form-input` |
| 10 | Modal | `ec-base-layer`, `lb-fullmenu` | `.ui-modal` (레이어는 점진적) |

---

## 6. 권장 적용 전략 (2단계 — **2026-06-24 적용 완료**)

1. ✅ **`layout.html`**: `design-tokens.css` + `components.css` 연결
2. ✅ **`product-detail.css` global 로드 제거** → `product/detail.html` `@css`로 한정
3. ✅ Cafe24 클래스 + `.btn` 병행 (구매 funnel HTML)
4. 🔄 `basket.css` / `product-detail.css` 색상 → CSS 변수 (일부 완료)
5. ⏳ `layout.css` / `leblanc.css` 헤더·네비 중복 제거 (Phase 3)

---

## 7. 신규 디자인 시스템 파일

| 파일 | 경로 | 상태 |
|------|------|------|
| Design tokens | `skin/css/design-tokens.css` | ✅ layout 연결됨 |
| Components | `skin/css/components.css` | ✅ layout 연결 + Cafe24 매핑 활성 |
| Changelog | `docs/UI_SYSTEM_CHANGELOG.md` | ✅ Phase 2 기록 |

**Phase 3 예정**

- [ ] board / myshop HTML `.btn` 추가
- [ ] `ec-base-button.css` 직접 수정 (필요 시)
- [ ] `layout.css` / `leblanc.css` dedupe
- [ ] marketing `lb-hero-btn` DS 정렬

---

## 8. Cafe24 보존 체크리스트 (적용 시 필수)

- [ ] `module="..."` 속성 변경 금지
- [ ] `{$변수}`, `<!--@반복-->`, `<!--@css-->`, `<!--@js-->` 유지
- [ ] `onclick="{$action_*}"` 등 JS 바인딩 클래스 유지
- [ ] `btnSubmit` 등 Cafe24 JS가 참조하는 클래스명 유지 (공통 클래스 **추가**만)
- [ ] `!important` 사용 금지 (components.css 준수)

---

## 9. 우선순위 (적용 순서 제안)

1. **P0** — global `product-detail.css` 스코프 분리
2. **P1** — 구매 funnel: detail → basket → orderform 버튼
3. **P2** — member login/join, myshop
4. **P3** — board, 기타 myshop
5. **P4** — marketing `lb-*` CTA를 `.btn-primary` / `.btn-outline`에 visual align
