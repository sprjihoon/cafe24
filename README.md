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
│   │       │   ├── leblanc.css    # ATELIER N 커스텀 스타일
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
│   ├── web/upload/                # 이미지 에셋
│   └── config.xml                 # 스킨 설정
│
├── mobile/                         # 모바일 스킨
│   ├── index.html
│   └── layout/basic/
│       ├── css/lb-mobile.css
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

### 컬러 변경
`skin/layout/basic/css/layout.css`에서 CSS 변수 수정:

```css
:root {
  --color-primary: #1d1d1f;
  --color-background: #ffffff;
  --color-border: #d2d2d7;
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
| `mobile/layout/basic/css/lb-mobile.css` | ✅ 완성 | ATELIER N 모바일 스타일 전체 적용 |
| `mobile/layout/basic/layout.html` | ✅ ATELIER N 리디자인 | 헤더·사이드드로어 완성 |
| `mobile/layout/basic/main.html` | ✅ 완성 | CSS 로딩 순서 정립 |
| `mobile/layout/basic/navigation.html` | ⚠️ 카페24 기본 | 하단 탭 전환 — Phase M2 대기 |
| `mobile/layout/basic/sidebar.html` | ✅ ATELIER N 스타일 적용 | PC 스타일 버튼, 즐겨찾기 제거 |
| `mobile/layout/basic/footer.html` | ✅ ATELIER N 브랜딩 적용 | 뉴스레터 배너 포함 |
| `mobile/member/login.html` | ✅ 리디자인 완료 | Cafe24 매뉴얼 기반 |
| `mobile/member/join.html` | ✅ 리디자인 완료 | Cafe24 매뉴얼 기반 |
| `mobile/product/detail.html` | ⚠️ 스타일링 필요 | 상세 페이지 모바일 최적화 — Phase M6 대기 |
| `mobile/product/list.html` | ⚠️ 스타일링 필요 | 2열 그리드, 필터 UI — Phase M5 대기 |

---

### Phase M1 — 모바일 헤더 재설계 🔴 최우선
**작업 파일**: `layout.html`, `main.html`, `lb-mobile.css`

```
[햄버거 ≡]  [ATELIER N 로고]  [검색🔍] [장바구니🛒(N)]
```

- 좌측: 사이드 드로어 트리거 (`≡`)
- 중앙: ATELIER N + ATELIER N. 브랜드 로고 텍스트
- 우측: 검색 아이콘 + 장바구니(카운트 뱃지)
- 배경: `#ffffff` / sticky top

---

### Phase M2 — 하단 탭 네비게이션 🔴 최우선
**작업 파일**: `layout.html`, `main.html`, `lb-mobile.css`

```
[🏠 홈] [◻ 카테고리] [🔍 검색] [👤 마이] [🛒 장바구니]
```

- 5탭 고정 하단 배치 (`position: fixed; bottom: 0`)
- 현재 페이지 탭 활성 표시
- iOS safe area 대응 (`padding-bottom: env(safe-area-inset-bottom)`)
- 콘텐츠 영역 `padding-bottom` 추가로 탭바에 가리지 않게

---

### Phase M3 — 사이드 드로어 리디자인
**작업 파일**: `sidebar.html`, `lb-mobile.css`

- 좌측 슬라이드 드로어 (width: 280px)
- 상단: 로그인 상태/회원명
- 중간: 카테고리 목록 (아코디언)
- 하단: 이용안내, 고객센터, SNS 링크
- 오버레이 배경 + 스와이프로 닫기

---

### Phase M4 — 메인 페이지 스타일 완성
**작업 파일**: `lb-mobile.css`, `mobile/index.html`

- 히어로 슬라이더: `100vw × 80vh` 전체 화면
- 카테고리 아이콘: 수평 스크롤 (7개)
- 상품 섹션: 2열 그리드, 카드 스타일 통일
- 섹션 헤더: eyebrow 텍스트 + 제목 + "전체 보기" 링크
- 브랜드 스토리: 컴팩트 1열 레이아웃

---

### Phase M5 — 상품 리스트 페이지
**작업 파일**: `mobile/product/list.html`, `lb-mobile.css`

- 2열 그리드 상품 카드 (기본)
- 필터/정렬 바 (상단 고정)
- 상품명 2줄 말줄임
- 판매가 / 할인가 표시
- 더보기 버튼 스타일

---

### Phase M6 — 상품 상세 페이지 모바일 최적화
**작업 파일**: `mobile/product/detail.html`, `lb-mobile.css`

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

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**Last Updated**: 2026.06.30  
**Version**: 1.1.0 (PC 완성) → v2.0.0 (모바일 개발 중)  
**Status**: PC Production Ready ✅ | Mobile Main Page Complete ✅ | Mobile Sub Pages 🚧

