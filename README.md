# ATELIER N - Cafe24 Premium Skin

## 프로젝트 개요

ATELIER N는 Cafe24 쇼핑몰을 위한 프리미엄 스킨으로, 모던하고 세련된 디자인과 고급스러운 사용자 경험을 제공합니다.

## 주요 특징

### 디자인
- **미니멀 & 모던**: 깔끔하고 현대적인 디자인 언어
- **타이포그래피**: Nanum Gothic 기반의 가독성 높은 폰트 시스템
- **컬러 시스템**: 블랙(`#1d1d1f`)과 화이트를 중심으로 한 모노톤 팔레트
- **반응형 디자인**: PC, 태블릿, 모바일 모두 최적화된 레이아웃

### 핵심 기능

#### 1. 메인 페이지
- **히어로 배너**: 전체 화면 슬라이더 + 영상 지원
- **카테고리 원형 아이콘**: 상품 이미지 삽입형 디스플레이
- **4-Square 박스 배너**: 정사각형 배너 4개 그리드
- **분할 배너 섹션**: 좌측 대형 슬라이더 + 우측 2x2 그리드
- **주간 베스트**: Swiper 기반 상품 슬라이더
- **신상품**: 4x3 그리드 레이아웃
- **타임세일**: 카운트다운 타이머 + 상품 그리드
- **포토 리뷰**: 고객 리뷰 이미지 슬라이더

#### 2. 상품 상세 페이지
- **2-컬럼 레이아웃**: 좌측 이미지 갤러리 + 우측 상품 정보
- **Sticky 이미지 갤러리**: 스크롤 시 고정되는 이미지 영역
- **Swiper 이미지 슬라이더**: 메인 이미지 + 썸네일 갤러리
- **커스텀 옵션 선택**: 컬러 칩 + 사이즈 버튼 UI
- **수량 조절**: +/- 버튼 인터페이스
- **Sticky 탭 메뉴**: 스크롤 시 고정 + 활성 탭 인디케이터
- **포토 리뷰 섹션**: 고객 리뷰 이미지 그리드

#### 3. 상품 리스트
- **호버 액션 아이콘**: 장바구니, 좋아요, 확대, 옵션 버튼
- **옵션 모달**: 사이드 슬라이드 형식의 옵션 선택 UI
- **라운드 코너**: 제품 이미지 상단 모서리 둥글게 처리

#### 4. 네비게이션
- **Sticky 헤더**: 스크롤 시 상단 고정
- **메가메뉴**: 카테고리 호버 시 하위 카테고리 + 이미지 표시
- **우측 유틸 메뉴**: 검색, 마이페이지, 장바구니 등 7개 아이콘

#### 5. 푸터
- **3-컬럼 레이아웃**: 회사 정보 + 고객센터 + 서비스 링크
- **소셜 미디어**: 인스타그램, 유튜브, 페이스북, 네이버 블로그 아이콘
- **고객센터**: 전화번호(32px 대형 표시) + 운영시간
- **반응형**: 모바일에서 1-컬럼으로 자동 전환

#### 6. 슬라이더 기능
- **마우스 드래그**: 슬라이드 드래그 앤 스와이프
- **마우스 스크롤**: 휠 스크롤로 슬라이드 이동
- **커스텀 페이지네이션**: 작은 원형 버튼 + 활성 시 길쭉한 형태
- **비디오 지원**: YouTube iframe + HTML5 video 임베드

## 기술 스택

### Frontend
- **HTML5**: Cafe24 템플릿 시스템 기반
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript (ES6+)**: 모던 자바스크립트
- **Swiper.js 11**: 슬라이더 라이브러리

### Tools
- **Git**: 버전 관리
- **FTP**: Cafe24 서버 배포
- **Node.js**: FTP 배포 자동화 스크립트

## 프로젝트 구조

```
cafe24d/
├── skin/                           # PC 스킨
│   ├── index.html                 # 메인 페이지
│   ├── layout/
│   │   └── basic/
│   │       ├── layout.html        # 전역 레이아웃
│   │       ├── css/
│   │       │   ├── layout.css     # 메인 CSS (4100+ lines)
│   │       │   ├── atelier.css    # ATELIER N 커스텀 스타일
│   │       │   └── widgets.css    # 위젯 스타일
│   │       └── js/
│   │           ├── basic.js       # 기본 스크립트
│   │           ├── header.js      # 헤더 & 메가메뉴
│   │           ├── sliders.js     # 슬라이더 초기화
│   │           ├── countdown.js   # 타임세일 카운트다운
│   │           ├── video.js       # 비디오 배너
│   │           ├── widgets.js     # 플로팅 위젯
│   │           └── product-icons.js # 상품 액션 아이콘
│   ├── product/
│   │   ├── detail.html            # 상품 상세 페이지
│   │   ├── product-detail.css     # 상세 페이지 전용 CSS
│   │   └── product-detail.js      # 상세 페이지 전용 JS
│   ├── member/
│   │   ├── login.html             # 로그인 (PC) — ATELIER N 브라운 팔레트
│   │   └── join.html              # 회원가입 (PC)
│   ├── web/upload/                # 이미지 에셋
│   └── config.xml                 # 스킨 설정
│
├── mobile/                         # 모바일 스킨
│   ├── index.html
│   ├── member/
│   │   ├── login.html             # 로그인 (Mobile) — UTF-8, ATELIER N 스타일
│   │   └── join.html              # 회원가입 (Mobile)
│   └── layout/basic/
│       ├── css/atelier-mobile.css
│       └── js/basic.js
│
├── ftp-mcp-server/                # FTP 배포 도구
│   ├── upload-mobile.js           # 배포 스크립트
│   └── watcher.config.json        # FTP 설정
│
└── demo-products/                 # 데모 상품 데이터
    └── products.json

```

## 설치 및 배포

---

### ⚠️ FTP 경로 매핑 — 반드시 준수

> **잘못된 경로로 배포 시 변경사항이 실제 사이트에 반영되지 않습니다.**  
> PC 스킨과 모바일 스킨은 완전히 별도의 경로로 분리되어 있습니다.
>
> **🚫 절대 금지 경로 (배포 시 사용하면 안 됨)**  
> `/web/`, `/web/member/`, `/www/` — 이 경로들은 스킨 소스가 아닌 컴파일된 출력 경로이며,  
> 여기에 업로드해도 실제 페이지에 전혀 반영되지 않음. (과거 반복 실수 경로)  
> **항상 `/sde_design/base/`(PC) 또는 `/sde_design/mobile/`(모바일) 하위 경로를 사용할 것.**

---

#### 전체 파일 경로 매핑표 (FTP 배포 시 이 표만 참고)

> **기본 규칙**: `skin/` → `/sde_design/base/` , `mobile/` → `/sde_design/mobile/`  
> ⚠️ **예외**: `skin/layout/basic/` 하위 파일만 `layout/basic/` 경로가 포함됨. 그 외 `skin/css/`, `skin/member/` 등은 그대로 치환.

---

##### 📁 PC — 공통 레이아웃 (모든 페이지에 영향)

| 로컬 파일 | FTP 경로 | 역할 |
|-----------|---------|------|
| `skin/layout/basic/layout.html` | `/sde_design/base/layout/basic/layout.html` | 헤더·푸터·GNB 공통 레이아웃 |
| `skin/layout/basic/css/common.css` | `/sde_design/base/layout/basic/css/common.css` | 전역 리셋·기본 스타일 |
| `skin/layout/basic/css/layout.css` | `/sde_design/base/layout/basic/css/layout.css` | 메인 레이아웃 구조 (128KB) |
| `skin/layout/basic/css/atelier.css` | `/sde_design/base/layout/basic/css/atelier.css` | ATELIER N 메인 커스텀 CSS |
| `skin/layout/basic/css/_new-navigation.css` | `/sde_design/base/layout/basic/css/_new-navigation.css` | PC GNB / 메가드롭메뉴 |
| `skin/layout/basic/css/atelier-nav.css` | `/sde_design/base/layout/basic/css/atelier-nav.css` | 네비게이션 서브 스타일 |
| `skin/layout/basic/css/ec-base-*.css` | `/sde_design/base/layout/basic/css/ec-base-*.css` | Cafe24 기본 컴포넌트 CSS |
| `skin/layout/basic/css/widgets.css` | `/sde_design/base/layout/basic/css/widgets.css` | 플로팅·위젯 스타일 |
| `skin/css/design-tokens.css` | `/sde_design/base/css/design-tokens.css` | ATELIER N 색상·토큰 변수 |
| `skin/css/components.css` | `/sde_design/base/css/components.css` | 공통 컴포넌트 스타일 |

> ⚠️ `skin/css/` 폴더는 `/sde_design/base/css/` (layout/basic 없음)

##### 📁 PC — 공통 JS (모든 페이지에 로드)

| 로컬 파일 | FTP 경로 | 역할 |
|-----------|---------|------|
| `skin/layout/basic/js/basic.js` | `/sde_design/base/layout/basic/js/basic.js` | Cafe24 기본 JS |
| `skin/layout/basic/js/common.js` | `/sde_design/base/layout/basic/js/common.js` | 공통 유틸리티 |
| `skin/layout/basic/js/header.js` | `/sde_design/base/layout/basic/js/header.js` | 헤더·햄버거·메가메뉴 |
| `skin/layout/basic/js/atelier-nav.js` | `/sde_design/base/layout/basic/js/atelier-nav.js` | GNB 네비게이션 동작 |
| `skin/layout/basic/js/sliders.js` | `/sde_design/base/layout/basic/js/sliders.js` | Swiper 슬라이더 |
| `skin/layout/basic/js/atelier-products.js` | `/sde_design/base/layout/basic/js/atelier-products.js` | 상품 카드 인터랙션 |
| `skin/layout/basic/js/countdown.js` | `/sde_design/base/layout/basic/js/countdown.js` | 타임세일 카운트다운 |
| `skin/layout/basic/js/video.js` | `/sde_design/base/layout/basic/js/video.js` | 영상 배너 |
| `skin/layout/basic/js/atelier-shorts.js` | `/sde_design/base/layout/basic/js/atelier-shorts.js` | ATELIER SHORTS 숏폼 |
| `skin/layout/basic/js/atelier-review-demo-data.js` | `/sde_design/base/layout/basic/js/atelier-review-demo-data.js` | 리뷰 데모 데이터 |

---

##### 📄 PC — 페이지별 HTML + 전용 CSS/JS

| 페이지 | 로컬 HTML | FTP HTML | 전용 CSS/JS (페이지 내 인라인 또는 별도 파일) |
|--------|-----------|---------|------|
| **메인** | `skin/index.html` | `/sde_design/base/index.html` | `layout.css` + `atelier.css` 공통 적용 |
| **로그인** | `skin/member/login.html` | `/sde_design/base/member/login.html` | HTML 내 `<style>` 인라인 (`.lb-login-page`) |
| **회원가입** | `skin/member/join.html` | `/sde_design/base/member/join.html` | HTML 내 `<style>` 인라인 (`.lb-join-page`) |
| **커뮤니티** | `skin/board/index.html` | `/sde_design/base/board/index.html` | HTML 내 `<style>` 인라인 (`.lb-board-container`) |
| **상품 목록** | `skin/product/list.html` | `/sde_design/base/product/list.html` | `ec-base-paginate.css` + 공통 CSS |
| **상품 상세** | `skin/product/detail.html` | `/sde_design/base/product/detail.html` | `skin/product/product-detail.css` + `product-detail.js` |
| **장바구니** | `skin/order/basket.html` | `/sde_design/base/order/basket.html` | `skin/order/basket.css` |
| **마이쇼핑** | `skin/myshop/index.html` | `/sde_design/base/myshop/index.html` | 공통 CSS 적용 |

> ⚠️ **상품 상세·장바구니의 전용 CSS**는 `layout/basic/css/`가 아닌 각 페이지 폴더 안에 있음:  
> `skin/product/product-detail.css` → `/sde_design/base/product/product-detail.css`  
> `skin/order/basket.css` → `/sde_design/base/order/basket.css`

---

##### 📱 모바일 — 공통 레이아웃

| 로컬 파일 | FTP 경로 | 역할 |
|-----------|---------|------|
| `mobile/layout/basic/layout.html` | `/sde_design/mobile/layout/basic/layout.html` | 모바일 헤더·푸터 공통 |
| `mobile/layout/basic/css/common.css` | `/sde_design/mobile/layout/basic/css/common.css` | 모바일 전역 리셋 |
| `mobile/layout/basic/css/layout.css` | `/sde_design/mobile/layout/basic/css/layout.css` | 모바일 레이아웃 구조 |
| `mobile/layout/basic/css/atelier.css` | `/sde_design/mobile/layout/basic/css/atelier.css` | 모바일 메인 커스텀 CSS |
| `mobile/layout/basic/css/atelier-mobile.css` | `/sde_design/mobile/layout/basic/css/atelier-mobile.css` | 모바일 전용 오버라이드 |
| `mobile/layout/basic/css/slideMenu.css` | `/sde_design/mobile/layout/basic/css/slideMenu.css` | 모바일 슬라이드 메뉴 |

##### 📱 모바일 — 페이지별

| 페이지 | 로컬 HTML | FTP HTML |
|--------|-----------|---------|
| **모바일 메인** | `mobile/index.html` | `/sde_design/mobile/index.html` |
| **모바일 로그인** | `mobile/member/login.html` | `/sde_design/mobile/member/login.html` |
| **모바일 회원가입** | `mobile/member/join.html` | `/sde_design/mobile/member/join.html` |
| **모바일 상품 상세** | `mobile/product/detail.html` | `/sde_design/mobile/product/detail.html` |
| **모바일 상품 상세 CSS** | `mobile/product/product-detail.css` | `/sde_design/mobile/product/product-detail.css` |

---

#### ❌ 과거 잘못 사용한 경로 (다시는 사용하지 말 것)

```
/web/member/login.html                    ❌  →  /sde_design/base/member/login.html              ✅
/web/member/join.html                     ❌  →  /sde_design/base/member/join.html                ✅
/sde_design/base/css/atelier.css          ❌  →  /sde_design/base/layout/basic/css/atelier.css   ✅
/sde_design/base/layout.html             ❌  →  /sde_design/base/layout/basic/layout.html        ✅
/sde_design/mobile/css/atelier-mobile.css     ❌  →  /sde_design/mobile/layout/basic/css/atelier-mobile.css ✅
/sde_design/base/js/header.js            ❌  →  /sde_design/base/layout/basic/js/header.js       ✅
/sde_design/base/js/atelier-review-demo-data.js ❌  →  /sde_design/base/layout/basic/js/atelier-review-demo-data.js ✅
```

> **핵심**: 레이아웃 CSS/JS는 반드시 `layout/basic/` 포함. 단, `skin/css/`·`skin/product/`·`skin/order/` 등 페이지 전용 파일은 해당 폴더 그대로 치환.

---

#### 🔍 페이지 요소별 담당 CSS 빠른 참고

어떤 요소를 수정할 때 어떤 파일을 열어야 하는지 한눈에 정리:

| 수정할 요소 | 담당 CSS 파일 (로컬) | FTP 경로 |
|-------------|-------------------|---------|
| **헤더 로고·상단 유틸 메뉴** | `skin/layout/basic/css/atelier.css` | `.../layout/basic/css/atelier.css` |
| **PC GNB 메뉴바 (상하 라인 포함)** | `skin/layout/basic/css/atelier.css` (`.lb-nav-inner`) | `.../layout/basic/css/atelier.css` |
| **PC GNB 드롭다운·메가메뉴** | `skin/layout/basic/css/_new-navigation.css` | `.../layout/basic/css/_new-navigation.css` |
| **PC GNB 링크 스타일·hover** | `skin/layout/basic/css/atelier-nav.css` | `.../layout/basic/css/atelier-nav.css` |
| **헤더·푸터 HTML 구조** | `skin/layout/basic/layout.html` | `.../layout/basic/layout.html` |
| **헤더 메가메뉴 동작 (JS)** | `skin/layout/basic/js/header.js` | `.../layout/basic/js/header.js` |
| **색상 변수 (--color-border 등)** | `skin/css/design-tokens.css` | `/sde_design/base/css/design-tokens.css` |
| **버튼·폼·공통 컴포넌트** | `skin/css/components.css` | `/sde_design/base/css/components.css` |
| **로그인 페이지** | `skin/member/login.html` (인라인 `<style>`) | `/sde_design/base/member/login.html` |
| **회원가입 페이지** | `skin/member/join.html` (인라인 `<style>`) | `/sde_design/base/member/join.html` |
| **커뮤니티/게시판** | `skin/board/index.html` (인라인 `<style>`) | `/sde_design/base/board/index.html` |
| **상품 목록 페이징** | `skin/layout/basic/css/ec-base-paginate.css` + `atelier.css` | `.../layout/basic/css/` |
| **상품 상세 페이지** | `skin/product/product-detail.css` | `/sde_design/base/product/product-detail.css` |
| **장바구니** | `skin/order/basket.css` | `/sde_design/base/order/basket.css` |
| **모바일 공통 스타일** | `mobile/layout/basic/css/atelier-mobile.css` | `/sde_design/mobile/layout/basic/css/atelier-mobile.css` |
| **모바일 로그인** | `mobile/member/login.html` (인라인) | `/sde_design/mobile/member/login.html` |
| **모바일 회원가입** | `mobile/member/join.html` (인라인) | `/sde_design/mobile/member/join.html` |
| **모바일 상품 상세** | `mobile/product/product-detail.css` | `/sde_design/mobile/product/product-detail.css` |

> 💡 **인라인 `<style>` 페이지**: 로그인·회원가입·게시판처럼 페이지 수가 적고 범위가 명확한 경우,  
> 별도 CSS 파일 없이 해당 HTML 파일 내 `<style>` 태그에 스타일을 작성합니다.  
> 수정 시 해당 HTML 파일만 배포하면 됩니다.

---

#### ✅ Node.js 배포 스크립트 예시

```javascript
const BASE  = '/sde_design/base';
const MOBILE = '/sde_design/mobile';

// 로컬 skin/ → FTP /sde_design/base/
await client.uploadFrom(stream, `${BASE}/member/login.html`);
await client.uploadFrom(stream, `${BASE}/member/join.html`);
await client.uploadFrom(stream, `${BASE}/layout/basic/css/atelier.css`);

// 로컬 mobile/ → FTP /sde_design/mobile/
await client.uploadFrom(stream, `${MOBILE}/member/login.html`);
await client.uploadFrom(stream, `${MOBILE}/layout/basic/css/atelier-mobile.css`);
```
await client.uploadFrom(stream, `${MOBILE}/css/atelier-mobile.css`);
// 모바일 HTML 배포
await client.uploadFrom(stream, `${MOBILE}/layout.html`);
```

#### FTP 접속 정보 (`.env`)

```
FTP_HOST=ftp.ecudemo394315.cafe24.com
FTP_USER=ecudemo394315
FTP_PASS=********
FTP_PORT=21
FTP_SKIN_PATH=/sde_design/base        ← PC 스킨 루트
FTP_MOBILE_PATH=/sde_design/mobile    ← 모바일 스킨 루트
STORE_URL=ecudemo394315.cafe24.com
```

> **실제 파일 경로** = `FTP_SKIN_PATH` + `/layout/basic/` + 파일명  
> CSS: `/sde_design/base/layout/basic/css/파일명.css`  
> HTML: `/sde_design/base/layout/basic/layout.html`

---

### 1. FTP 설정
`ftp-mcp-server/watcher.config.json` 파일에 Cafe24 FTP 정보 입력:

```json
{
  "ftp": {
    "host": "your-shop.cafe24.com",
    "user": "your-username",
    "password": "your-password"
  }
}
```

### 2. 파일 배포
```bash
cd ftp-mcp-server
node upload-mobile.js
```

### 3. Cafe24 관리자 설정
1. Cafe24 관리자 > 디자인 관리 > 스킨 관리
2. "ATELIER N" 스킨 선택 및 적용
3. 카테고리 이미지 업로드 (`/web/upload/category/`)
4. 배너 이미지 업로드 (`/web/upload/hero/`, `/web/upload/banner/`)

## 커스터마이징

### ATELIER N 컬러 팔레트 (공식)

> **PC + 모바일 모두 동일하게 적용.** 새 파일 작성 시 아래 색상만 사용할 것.

| 역할 | HEX | 사용처 |
|------|-----|--------|
| Primary Dark | `#2d2825` | 버튼 배경, 헤더, 활성 탭, 강조 텍스트 |
| Body Text | `#4a4440` | 본문 텍스트, 레이블 |
| Muted Text | `#9a8878` | 서브텍스트, placeholder, 탭 비활성 |
| Light Text | `#c4b8ae` | 구분선 텍스트, 비활성 |
| Accent Brown | `#6b5344` | 링크, 보조 버튼 텍스트 |
| Border Strong | `#e8ddd3` | 폼 하단선, 구분선 |
| Border Light | `#f0ebe5` | 카드 테두리, 섹션 구분 |
| Background Warm | `#faf8f5` | 카드 배경, 인풋 배경 |
| White | `#ffffff` | 페이지 배경 |
| Kakao Yellow | `#FEE500` | 카카오 버튼 전용 |
| Naver Green | `#03C75A` | 네이버 버튼 전용 |
| LINE Green | `#06C755` | LINE 버튼 전용 |

> **⚠️ `#1d1d1f` (뉴트럴 다크) 사용 금지** — ATELIER N은 `#2d2825` (웜 브라운 다크) 사용

```css
/* skin/layout/basic/css/tokens.css — CSS 변수 */
:root {
  --color-dark:      #2d2825;
  --color-body:      #4a4440;
  --color-muted:     #9a8878;
  --color-light:     #c4b8ae;
  --color-accent:    #6b5344;
  --color-border:    #e8ddd3;
  --color-border-lt: #f0ebe5;
  --color-bg-warm:   #faf8f5;
  --font-display:    'Cormorant Garamond', Georgia, serif;
  --font-body:       'Nanum Gothic', -apple-system, sans-serif;
}
```

### 컬러 변경 (레거시)
`skin/layout/basic/css/layout.css`에서 CSS 변수 수정:

```css
:root {
  --color-primary: #2d2825;   /* ← #1d1d1f 아님 주의 */
  --color-background: #ffffff;
  --color-border: #e8ddd3;
}
```

### 폰트 변경
`skin/layout/basic/css/layout.css`에서 폰트 패밀리 수정:

```css
body {
  font-family: 'Nanum Gothic', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 슬라이더 설정
`skin/layout/basic/js/sliders.js`에서 Swiper 옵션 조정:

```javascript
const heroSwiper = new Swiper('.lb-hero-swiper', {
  speed: 800,
  autoplay: { delay: 5000 },
  effect: 'fade'
});
```

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## 개발 현황

### Phase 1: 헤더 & 히어로 ✅ COMPLETED
- 이미지 로고
- 우측 유틸 메뉴 7개
- 네비게이션 11개
- 메인 히어로 전체 화면
- 영상 지원
- 플로팅 위젯

### Phase 2: 아이콘 메뉴 & 슬라이더 ✅ COMPLETED
- 아이콘 메뉴 7-8개
- WEEKLY BEST 슬라이더
- SHORTS 숏폼 영상 슬라이더

### Phase 3: 상품 그리드 & 타임세일 ✅ COMPLETED
- NEW ARRIVALS 4x3 그리드
- 타임세일 카운트다운 + 상품목록 4x2
- 추가 메인분류 1,2 (슬라이더 + 그리드)

### Phase 4: 배너 & SNS ✅ COMPLETED
- 영상 배너 (YouTube 임베드)
- 포토리뷰 슬라이더 5개
- 스크롤 효과 배너 (Parallax)
- SNS 피드 6x2 Instagram 연동

### Phase 5: 배너 & 푸터 ✅ COMPLETED
- 각종 배너들 (띠배너, 프로모션 3개, 하단 4개)
- 푸터 3-컬럼 레이아웃 개선

### Phase 6: 시스템 & 최적화 ✅ COMPLETED
- 관리 시스템 (config.xml)
- 모바일 반응형 전체 최적화
- 전체 테스트 및 디버깅

### Recent Updates (2026.06.25)
- ✅ 상품 상세 페이지 완전 재설계
- ✅ 전체 페이지 스타일 통일
- ✅ 푸터 3-컬럼 레이아웃 구현
- ✅ Sticky 탭 메뉴 구현
- ✅ 포토 리뷰 섹션 추가

### Updates (2026.06.26)
- 🔧 ATELIER SHORTS 초기 진입 재생 인덱스를 `START_INDEX = 2`(화면 3번) 기준으로 고정
- 🔧 ATELIER SHORTS 루프/카드 클릭 동작 유지하면서 상태 동기화 로직 정리
- 🔧 카드 상품 링크 배너 노출 조건 보완 (hover / focus-within / 활성 카드)
- 🔧 배포 경로 다중 반영 운영 절차 유지 (`/sde_design`, `/www`, `/ecudemo394315`)
- ✅ **네비게이션 구조 완전 재설계**: 카테고리 중첩 문제 해결, 전체 메뉴 패널 미니멀 메가메뉴 스타일로 개선
- ✅ **전체 메뉴(Full Menu) 패널 레이아웃 개선**: 콘텐츠 반응형 auto-fill 그리드, 닫기 버튼 추가
- ✅ **장바구니/주문서 페이지 UI 전면 개선**: `basket.css` 421줄 리디자인, 모바일 최적화
- ✅ **상품 상세 CSS 대규모 리팩토링**: `product-detail.css` 1318줄 전면 개편
- ✅ **상품 상세 JS 개선**: `product-detail.js` 50줄 신규 기능 추가

### Updates (2026.06.27)
- ✅ **메인페이지 포토리뷰 섹션 완성**: "고객이 직접 남긴 착용 후기" 카드 슬라이더 구현
  - 디자인센터 데모 모드 분기 처리 (`ATELIER_DEMO_MODE`)
  - 실제 리뷰 0개 시 빈 상태(empty state) UI 표시
  - 5개 샘플 데모 리뷰 데이터 포함 (`atelier-review-demo-data.js`)
  - 상품 연결 정보 표시 (`.lb-review-product`)
- ✅ **드롭다운 메뉴 완전 제거**: 모든 nav 드롭다운 및 backdrop overlay 삭제, 심플 플랫 네비게이션
- ✅ **모바일 네비게이션 backdrop 제거**: 터치 UX 개선
- 🔧 레이아웃 내 불필요한 스크립트 정리 (`atelier-nav-cleanup.js`)

### Updates (2026.07.01 v2) — 로그인·회원가입 페이지 전면 재설계

#### 작업 파일
| 파일 | FTP 경로 | 변경 내용 |
|------|---------|----------|
| `skin/member/login.html` | `/sde_design/base/member/login.html` | ATELIER N 브라운 팔레트 전면 적용 |
| `skin/member/join.html` | `/sde_design/base/member/join.html` | 기존 유지 (이미 완성) |
| `mobile/member/login.html` | `/sde_design/mobile/member/login.html` | UTF-8 인코딩 수정 + 모바일 스타일 전면 재작성 |
| `mobile/member/join.html` | `/sde_design/mobile/member/join.html` | UTF-8 인코딩 수정 + 모바일 회원가입 전면 재작성 |

### Updates (2026.07.01 v3) — 네비게이션 바 상하 라인 복원

#### 변경 사항
- `#lb-nav`의 `border-top`(전체 폭) 제거
- `.lb-nav-inner.atelier-nav-container`에 `border-top`/`border-bottom` 추가 → 콘텐츠 폭(~1217px)과 정확히 일치

#### 작업 파일
| 파일 | FTP 경로 |
|------|---------|
| `skin/layout/basic/css/atelier.css` | `/sde_design/base/layout/basic/css/atelier.css` |

---

## Cafe24 SmartDesign 템플릿 변수 — 로그인·회원가입

> **중요**: 아래 변수는 REST API가 아니라 Cafe24 SmartDesign **서버사이드 템플릿 변수**입니다.  
> `module="member_login"`, `module="member_join"` 태그가 있는 파일에서만 동작합니다.  
> REST API(`/api/v2/admin/...`)는 외부 앱 연동용 — 스킨 파일과는 무관합니다.

### ⚠️ 알려진 이슈 & 디버깅

#### 1. SNS 로그인 버튼이 안 보임
**원인**: `{$display_kakao|display}` 등의 변수는 관리자에서 SNS 앱 키를 등록해야만 버튼을 활성화합니다.

**판매용 스킨 정책**: `{$display_XXX|display}` 조건 클래스를 **버튼에서 완전히 제거** → 버튼 UI가 항상 표시됨.  
앱 키 미등록 시 `onclick="{$kakao_func_login}"`은 빈 함수로 렌더링되어 클릭해도 아무 동작 없음. 등록 후 즉시 활성화.

> **적용 완료**: `skin/member/login.html`, `mobile/member/login.html`, `mobile/member/join.html` 모두 `{$display_XXX|display}` 클래스 제거됨.

**구매자 안내 (SNS 설정)**:
> 관리자 → 상점관리 → 채널관리 → SNS 연동 설정 → SNS 로그인연동 관리  
> 각 플랫폼(카카오/네이버/구글 등)에서 앱 키 발급 후 등록

---

#### 2. 페이지가 깜빡하다가 다른 페이지로 이동
**원인**: Cafe24 `module="member_login"`은 **이미 로그인된 사용자가 방문하면 즉시 `$defaultReturnUrl`(`/index.html`)로 리디렉션**합니다. 관리자 계정으로 로그인된 상태에서 로그인 페이지를 방문하면 이 현상이 발생합니다.

**해결**: 반드시 **시크릿 창(로그아웃 상태)**에서 테스트

---

#### 3. CSS가 적용 안 됨 (`body.xans-member` 선택자 문제)
**원인**: `body.xans-member` 클래스는 Cafe24 버전에 따라 존재하지 않을 수 있습니다.

**해결**: `skin/member/login.html`에서 CSS 스코프를 `body.xans-member .lb-*` 대신 `.lb-login-page .lb-*`로 직접 사용합니다 (현재 적용 완료).

---

### 소셜 로그인 (`module="member_login"`)

| 변수 | 용도 |
|------|------|
| `{$kakao_func_login}` | onclick — 카카오 OAuth 팝업 트리거 |
| `{$naver_func_login}` | onclick — 네이버 OAuth 팝업 트리거 |
| `{$facebook_func_login}` | onclick — Facebook OAuth 팝업 트리거 |
| `{$apple_func_login}` | onclick — Apple OAuth 팝업 트리거 |
| `{$google_func_login}` | onclick — Google OAuth 팝업 트리거 |
| `{$line_func_login}` | onclick — LINE OAuth 팝업 트리거 |
| `{$yahoojp_func_login}` | onclick — Yahoo! Japan OAuth 팝업 트리거 |
| `{$display_kakao\|display}` | CSS class — 관리자 SNS 설정 OFF이면 `displaynone` 주입 |
| `{$display_naver\|display}` | CSS class — 동일 |
| `{$display_facebook\|display}` | CSS class — 동일 |
| `{$display_apple\|display}` | CSS class — 동일 |
| `{$display_google\|display}` | CSS class — 동일 |
| `{$display_line\|display}` | CSS class — 동일 |
| `{$display_yahoojp\|display}` | CSS class — 동일 |

> **활성화 조건**: 관리자 → 회원관리 → SNS로그인 설정에서 각 플랫폼 앱 키 등록 필요  
> 앱 키 미등록 시 Cafe24가 자동으로 `{$display_XXX|display}` → `displaynone` 처리

### 로그인 폼 변수

| 변수 | 용도 |
|------|------|
| `{$login_id_type_text}` | 아이디 입력 필드 placeholder 텍스트 (이메일/아이디 구분) |
| `{$form.member_id}` | 아이디 입력 필드 렌더링 (`<label class="id ePlaceholder">` 내부에 배치) |
| `{$form.member_passwd}` | 비밀번호 입력 필드 렌더링 (`<label class="password ePlaceholder">`) |
| `{$form.member_check_secret_connect}` | 보안접속 체크박스 |
| `{$form.member_check_save_id}` | 아이디 저장 체크박스 |
| `{$action_func_login}` | onclick — 로그인 폼 제출 (Ajax 처리 포함) |
| `{$returnUrl}` | 로그인 후 리다이렉트 URL |
| `{$display_nomember\|display}` | 비회원 구매 섹션 show/hide |
| `{$action_nomember_order}` | onclick — 비회원 주문 조회 제출 |

> **⚠️ 주의**: `btnLogin` 클래스는 Cafe24 JS가 의존하므로 반드시 유지  
> `ePlaceholder` 클래스도 Cafe24 placeholder 처리에 필수 (label→input 연동)

### 회원가입 폼 변수 (`module="member_join"`)

| 변수 | 용도 |
|------|------|
| `{$form.member_id}` | 아이디 입력 필드 |
| `{$form.passwd}` | 비밀번호 입력 필드 (강도 툴팁 포함) |
| `{$form.user_passwd_confirm}` | 비밀번호 확인 필드 |
| `{$form.name}` | 이름 입력 필드 |
| `{$form.email}` | 이메일 입력 필드 |
| `{$form.mobile}` | 휴대폰 번호 필드 |
| `{$form.address}` | 주소 필드 |
| `{$action_func_join}` | onclick — 회원가입 제출 |
| `{$sAgreeAllChecked}` | 전체 동의 체크박스 렌더링 |
| `{$sAgreeAllMsgTitle}` | 전체 동의 타이틀 텍스트 |
| `{$form.agree_service_check}` | 이용약관 동의 체크박스 |
| `{$form.agree_privacy_check}` | 개인정보 수집(필수) 체크박스 |
| `{$form.agree_privacy_optional_check}` | 개인정보 수집(선택) 체크박스 |
| `{$service_desc}` | 이용약관 내용 (Cafe24 관리자에서 설정한 텍스트) |
| `{$privacy_desc}` | 개인정보처리방침 내용 |
| `{$passwd_terms}` | 비밀번호 조건 안내 텍스트 |
| `{$display_member_type\|display}` | 회원구분 선택 show/hide |
| `{$display_addr\|display}` | 주소 필드 show/hide |
| `{$display_mobile\|display}` | 휴대폰 필드 show/hide |
| `{$display_marketing\|display}` | 마케팅 수신 동의 show/hide |
| `{$idMsg_id}` | 아이디 중복확인 결과 span의 id |
| `{$pwConfirmMsg_id}` | 비밀번호 확인 결과 span의 id |

### CSS 클래스 주의사항

```css
/* Cafe24가 의존하는 클래스 — 임의 변경/제거 금지 */
.btnLogin         /* 로그인 버튼 — JS가 클릭 이벤트 바인딩 */
.ePlaceholder     /* placeholder label → input 연동 */
.btnSubmitFix     /* 회원가입 제출 버튼 */
.ec-base-table    /* 폼 테이블 구조 */
.agreeArea        /* 약관 섹션 컨테이너 */
.displaynone      /* Cafe24가 주입하는 숨김 클래스 */
```

---

### Updates (2026.07.01) — 메가 드롭다운 메뉴 전면 재설계

#### 메가 드롭메뉴 구조
- `#lb-fullmenu`는 `div#header > div.inner`의 **직접 자식** (nav 밖)으로 배치
  - `position: absolute` 컨테이닝 블록 = `div.inner` (`position: relative`)
  - `top`은 `header.js`의 `positionFullmenu()`가 **nav 바닥 픽셀**을 동적 계산해 주입 (`resize` 이벤트에서도 재계산)
  - `left: 0; width: 100%` → nav/inner와 동일한 너비·위치
- 표시 트리거: `#lb-fullmenu`에 `class="lb-fullmenu"` **필수** — `layout.css`의 `.lb-fullmenu.is-open .lb-fullmenu-panel` 규칙이 패널(opacity/max-height)을 제어함

#### 메가 드롭메뉴 4열 레이아웃

```
[ 1열: SHOP ]  [ 2열: STYLE ]  [ 3열: COLLECTION 카드 ]  [ 4열: 배너 + 유틸 ]
  Tops           Dresses          NEW (hero-1.jpg)          banner-1.jpg
  Bottoms        Outerwear        BEST (look-1.jpg)         텍스트 오버레이
                 Acc              SALE (promo-1.jpg)        로그인/마이쇼핑 링크
```

#### CSS 핵심 규칙 (`_new-navigation.css`)
| 선택자 | 역할 |
|--------|------|
| `#lb-fullmenu` | 닫힌 상태: `opacity:0; max-height:0; overflow:hidden; visibility:hidden` |
| `#lb-fullmenu.is-open` | 열린 상태: `opacity:1; max-height:600px; visibility:visible` (JS가 class 추가) |
| `.lb-fullmenu.is-open .lb-fullmenu-panel` | **layout.css** 가 패널 `opacity/max-height` 전환 — `lb-fullmenu` 클래스 없으면 패널이 영구 숨김! |
| `.atelier-fullmenu-inner` | `display: grid; grid-template-columns: 180px 210px 1fr 260px` |
| `.atelier-fullmenu-col` | 각 열 `background:#fff; padding:32px 28px; border-right:1px solid #f0ebe5` |
| `.atelier-fullmenu-card-img img` | `object-fit:cover; transition: transform 0.4s` — 호버 시 1.06배 줌인 |
| `.atelier-fullmenu-banner-bg` | `background-image` + `::after` 어두운 오버레이 |

#### 이미지 경로 (FTP: `/web/upload/`)
| 위치 | 로컬 경로 | FTP 경로 |
|------|-----------|---------|
| 카드 NEW | `skin/web/upload/hero/hero-1.jpg` | `/web/upload/hero/hero-1.jpg` |
| 카드 BEST | `skin/web/upload/lookbook/look-1.jpg` | `/web/upload/lookbook/look-1.jpg` |
| 카드 SALE | `skin/web/upload/promo/promo-1.jpg` | `/web/upload/promo/promo-1.jpg` |
| 배너 | `skin/web/upload/banner/banner-1.jpg` | `/web/upload/banner/banner-1.jpg` |

#### ⚠️ 메가메뉴 디버깅 체크리스트
1. **아무것도 안 보임(흰 화면)** → `#lb-fullmenu`에 `class="lb-fullmenu"` 있는지 확인
2. **위치가 어긋남** → `header.js`의 `positionFullmenu()` 실행 여부 확인; `div.inner`의 `position:relative` 확인
3. **sticky 헤더 깨짐** → `#lb-fullmenu`를 `nav#lb-nav` 안에 넣으면 안 됨, 반드시 `div.inner` 자식으로 유지
4. **CSS 인코딩 깨짐** → `_new-navigation.css` 파일 끝에 `Add-Content`로 한글 주석 추가 금지; StrReplace 또는 UTF-8 명시 저장 사용

---

### Updates (2026.06.30) — 모바일 헤더/탭바 고정 및 카테고리 완성
- ✅ **메인 히어로 배너 정사각형**: `aspect-ratio: 1/1` 적용, 기존 대비 약 2배 크기
- ✅ **카테고리 탭바 + ▼ 전체메뉴 완성**:
  - 헤더 하단 가로 스와이프 텍스트 메뉴 (SHOP ALL / TOPS / KNIT / BLOUSE / T-SHIRT / DRESSES / OUTERWEAR / BOTTOMS / BAG & SHOES)
  - 우측 고정 `▼` 버튼 클릭 시 3열 바둑판 드롭다운 패널 (배경 클릭/ESC 닫기)
  - 드롭다운 위치를 `getBoundingClientRect()`로 동적 계산 → 항상 탭바 바로 아래
  - 현재 카테고리 페이지 활성 탭 자동 표시 + 스크롤 중앙 정렬
- ✅ **헤더 + 탭바 상단 고정 완성**:
  - `position: fixed !important` 적용 — Cafe24 `layout.css` `position:relative` 오버라이드
  - `layout.css`의 `#container { padding: 0 !important }` 충돌 → `<div class="lb-fixed-spacer">` spacer 방식으로 해결
  - 스크롤해도 헤더(로고·햄버거·아이콘)와 카테고리 탭바 항상 상단 고정

### Updates (2026.06.29) — 모바일 스킨 대규모 개선
- ✅ **모바일 헤더 (Phase M1 완료)**: 햄버거 버튼, ATELIER N. 로고, 검색·장바구니 아이콘 — sticky + z-index 정리
- ✅ **사이드 드로어 (Phase M3 완료)**: PC 스타일 버튼 반영, 로그인/회원가입 버튼 노출, 즐겨찾기 제거, 헤더 오버랩 해결
- ✅ **히어로 배너 텍스트 가시성 수정**: `layout.css` `justify-content:flex-end` 오버라이드 → 텍스트 상단 정렬, 그라디언트 배경 처리
- ✅ **카테고리 아이콘 존 (lb-cat-zone) 4열 2행 완성**:
  - `layout.css` `@media (max-width:768px)` 의 `width:max-content` / `max-width:100px` 충돌 해결
  - `width:100% !important` + `overflow-x:hidden` 으로 flex `%` 확정 크기 확보
  - 원형 이미지 `min(75px, 18.7vw)` 반응형 완벽 정원
- ✅ **WEEKLY BEST 스와이프 네비게이션 완성**:
  - PC 방식 `anchorBoxId` 패턴 적용 — `xans-record-` 제거로 상품 중복 오류 해결
  - 8슬롯 `li` 템플릿으로 Cafe24 서버사이드 렌더링 정상 작동
  - 커스텀 prev/next 버튼 + `scrollBy()` 기반 부드러운 스와이프
- ✅ **피처 배너 Swiper 슬라이더**: 4개 배너 모바일 스와이프 지원, 하단 pagination 버튼 추가
- ✅ **타임세일 모바일**: 텍스트 컨텐츠만 표시, 이미지 영역 숨김
- ✅ **프로모 배너 2열 나란히 표시**: 호버 없이 텍스트 상시 표시
- ✅ **브랜드 스토리 가로 레이아웃 유지**: 이미지(40% 축소) + 텍스트 좌우 배치
- ✅ **ATELIER SHORTS 실제 상품 데이터 반영**: 7개 쇼츠 카드 — PC/모바일 공통
- ✅ **로그인/회원가입 페이지**: PC + 모바일 Cafe24 매뉴얼 기반 리디자인
- ✅ **`LE BLANC` 하드코딩 완전 제거**: `{$mall_name}` 템플릿 변수로 전환 (판매용 스킨 규격)

---

## 모바일 스킨 개발 로드맵 (v2.0)

> PC 스킨 완성 후 다음 단계. `mobile/` 폴더 기준.

### 현재 모바일 상태

| 파일 | 상태 | 비고 |
|------|------|------|
| `mobile/index.html` | ✅ 완성 | 히어로·카테고리·상품섹션·피처배너·브랜드스토리 |
| `mobile/layout/basic/css/atelier-mobile.css` | ✅ 완성 | ATELIER N 모바일 스타일 전체 적용 |
| `mobile/layout/basic/layout.html` | ✅ ATELIER N 리디자인 | 헤더·사이드드로어 완성 |
| `mobile/layout/basic/main.html` | ✅ 완성 | CSS 로딩 순서 정립 |
| `mobile/layout/basic/navigation.html` | ⚠️ 카페24 기본 | 하단 탭 전환 — Phase M2 대기 |
| `mobile/layout/basic/sidebar.html` | ✅ ATELIER N 스타일 적용 | PC 스타일 버튼, 즐겨찾기 제거 |
| `mobile/layout/basic/footer.html` | ✅ ATELIER N 브랜딩 적용 | 뉴스레터 배너 포함 |
| `mobile/member/login.html` | ✅ 리디자인 완료 | UTF-8 수정 + ATELIER N 스타일 + 전체 소셜로그인 |
| `mobile/member/join.html` | ✅ 리디자인 완료 | UTF-8 수정 + ATELIER N 스타일 + 전체 약관/소셜가입 |
| `mobile/product/detail.html` | ⚠️ 스타일링 필요 | 상세 페이지 모바일 최적화 — Phase M6 대기 |
| `mobile/product/list.html` | ⚠️ 스타일링 필요 | 2열 그리드, 필터 UI — Phase M5 대기 |

---

### Phase M1 — 모바일 헤더 재설계 🔴 최우선
**작업 파일**: `layout.html`, `main.html`, `atelier-mobile.css`

```
[햄버거 ≡]  [ATELIER N 로고]  [검색🔍] [장바구니🛒(N)]
```

- 좌측: 사이드 드로어 트리거 (`≡`)
- 중앙: ATELIER N + ATELIER N. 브랜드 로고 텍스트
- 우측: 검색 아이콘 + 장바구니(카운트 뱃지)
- 배경: `#ffffff` / sticky top

---

### Phase M2 — 하단 탭 네비게이션 🔴 최우선
**작업 파일**: `layout.html`, `main.html`, `atelier-mobile.css`

```
[🏠 홈] [◻ 카테고리] [🔍 검색] [👤 마이] [🛒 장바구니]
```

- 5탭 고정 하단 배치 (`position: fixed; bottom: 0`)
- 현재 페이지 탭 활성 표시
- iOS safe area 대응 (`padding-bottom: env(safe-area-inset-bottom)`)
- 콘텐츠 영역 `padding-bottom` 추가로 탭바에 가리지 않게

---

### Phase M3 — 사이드 드로어 리디자인
**작업 파일**: `sidebar.html`, `atelier-mobile.css`

- 좌측 슬라이드 드로어 (width: 280px)
- 상단: 로그인 상태/회원명
- 중간: 카테고리 목록 (아코디언)
- 하단: 이용안내, 고객센터, SNS 링크
- 오버레이 배경 + 스와이프로 닫기

---

### Phase M4 — 메인 페이지 스타일 완성
**작업 파일**: `atelier-mobile.css`, `mobile/index.html`

- 히어로 슬라이더: `100vw × 80vh` 전체 화면
- 카테고리 아이콘: 수평 스크롤 (7개)
- 상품 섹션: 2열 그리드, 카드 스타일 통일
- 섹션 헤더: eyebrow 텍스트 + 제목 + "전체 보기" 링크
- 브랜드 스토리: 컴팩트 1열 레이아웃

---

### Phase M5 — 상품 리스트 페이지
**작업 파일**: `mobile/product/list.html`, `atelier-mobile.css`

- 2열 그리드 상품 카드 (기본)
- 필터/정렬 바 (상단 고정)
- 상품명 2줄 말줄임
- 판매가 / 할인가 표시
- 더보기 버튼 스타일

---

### Phase M6 — 상품 상세 페이지 모바일 최적화
**작업 파일**: `mobile/product/detail.html`, `atelier-mobile.css`

- 상단 이미지: 전체 너비 슬라이더 (`100vw`)
- 상품명·가격·옵션 선택 → 세로 스크롤
- **하단 고정 CTA**: `[장바구니 담기] [바로 구매]` 버튼
- 탭 메뉴 (상품정보 / 상세정보 / 리뷰 / Q&A) sticky
- 하단 탭바와 겹침 방지 (`padding-bottom` 대응)

---

### 개발 진행 현황

| Phase | 작업 | 상태 |
|-------|------|------|
| M1 | 모바일 헤더 재설계 | ✅ 완료 |
| M2 | 하단 탭 네비게이션 | 🔲 대기 |
| M3 | 사이드 드로어 리디자인 | ✅ 완료 |
| M4 | 메인 페이지 스타일 완성 | ✅ 완료 |
| M5 | 상품 리스트 페이지 | 🔲 대기 |
| M6 | 상품 상세 모바일 최적화 | 🔲 대기 |

---

## 라이선스

이 프로젝트는 Cafe24 쇼핑몰 전용 스킨으로 개발되었습니다.

## Cafe24 개발 참고 링크

| 문서 | URL | 설명 |
|------|-----|------|
| Front API | https://developers.cafe24.com/docs/ko/api/front/ | 상품·카테고리 조회 (외부 앱용) |
| Admin API | https://developers.cafe24.com/docs/ko/api/admin/ | 전체 관리 API (OAuth 필요) |
| SmartDesign 모듈 | https://sdsupport.cafe24.com/product/list.html?cate_no=61 | 템플릿 변수 전체 목록 |
| SmartDesign 편집기 | Cafe24 관리자 → 디자인 → 내 디자인 편집 | — |

### SmartDesign 모듈 참고 (주요)

| 모듈명 | 파일 경로 | 설명 |
|--------|-----------|------|
| `module="member_login"` | `member/login.html` | 로그인 폼 + 소셜로그인 변수 바인딩 |
| `module="member_join"` | `member/join.html` | 회원가입 폼 + 약관 변수 바인딩 |
| `module="common_header"` | `layout/basic/layout.html` | 글로벌 헤더 |
| `module="common_footer"` | `layout/basic/layout.html` | 글로벌 푸터 |

> **REST API vs SmartDesign 변수**: REST API는 외부에서 OAuth로 호출하는 방식이고, SmartDesign 변수(`{$form.*}`, `{$kakao_func_login}` 등)는 스킨 파일에서 서버가 렌더링 시 자동 주입하는 방식으로 **완전히 다른 시스템**입니다.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**Last Updated**: 2026.07.01  
**Version**: 1.2.0  
**Status**: PC Production Ready ✅ | Mobile Main Page Complete ✅ | Login/Join Pages Complete ✅ | Mobile Sub Pages 🚧

