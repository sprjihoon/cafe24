# LE BLANC 프로젝트 컨텍스트

**프로젝트**: LE BLANC - Cafe24 Premium Skin  
**타입**: E-commerce 쇼핑몰 스킨  
**플랫폼**: Cafe24  
**상태**: Production Ready  
**버전**: 1.0.0  
**최종 업데이트**: 2026.06.25

---

## 🎯 프로젝트 목표

Cafe24 쇼핑몰을 위한 프리미엄급 스킨을 개발하여, 모던하고 세련된 디자인과 우수한 사용자 경험을 제공합니다.

### 핵심 가치
1. **미니멀 디자인**: 깔끔하고 직관적인 UI
2. **고급스러움**: 프리미엄 브랜드 이미지
3. **사용자 경험**: 부드러운 인터랙션과 애니메이션
4. **반응형**: 모든 디바이스에서 완벽한 경험
5. **성능**: 빠른 로딩과 부드러운 스크롤

---

## 🏗️ 아키텍처

### 전체 구조

```
LE BLANC Skin
├── PC Version (skin/)
│   ├── Layout System (전역)
│   ├── Main Page (홈페이지)
│   ├── Product Pages (상품)
│   └── Service Pages (마이페이지, 게시판 등)
│
├── Mobile Version (mobile/)
│   └── Responsive Layout
│
└── Assets (web/upload/)
    ├── Images
    ├── Videos
    └── Icons
```

### 레이어 구조

1. **기반 레이어**: Cafe24 Template System
2. **레이아웃 레이어**: 전역 구조 (헤더, 푸터, 컨테이너)
3. **컴포넌트 레이어**: 재사용 가능한 UI 컴포넌트
4. **페이지 레이어**: 개별 페이지별 구성
5. **인터랙션 레이어**: JavaScript 기반 동적 기능

---

## 📐 디자인 철학

### 디자인 원칙

1. **Less is More**: 불필요한 요소 제거, 핵심에 집중
2. **Consistency**: 일관된 디자인 시스템 유지
3. **Hierarchy**: 명확한 정보 계층 구조
4. **Whitespace**: 여백을 활용한 시각적 편안함
5. **Accessibility**: 모든 사용자를 위한 접근성

### 디자인 토큰

```css
/* Colors */
Primary:      #1d1d1f  (거의 블랙)
Background:   #ffffff  (퓨어 화이트)
Gray Light:   #f5f5f5  (배경용)
Border:       #d2d2d7  (구분선)
Text:         #1d1d1f  (주 텍스트)
Text Muted:   #555555  (부 텍스트)

/* Typography */
Font Family:  'Nanum Gothic', sans-serif
Base Size:    15px
Line Height:  1.6
Font Weights: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

/* Spacing Scale */
xs:   8px    (아이콘 간격)
sm:   12px   (작은 여백)
md:   16px   (기본 여백)
lg:   24px   (섹션 간격)
xl:   32px   (큰 섹션)
xxl:  60px   (메인 섹션)

/* Border Radius */
sm:   8px    (버튼, 입력)
md:   12px   (카드)
lg:   16px   (이미지)
full: 9999px (원형)

/* Shadows */
sm:   0 1px 3px rgba(0,0,0,0.05)
md:   0 2px 8px rgba(0,0,0,0.1)
lg:   0 4px 16px rgba(0,0,0,0.15)

/* Transitions */
Fast:   0.2s  (호버, 클릭)
Normal: 0.3s  (일반 전환)
Slow:   0.5s  (페이드, 슬라이드)
```

---

## 🎨 컴포넌트 시스템

### 버튼 계층

```
Primary Button:   검정 배경 + 흰색 텍스트 (주요 액션)
Secondary Button: 흰색 배경 + 검정 테두리 (보조 액션)
Text Button:      배경 없음 (링크형)
Icon Button:      아이콘만 (액션 버튼)
```

### 카드 계층

```
Product Card:     상품 표시용
Review Card:      리뷰 표시용
Banner Card:      배너/프로모션용
Info Card:        정보 표시용
```

### 네비게이션 계층

```
Global Nav:       최상단 헤더
Category Nav:     카테고리 메뉴
Breadcrumb:       경로 표시
Tab Nav:          탭 메뉴
Pagination:       페이지 이동
```

---

## 🔧 기술 스택 상세

### HTML
- **Semantic HTML5**: 의미있는 태그 사용
- **Cafe24 Template**: `{$variable}`, `module=""` 시스템
- **Accessibility**: ARIA 속성, 키보드 네비게이션

### CSS
- **CSS3 Modern Features**:
  - Flexbox (1차원 레이아웃)
  - Grid (2차원 레이아웃)
  - Custom Properties (변수)
  - Animations & Transitions
  - Media Queries (반응형)
  
- **방법론**:
  - BEM-like 네이밍 (`lb-` 접두사)
  - Mobile-First Approach
  - Progressive Enhancement

### JavaScript
- **ES6+ Features**:
  - Arrow Functions
  - Template Literals
  - Destructuring
  - Spread/Rest Operators
  - Async/Await
  - Modules
  
- **APIs**:
  - DOM API
  - Intersection Observer
  - LocalStorage
  - Fetch API (준비)

### External Libraries
- **Swiper.js 11**:
  - 슬라이더/캐러셀
  - 페이지네이션
  - 네비게이션
  - 자동재생
  
- **장점**: 가볍고, 터치 친화적, 고도로 커스터마이징 가능

---

## 📦 모듈 구조

### 핵심 모듈

1. **Layout Module** (`layout.html`, `layout.css`)
   - 전역 구조
   - 헤더 & 푸터
   - 컨테이너 시스템

2. **Header Module** (`header.js`)
   - 로고
   - 네비게이션
   - 유틸리티 메뉴
   - 메가메뉴
   - Sticky 헤더

3. **Slider Module** (`sliders.js`)
   - 히어로 배너
   - 상품 슬라이더
   - 리뷰 슬라이더
   - 분할 배너

4. **Product Module** (`product-icons.js`, `product-detail.js`)
   - 상품 카드
   - 호버 액션
   - 옵션 선택
   - 이미지 갤러리

5. **Widget Module** (`widgets.js`)
   - 플로팅 버튼
   - TOP 버튼
   - 최근 본 상품

6. **Util Module**
   - 카운트다운 (`countdown.js`)
   - 비디오 (`video.js`)
   - 복사 기능 (`product-copy.js`)

---

## 🎯 페이지별 구성

### 메인 페이지 (index.html)

**섹션 순서**:
1. Hero Banner (전체 화면 슬라이더)
2. Category Icons (원형 아이콘 8개)
3. 4-Square Banners (정사각형 배너 4개)
4. Split Banner (슬라이더 + 2x2 그리드)
5. Weekly Best (상품 슬라이더)
6. Shorts (숏폼 영상)
7. New Arrivals (4x3 그리드)
8. Time Sale (카운트다운 + 상품)
9. Main Category 1 (슬라이더)
10. Video Banner (YouTube)
11. Main Category 2 (그리드)
12. Photo Review (리뷰 슬라이더)
13. Scroll Effect Banner (Parallax)
14. SNS Feed (6x2 그리드)
15. Strip Banners (띠배너들)
16. Footer (3-컬럼)

### 상품 상세 페이지 (detail.html)

**레이아웃**:
```
┌─────────────────────────────────┐
│  [Breadcrumb]                   │
├──────────────┬──────────────────┤
│              │  Product Title   │
│              ├──────────────────┤
│   Image      │  Price           │
│   Gallery    │  Options         │
│   (Sticky)   │  Quantity        │
│              │  Total Price     │
│   [Main]     │  [Add to Cart]   │
│   [Thumb]    │  [Buy Now]       │
│              │                  │
│   [Like]     │  Product Info    │
│              │  Delivery Info   │
│   Photo      │  Return Policy   │
│   Reviews    │                  │
└──────────────┴──────────────────┘
│  [Tab Menu] (Sticky)            │
├─────────────────────────────────┤
│  Detail Images                  │
│  Reviews                        │
│  Q&A                            │
│  Shipping/Return                │
└─────────────────────────────────┘
```

**주요 기능**:
- Sticky 이미지 갤러리
- Swiper 이미지 슬라이더 (메인 + 썸네일)
- 커스텀 옵션 UI (컬러 칩, 사이즈 버튼)
- 수량 조절 (+/- 버튼)
- Sticky 탭 메뉴 (활성 탭 감지)
- 포토 리뷰 그리드

---

## 🎬 인터랙션 패턴

### 호버 효과

```css
/* 부드러운 전환 */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* 약간의 확대 */
transform: scale(1.05);

/* 투명도 변화 */
opacity: 0.8;

/* 그림자 강화 */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
```

### 클릭 피드백

```css
/* 눌림 효과 */
transform: scale(0.98);

/* 활성 상태 */
background: rgba(0, 0, 0, 0.05);
```

### 스크롤 애니메이션

```javascript
// Intersection Observer 사용
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);
```

### 페이지 전환

```css
/* 페이드 인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 슬라이드 업 */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 반응형 전략

### 브레이크포인트

```css
/* Mobile First */
/* 320px ~ 767px */
기본 스타일

/* Tablet */
@media (min-width: 768px) {
  /* 768px ~ 1023px */
  2컬럼 레이아웃
  폰트 크기 증가
}

/* Desktop */
@media (min-width: 1024px) {
  /* 1024px ~ 1439px */
  멀티 컬럼 레이아웃
  호버 효과 활성화
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* 1440px+ */
  최대 너비 제한
  추가 여백
}
```

### 반응형 패턴

1. **Fluid Typography**:
```css
font-size: clamp(14px, 2vw, 18px);
```

2. **Flexible Grid**:
```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

3. **Responsive Images**:
```css
width: 100%;
height: auto;
object-fit: cover;
```

4. **Touch Optimization**:
```css
/* 터치 타겟 최소 44x44px */
min-width: 44px;
min-height: 44px;
```

---

## ⚡ 성능 최적화

### 전략

1. **이미지 최적화**:
   - WebP 포맷 사용
   - Lazy Loading
   - Responsive Images

2. **CSS 최적화**:
   - Critical CSS 인라인
   - 미사용 CSS 제거
   - CSS 압축

3. **JavaScript 최적화**:
   - 코드 스플리팅
   - Defer/Async 로딩
   - 이벤트 디바운싱

4. **렌더링 최적화**:
   - `will-change` 속성
   - `transform`/`opacity` 우선 사용
   - 레이아웃 리플로우 최소화

### 목표 지표

```
First Contentful Paint:  < 1.5s
Time to Interactive:     < 3.0s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
```

---

## 🔒 보안 & 접근성

### 보안

- XSS 방지: 사용자 입력 sanitize
- CSRF 토큰 사용
- HTTPS 강제
- 민감 정보 암호화

### 접근성 (WCAG 2.1 AA)

- **키보드 네비게이션**: 모든 인터랙티브 요소 접근 가능
- **스크린 리더**: ARIA 속성 사용
- **색상 대비**: 최소 4.5:1 비율
- **포커스 인디케이터**: 명확한 포커스 표시
- **대체 텍스트**: 모든 이미지에 alt 속성

---

## 🧪 테스트 전략

### 단위 테스트
- 개별 함수 및 컴포넌트 테스트
- 에지 케이스 검증

### 통합 테스트
- 페이지 간 네비게이션
- 폼 제출 플로우
- 장바구니 프로세스

### E2E 테스트
- 사용자 시나리오 테스트
- 주요 구매 플로우
- 다양한 디바이스

### 성능 테스트
- Lighthouse 스코어
- WebPageTest 분석
- 실제 사용자 모니터링

---

## 📊 모니터링

### 추적 지표

1. **성능 지표**:
   - 페이지 로드 시간
   - Time to First Byte
   - Core Web Vitals

2. **사용자 지표**:
   - 이탈률
   - 세션 지속 시간
   - 전환율

3. **에러 지표**:
   - JavaScript 에러
   - 404 에러
   - API 실패율

---

## 🔄 배포 프로세스

### 개발 워크플로우

```
1. 로컬 개발
   ↓
2. Git 커밋
   ↓
3. FTP 배포 (upload-mobile.js)
   ↓
4. Cafe24 테스트
   ↓
5. 프로덕션 적용
```

### FTP 배포

```bash
cd ftp-mcp-server
node upload-mobile.js
```

**배포되는 파일**:
- HTML 템플릿 (8개)
- CSS 스타일시트 (6개)
- JavaScript 파일 (11개)
- 이미지/비디오 에셋 (50+개)

---

## 🎓 코딩 컨벤션

### HTML

```html
<!-- Cafe24 모듈 사용 -->
<module name="Layout_header">

<!-- BEM-like 클래스 네이밍 -->
<div class="lb-product-card">
  <div class="lb-product-card__image">
    <img src="..." alt="..." />
  </div>
  <div class="lb-product-card__info">
    <h3 class="lb-product-card__title">...</h3>
  </div>
</div>

<!-- 시맨틱 태그 사용 -->
<header>
<nav>
<main>
<section>
<article>
<footer>
```

### CSS

```css
/* 네이밍: lb-{component}__{element}--{modifier} */
.lb-button { }
.lb-button__icon { }
.lb-button--large { }

/* 순서: 레이아웃 > 박스모델 > 타이포그래피 > 비주얼 > 기타 */
.example {
  /* Layout */
  display: flex;
  position: relative;
  
  /* Box Model */
  width: 100%;
  padding: 16px;
  margin: 0 auto;
  
  /* Typography */
  font-size: 15px;
  line-height: 1.6;
  
  /* Visual */
  background: #fff;
  border-radius: 8px;
  
  /* Misc */
  transition: all 0.3s;
}
```

### JavaScript

```javascript
// 함수명: camelCase
function initSlider() { }

// 상수: UPPER_SNAKE_CASE
const MAX_ITEMS = 10;

// 클래스: PascalCase
class ProductCard { }

// 주석: JSDoc 스타일
/**
 * 슬라이더 초기화
 * @param {string} selector - 슬라이더 선택자
 * @param {Object} options - Swiper 옵션
 * @returns {Swiper} Swiper 인스턴스
 */
function initSlider(selector, options) {
  // 구현...
}
```

---

## 📚 참고 자료

### 공식 문서
- [Cafe24 개발 가이드](https://developers.cafe24.com/)
- [Swiper.js 문서](https://swiperjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### 디자인 레퍼런스
- LE BLANC 공식 사이트
- Apple Design Guidelines
- Google Material Design

### 코드 레퍼런스
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

---

## 🤝 협업 가이드

### Git 워크플로우

```bash
# 새 기능 개발
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 버그 수정
git checkout -b fix/bug-description
git add .
git commit -m "fix: resolve bug"
git push origin fix/bug-description
```

### 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
design: UI/스타일 변경
refactor: 코드 리팩토링
docs: 문서 수정
test: 테스트 코드
chore: 빌드/설정 변경
perf: 성능 개선
```

---

## 🎯 프로젝트 마일스톤

### v1.0.0 (현재) ✅
- 전체 기본 기능 구현
- PC/모바일 반응형
- 상품 상세 페이지 완성
- 푸터 3-컬럼 레이아웃

### v1.1.0 (다음)
- 실제 상품 데이터 연동
- 장바구니 완전 통합
- 회원 시스템 UI 개선
- 주문/결제 페이지

### v1.2.0 (향후)
- 다크 모드
- 다국어 지원
- PWA 지원
- 고급 필터링

### v2.0.0 (장기)
- AI 추천 시스템
- AR 상품 미리보기
- 라이브 커머스
- 맞춤형 UX

---

## 💡 Best Practices

### 코드 품질
1. **DRY**: 중복 코드 제거
2. **KISS**: 단순하게 유지
3. **YAGNI**: 필요한 것만 구현
4. **SOLID**: 객체지향 원칙

### 성능
1. **이미지 최적화**: 항상 압축된 이미지 사용
2. **Lazy Loading**: 화면 밖 콘텐츠 지연 로드
3. **코드 스플리팅**: 필요한 코드만 로드
4. **캐싱**: 적극적으로 브라우저 캐시 활용

### 유지보수
1. **명확한 네이밍**: 의도가 명확한 이름
2. **주석 최소화**: 코드로 설명, 필요시에만 주석
3. **모듈화**: 재사용 가능한 단위로 분리
4. **버전 관리**: 의미있는 커밋 메시지

---

## 🆘 트러블슈팅

### 자주 발생하는 문제

1. **스타일이 적용되지 않음**
   - 해결: CSS 캐시 클리어, 선택자 우선순위 확인

2. **JavaScript 에러**
   - 해결: 콘솔 로그 확인, 스크립트 로드 순서 확인

3. **이미지 깨짐**
   - 해결: 경로 확인, FTP 업로드 확인

4. **반응형 레이아웃 문제**
   - 해결: 미디어 쿼리 순서, viewport 메타 태그 확인

5. **Swiper 작동 안 함**
   - 해결: CDN 로드 확인, 초기화 타이밍 확인

---

## 📞 연락처

**프로젝트**: LE BLANC Cafe24 Skin  
**리포지토리**: [GitHub Link]  
**이슈 트래커**: [GitHub Issues]  
**문서**: 본 파일 및 README.md

---

**컨텍스트 버전**: 1.0.0  
**마지막 업데이트**: 2026.06.25 16:25 KST  
**다음 리뷰**: 2026.07.02

---

*이 컨텍스트 문서는 프로젝트의 전체적인 맥락을 이해하고 일관성 있는 개발을 위한 가이드입니다.*
