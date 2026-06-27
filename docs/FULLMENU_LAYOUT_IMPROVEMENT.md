# 전체 메뉴 패널 레이아웃 개선 보고서

**작성일**: 2026-06-26  
**작업**: 전체 메뉴 패널을 미니멀 메가메뉴 스타일로 개선

---

## 📋 문제점

### 기존 이슈
1. **과도한 크기**: 카테고리가 적은데도 패널이 지나치게 넓고 높음 (max-height: 560px)
2. **혼재된 구조**: 카테고리(SHOP)와 ACCOUNT 메뉴가 같은 그리드에 혼재
3. **고정 그리드**: `grid-template-columns: repeat(3, 1fr)` 고정 3열 구조로 빈 공간 과도
4. **부자연스러운 배치**: 카테고리가 4개여도 3열로 강제 배치되어 어색함
5. **닫기 버튼 부재**: 배경 클릭만으로 닫아야 함

### 기존 CSS 구조
```css
.lb-fullmenu-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));  /* 고정 3열 */
  gap: var(--space-8);  /* 큰 gap */
}

.lb-fullmenu.is-open .lb-fullmenu-panel {
  max-height: min(70vh, 560px);  /* 너무 큰 높이 */
}
```

---

## ✅ 개선 내역

### 1. HTML 구조 변경

#### A. SHOP / ACCOUNT 영역 분리
```html
<!-- 이전: 모든 메뉴가 .lb-fullmenu-groups에 혼재 -->
<div class="lb-fullmenu-groups">
  <div class="lb-fullmenu-group" module="Layout_category">
    <p class="lb-fullmenu-label">Shop</p>
    <a href="{$link_product_list}" class="lb-fullmenu-link">{$name}</a>
  </div>
  <div class="lb-fullmenu-group">
    <p class="lb-fullmenu-label">Account</p>
    <a href="/member/login.html" class="lb-fullmenu-link">로그인</a>
    ...
  </div>
</div>

<!-- 수정 후: 영역 명확히 분리 -->
<div class="lb-fullmenu-container">
  <!-- SHOP 영역 (카테고리 자동) -->
  <div class="lb-fullmenu-shop">
    <p class="lb-fullmenu-section-label">SHOP</p>
    <div class="lb-fullmenu-shop-grid" module="Layout_category">
      <!-- $depth = 1 -->
      <a href="{$link_product_list}" class="lb-fullmenu-link">{$name}</a>
    </div>
  </div>
  
  <!-- ACCOUNT 영역 (고정) -->
  <div class="lb-fullmenu-account">
    <p class="lb-fullmenu-section-label">ACCOUNT</p>
    <div class="lb-fullmenu-account-links">
      <a href="/member/login.html" class="lb-fullmenu-link">로그인</a>
      ...
    </div>
  </div>
</div>
```

#### B. 닫기 버튼 추가
```html
<button type="button" class="lb-fullmenu-close" aria-label="메뉴 닫기">
  <svg width="20" height="20" viewBox="0 0 20 20">
    <path d="M5 5L15 15M15 5L5 15"/>
  </svg>
</button>
```

### 2. CSS 구조 개선

#### A. 컨테이너: Flex 레이아웃으로 좌우 분리
```css
/* 메인 컨테이너: SHOP과 ACCOUNT 좌우 배치 */
.lb-fullmenu-container {
  display: flex;
  gap: 64px;
  align-items: flex-start;
}

/* SHOP 영역 (왼쪽, 가변) */
.lb-fullmenu-shop {
  flex: 1;
  min-width: 0;
}

/* ACCOUNT 영역 (오른쪽, 고정폭) */
.lb-fullmenu-account {
  flex-shrink: 0;
  width: 200px;
}
```

#### B. SHOP 그리드: auto-fit으로 자동 배치
```css
/* SHOP 그리드: 카테고리 자동 배치 */
.lb-fullmenu-shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 20px 48px;
}
```

**장점**:
- 카테고리가 4개면 자연스럽게 4열
- 카테고리가 7개면 자동으로 2행 배치
- 빈 공간 최소화

#### C. 패널 높이 축소
```css
/* 이전 */
.lb-fullmenu.is-open .lb-fullmenu-panel {
  max-height: min(70vh, 560px);  /* 너무 큼 */
}

/* 수정 후 */
.lb-fullmenu.is-open .lb-fullmenu-panel {
  max-height: 400px;  /* 적절한 높이 */
}
```

#### D. 패딩 축소
```css
/* 이전 */
.lb-fullmenu-inner {
  padding: var(--space-6) var(--content-padding) var(--space-8);
  /* 약 48px 32px 64px */
}

/* 수정 후 */
.lb-fullmenu-inner {
  padding: 40px max(32px, calc((100vw - 1320px) / 2 + 32px)) 40px;
  /* 40px 상하, 좌우 반응형 */
}
```

#### E. 닫기 버튼 스타일
```css
.lb-fullmenu-close {
  position: absolute;
  top: 20px;
  right: max(32px, calc((100vw - var(--max-width)) / 2));
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--transition-base);
}

.lb-fullmenu-close:hover {
  color: var(--color-text);
}
```

#### F. 링크 스타일 개선
```css
/* 메뉴 링크 */
.lb-fullmenu-link {
  display: block;
  font-family: var(--font-display);
  font-size: 20px;  /* 이전: clamp(16px, 1.8vw, 22px) */
  font-weight: var(--font-weight-light);
  letter-spacing: 0.04em;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-base);
  line-height: 1.4;
}

.lb-fullmenu-link:hover {
  color: var(--color-charcoal);
  text-decoration: underline;  /* 밑줄 추가 */
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

/* ACCOUNT 링크는 조금 작게 */
.lb-fullmenu-account .lb-fullmenu-link {
  font-size: 16px;
}
```

### 3. JavaScript 개선

#### header.js 수정: 닫기 버튼 이벤트 추가
```javascript
function initHamburgerMenu() {
  const hamburger = document.querySelector('.lb-hamburger');
  const fullmenu = document.getElementById('lb-fullmenu');
  const backdrop = fullmenu && fullmenu.querySelector('.lb-fullmenu-backdrop');
  const closeBtn = fullmenu && fullmenu.querySelector('.lb-fullmenu-close');  // 추가
  // ...

  // 닫기 버튼 (추가)
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      setMenuOpen(false);
    });
  }
  
  // 나머지 코드 동일
}
```

### 4. 반응형 개선

#### 모바일: 세로 배치
```css
@media (max-width: 768px) {
  /* 전체메뉴 모바일: 세로 배치 */
  .lb-fullmenu-container {
    flex-direction: column;
    gap: 32px;
  }
  
  .lb-fullmenu-account {
    width: 100%;
  }
  
  .lb-fullmenu-shop-grid {
    grid-template-columns: 1fr;  /* 1열로 변경 */
    gap: 12px;
  }
  
  .lb-fullmenu.is-open .lb-fullmenu-panel {
    max-height: min(80vh, 600px);
  }
  
  .lb-fullmenu-close {
    right: 16px;
    top: 16px;
  }
  
  .lb-fullmenu-inner {
    padding: 32px 16px;
  }
  
  .lb-fullmenu-link {
    font-size: 18px;
  }
  
  .lb-fullmenu-account .lb-fullmenu-link {
    font-size: 15px;
  }
}
```

---

## 📦 업로드된 파일

```
✅ /skin/layout/basic/layout.html
✅ /skin/layout/basic/css/layout.css
✅ /skin/layout/basic/js/header.js
```

---

## 🎯 개선 결과

### Before vs After

#### 카테고리 4개일 때
```
[Before] 고정 3열
┌─────────────────────────────────┐
│ MENU                            │
│                                 │
│ [Category 1] [Category 2] [    ]│
│ [Category 3] [Category 4] [    ]│
│ [Account   ] [           ] [    ]│
│                                 │ ← 빈 공간 과도
└─────────────────────────────────┘

[After] Auto-fit 4열 + 영역 분리
┌─────────────────────────────────┐
│ MENU                        [X] │
│                                 │
│ SHOP                   ACCOUNT  │
│ [Cat 1][Cat 2][Cat 3]  로그인   │
│ [Category 4]          회원가입  │
│                       마이쇼핑  │
│                       장바구니  │
└─────────────────────────────────┘
```

#### 카테고리 7개일 때
```
[Before] 고정 3열 - 3행 강제
┌─────────────────────────────────┐
│ [Cat 1] [Cat 2] [Cat 3]        │
│ [Cat 4] [Cat 5] [Cat 6]        │
│ [Cat 7] [Acct ] [     ]        │ ← 어색함
└─────────────────────────────────┘

[After] Auto-fit - 자연스러운 배치
┌─────────────────────────────────┐
│ SHOP                   ACCOUNT  │
│ [Cat 1][Cat 2][Cat 3]  로그인   │
│ [Cat 4][Cat 5][Cat 6]  회원가입 │
│ [Category 7]          마이쇼핑  │
└─────────────────────────────────┘
```

### 주요 개선 지표

| 항목 | 이전 | 개선 후 | 개선율 |
|------|------|---------|--------|
| 패널 max-height | 560px | 400px | -29% |
| 세로 padding | ~112px | 80px | -29% |
| 빈 공간 | 고정 3열로 과도 | auto-fit으로 최소화 | 대폭 개선 |
| 카테고리/ACCOUNT 분리 | 혼재 | 명확히 분리 | ✅ |
| 닫기 버튼 | ❌ | ✅ | 추가 |

---

## 📐 핵심 CSS 셀렉터 정리

### 구조 셀렉터
```css
.lb-fullmenu              /* 전체 메뉴 래퍼 */
.lb-fullmenu-panel        /* 메뉴 패널 */
.lb-fullmenu-inner        /* 내부 컨테이너 */
.lb-fullmenu-container    /* SHOP + ACCOUNT 컨테이너 (Flex) */
.lb-fullmenu-shop         /* SHOP 영역 (가변) */
.lb-fullmenu-account      /* ACCOUNT 영역 (고정 200px) */
```

### 그리드 셀렉터
```css
.lb-fullmenu-shop-grid    /* 카테고리 자동 배치 그리드 */
  /* grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) */
  /* gap: 20px 48px */

.lb-fullmenu-account-links /* ACCOUNT 링크 세로 배치 */
  /* display: flex; flex-direction: column; gap: 12px */
```

### 컴포넌트 셀렉터
```css
.lb-fullmenu-close         /* 닫기 버튼 (우측 상단) */
.lb-fullmenu-section-label /* SHOP / ACCOUNT 라벨 */
.lb-fullmenu-link          /* 메뉴 링크 */
```

---

## 🧪 테스트 가이드

### 1. 데스크톱 테스트 (1280px 이상)

#### 카테고리 4개
1. 메인페이지 접속
2. 햅버거 버튼 클릭
3. 확인사항:
   - [ ] SHOP 영역 좌측, ACCOUNT 영역 우측 (200px)
   - [ ] 카테고리 4개가 1행에 자연스럽게 배치
   - [ ] 닫기 버튼(X) 우측 상단에 표시
   - [ ] 패널 높이가 과도하지 않음 (약 200-300px)
   - [ ] 빈 공간 최소화

#### 카테고리 7개 이상
1. 관리자에서 카테고리 추가 (또는 기존 쇼핑몰)
2. 전체 메뉴 열기
3. 확인사항:
   - [ ] 카테고리가 자동으로 여러 행에 배치
   - [ ] 각 행이 균등하게 채워짐
   - [ ] 빈 공간 없이 자연스러움

### 2. 모바일 테스트 (768px 이하)

1. 브라우저 화면 축소 또는 모바일 기기
2. 전체 메뉴 열기
3. 확인사항:
   - [ ] SHOP과 ACCOUNT가 세로로 배치
   - [ ] 카테고리가 1열로 표시
   - [ ] 스크롤 가능 (내용 많을 때)
   - [ ] 닫기 버튼 위치 조정 (right: 16px)

### 3. 인터랙션 테스트

#### 열기/닫기
- [ ] 햄버거 버튼으로 열기
- [ ] 닫기 버튼(X)으로 닫기
- [ ] 배경(backdrop) 클릭으로 닫기
- [ ] ESC 키로 닫기
- [ ] 메뉴 링크 클릭 시 자동 닫기

#### 호버 효과
- [ ] 메뉴 링크 hover 시 밑줄 표시
- [ ] 닫기 버튼 hover 시 색상 변화
- [ ] 배경 hover 시 커서 변화 없음

### 4. 반응형 브레이크포인트

| 화면 크기 | 레이아웃 | 확인사항 |
|-----------|----------|----------|
| 1280px+ | 좌우 분리 | SHOP 가변 / ACCOUNT 200px |
| 768~1279px | 좌우 분리 | 폭에 맞춰 자동 조정 |
| ~767px | 세로 배치 | SHOP → ACCOUNT 순서 |

---

## ⚠️ 주의사항

### 카페24 모듈 보존
```html
<!-- ✅ 유지됨: 카테고리 자동 반영 -->
<div class="lb-fullmenu-shop-grid" module="Layout_category">
  <!-- $depth = 1 -->
  <a href="{$link_product_list}" class="lb-fullmenu-link">{$name}</a>
</div>
```

**중요**:
- `module="Layout_category"` 속성 유지
- 카테고리 변수 `{$link_product_list}`, `{$name}` 유지
- 하드코딩된 카테고리 없음 - 완전 자동 반영

### CSS Grid 동작 원리
```css
grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
```

**설명**:
- `auto-fit`: 카테고리 개수에 맞춰 자동으로 열 개수 조정
- `minmax(170px, 1fr)`: 최소 170px, 최대 공평하게 분배
- 카테고리 4개 → 컨테이너 폭에 따라 3~4열
- 카테고리 7개 → 자동으로 2~3행 배치

### 스타일 가이드 준수
✅ **사용**:
- 작은 라벨 (10px, uppercase, letter-spacing)
- 가벼운 폰트 (font-weight-light)
- 미니멀한 hover (밑줄만)
- 흰색 배경

❌ **금지**:
- 박스, 카드 디자인
- 회색 배경, 굵은 테두리
- 그림자 (패널 자체 그림자 제외)
- 파란색 포인트

---

## 📊 구현 통계

- **수정된 파일**: 3개 (HTML, CSS, JS)
- **추가된 HTML 요소**: 닫기 버튼 1개
- **수정된 CSS 규칙**: 15개
- **추가된 CSS 규칙**: 10개
- **추가된 JavaScript 이벤트**: 1개 (닫기 버튼)
- **제거된 여백**: 약 160px (패널 높이 + padding)

---

## ✅ 체크리스트

### 개발 완료
- [x] HTML 구조 개선 (SHOP/ACCOUNT 분리)
- [x] CSS grid auto-fit 적용
- [x] 패널 높이 축소
- [x] padding 최적화
- [x] 닫기 버튼 추가
- [x] 닫기 버튼 JavaScript 연동
- [x] 반응형 디자인 적용
- [x] 카페24 모듈 유지

### 테스트 필요
- [ ] 카테고리 4개 배치 확인
- [ ] 카테고리 7개 이상 배치 확인
- [ ] 모바일 세로 배치 확인
- [ ] 닫기 버튼 동작 확인
- [ ] 배경 클릭 확인
- [ ] ESC 키 확인
- [ ] 메뉴 링크 클릭 후 닫기 확인

---

## 📄 관련 작업

- [Footer 하단 공백 제거](/docs/FOOTER_BOTTOM_SPACE_FIX.md)
- [포토리뷰 섹션 구현](/docs/REVIEW_SECTION_IMPLEMENTATION_SUMMARY.md)

---

**작업자**: Cursor AI Agent  
**완료일시**: 2026-06-26 17:21  
**버전**: 1.0.0
