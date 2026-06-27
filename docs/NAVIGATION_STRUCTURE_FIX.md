# 네비게이션 구조 수정 완료

## 수정 날짜
2026-06-26

## 문제점 분석

### 1. 잘못된 카테고리 중첩
- 각 `.lb-nav-item` 내부에 `module="Layout_category"`가 독립적으로 반복 사용됨
- 드롭다운에서 전체 대분류가 다시 반복 출력됨
- TOPS hover 시 TOPS 하위가 아닌 전체 카테고리가 표시됨

### 2. 중복된 닫기 버튼
- 햄버거 버튼(X로 변환)과 별도 닫기 버튼이 두 개 존재
- UX 혼란과 DOM 복잡도 증가

### 3. 내부 스크롤 문제
- nav 영역에 세로 스크롤이 발생
- 휠 이벤트가 페이지 스크롤 대신 nav 내부 스크롤로 작동

## 수정 내용

### 1. 네비게이션 구조 재설계

**수정 전:**
```html
<div class="lb-nav-center" module="Layout_category">
  <!-- depth=2: 2단계까지 표시 -->
  <div class="lb-nav-item">
    <a>{$name}</a>
    <div class="lb-dropdown-menu">
      <div module="Layout_category">
        <!-- 잘못: 전체 카테고리 다시 반복 -->
        <a>{$name}</a>
      </div>
    </div>
  </div>
</div>
```

**수정 후:**
```html
<div class="lb-nav-center" module="Layout_category">
  <!-- depth=1: 1단계 대분류만 -->
  <div class="lb-nav-item">
    <a>{$name}</a>
    <!-- 중첩 module: 현재 부모의 하위만 출력 -->
    <div class="lb-dropdown-menu">
      <div module="Layout_category">
        <!-- 올바름: 부모의 하위 카테고리만 -->
        <a>{$name}</a>
      </div>
    </div>
  </div>
</div>
```

### 2. 전체메뉴 단순화

**변경사항:**
- 닫기 버튼 제거 (햄버거 버튼만 사용)
- depth=1로 대분류만 출력
- 화면 전체 폭 배경, 내부 콘텐츠만 max-width 적용

**HTML 구조:**
```html
<div id="lb-fullmenu" class="lb-fullmenu">
  <div class="lb-fullmenu-backdrop"></div>
  <div class="lb-fullmenu-panel">
    <div class="lb-fullmenu-inner">
      <!-- max-width 적용 -->
      <div class="lb-fullmenu-container">
        <div class="lb-fullmenu-shop">
          <!-- 1단계 카테고리만 -->
        </div>
        <div class="lb-fullmenu-account">
          <!-- ACCOUNT 링크 -->
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3. CSS 수정

#### 네비게이션 영역
```css
.lb-nav-inner {
  overflow: visible;  /* auto/scroll 제거 */
  height: auto;
  max-height: none;
}

.lb-nav-item {
  position: relative;
  overflow: visible;
}
```

#### 드롭다운 메뉴
```css
.lb-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

/* 하위 카테고리가 없으면 드롭다운 숨김 */
.lb-nav-item:not(:has(.lb-dropdown-link)) .lb-dropdown-menu {
  display: none;
}
```

#### 전체메뉴 레이어
```css
.lb-fullmenu-backdrop {
  position: fixed;
  top: calc(var(--marquee-height) + var(--header-height) + var(--nav-height));
  /* 헤더는 오버레이되지 않음 */
  z-index: var(--z-backdrop, 800);
}

.lb-fullmenu-panel {
  width: 100%;  /* 전체 폭 */
  z-index: var(--z-fullmenu, 850);
}

.lb-fullmenu-inner {
  max-width: 1320px;  /* 내부 콘텐츠만 제한 */
  margin: 0 auto;
  padding: 40px 32px;
}
```

### 4. JavaScript 수정

**제거된 기능:**
- 닫기 버튼 이벤트 리스너
- `updateHeaderBottom()` 함수
- 스크롤/리사이즈 시 헤더 위치 추적
- nav 휠 스크롤 커스텀 핸들링

**유지된 기능:**
- 햄버거 버튼 토글
- 배경 클릭 시 닫기
- ESC 키로 닫기
- 메뉴 링크 클릭 시 닫기

### 5. z-index 계층 구조

```css
--z-backdrop:   800  /* 오버레이 (헤더 제외) */
--z-fullmenu:   850  /* 전체메뉴 패널 */
--z-nav:        10   /* 네비게이션 */
--z-header:     1000 /* 헤더 (항상 최상위) */
--z-hamburger:  1050 /* 햄버거 버튼 */
```

## 카페24 자동연동 유지

### Layout_category 모듈 사용
- **1단계 nav:** `module="Layout_category"` (depth=1)
- **2단계 드롭다운:** 중첩된 `module="Layout_category"` (부모의 하위만 자동 출력)
- **전체메뉴:** `module="Layout_category"` (depth=1)

### 자동 반영되는 항목
- 새 카테고리 추가/삭제
- 카테고리 이름 변경
- 카테고리 순서 변경
- 하위 카테고리 구조

## 테스트 체크리스트

### 데스크톱 (1024px 이상)

- [ ] 상단 nav에 1단계 대분류만 표시됨 (전체보기, TOPS, DRESSES, OUTERWEAR)
- [ ] TOPS hover 시 TOPS의 하위분류만 드롭다운으로 표시됨
- [ ] 하위분류가 없는 카테고리는 드롭다운이 열리지 않음
- [ ] 드롭다운이 nav 외부로 펼쳐지며 잘리지 않음
- [ ] nav 위에서 마우스 휠을 돌려도 nav 내부가 스크롤되지 않음
- [ ] 페이지 스크롤이 정상적으로 작동함
- [ ] 햄버거 버튼 클릭 시 전체메뉴 열림
- [ ] 전체메뉴 열릴 때 흰색 배경이 화면 전체 폭으로 표시됨
- [ ] 전체메뉴 콘텐츠는 중앙 정렬됨 (max-width 1320px)
- [ ] 헤더 로고와 유틸 메뉴가 오버레이로 가려지지 않음
- [ ] 햄버거 버튼이 X로 변환됨
- [ ] 닫기 버튼이 하나만 표시됨 (햄버거 = 닫기)
- [ ] 배경 클릭 시 전체메뉴 닫힘
- [ ] ESC 키로 전체메뉴 닫힘
- [ ] 메뉴 링크 클릭 시 전체메뉴 닫힘
- [ ] 스크롤 후 메뉴 열어도 헤더가 상단으로 튀지 않음

### 모바일 (768px 이하)

- [ ] nav는 가로 스와이프 가능
- [ ] 세로 스크롤은 nav 내부가 아닌 페이지 스크롤로 작동
- [ ] hover 드롭다운은 숨겨짐 (터치 기기에서 불필요)
- [ ] 햄버거 버튼으로 전체메뉴 접근
- [ ] 전체메뉴가 세로 배치로 표시됨
- [ ] 터치 스크롤이 부드럽게 작동함

## 예상 동작

### 시나리오 1: TOPS hover (하위분류 있음)
1. TOPS 위에 마우스 올림
2. KNIT, BLOUSE, SHIRT 등 TOPS의 하위분류만 드롭다운으로 표시
3. 다른 대분류(DRESSES, OUTERWEAR)는 표시되지 않음

### 시나리오 2: SALE hover (하위분류 없음)
1. SALE 위에 마우스 올림
2. 드롭다운이 열리지 않음 (하위분류가 없으므로)
3. 클릭 시 SALE 페이지로 이동

### 시나리오 3: 전체메뉴 열기
1. 햄버거 버튼 클릭
2. 햄버거 아이콘이 X로 변경
3. 전체메뉴 패널이 nav 아래에 슬라이드로 열림
4. 화면 전체가 흰색 배경으로 덮임
5. 헤더 로고와 유틸 메뉴는 선명하게 유지
6. 메뉴 콘텐츠는 중앙 정렬

## 파일 변경 목록

### 수정된 파일
1. `skin/layout/basic/layout.html` - 네비게이션 및 전체메뉴 구조
2. `skin/layout/basic/css/layout.css` - 네비게이션 및 전체메뉴 스타일
3. `skin/layout/basic/css/leblanc.css` - z-index 계층 구조
4. `skin/layout/basic/js/header.js` - 메뉴 동작 로직

### 주요 변경 사항
- HTML: 카테고리 중첩 구조 수정, 닫기 버튼 제거
- CSS: overflow 수정, z-index 재조정, 닫기 버튼 스타일 제거
- JS: 닫기 버튼 로직 제거, 스크롤 추적 제거

## 주의사항

1. **카페24 관리자 설정**
   - 카테고리 깊이는 최소 2단계 이상 설정 필요
   - 대분류와 중분류 구조 유지

2. **하위 카테고리 없는 경우**
   - CSS `:has()` 선택자로 자동 숨김 처리
   - 대부분의 모던 브라우저에서 지원

3. **이미지 업로드**
   - 드롭다운 이미지: `/web/upload/category/{$cate_no}.jpg`
   - 이미지가 없으면 자동 숨김 (onerror 처리)

## 호환성

- **CSS `:has()` 선택자:** Chrome 105+, Safari 15.4+, Firefox 121+
- 구형 브라우저에서는 하위 카테고리가 없어도 빈 드롭다운이 표시될 수 있음
- 필요시 JavaScript로 폴백 처리 가능

## 다음 단계

1. FTP 업로드 후 실제 카페24 환경에서 테스트
2. 각 카테고리 hover 동작 확인
3. 모바일 반응형 동작 확인
4. 카테고리 추가/삭제 시 자동 반영 확인
