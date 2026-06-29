# LE BLANC 스킨 전체 메인 페이지 구조
## 디자인센터 LE BLANC - 완전 분석

> **분석일**: 2026-06-25  
> **출처**: https://ecudemo49388.cafe24.com  
> **목적**: 우리 스킨 개선을 위한 전체 레이아웃 참조

---

## 전체 페이지 순서 (위에서 아래로)

```
        [좌측 사이드 네비]               [우측 플로팅 위젯]
        - WEEKLY BEST                    💬 채팅
        - NEW ARRIVALS                   💚 카카오톡
        - 타임세일                        ↑ 위로
        - 추가 메인분류1
        - 추가 메인분류2
        - 포토리뷰

┌─────────────────────────────────────────┐
│  1. [마키 배너] 무한 반복 텍스트          │
├─────────────────────────────────────────┤
│  2. [헤더]                               │
│     - 로고 + 우측 유틸리티 (7개)         │
│     - 메인 네비게이션 (11개)             │
├─────────────────────────────────────────┤
│  3. [메인 히어로 배너] ⭐                │
│     전체 화면, 2개 슬라이드              │
│     - COLLECTIVE: 강력하지만...         │
│     - CREATIVE: 심세하면서...           │
├─────────────────────────────────────────┤
│  4. [아이콘 메뉴] 7-8개                  │
│     디자인 조명, 화장품, 티켓...         │
├─────────────────────────────────────────┤
│  5. [WEEKLY BEST] ⭐                     │
│     슬라이드 형태, 4개씩 보임            │
│     제품 카드 (이미지 + 설명 + 가격)     │
├─────────────────────────────────────────┤
│  6. [띠배너 1개]                         │
│     프로모션 또는 공지                    │
├─────────────────────────────────────────┤
│  7. [🎬 SHORTS] ⭐                       │
│     숏폼 영상 슬라이드, 여러개            │
│     세로 영상 + 재생 버튼                │
├─────────────────────────────────────────┤
│  8. [NEW ARRIVALS] ⭐                    │
│     4x3 = 12개 바둑판 배열               │
│     하단 "더보기" 버튼                   │
├─────────────────────────────────────────┤
│  9. [배너 1개]                           │
│     중간 프로모션                         │
├─────────────────────────────────────────┤
│ 10. [⏰ 타임세일 배너] ⭐               │
│     시간 카운트다운                       │
│     "끝이 없는 할인의 블랙홀"            │
│     189일 9시간 11분 46초 17초          │
├─────────────────────────────────────────┤
│ 11. [타임세일 상품목록]                  │
│     4x2 = 8개                            │
│     타임세일 라벨 + 할인율              │
├─────────────────────────────────────────┤
│ 12. [추가 메인분류1] ⭐                 │
│     4개 제품                              │
│     슬라이드로 한 개씩 제품 더 보임      │
├─────────────────────────────────────────┤
│ 13. [추가 메인분류2]                     │
│     4x3 = 12개 바둑판                    │
│     하단 "더보기" 버튼                   │
├─────────────────────────────────────────┤
│ 14. [영상 배너] ⭐                       │
│     YouTube 임베드                        │
│     "가장 어디에도 없었던 방식으로"      │
├─────────────────────────────────────────┤
│ 15. [포토리뷰] ⭐                        │
│     5개 슬라이드                          │
│     실제 고객 리뷰 사진                  │
│     "모두보기" 버튼                      │
├─────────────────────────────────────────┤
│ 16. [스크롤 효과 배너] ⭐               │
│     "보이는 것, 그 너머로"               │
│     스크롤 시 이미지 올라감 효과         │
├─────────────────────────────────────────┤
│ 17. [Our Highlights - SNS 피드] ⭐      │
│     6x2 = 12개 그리드                    │
│     Instagram 연동                        │
│     이미지/영상 혼합                     │
├─────────────────────────────────────────┤
│ 18. [하단 배너 4개]                      │
│     마감임박 타임세일                     │
│     브랜드 모음전                         │
│     테스트                                │
│     (4번째)                               │
├─────────────────────────────────────────┤
│ 19. [푸터]                               │
│     회사 정보, 고객센터, SNS 링크        │
└─────────────────────────────────────────┘
```

---

## 플로팅 UI 요소

### 좌측 사이드 네비게이션
```html
<nav class="lb-side-nav">
  <ul>
    <li><a href="#weekly-best">WEEKLY BEST</a></li>
    <li><a href="#new-arrivals">NEW ARRIVALS</a></li>
    <li><a href="#timesale">타임세일</a></li>
    <li><a href="#category1">추가 메인분류1</a></li>
    <li><a href="#category2">추가 메인분류2</a></li>
    <li><a href="#photo-review">포토리뷰</a></li>
  </ul>
</nav>
```

**특징:**
- 좌측 고정 (position: fixed)
- 스크롤 시 현재 섹션 하이라이트
- 클릭 시 해당 섹션으로 스무스 스크롤
- 모바일에서는 숨김

### 우측 플로팅 위젯
```html
<div class="lb-floating-widget">
  <button class="lb-float-btn chat">💬</button>
  <button class="lb-float-btn kakao">💚</button>
  <button class="lb-float-btn scroll-top">↑</button>
</div>
```

**특징:**
- 우측 하단 고정
- 채팅 (노란색), 카카오톡 (초록색), 위로 가기 (흰색)
- 위로 가기 버튼은 스크롤 시에만 표시
- 스크롤 따라 이동

---

## 각 섹션 상세 분석

### 1. 마키 배너
```html
<div class="lb-marquee">
  <p class="lb-marquee-text">
    보이지 않는 것이 보이는 것보다 더 깊고 넓은 것입니다. 
    (무한 반복)
  </p>
</div>
```
- 핑크색 배경
- 무한 스크롤 애니메이션

---

### 2. 헤더 (이미 분석 완료)
- 로고 (이미지)
- 우측 유틸: 로그인|회원가입+2,000P|커뮤니티|장바구니|마이페이지|검색|KR▼
- 네비게이션: 11개 메뉴

---

### 3. 메인 히어로 배너 (전체 화면)
```html
<div class="lb-hero-fullscreen">
  <div class="lb-hero-slide">
    <img src="/hero-1.jpg" alt="COLLECTIVE">
    <div class="lb-hero-content">
      <h2>COLLECTIVE</h2>
      <p>강력하지만, 지나치지 않습니다.</p>
    </div>
  </div>
  <div class="lb-hero-slide">
    <img src="/hero-2.jpg" alt="CREATIVE">
    <div class="lb-hero-content">
      <h2>CREATIVE</h2>
      <p>심세하면서, 더승합니다.</p>
    </div>
  </div>
</div>
```

**특징:**
- 100vh 전체 화면
- 2개 슬라이드
- 하단 페이지네이션

---

### 4. 아이콘 메뉴 (7-8개)
```html
<div class="lb-icon-menu">
  <a href="#" class="lb-icon-item">
    <div class="lb-icon">⚡</div>
    <span>디자인 조명</span>
  </a>
  <a href="#" class="lb-icon-item">
    <div class="lb-icon">💡</div>
    <span>화장품</span>
  </a>
  <!-- 총 7-8개 -->
</div>
```

---

### 5. WEEKLY BEST (슬라이드) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>WEEKLY BEST</h2>
    <p>한 주간의 인기상품을 만나보세요</p>
  </div>
  
  <div class="lb-product-slider">
    <!-- 4개씩 보임, 슬라이드 가능 -->
    <div class="lb-product-card">
      <img src="/product-1.jpg" alt="">
      <h3>작점 유리보수가 가능한 디자인</h3>
      <p class="description">당일 및 방문보수도 최소화하고...</p>
      <p class="price">
        <span class="original">63,000원</span>
        <span class="sale">43,390,000원</span>
      </p>
      <span class="badge">세탁 7</span>
      <div class="tags">
        <span>베스트</span>
        <span>NEW</span>
      </div>
    </div>
    <!-- 반복 -->
  </div>
</section>
```

**특징:**
- 제품 카드 디자인
- 가격 할인 표시
- 베스트/NEW 배지
- 좌우 화살표로 슬라이드

---

### 6. 띠배너 1개
```html
<div class="lb-strip-banner">
  <a href="#">
    <img src="/strip-banner.jpg" alt="프로모션">
  </a>
</div>
```

---

### 7. 🎬 SHORTS (숏폼 영상 슬라이드) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>🎬 SHORTS</h2>
    <p>흥미로운 쇼츠로 스타일 힌트에 빠지셔세요</p>
  </div>
  
  <div class="lb-shorts-slider">
    <div class="lb-shorts-item">
      <video poster="/shorts-thumb-1.jpg">
        <source src="/shorts-1.mp4" type="video/mp4">
      </video>
      <button class="play-btn">▶</button>
      <div class="lb-shorts-overlay">
        <span class="product-link">작점 유리보수가 가능한 디자인</span>
        <span class="price">43,390,000원</span>
      </div>
    </div>
    <!-- 여러개 슬라이드 -->
  </div>
</section>
```

**특징:**
- 세로 영상 (9:16 비율)
- 재생 버튼
- 상품 정보 오버레이
- 좌우 스크롤

---

### 8. NEW ARRIVALS (4x3 바둑판) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>NEW ARRIVALS</h2>
    <p>매일매일 업데이트되는 신상품을 확인하세요</p>
  </div>
  
  <div class="lb-product-grid">
    <!-- 4열 x 3행 = 12개 -->
    <div class="lb-product-card">
      <img src="/product-1.jpg" alt="">
      <div class="color-swatches">
        <span class="swatch" style="background: #000"></span>
        <span class="swatch" style="background: #333"></span>
      </div>
      <h3>모이는 것만 전류가 아닙니다</h3>
      <p class="description">모이할 당은 것이 또이는 것보다...</p>
      <p class="price">
        <span class="original">540,000원</span>
        <span class="sale">50,270,000원</span>
      </p>
      <span class="badge">세탁 10</span>
      <div class="tags">
        <span>베스트</span>
        <span>NEW</span>
      </div>
    </div>
    <!-- 12개 반복 -->
  </div>
  
  <div class="lb-more-btn-wrap">
    <button class="btn-more">더보기</button>
  </div>
</section>
```

**CSS:**
```css
.lb-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

@media (max-width: 1024px) {
  .lb-product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .lb-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### 9. 배너 1개
```html
<div class="lb-promo-banner">
  <a href="#">
    <img src="/promo-banner.jpg" alt="">
  </a>
</div>
```

---

### 10. ⏰ 타임세일 카운트다운 배너 ⭐
```html
<section class="lb-timesale-banner">
  <div class="lb-timesale-bg">
    <div class="lb-timesale-content">
      <span class="lb-timesale-category">Furniture Design</span>
      <h2>끝이 없는<br>할인의 블랙홀</h2>
      <div class="lb-countdown">
        <div class="lb-countdown-item">
          <span class="number">189</span>
          <span class="label">일</span>
        </div>
        <div class="lb-countdown-item">
          <span class="number">9</span>
          <span class="label">시간</span>
        </div>
        <div class="lb-countdown-item">
          <span class="number">11</span>
          <span class="label">분</span>
        </div>
        <div class="lb-countdown-item">
          <span class="number">46</span>
          <span class="label">초</span>
        </div>
      </div>
      <button class="btn-shop">더 알아보기</button>
    </div>
    <div class="lb-timesale-image">
      <img src="/timesale-product.jpg" alt="">
    </div>
  </div>
</section>
```

**JavaScript (카운트다운):**
```javascript
function initTimesaleCountdown() {
  var endDate = new Date('2026-12-31 23:59:59').getTime();
  
  setInterval(function() {
    var now = new Date().getTime();
    var distance = endDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.querySelector('.lb-countdown-item:nth-child(1) .number').textContent = days;
    document.querySelector('.lb-countdown-item:nth-child(2) .number').textContent = hours;
    document.querySelector('.lb-countdown-item:nth-child(3) .number').textContent = minutes;
    document.querySelector('.lb-countdown-item:nth-child(4) .number').textContent = seconds;
  }, 1000);
}
```

---

### 11. 타임세일 상품목록 (4x2)
```html
<section class="lb-section">
  <div class="lb-timesale-products">
    <!-- 4열 x 2행 = 8개 -->
    <div class="lb-product-card timesale">
      <span class="timesale-badge">10:00 1T. 46:08남음</span>
      <img src="/product.jpg" alt="">
      <h3>사랑하기 쉬워야 온앞이 잘 됩니다</h3>
      <p>감정에쁜 사랑이 더 잘 단니다.</p>
      <p class="price">
        <span class="original">84,000원</span>
        <span class="sale">25,66,000원</span>
      </p>
      <span class="discount">25% 할인</span>
    </div>
    <!-- 8개 반복 -->
  </div>
</section>
```

---

### 12. 추가 메인분류1 (4개 + 슬라이드) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>추가 메인분류1</h2>
    <p>매일찾역의 상품분류 추가기능이 수정할 수 있습니다.</p>
  </div>
  
  <div class="lb-product-row">
    <!-- 처음 4개 보임 -->
    <div class="lb-product-card">...</div>
    <div class="lb-product-card">...</div>
    <div class="lb-product-card">...</div>
    <div class="lb-product-card">...</div>
  </div>
  
  <!-- 슬라이드로 더 많은 제품 -->
  <div class="lb-product-slider-extended">
    <div class="lb-product-card">...</div>
    <!-- 더 많은 제품 -->
  </div>
</section>
```

---

### 13. 추가 메인분류2 (4x3 + 더보기)
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>추가 메인분류2</h2>
    <p>매일찾역의 상품분류 추가기능이 수정할 수 있습니다.</p>
  </div>
  
  <div class="lb-product-grid">
    <!-- 4열 x 3행 = 12개 -->
    <!-- NEW ARRIVALS와 동일 구조 -->
  </div>
  
  <div class="lb-more-btn-wrap">
    <button class="btn-more">더보기</button>
  </div>
</section>
```

---

### 14. 영상 배너 (YouTube) ⭐
```html
<section class="lb-video-section">
  <div class="lb-video-content">
    <h2>가장 어디에도 없었던 방식으로</h2>
    <p>배치정소를 수월한 때 HTML,FTP 사용자이<br>관리하게 주정하세요</p>
    <button class="btn-learn-more">더 알아보기</button>
  </div>
  
  <div class="lb-video-embed">
    <iframe 
      src="https://www.youtube.com/embed/VIDEO_ID" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</section>
```

**레이아웃:**
```
┌────────────┬──────────────┐
│            │              │
│  텍스트     │   YouTube    │
│  콘텐츠     │   영상       │
│            │              │
└────────────┴──────────────┘
```

---

### 15. 포토리뷰 (5개 슬라이드) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>포토리뷰</h2>
    <p>실물 사용자기습니다.</p>
  </div>
  
  <div class="lb-photo-review-slider">
    <div class="lb-review-item">
      <img src="/review-1.jpg" alt="">
      <div class="lb-review-content">
        <h4>손지알놀로 뽑은 디자인</h4>
        <p>필요된 장소에 얻어도 보영니다...</p>
        <span class="author">김** 님</span>
      </div>
    </div>
    <!-- 5개 슬라이드 -->
  </div>
  
  <div class="lb-more-btn-wrap">
    <button class="btn-view-all">모두보기</button>
  </div>
</section>
```

---

### 16. 스크롤 효과 배너 ⭐
```html
<section class="lb-scroll-reveal-banner">
  <div class="lb-scroll-bg">
    <img src="/concrete-bg.jpg" alt="" class="lb-parallax-image">
  </div>
  <div class="lb-scroll-content">
    <h2>보이는 것, 그 너머로</h2>
    <p>보이는대 간택하는걸 스르넘은 다기과때응<br>감정된 찾기때 채우 더예드입니다.</p>
    <button class="btn-learn-more">더 알아보기</button>
  </div>
</section>
```

**JavaScript (스크롤 효과):**
```javascript
window.addEventListener('scroll', function() {
  var scrolled = window.pageYOffset;
  var parallax = document.querySelector('.lb-parallax-image');
  
  if (parallax) {
    var speed = 0.5;
    parallax.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
  }
});
```

---

### 17. Our Highlights - SNS 피드 (6x2) ⭐
```html
<section class="lb-section">
  <div class="lb-section-header">
    <h2>Our Highlights</h2>
  </div>
  
  <div class="lb-sns-grid">
    <!-- 6열 x 2행 = 12개 -->
    <a href="#" class="lb-sns-item" data-type="image">
      <img src="/sns-1.jpg" alt="">
      <div class="lb-sns-overlay">
        <span class="icon">📷</span>
      </div>
    </a>
    
    <a href="#" class="lb-sns-item" data-type="video">
      <img src="/sns-video-thumb.jpg" alt="">
      <div class="lb-sns-overlay">
        <span class="icon">▶</span>
      </div>
    </a>
    
    <!-- 12개 반복 -->
  </div>
</section>
```

**CSS:**
```css
.lb-sns-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-2);
}

.lb-sns-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.lb-sns-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.lb-sns-item:hover img {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .lb-sns-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### 18. 하단 배너 4개
```html
<section class="lb-bottom-banners">
  <div class="lb-bottom-banner-grid">
    <a href="#" class="lb-bottom-banner">
      <div class="lb-banner-icon">⏰</div>
      <h3>마감임박 타임세일</h3>
      <button>LEARN MORE</button>
    </a>
    
    <a href="#" class="lb-bottom-banner">
      <div class="lb-banner-icon">✨</div>
      <h3>브랜드 모음전</h3>
      <button>LEARN MORE</button>
    </a>
    
    <a href="#" class="lb-bottom-banner">
      <span class="badge">어류에서 특정바시옵션</span>
      <h3>현명한 가입 이벤트</h3>
      <button>LEARN MORE</button>
    </a>
    
    <a href="#" class="lb-bottom-banner">
      <h3>테스트</h3>
      <button>LEARN MORE →</button>
    </a>
  </div>
</section>
```

**레이아웃:**
```
┌──────┬──────┬──────┬──────┐
│      │      │      │      │
│  1   │  2   │  3   │  4   │
│      │      │      │      │
└──────┴──────┴──────┴──────┘
```

---

### 19. 푸터
```html
<footer class="lb-footer">
  <div class="lb-footer-content">
    <div class="lb-footer-brand">
      <h2>LE BLANC</h2>
      <p>상호: 디자인 플로어 · 대표: 달성주 · 대표전화: 1544-4941</p>
      <p>주소: 04554 서울특별시 ...</p>
    </div>
    
    <div class="lb-footer-links">
      <div class="lb-footer-col">
        <h4>고객센터</h4>
        <p>1544-4941</p>
        <p>평일 오전10:00 ~ 오후6:00</p>
        <p>점심 오전12:00 ~ 오후1:00</p>
        <a href="#">1:1문의 하기</a>
      </div>
      
      <div class="lb-footer-col">
        <h4>서비스 정보</h4>
        <ul>
          <li><a href="#">회사소개</a></li>
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보처리방침</a></li>
          <li><a href="#">이용안내</a></li>
        </ul>
      </div>
    </div>
    
    <div class="lb-footer-social">
      <a href="#">📷 Instagram</a>
      <a href="#">🎬 YouTube</a>
      <a href="#">🎵 TikTok</a>
      <a href="#">📌 Pinterest</a>
    </div>
  </div>
  
  <div class="lb-footer-bottom">
    <p>Copyright © DESIGN FLOOR All rights reserved. Designed by dfloor</p>
    <div>
      <a href="#">CAFE24</a>
      <a href="#">모바일로 가기</a>
    </div>
  </div>
</footer>
```

---

## 주요 기능 요약

### ⭐ 핵심 차별화 요소

1. **WEEKLY BEST 슬라이더**
   - 제품 4개씩 보임
   - 좌우 스크롤
   - 베스트/NEW 배지

2. **SHORTS (숏폼 영상)**
   - 세로 영상 여러개
   - 슬라이드 형태
   - 상품 링크 연동

3. **타임세일 카운트다운**
   - 실시간 시간 표시
   - 189일 9시간 11분...
   - JavaScript 카운터

4. **영상 배너 (YouTube)**
   - 반반 레이아웃
   - 좌측: 텍스트
   - 우측: 영상

5. **포토리뷰 슬라이더**
   - 실제 고객 리뷰
   - 5개 슬라이드
   - 모두보기 버튼

6. **스크롤 효과 배너**
   - Parallax 효과
   - 스크롤 시 이미지 이동

7. **SNS 피드 (6x2)**
   - Instagram 연동
   - 12개 그리드
   - 이미지/영상 혼합

---

## 기술 스택

### 필요한 기술

1. **HTML/CSS**
   - Grid Layout (4x3, 6x2)
   - Flexbox (헤더, 네비)
   - CSS Animations (Marquee, Parallax)

2. **JavaScript**
   - Slider 라이브러리 (Swiper.js 추천)
   - 카운트다운 타이머
   - Parallax 스크롤 효과
   - Intersection Observer (스크롤 애니메이션)

3. **외부 서비스**
   - YouTube API (영상 임베드)
   - Instagram API (SNS 피드)

4. **Cafe24 모듈**
   - `product_listmain` (상품 진열)
   - `product_listnormal` (일반 목록)
   - `board` (포토리뷰)

---

## 우리 스킨과의 차이

| 요소 | LE BLANC | 우리 스킨 | 필요 작업 |
|------|----------|-----------|----------|
| 메인 히어로 | 전체 화면 | 420px 고정 | ✅ 전체 화면 옵션 |
| WEEKLY BEST | ✅ 슬라이더 | ❌ 없음 | ✅ 추가 필요 |
| SHORTS | ✅ 숏폼 영상 | ❌ 없음 | ✅ 추가 필요 |
| NEW ARRIVALS | 4x3 그리드 | ❌ 3개 섹션만 | ✅ 그리드 확장 |
| 타임세일 | ✅ 카운트다운 | ❌ 없음 | ✅ 추가 필요 |
| 영상 배너 | ✅ YouTube | ❌ 없음 | ✅ 추가 필요 |
| 포토리뷰 | ✅ 슬라이더 | ❌ 없음 | ✅ 추가 필요 |
| 스크롤 효과 | ✅ Parallax | ❌ 없음 | ✅ 추가 필요 |
| SNS 피드 | ✅ 6x2 그리드 | ❌ 없음 | ✅ 추가 필요 |
| 카테고리 바로가기 | ❌ 없음 | ✅ 7개 원형 | ✅ 우리 강점 유지 |
| 브랜드 카피 | ❌ 일반 | ✅ 감성적 | ✅ 우리 강점 유지 |

---

## 결론

**LE BLANC 스킨 = 종합 쇼핑몰 플랫폼**
- 모든 기능 총망라
- 숏폼, 타임세일, SNS 연동 등
- 범용성 극대화

**우리 스킨 = 브랜드 부티크**
- 감성적 스토리텔링
- 미니멀 디자인
- 큐레이션 중심

**추천 방향:**
- LE BLANC의 기능 중 **브랜드 쇼핑몰에 필요한 것만** 선택적으로 도입
- 우리의 강점(브랜드 무드, 카피)은 유지
- 관리 시스템(config.xml)으로 ON/OFF 가능하게
