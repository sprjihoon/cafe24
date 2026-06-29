# LE BLANC 스킨 개선 계획
## 디자인센터 LE BLANC 분석 기반

> **작성일**: 2026-06-25  
> **목표**: 우리 스킨을 디자인센터 수준으로 개선 (브랜드 정체성 유지하면서)

---

## 현재 상황 요약

### 우리 스킨의 강점 ✅
1. **브랜드 무드** - 감성적 카피, 일관된 디자인
2. **커스텀 히어로** - 4개 슬라이드, 부드러운 전환
3. **카테고리 시스템** - 원형 아이콘 + 설명 문구
4. **모바일 최적화** - 2단 그리드, 터치 최적화

### 주요 부족한 점 ❌
1. **헤더 구조** - 우측 유틸리티 바 부족
2. **메인 배너** - 전체 화면 미지원, 영상 미지원
3. **관리 시스템** - HTML/FTP 방식, 설정 UI 없음
4. **메뉴 구성** - BEST, 세일 메뉴 없음

---

## 개선 작업 계획

### Phase 1: 헤더 개선 (2-3일)

#### 1.1 우측 유틸리티 바 확장
```html
<!-- 현재 -->
<div class="utilityRight">
  <a href="/member/login.html">로그인</a>
  <a href="/order/basket.html">장바구니</a>
  <a href="#search">검색</a>
</div>

<!-- 개선 후 -->
<div class="utilityRight">
  <a href="/member/login.html">로그인</a>
  <a href="/member/join.html">회원가입 <span class="badge">+2,000P</span></a>
  <a href="/board/index.html">커뮤니티</a>
  <a href="/order/basket.html" class="basket">
    <span class="count">{$basket_count}</span>
  </a>
  <a href="/myshop/index.html" class="mypage">마이페이지</a>
  <a href="#search" class="search">검색</a>
  <div class="languageSelector">
    <button>KR ▼</button>
    <ul class="dropdown">
      <li><a href="?lang=ko">한국어</a></li>
      <li><a href="?lang=en">English</a></li>
    </ul>
  </div>
</div>
```

**작업 파일:**
- `skin/layout/basic/layout.html`
- `skin/layout/basic/css/layout.css`

#### 1.2 이미지 로고 지원
```html
<!-- 현재 -->
<h1><a href="/">{$mall_name}</a></h1>
<script>
  document.querySelector('h1 a').textContent = 'ATELIER N.';
</script>

<!-- 개선 후 -->
<h1 module="Layout_LogoTop">
  <a href="/">
    <img src="/logo.png" alt="{$mall_name}" class="logoImage">
  </a>
</h1>
```

**config.xml 설정:**
```xml
<setting type="image" name="logo_image">
  <label>로고 이미지</label>
  <description>권장 크기: 200x60px</description>
</setting>
```

#### 1.3 네비게이션 확장 (선택)
```
현재: 전체보기 | 아우터 | 상의 | 하의 | 원피스 | 액세서리 | NEW IN

옵션 A (브랜드 유지):
전체보기 | 아우터 | 상의 | 하의 | 원피스 | 액세서리 | NEW IN | SALE

옵션 B (범용화):
메뉴방식 | 브랜드관 | BEST 50 | NEW 5% | 아우터 | 상의 | 하의 | ... | ON SALE
```

---

### Phase 2: 메인 배너 개선 (3-4일)

#### 2.1 전체 화면 옵션
```css
/* 현재 */
.lb-hero-placeholder {
  min-height: 420px;
}

/* 개선 후 */
.lb-hero-placeholder {
  min-height: 420px;
}

.lb-hero-placeholder.fullscreen {
  min-height: 100vh;
  min-height: 100svh; /* 모바일 주소창 고려 */
}
```

**config.xml 설정:**
```xml
<setting type="toggle" name="hero_fullscreen">
  <label>히어로 배너 전체 화면</label>
  <default>false</default>
</setting>
```

#### 2.2 영상 배경 지원
```html
<!-- 이미지 배경 (현재) -->
<div class="lb-hero-slide" style="background-image: url(...)">
  <div class="lb-hero-content">...</div>
</div>

<!-- 영상 배경 (개선) -->
<div class="lb-hero-slide">
  <video class="lb-hero-video" autoplay loop muted playsinline>
    <source src="/hero-video-1.mp4" type="video/mp4">
  </video>
  <div class="lb-hero-content">...</div>
</div>

<!-- 또는 YouTube 임베드 -->
<div class="lb-hero-slide">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID"
          class="lb-hero-video"></iframe>
  <div class="lb-hero-content">...</div>
</div>
```

**JavaScript 수정:**
```javascript
// basic.js의 initLbHeroSlider() 함수 확장
function initLbHeroSlider() {
  // 기존 로직...
  
  // 영상 슬라이드 자동 재생
  slides.forEach(function(slide) {
    var video = slide.querySelector('video');
    if (video) {
      slide.addEventListener('shown', function() {
        video.play();
      });
      slide.addEventListener('hidden', function() {
        video.pause();
      });
    }
  });
}
```

---

### Phase 3: 관리 시스템 구축 (5-7일)

#### 3.1 config.xml 생성
```xml
<?xml version="1.0" encoding="utf-8"?>
<skin version="1.0">
  <info>
    <name>ATELIER N. / LE BLANC</name>
    <version>1.0.0</version>
    <author>Your Name</author>
    <description>미니멀 브랜드 스킨 - 감성적 카피와 세련된 레이아웃</description>
  </info>
  
  <settings>
    <!-- 로고 -->
    <setting type="image" name="logo_image">
      <label>로고 이미지</label>
      <description>권장: 200x60px PNG (투명 배경)</description>
    </setting>
    
    <!-- 마키 배너 -->
    <setting type="text" name="marquee_text">
      <label>상단 마키 배너 문구</label>
      <default>50,000원 이상 무료배송 · 30일 무료반품</default>
    </setting>
    
    <!-- 히어로 배너 -->
    <setting type="toggle" name="hero_enabled">
      <label>히어로 배너 표시</label>
      <default>true</default>
    </setting>
    
    <setting type="toggle" name="hero_fullscreen">
      <label>히어로 배너 전체 화면</label>
      <default>false</default>
    </setting>
    
    <setting type="number" name="hero_slide_count">
      <label>히어로 슬라이드 개수</label>
      <min>1</min>
      <max>6</max>
      <default>4</default>
    </setting>
    
    <setting type="select" name="hero_slide_1_type">
      <label>슬라이드 1 - 배경 타입</label>
      <options>
        <option value="image">이미지</option>
        <option value="video">영상(MP4)</option>
        <option value="youtube">유튜브</option>
      </options>
      <default>image</default>
    </setting>
    
    <setting type="image" name="hero_slide_1_image">
      <label>슬라이드 1 - 이미지</label>
      <condition>hero_slide_1_type === 'image'</condition>
    </setting>
    
    <setting type="text" name="hero_slide_1_video_url">
      <label>슬라이드 1 - 영상 URL</label>
      <condition>hero_slide_1_type === 'video' || hero_slide_1_type === 'youtube'</condition>
    </setting>
    
    <setting type="text" name="hero_slide_1_title">
      <label>슬라이드 1 - 제목</label>
      <default>THE QUIET EDIT</default>
    </setting>
    
    <setting type="textarea" name="hero_slide_1_desc">
      <label>슬라이드 1 - 설명</label>
      <default>조용한 날들에 더 잘 어울리는 옷</default>
    </setting>
    
    <!-- 슬라이드 2, 3, 4도 동일 패턴 -->
    
    <!-- 브랜드 색상 -->
    <setting type="color" name="color_charcoal">
      <label>브랜드 메인 색상</label>
      <default>#2d2825</default>
    </setting>
    
    <setting type="color" name="color_ivory">
      <label>브랜드 서브 색상</label>
      <default>#faf8f5</default>
    </setting>
    
    <!-- 카테고리 카피 -->
    <setting type="text" name="category_outer_desc">
      <label>OUTER 카테고리 설명</label>
      <default>계절의 첫인상을 만드는 단정한 레이어</default>
    </setting>
    
    <!-- TOP, BOTTOM, DRESS 등도 동일 -->
    
    <!-- 푸터 뉴스레터 -->
    <setting type="text" name="footer_newsletter_title">
      <label>푸터 뉴스레터 제목</label>
      <default>A QUIETER WAY TO DRESS</default>
    </setting>
    
    <setting type="textarea" name="footer_newsletter_desc">
      <label>푸터 뉴스레터 설명</label>
      <default>새로운 컬렉션과 오래 입는 스타일 이야기를 가장 먼저 받아보세요.</default>
    </setting>
  </settings>
</skin>
```

#### 3.2 settings.html 생성
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ATELIER N. 스킨 설정</title>
  <style>
    .setting-group {
      margin: 30px 0;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }
    .setting-group h3 {
      margin-top: 0;
      color: #2d2825;
      font-size: 18px;
      font-weight: 600;
    }
    .setting-item {
      margin: 15px 0;
    }
    .setting-item label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #333;
    }
    .setting-item input[type="text"],
    .setting-item textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
    }
    .setting-item textarea {
      min-height: 80px;
      resize: vertical;
    }
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .3s;
      border-radius: 24px;
    }
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .3s;
      border-radius: 50%;
    }
    input:checked + .toggle-slider {
      background-color: #2d2825;
    }
    input:checked + .toggle-slider:before {
      transform: translateX(26px);
    }
    .preview-section {
      margin-top: 40px;
      padding: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="settings-container">
    <h2>ATELIER N. 스킨 설정</h2>
    
    <div class="setting-group">
      <h3>로고 및 브랜드</h3>
      
      <div class="setting-item">
        <label for="logo_image">로고 이미지</label>
        <input type="file" name="logo_image" accept="image/png,image/jpg,image/svg+xml">
        <p class="description">권장 크기: 200x60px (투명 배경 PNG)</p>
      </div>
      
      <div class="setting-item">
        <label for="marquee_text">마키 배너 문구</label>
        <input type="text" name="marquee_text" 
               value="50,000원 이상 무료배송 · 30일 무료반품">
      </div>
    </div>
    
    <div class="setting-group">
      <h3>히어로 배너</h3>
      
      <div class="setting-item">
        <label>
          <label class="toggle-switch">
            <input type="checkbox" name="hero_enabled" checked>
            <span class="toggle-slider"></span>
          </label>
          히어로 배너 표시
        </label>
      </div>
      
      <div class="setting-item">
        <label>
          <label class="toggle-switch">
            <input type="checkbox" name="hero_fullscreen">
            <span class="toggle-slider"></span>
          </label>
          전체 화면 모드
        </label>
        <p class="description">체크하면 배너가 화면 전체를 채웁니다</p>
      </div>
      
      <div class="setting-item">
        <label for="hero_slide_count">슬라이드 개수</label>
        <input type="number" name="hero_slide_count" 
               value="4" min="1" max="6">
      </div>
      
      <h4>슬라이드 1</h4>
      <div class="setting-item">
        <label>배경 타입</label>
        <select name="hero_slide_1_type">
          <option value="image" selected>이미지</option>
          <option value="video">영상 (MP4)</option>
          <option value="youtube">유튜브</option>
        </select>
      </div>
      
      <div class="setting-item">
        <label>제목</label>
        <input type="text" name="hero_slide_1_title" 
               value="THE QUIET EDIT">
      </div>
      
      <div class="setting-item">
        <label>설명</label>
        <textarea name="hero_slide_1_desc">조용한 날들에 더 잘 어울리는 옷</textarea>
      </div>
      
      <!-- 슬라이드 2, 3, 4도 동일 -->
    </div>
    
    <div class="setting-group">
      <h3>브랜드 색상</h3>
      
      <div class="setting-item">
        <label for="color_charcoal">메인 색상</label>
        <input type="color" name="color_charcoal" value="#2d2825">
      </div>
      
      <div class="setting-item">
        <label for="color_ivory">서브 색상</label>
        <input type="color" name="color_ivory" value="#faf8f5">
      </div>
    </div>
    
    <div class="setting-group">
      <h3>카테고리 설명</h3>
      
      <div class="setting-item">
        <label>OUTER</label>
        <input type="text" name="category_outer_desc" 
               value="계절의 첫인상을 만드는 단정한 레이어">
      </div>
      
      <div class="setting-item">
        <label>TOP</label>
        <input type="text" name="category_top_desc" 
               value="매일의 조합을 가장 편하게 시작하는 기본">
      </div>
      
      <!-- 나머지 카테고리들 -->
    </div>
    
    <div class="preview-section">
      <h3>미리보기</h3>
      <iframe src="/preview" width="100%" height="600"></iframe>
    </div>
    
    <button type="submit" class="btn-save">저장</button>
  </div>
</body>
</html>
```

#### 3.3 설정값 읽어오기 (JavaScript)
```javascript
// skin/layout/basic/js/skin-settings.js
(function() {
  // Cafe24 스킨 설정 API (가상)
  var settings = window.CAFE24_SKIN_SETTINGS || {};
  
  // 마키 배너 텍스트
  if (settings.marquee_text) {
    var marquee = document.querySelector('.lb-marquee-text');
    if (marquee) {
      marquee.textContent = settings.marquee_text;
    }
  }
  
  // 히어로 배너 전체 화면
  if (settings.hero_fullscreen) {
    var heroPlaceholder = document.querySelector('.lb-hero-placeholder');
    if (heroPlaceholder) {
      heroPlaceholder.classList.add('fullscreen');
    }
  }
  
  // 브랜드 색상 (CSS 변수 덮어쓰기)
  if (settings.color_charcoal || settings.color_ivory) {
    var style = document.createElement('style');
    style.textContent = ':root {';
    if (settings.color_charcoal) {
      style.textContent += '--color-charcoal:' + settings.color_charcoal + ';';
    }
    if (settings.color_ivory) {
      style.textContent += '--color-ivory:' + settings.color_ivory + ';';
    }
    style.textContent += '}';
    document.head.appendChild(style);
  }
  
  // 카테고리 카피 (기존 로직과 통합)
  var CATEGORY_COPY_SETTINGS = {
    outer: settings.category_outer_desc || '계절의 첫인상을 만드는 단정한 레이어',
    top: settings.category_top_desc || '매일의 조합을 가장 편하게 시작하는 기본',
    // ...
  };
  
  // 기존 CATEGORY_COPY와 병합
  window.CATEGORY_COPY = Object.assign(window.CATEGORY_COPY || {}, CATEGORY_COPY_SETTINGS);
})();
```

---

### Phase 4: 메인 컨텐츠 레이아웃 (3-4일)

#### 4.1 아이콘 메뉴 (7-8개)
```html
<div class="lb-icon-menu">
  <a href="/category/1" class="lb-icon-item">
    <div class="lb-icon">
      <svg><!-- 디자인 조명 아이콘 --></svg>
    </div>
    <span class="lb-icon-label">디자인 조명</span>
  </a>
  
  <a href="/category/2" class="lb-icon-item">
    <div class="lb-icon">
      <svg><!-- 화장품 아이콘 --></svg>
    </div>
    <span class="lb-icon-label">화장품</span>
  </a>
  
  <!-- 총 7-8개 -->
  <a href="/board/gallery" class="lb-icon-item">
    <div class="lb-icon">
      <svg><!-- 포토리뷰 아이콘 --></svg>
    </div>
    <span class="lb-icon-label">포토리뷰</span>
  </a>
  
  <a href="/board/qna" class="lb-icon-item">
    <div class="lb-icon">
      <svg><!-- 고객센터 아이콘 --></svg>
    </div>
    <span class="lb-icon-label">고객센터</span>
  </a>
</div>
```

**CSS:**
```css
.lb-icon-menu {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-8) 0;
  margin: 0 auto;
  max-width: 1200px;
}

.lb-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-charcoal);
  transition: transform 0.2s;
}

.lb-icon-item:hover {
  transform: translateY(-4px);
}

.lb-icon {
  width: 64px;
  height: 64px;
  background: var(--color-oatmeal);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-icon-label {
  font-size: 13px;
  font-weight: 500;
}
```

#### 4.2 프로모션 배너 (3개 가로 나열)
```html
<div class="lb-promo-banners">
  <div class="lb-promo-item">
    <img src="/banner-onsale.jpg" alt="ON SALE">
    <div class="lb-promo-content">
      <span class="lb-promo-badge">ON SALE</span>
      <h3>플라이아스 세일</h3>
      <p>매일 엄선이트는 신품을 만나보세요</p>
    </div>
  </div>
  
  <div class="lb-promo-item">
    <img src="/banner-mdpick.jpg" alt="MD'S PICK">
    <div class="lb-promo-content">
      <span class="lb-promo-badge">MD'S PICK</span>
      <h3>에디터의 선택</h3>
      <p>엄선된 당은 브랜드, 매일 엄선이트를 받니다</p>
    </div>
  </div>
  
  <div class="lb-promo-item">
    <img src="/banner-choice.jpg" alt="BETTER CHOICE">
    <div class="lb-promo-content">
      <span class="lb-promo-badge">BETTER CHOICE</span>
      <h3>선택의 순간</h3>
      <p>품절준는 속에서 만난 오아시스</p>
    </div>
  </div>
</div>
```

#### 4.3 메인 + 4분할 배너 레이아웃 ⭐ 핵심
```html
<div class="lb-split-banner">
  <!-- 좌측: 큰 슬라이더 -->
  <div class="lb-split-main">
    <div class="lb-split-slider">
      <div class="lb-split-slide active">
        <img src="/main-banner-1.jpg" alt="">
        <div class="lb-split-content">
          <h2>디자인 그 이상의 경험</h2>
          <p>당신의 브랜드에 새로운 이야기를 들어봅습니다</p>
          <a href="#" class="btn-learn-more">LEARN MORE</a>
        </div>
      </div>
      <!-- 추가 슬라이드 -->
    </div>
  </div>
  
  <!-- 우측: 4개 작은 배너 (2x2 그리드) -->
  <div class="lb-split-sub">
    <a href="/banner1" class="lb-split-sub-item">
      <img src="/sub-banner-1.jpg" alt="">
      <div class="lb-split-sub-content">
        <span class="lb-sub-eyebrow">THINK DIFFERENT</span>
        <h3>유명 쇼핑몰이<br>사용하는 이유</h3>
        <button class="btn-more">More</button>
      </div>
    </a>
    
    <a href="/banner2" class="lb-split-sub-item">
      <img src="/sub-banner-2.jpg" alt="">
      <div class="lb-split-sub-content">
        <span class="lb-sub-eyebrow">마음껏 누리는 프린의 자유</span>
        <h3>어떤 일이든<br>빠르고 간편하게.</h3>
        <button class="btn-more">More</button>
      </div>
    </a>
    
    <a href="/banner3" class="lb-split-sub-item">
      <img src="/sub-banner-3.jpg" alt="">
      <div class="lb-split-sub-content">
        <h3>무이스출렌 램프</h3>
        <button class="btn-hand-made">HAND MADE</button>
      </div>
    </a>
    
    <a href="/banner4" class="lb-split-sub-item">
      <img src="/sub-banner-4.jpg" alt="">
      <div class="lb-split-sub-content">
        <span class="lb-sub-product">AirPods Max</span>
        <h3>과감하리만치<br>독창적인 구조.</h3>
      </div>
    </a>
  </div>
</div>
```

**CSS (핵심):**
```css
.lb-split-banner {
  display: grid;
  grid-template-columns: 2fr 1fr; /* 좌측 2/3, 우측 1/3 */
  gap: var(--space-4);
  margin: var(--space-8) 0;
}

.lb-split-main {
  position: relative;
  min-height: 600px;
  background: var(--color-oatmeal);
  overflow: hidden;
}

.lb-split-slider {
  width: 100%;
  height: 100%;
}

.lb-split-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.lb-split-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-split-content {
  position: absolute;
  bottom: var(--space-8);
  left: var(--space-8);
  color: var(--color-charcoal);
}

.lb-split-sub {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--space-4);
}

.lb-split-sub-item {
  position: relative;
  overflow: hidden;
  background: var(--color-oatmeal);
  min-height: 290px;
  display: block;
  text-decoration: none;
  transition: transform 0.3s;
}

.lb-split-sub-item:hover {
  transform: scale(1.02);
}

.lb-split-sub-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-split-sub-content {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  right: var(--space-4);
}

.lb-sub-eyebrow {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-taupe);
}

.lb-split-sub-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin: var(--space-2) 0;
  line-height: 1.3;
}

.btn-more,
.btn-hand-made {
  padding: 8px 16px;
  font-size: 12px;
  border: 1px solid currentColor;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-more:hover,
.btn-hand-made:hover {
  background: var(--color-charcoal);
  color: var(--color-ivory);
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .lb-split-banner {
    grid-template-columns: 1fr;
  }
  
  .lb-split-sub {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 200px);
  }
}
```

#### 4.4 무료배송 안내
```html
<!-- index.html에 추가 -->
<div class="lb-info-section lb-shipping-info">
  <div class="lb-info-inner">
    <div class="lb-info-icon">
      <svg><!-- 배송 아이콘 --></svg>
    </div>
    <div class="lb-info-content">
      <h3>무료배송 서비스 안내</h3>
      <p>5만원 이상 구매시 무료배송</p>
      <a href="/board/free/read.html?no=1">자세히 보기</a>
    </div>
  </div>
</div>
```

#### 4.2 무이자 할부 안내
```html
<div class="lb-info-section lb-installment-info">
  <div class="lb-info-inner">
    <div class="lb-info-icon">
      <svg><!-- 카드 아이콘 --></svg>
    </div>
    <div class="lb-info-content">
      <h3>이달의 무이자 할부</h3>
      <p>5만원 이상 구매시 무료배송</p>
      <ul>
        <li>신한카드: 2~3개월</li>
        <li>삼성카드: 2~3개월</li>
        <li>KB국민카드: 2~3개월</li>
      </ul>
    </div>
  </div>
</div>
```

---

## 작업 일정

| Phase | 작업 | 기간 | 우선순위 |
|-------|------|------|----------|
| 1 | 헤더 개선 | 2-3일 | 🔴 높음 |
| 2 | 메인 배너 개선 (전체 화면, 영상 지원) | 3-4일 | 🔴 높음 |
| 3 | 관리 시스템 구축 (config.xml + settings.html) | 5-7일 | 🟡 중간 |
| 4 | 메인 컨텐츠 레이아웃 | 3-4일 | 🟡 중간 |
|   | - 아이콘 메뉴 (7-8개) | | |
|   | - 프로모션 배너 (3개) | | |
|   | - 메인+4분할 배너 | | |
|   | - 무료배송/할부 안내 | | |
| 5 | 푸터 개선 | 1-2일 | 🟢 낮음 |

**총 예상 기간: 14-20일**

---

## 최종 목표

### 완성 후 상태
```
✅ 디자인센터 LE BLANC의 실용성
✅ 우리 스킨의 브랜드 무드
✅ HTML/FTP 없는 관리 시스템
✅ 영상 지원 전체 화면 히어로 배너
✅ 확장된 헤더/네비게이션
✅ 모바일 완벽 대응
```

### 패키징 후
- Cafe24 디자인센터 등록
- 고객이 클릭 한 번으로 설치
- 관리자 UI에서 모든 설정 가능
- **브랜드 쇼핑몰 전용 프리미엄 스킨** 포지셔닝
