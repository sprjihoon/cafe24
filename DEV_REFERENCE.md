# 카페24 스킨 개발 참조 문서

> **최종 업데이트**: 2026-06-24  
> **목적**: 카페24 LE BLANC 스킨 개발·판매를 위한 환경 구성, 작업 방식, 트러블슈팅 기록  
> **쇼핑몰**: https://ecudemo394315.cafe24.com/  
> **관리자**: https://ecudemo394315.cafe24.com/disp/admin/shop1/main/dashboard

---

## 목차
1. [현재 개발 현황](#1-현재-개발-현황)
2. [프로젝트 구조](#2-프로젝트-구조)
3. [FTP 접속 정보](#3-ftp-접속-정보)
4. [카페24 서버 구조 이해](#4-카페24-서버-구조-이해)
5. [개발 워크플로우](#5-개발-워크플로우)
6. [카페24 템플릿 문법](#6-카페24-템플릿-문법)
7. [CSS 적용 방식 (핵심 주의사항)](#7-css-적용-방식-핵심-주의사항)
8. [HTML 템플릿 캐시 우회 방법](#8-html-템플릿-캐시-우회-방법)
9. [FTP MCP 서버 사용법](#9-ftp-mcp-서버-사용법)
10. [파일별 역할 정리](#10-파일별-역할-정리)
11. [layout.html 현재 구조 분석](#11-layouthml-현재-구조-분석)
12. [Layout_category 모듈 올바른 사용법](#12-layout_category-모듈-올바른-사용법)
13. [ec-base-* 클래스 CSS 타겟팅](#13-ec-base--클래스-css-타겟팅)
14. [스킨 호환성 자동 진단 도구 (debug.js)](#14-스킨-호환성-자동-진단-도구-debugjs)
15. [스킨 판매 등록 프로세스](#15-스킨-판매-등록-프로세스)
16. [카페24 Web Components (외부 채널 확장)](#16-카페24-web-components-외부-채널-확장)
17. [개발 참조 링크 모음](#17-개발-참조-링크-모음)
18. [트러블슈팅 기록](#18-트러블슈팅-기록)

---

## 1. 현재 개발 현황

### 완료된 작업 (2026-06-24 기준)

| 작업 | 상태 | 파일 |
|------|------|------|
| FTP MCP 서버 구축 | ✅ 완료 | `ftp-mcp-server/index.js` |
| FTP 연결 및 경로 설정 | ✅ 완료 | `watcher.config.json` |
| LE BLANC 마퀴 배너 | ✅ 완료 | `layout.html`, `layout.css` |
| ATELIER N. 모바일 스킨 (메인·레이아웃·CSS) | ✅ 완료 | `mobile/` → `/sde_design/mobile/` |
| LE BLANC 헤더 (로고, 아이콘) | ✅ 완료 | `layout.html`, `layout.css` |
| LE BLANC 네비게이션 | ✅ 완료 (하드코딩) | `layout.html` |
| 사이드바 숨김 | ✅ 완료 | `layout.css` |
| 쇼핑몰명 동적 주입 (JS) | ✅ 완료 | `basic.js` - `fixMallName()` |
| 서브페이지 CSS (상품/주문/회원/게시판) | ✅ 완료 | `layout.css` |
| nav 3배 중복 수정 | ✅ 완료 | `layout.html` - module 속성 제거 |
| 스킨 호환성 진단 도구 | ✅ 완료 | `js/debug.js` |
| 개발 참조 문서 | ✅ 완료 | `DEV_REFERENCE.md` |

### 남은 작업 (우선순위 순)

| 작업 | 우선순위 | 비고 |
|------|----------|------|
| Layout_category 모듈로 nav 재구성 | 🔴 높음 | 현재 카테고리 번호 하드코딩 상태 |
| 모바일 스킨 Smart Design 저장 | 🟡 중간 | HTML 변경 반영 시 관리자 저장 필요 |
| 장바구니/주문/결제 페이지 스타일 | 🟡 중간 | 서브페이지 완성도 |
| 푸터 디자인 개선 | 🟡 중간 | LE BLANC 스타일 통일 |
| 메인 이미지 배너 슬라이더 | 🟡 중간 | 첫인상 중요 |
| 파트너 등록 및 스킨 패키징 | 🟢 나중 | 개발 완료 후 |

---

## 2. 프로젝트 구조

```
C:\Users\one\cafe24d\
├── DEV_REFERENCE.md              ← 이 문서
├── ftp-mcp-server\               ← Cursor AI가 FTP를 제어하는 MCP 서버
│   ├── index.js                  ← MCP 서버 메인 (FTP 도구 제공)
│   ├── watcher.js                ← 파일 저장 시 자동 업로드 (개발용)
│   ├── watcher.config.json       ← FTP 접속 설정 (비밀번호 포함, git 제외)
│   ├── watcher.config.example.json
│   ├── package.json
│   └── README.md
└── skin\                         ← PC 스킨 (로컬)
    └── layout\basic\ ...
└── mobile\                       ← 모바일 스킨 (로컬)
    ├── index.html                ← 메인 (main.html 레이아웃)
    ├── layout\basic\
    │   ├── main.html             ← 메인 전용 레이아웃 ★
    │   ├── layout.html           ← 서브페이지 레이아웃 ★
    │   ├── footer.html, navigation.html, sidebar.html, search.html
    │   ├── css\leblanc.css, lb-mobile.css
    │   └── js\basic.js, product-copy.js
    └── product\list.html, detail.html
```

### FTP 서버 경로 매핑

| 로컬 경로 | 서버 경로 |
|-----------|-----------|
| `skin/` | `/sde_design/base/` |
| `skin/layout/basic/` | `/sde_design/base/layout/basic/` |
| `mobile/` | `/sde_design/mobile/` |
| `mobile/layout/basic/` | `/sde_design/mobile/layout/basic/` |

---

## 3. FTP 접속 정보

| 항목 | 값 |
|------|-----|
| 호스트 | `ftp.ecudemo394315.cafe24.com` |
| 사용자 | `ecudemo394315` |
| 포트 | `21` |
| 보안 | 없음 (plain FTP) |
| 비밀번호 | `watcher.config.json` 참조 |

> **주의**: FTP 비밀번호는 카페24 관리자 로그인 비밀번호와 다름.  
> 관리자 → 쇼핑몰 설정 → FTP 비밀번호에서 별도 설정.

---

## 4. 카페24 서버 구조 이해

### FTP 루트 디렉터리 구조

```
/ (FTP 루트)
├── sde_design/          ← 스마트디자인 스킨 소스 ★ 우리가 작업하는 곳
│   └── base/
│       ├── layout/basic/   ← 레이아웃 템플릿
│       ├── product/        ← 상품 관련 페이지
│       ├── order/          ← 주문 관련 페이지
│       ├── member/         ← 회원 관련 페이지
│       ├── myshop/         ← 마이쇼핑
│       ├── board/          ← 게시판
│       └── css/, js/       ← 공통 모듈 CSS/JS
├── web/                 ← 이미지, 업로드 파일
└── w3c/                 ← 기타
```

### 핵심: 소스 vs 캐시 두 레이어

```
[FTP로 편집] /sde_design/base/layout.html
                    ↓ 스마트디자인 에디터 "저장" 클릭 시 컴파일
[실제 서비스] 컴파일된 캐시 HTML
```

| 파일 종류 | FTP 업로드 후 즉시 반영? | 이유 |
|-----------|--------------------------|------|
| CSS 파일 (기존) | ✅ 즉시 | 옵티마이저가 mtime 감지 |
| JS 파일 (기존) | ✅ 즉시 | 동일 |
| HTML (layout.html) | ❌ 캐시 유지 | 스마트디자인 에디터 저장 필요 |
| 새 CSS 파일 추가 | ❌ | `<!--@css-->` 재컴파일 필요 |

---

## 5. 개발 워크플로우

### A. CSS/JS 수정 (즉시 반영)
```
로컬에서 layout.css 또는 basic.js 수정
    → FTP 업로드 (MCP 도구 또는 watcher.js)
    → 브라우저 강제새로고침 (Ctrl+Shift+R)
    → 라이브 사이트 반영 ✓
```

### B. HTML 구조 수정
```
방법 1 — 스마트디자인 에디터 (정식):
    관리자 → 디자인 관리 → 스마트디자인 에디터
    → layout.html 열기 → 수정 → 저장
    → 컴파일 캐시 갱신 → 라이브 반영 ✓

방법 2 — JS DOM 주입 (우회, 캐시 문제 시):
    basic.js에 JavaScript로 HTML 동적 생성·삽입
    → FTP 업로드 → 즉시 반영 ✓
```

### C. watcher.js 자동 업로드 (권장)
```bash
cd C:\Users\one\cafe24d\ftp-mcp-server
node watcher.js

# 이후 skin\ 폴더 내 파일 저장 시 자동 FTP 업로드
# Ctrl+C 로 종료
```

### D. 진단 도구 실행 (문제 발생 시)
```javascript
// 브라우저 F12 콘솔에서
cafe24Debug()   // debug.js 로드 후 사용 가능
```

---

## 6. 카페24 템플릿 문법

### CSS/JS 포함 디렉티브
```html
<!--@css(/layout/basic/css/layout.css)-->
<!--@js(/layout/basic/js/basic.js)-->
```
> **주의**: 새 파일을 추가해서 이 태그를 넣어도, 스마트디자인 에디터 저장 전까지 번들에 포함 안 됨.

### 주요 변수

| 변수 | 설명 | 사용 가능 범위 |
|------|------|----------------|
| `{$mall_name}` | 쇼핑몰 이름 | 모듈 내부 (밖에선 미처리) |
| `{$skin_path}` | 스킨 루트 경로 | 전역 |
| `{$shop_no}` | 쇼핑몰 번호 | 전역 |
| `{$member_id}` | 로그인 회원 ID | 회원 관련 모듈 내 |
| `{$basket_count}` | 장바구니 수량 | `Layout_orderBasketCount` 모듈 내 |
| `{$name}` | 카테고리명 | `Layout_category` 모듈 내 |
| `{$param}` | `?cate_no=숫자` | `Layout_category` 모듈 내 |

> **{$mall_name} 미처리 문제**: 모듈 컨텍스트 밖(`<a class="lb-logo">`)에서 사용 시 리터럴 출력됨.  
> → 해결: `basic.js`의 `fixMallName()` 함수가 DOM에서 실제 이름을 읽어 자동 주입.

### 자주 쓰는 모듈 선언

```html
<!-- 카테고리 목록 (동적) -->
<nav id="category" module="Layout_category">
  <!--@css(/css/module/layout/category.css)-->
  <!--@js(/js/module/layout/category.js)-->
  <ul>
    <li><a href="/product/list.html{$param}">{$name_or_img_tag}</a></li>
  </ul>
</nav>

<!-- 장바구니 수량 -->
<span module="Layout_orderBasketCount">
  <!--@css(/css/module/layout/orderBasketcount.css)-->
  {$basket_count}
</span>

<!-- 로그인 상태에 따라 표시 -->
<div module="Layout_stateLogon">   <!-- 로그인 시 -->
<div module="Layout_statelogoff">  <!-- 비로그인 시 -->

<!-- 로고 (mall_name 처리됨) -->
<h1 module="Layout_LogoTop">
  <a href="/index.html">{$mall_name}</a>
</h1>
```

### 스마트디자인 에디터 자동완성 단축키
- `module="` 입력 후 **Ctrl+Space** → 사용 가능한 모듈명 목록
- `{$` 입력 후 **Ctrl+Space** → 해당 모듈 사용 가능 변수 목록

---

## 7. CSS 적용 방식 (핵심 주의사항)

### 방법별 즉시 반영 여부

| 방법 | 즉시 반영 | 비고 |
|------|-----------|------|
| 기존 CSS 파일 수정 후 FTP | ✅ | `layout.css`, `common.css` 등 |
| 새 CSS 파일 추가 + `<!--@css-->` | ❌ | 에디터 저장 필요 |
| `<style>` 태그 직접 삽입 | ❌ | HTML 캐시 문제 |
| JS에서 스타일 주입 | ✅ | `basic.js`에 추가하면 됨 |

### 커스텀 CSS 추가 규칙
```
모든 LE BLANC 커스텀 스타일 → layout.css 끝에 추가 → FTP 업로드
```

### CSS 우선순위 관리
```css
/* 카페24 기본 스타일을 덮어쓸 때 */
.xans-product-list .ec-base-product .prdList { ... !important; }

/* 서브페이지별 타겟팅 */
body.xans-product-list   { ... }   /* 상품 목록 페이지만 */
body.xans-product-detail { ... }   /* 상품 상세 페이지만 */
body.xans-myshop         { ... }   /* 마이쇼핑 */
body.xans-member         { ... }   /* 회원 */
body.xans-order          { ... }   /* 주문 */
body.xans-board          { ... }   /* 게시판 */
```

---

## 8. HTML 템플릿 캐시 우회 방법

### 문제
카페24는 HTML 템플릿을 서버에서 컴파일·캐시. FTP 수정 → 에디터 저장 전까지 미반영.

### 해결: basic.js에 DOM 주입 패턴

```javascript
(function() {
  function init() {
    // 1. 이미 존재하면 중복 삽입 방지
    if (document.getElementById('my-element')) return;

    // 2. 동적 생성
    var el = document.createElement('div');
    el.id = 'my-element';
    el.innerHTML = '<p>동적으로 삽입된 내용</p>';

    // 3. 원하는 위치에 삽입
    var header = document.getElementById('header');
    if (header) header.parentNode.insertBefore(el, header);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

### 현재 basic.js에 구현된 함수들

| 함수 | 역할 |
|------|------|
| `fixMallName()` | `.lb-logo`의 `{$mall_name}` 미처리 → 실제 쇼핑몰명으로 교체 |
| `ensureMarquee()` | 마퀴 배너 없을 때 fallback 삽입 (중복 방지) |
| `ensureHeader()` | `.lb-header` 없을 때 fallback 헤더 주입 |
| `fixBreadcrumb()` | `.path` 탐색경로 스타일 보정 |

---

## 9. FTP MCP 서버 사용법

Cursor AI가 대화 중 FTP를 직접 제어하는 MCP 서버.

### 설정 위치
```
C:\Users\one\.cursor\mcp.json   ← cafe24-ftp 서버 등록됨
C:\Users\one\cafe24d\ftp-mcp-server\watcher.config.json   ← FTP 자격증명
```

### 활성화 확인
Cursor → `Ctrl+Shift+J` → MCP 탭 → `cafe24-ftp` 토글 ON

### 사용 가능한 도구

| 도구 | 설명 |
|------|------|
| `ftp_connect` | FTP 연결 |
| `ftp_disconnect` | 연결 해제 |
| `ftp_list` | 디렉터리 목록 |
| `ftp_upload` | 파일 업로드 |
| `ftp_download` | 파일 다운로드 |
| `ftp_delete` | 파일 삭제 |
| `ftp_mkdir` | 디렉터리 생성 |
| `ftp_rename` | 파일명 변경 |
| `ftp_sync_folder` | 폴더 전체 동기화 |
| `ftp_diff` | 로컬↔서버 파일 비교 |
| `ftp_package_skin` | 스킨 ZIP 패키징 |
| `ftp_version_backup` | 서버 파일 백업 |
| `ftp_status` | 현재 연결 상태 |

---

## 10. 파일별 역할 정리

### ★ 주요 수정 파일

| 파일 | 역할 | 수정 방법 | 반영 속도 |
|------|------|-----------|-----------|
| `layout/basic/layout.html` | 전체 레이아웃 HTML 구조 | 스마트디자인 에디터 저장 | 저장 즉시 |
| `layout/basic/css/layout.css` | LE BLANC 커스텀 CSS 전체 | FTP 업로드 | ✅ 즉시 |
| `layout/basic/js/basic.js` | DOM 주입 + 초기화 JS | FTP 업로드 | ✅ 즉시 |
| `layout/basic/css/leblanc.css` | LE BLANC 보조 CSS | FTP 업로드 | ✅ 즉시 |
| `layout/basic/js/debug.js` | 진단 도구 (개발 전용) | FTP 업로드 | ✅ 즉시 |

### 수정 금지 파일

| 파일 | 이유 |
|------|------|
| `ec-base-*.css` | 카페24 기본 컴포넌트, 업데이트 시 덮어써짐 |
| `/js/common.js` | 카페24 전역 공통 JS, 수정 시 기능 오동작 |
| `/css/module/**` | 각 모듈 전용 CSS, 모듈 업데이트 시 덮어써짐 |

---

## 11. layout.html 현재 구조 분석

```html
<head>
  <!--@css(common.css)-->       ← 공통 스타일
  <!--@css(layout.css)-->       ← LE BLANC 커스텀 CSS ★
  <!--@css(ec-base-*.css)-->    ← 카페24 기본 컴포넌트 (7개)
  <!--@css(leblanc.css)-->      ← LE BLANC 보조 CSS
  <!--@js(basic.js)-->          ← LE BLANC 초기화 JS ★
  <!--@js(common.js)-->         ← 카페24 공통 JS
</head>

<body>
  <!-- 1. 마퀴 배너 ★ (LE BLANC) -->
  <div id="marquee-banner"> ... </div>

  <!-- 2. 헤더 -->
  <div id="header">
    <div class="lb-header">           ← LE BLANC 헤더 ★
      <button class="lb-hamburger">   ← 햄버거 메뉴
      <a class="lb-logo">{$mall_name} ← 로고 (JS가 실명으로 교체)
      <div class="lb-icons">          ← 검색/로그인/장바구니 아이콘
        <span module="Layout_orderBasketCount">{$basket_count}</span>
      </div>
    </div>
  </div>

  <!-- 3. 네비게이션 ★ (하드코딩 - 추후 Layout_category로 교체 예정) -->
  <nav id="lb-nav">
    <a href="/product/list.html?cate_no=all">전체보기</a>
    ...카테고리 링크들...
  </nav>

  <!-- 4. 모듈 홀더 (숨겨진 div - mall_name 추출용) -->
  <div id="lb-module-holder" style="...visibility:hidden">
    <h1 module="Layout_LogoTop">  ← {$mall_name} 처리됨 → JS가 읽어서 로고에 주입
    ... 기타 원본 모듈들 ...
  </div>

  <!-- 5. 본문 -->
  <div id="wrap">
    <div id="container">
      <div id="contents">
        <!--@contents-->    ← 페이지별 내용 삽입
      </div>
      <div id="sidebar">  ← CSS로 숨김 (display:none)
        ... 사이드바 모듈들 ...
      </div>
    </div>
  </div>

  <!-- 6. 푸터 -->
  <div id="footer"> ... </div>
</body>
```

### 현재 네비게이션 카테고리 번호 (임시 하드코딩)

| 메뉴 | cate_no | 상태 |
|------|---------|------|
| 전체보기 | all | - |
| 신상품 | 24 | ⚠️ 실제 번호 확인 필요 |
| BEST | 25 | ⚠️ |
| 아우터 | 26 | ⚠️ |
| 상의 | 27 | ⚠️ |
| 하의 | 28 | ⚠️ |
| 슈즈&백 | 29 | ⚠️ |
| 액세서리 | 30 | ⚠️ |
| SALE | 31 | ⚠️ |

> 관리자 → 상품 → 상품분류 에서 실제 카테고리 번호 확인 후 수정 필요.

---

## 12. Layout_category 모듈 올바른 사용법

### 잘못된 방법 → nav 3배 중복 원인

```html
<!-- ❌ module을 내부 div에 적용 → 대/중/소분류 3벌 생성됨 -->
<nav id="lb-nav">
  <div class="lb-nav-inner" module="Layout_category">
    <a href="...">하드코딩 링크</a>  ← 모듈 출력으로 대체되어 3번 반복
  </div>
</nav>
```

### 올바른 방법 (공식 샘플 코드 기준)

```html
<!-- ✅ module은 최상위 요소에, 변수로 카테고리 동적 출력 -->
<nav id="lb-nav" module="Layout_category">
  <!--@css(/css/module/layout/category.css)-->
  <!--@js(/js/module/layout/category.js)-->
  <ul>
    <li><a href="/product/list.html{$param}">{$name_or_img_tag}</a></li>
    <li><a href="/product/list.html{$param}">{$name_or_img_tag}</a></li>
    <li><a href="/product/list.html{$param}">{$name_or_img_tag}</a></li>
  </ul>
</nav>
```

### Layout_category 변수 목록

| 변수 | 설명 |
|------|------|
| `{$name_or_img_tag}` | 카테고리명 또는 이미지 태그 (관리자 설정에 따라) |
| `{$name}` | 카테고리 텍스트명만 |
| `{$param}` | `?cate_no=숫자` 형태 파라미터 |
| `{$link_product_list}` | 카테고리 목록 링크 (쉬운주소 포함) |
| `{$cate_no}` | 카테고리 번호 |
| `{$link_product_list_sub}` | 중분류 링크 |

> **중분류 hover**: `/js/module/layout/category.js`가 담당.  
> 중분류 제거 시 CSS `display:none` 또는 JS `.show()` 로직 제거.

---

## 13. ec-base-* 클래스 CSS 타겟팅

카페24 모듈이 렌더링하는 HTML에 자동으로 붙는 표준 클래스. CSS 오버라이드 시 이 클래스를 타겟팅해야 정확히 적용됨.

### 상품 목록 구조

```css
.ec-base-product              /* 상품 목록 전체 컨테이너 */
.ec-base-product .prdList     /* ul — 상품 그리드 */
.ec-base-product li           /* 개별 상품 */
.ec-base-product .thumbnail   /* 이미지 영역 */
.ec-base-product .description /* 상품명/가격 영역 */
.ec-base-product .name        /* 상품명 */
.ec-base-product .price       /* 가격 */
```

### 테이블 (주문/회원/배송 정보)

```css
.ec-base-table                /* 테이블 컨테이너 */
.ec-base-table table          /* 실제 table 태그 */
.ec-base-table th             /* 헤더 셀 */
.ec-base-table td             /* 데이터 셀 */
```

### 버튼

```css
.ec-base-button               /* 버튼 그룹 래퍼 */
.ec-base-button .btnNormal    /* 일반 버튼 */
.ec-base-button .btnStrong    /* 강조 버튼 (구매하기 등) */
.ec-base-button .btnSubmit    /* 제출 버튼 */
.ec-base-button .sizeS        /* 작은 버튼 */
.ec-base-button .sizeL        /* 큰 버튼 */
```

### 기타

```css
.ec-base-box                  /* 박스 컨테이너 */
.ec-base-layer                /* 팝업/레이어 모달 */
.ec-base-tooltip              /* 툴팁 */
.ec-base-paginate             /* 페이지네이션 */
.ec-base-tab                  /* 탭 UI */
```

### 참조 링크
- PC 컴포넌트: https://developers.cafe24.com/design/front/component/pc/font (좌측 메뉴에서 각 항목 선택)
- Mobile 컴포넌트: https://developers.cafe24.com/design/front/component/mobile

---

## 14. 스킨 호환성 자동 진단 도구 (debug.js)

파일 위치: `skin/layout/basic/js/debug.js`

### 진단 항목 (10가지)

| 번호 | 항목 | 감지 방법 |
|------|------|-----------|
| 1 | 페이지 타입 | body 클래스에서 `xans-*` 자동 감지 |
| 2 | **미처리 변수** | `{$...}` 텍스트/속성값 전체 스캔 |
| 3 | **nav 중복 출력** | 링크 수 vs 고유 텍스트 수 비율 |
| 4 | 이미지 깨짐 | `img.complete`, `naturalWidth === 0` |
| 5 | CSS 로드 실패 | `stylesheet.sheet === null` |
| 6 | LB 커스텀 요소 | 마퀴/헤더/로고/nav/모듈홀더 유무 |
| 7 | ec-base-* 클래스 | 해당 페이지 사용 중인 클래스 목록 |
| 8 | 가로 오버플로 | `scrollWidth > clientWidth` |
| 9 | 뷰포트 메타태그 | 모바일 대응 확인 |
| 10 | 쇼핑몰명 처리 | 로고에 `{$` 남아있는지 |

### 사용법

**방법 1: 브라우저 콘솔 (F12)**
```javascript
// debug.js 내용 전체 붙여넣기 → 자동 실행
// 이후 재실행:
cafe24Debug()
```

**방법 2: 개발 중 임시 로드 (layout.html)**
```html
<!--@js(/layout/basic/js/debug.js)-->
<!-- ⚠️ 배포 전 반드시 제거 -->
```

**방법 3: 북마클릿 (브라우저 즐겨찾기 URL에 저장)**
```
javascript:(function(){var s=document.createElement('script');s.src='https://ecudemo394315.cafe24.com/js/debug.js?v='+Date.now();document.head.appendChild(s);})();
```

> **배포 금지**: 진단 도구는 개발 중에만 사용. `layout.html`에서 `<!--@js(...debug.js)-->` 제거 후 배포.

---

## 15. 스킨 판매 등록 프로세스

### 전체 순서

```
Step 1. 파트너 등록
   → https://developers.cafe24.com/design/front/design/settings
   → 사업자정보, 정산계좌 등록 (심사 있음)

Step 2. 스킨 완성
   → PC 스킨 + 모바일 스킨 모두 필요
   → 샘플쇼핑몰 세팅 (실제 상품 등록, 카테고리 구성)
   → 주요 페이지 전체 디자인 완성

Step 3. 디자인센터 테마 등록
   → https://developers.cafe24.com/design/front/design/guides/add
   → 스킨 ZIP 파일 + 미리보기 이미지 + 상품 설명 제출

Step 4. 심사
   → 기간: 서비스마다 다름 (통상 1~2주)
   → 통과 보장 없음

Step 5. 판매 시작
   → 카페24 디자인센터 노출
   → 수수료: 카페24와 파트너 간 별도 합의서로 결정
```

### 심사 탈락 주요 사유
- 등록 정보와 실제 상품 불일치
- 저작권 침해 (폰트, 이미지 라이선스)
- CS 민원 24시간 내 5건 이상

### 샘플쇼핑몰 필수 요건
- 실제 상품이 등록되어 있어야 함
- 메인, 상품목록, 상품상세, 장바구니, 주문 페이지 모두 디자인 완성
- 모바일 대응 필수

---

## 16. 카페24 Web Components (외부 채널 확장)

> **스킨 개발과 다른 독립 기능**: 카페24 쇼핑몰 밖의 외부 사이트(블로그, 커뮤니티 등)에 상품을 임베드할 때 사용.

### 제공 컴포넌트

| 컴포넌트 | 역할 |
|-----------|------|
| `cafe24-store` | 쇼핑몰 기본 정보 제공 (루트 컨텍스트) |
| `cafe24-context` | 상품 단건 데이터 컨텍스트 |
| `cafe24-list-context` | 상품 목록 데이터 |
| `cafe24-data` | 비동기 데이터 fetch |
| `cafe24-money` | 가격 포맷 출력 |
| `cafe24-media` | 상품 이미지/미디어 |
| `cafe24-cart` | 장바구니 담기 |
| `cafe24-variant-selector` | 상품 옵션 선택기 |

### 스킨 개발과의 차이

| 구분 | 스킨 (Smart Design) | Web Components |
|------|---------------------|----------------|
| 용도 | 카페24 쇼핑몰 자체 UI | 외부 사이트 임베드 |
| 파일 위치 | `/sde_design/base/` | 외부 HTML에 script 삽입 |
| 모듈 방식 | `module="모듈명"` 속성 | `<cafe24-cart>` 커스텀 태그 |
| 우선순위 | **스킨 판매 목표에 필수** | 향후 멀티채널 확장 시 고려 |

공식 문서: https://developers.cafe24.com/webcomponents/front/webcomponents

---

## 17. 개발 참조 링크 모음

### 스마트디자인 공식 문서

| 항목 | URL |
|------|-----|
| 개발자 문서 홈 | https://developers.cafe24.com |
| 스마트디자인 소개 | https://developers.cafe24.com/design/front/smart/sdsupport/basic |
| **PC 모듈 전체 목록** | https://sdsupport.cafe24.com/product/list.html?cate_no=61 |
| **모바일 모듈 전체 목록** | https://sdsupport.cafe24.com/product/list.html?cate_no=138 |
| Layout_category 모듈 상세 | https://sdsupport.cafe24.com/module/layout/category.html |
| Layout_category 속성 매뉴얼 PDF | http://img.echosting.cafe24.com/guide/cafe24_smartdesign_editorguide_attribute(layout_category).pdf |
| 스마트디자인 매뉴얼 PDF | https://img.echosting.cafe24.com/guide/cafe24_smartdesign_serviceguide_v2.pdf |

### 테마 컴포넌트 (ec-base-* CSS 클래스 레퍼런스)

| 컴포넌트 | URL |
|----------|-----|
| Font | https://developers.cafe24.com/design/front/component/pc/font |
| Grid / Margin / Align | https://developers.cafe24.com/design/front/component/pc/grid |
| Button | https://developers.cafe24.com/design/front/component/pc/button |
| Product | https://developers.cafe24.com/design/front/component/pc/product |
| Table | https://developers.cafe24.com/design/front/component/pc/table |
| Box | https://developers.cafe24.com/design/front/component/pc/box |
| Layer | https://developers.cafe24.com/design/front/component/pc/layer |
| Paginate | https://developers.cafe24.com/design/front/component/pc/paginate |
| Form | https://developers.cafe24.com/design/front/component/pc/form |
| Mobile 전체 | https://developers.cafe24.com/design/front/component/mobile |

### 스킨 판매 등록

| 항목 | URL |
|------|-----|
| 시작하기 | https://developers.cafe24.com/ko/design/front/design/getting-started |
| 파트너 등록 | https://developers.cafe24.com/design/front/design/settings |
| 테마 등록 | https://developers.cafe24.com/design/front/design/guides/add |
| 샘플쇼핑몰 규정 | https://developers.cafe24.com/design/front/design/guides/samplemall |
| 심사 안내 | https://developers.cafe24.com/design/front/design/review |
| 판매/운영정책 | https://developers.cafe24.com/design/front/design/operationpolicy |
| 카페24 디자인센터 | https://design.cafe24.com |

---

## 18. 트러블슈팅 기록

### FTP 로그인 실패 (530 Login incorrect)
- **원인**: 카페24 관리자 로그인 비밀번호 ≠ FTP 비밀번호
- **해결**: 관리자 → 쇼핑몰 설정 → FTP 비밀번호 별도 설정

### FTP 경로 오류 (450 No such file or directory)
- **원인**: `/web/skin/shop/1` 경로 시도 (구버전 경로)
- **해결**: 스마트디자인 스킨 경로는 `/sde_design/base/`

### CSS 수정이 반영 안 될 때
- 브라우저 강제새로고침: **Ctrl+Shift+R**
- 새 파일을 추가했다면 스마트디자인 에디터에서 저장 필요
- **해결책**: 기존 `layout.css`에 추가하면 즉시 반영됨

### HTML 수정이 반영 안 될 때
- **원인**: 카페24 HTML 템플릿 서버 캐시
- **해결 1**: 스마트디자인 에디터에서 `layout.html` 저장
- **해결 2**: `basic.js`에 JS DOM 주입 코드 추가 (즉시 반영)

### nav 3배 중복 출력 문제
- **원인**: `module="Layout_category"` 를 내부 `div`에 적용 → 대/중/소 분류 3벌 출력
- **해결**: `module` 속성을 최상위 요소에 달거나, 하드코딩 링크 사용 시 module 속성 완전 제거

### {$mall_name} 리터럴 출력 문제
- **원인**: 모듈 컨텍스트 밖에서 사용 시 카페24 서버가 처리 안 함
- **해결**: `basic.js`의 `fixMallName()` — `#lb-module-holder` 안의 실제 처리된 로고 텍스트를 읽어서 주입

### MCP 서버가 Cursor에서 안 보일 때
- Cursor 재시작 후 **Ctrl+Shift+J** → MCP 탭 → `cafe24-ftp` 토글 활성화 확인

---

*이 문서는 개발하면서 계속 업데이트합니다. 마지막 수정: 2026-06-24*
