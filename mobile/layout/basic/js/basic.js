(function () {
  'use strict';

  function fixMobileLogo() {
    var logos = document.querySelectorAll('#header h1[module="Layout_LogoTop"] a, #header h1 a');
    for (var i = 0; i < logos.length; i++) {
      var link = logos[i];
      if (link.querySelector('.lb-logo-brand')) continue;

      var text = link.textContent.trim();
      if (!text || text.indexOf('{$') !== -1) text = 'ATELIER N.';

      link.innerHTML =
        '<span class="lb-logo-brand">' + text + '</span>' +
        '<span class="lb-logo-tagline">2026 FALL COLLECTION</span>';
    }
  }

  function ensureMarquee() {
    if (document.getElementById('marquee-banner')) return;

    var msg = '50,000원 이상 무료배송 &nbsp;&nbsp;·&nbsp;&nbsp; 30일 무료반품 &nbsp;&nbsp;·&nbsp;&nbsp; 일상에 자연스럽게 스며드는 정돈된 여성복 &nbsp;&nbsp;·&nbsp;&nbsp; 유행보다 오래 입는 기본 &nbsp;&nbsp;·&nbsp;&nbsp; ';
    var html =
      '<div id="marquee-banner">' +
        '<div class="marquee-track">' +
          '<span>' + msg + '</span>' +
          '<span>' + msg + '</span>' +
        '</div>' +
      '</div>';

    var wrap = document.getElementById('wrap');
    if (wrap && wrap.parentNode) {
      wrap.parentNode.insertBefore(document.createRange().createContextualFragment(html), wrap);
    }
  }

  function initHeroSlider() {
    var slider = document.getElementById('lb-hero-slider');
    if (!slider) return;

    var track = slider.querySelector('.lb-hero-track');
    var slides = track ? track.querySelectorAll('.lb-hero-slide') : [];
    var dots = slider.querySelectorAll('.lb-hero-dot');
    if (!track || !slides.length || !dots.length) return;

    var current = 0;
    var total = dots.length;
    var timer = null;

    function syncSlideWidths() {
      var w = slider.offsetWidth;
      for (var s = 0; s < slides.length; s++) {
        slides[s].style.width = w + 'px';
        slides[s].style.flexBasis = w + 'px';
      }
    }

    function goTo(index) {
      current = (index + total) % total;
      syncSlideWidths();
      track.style.transform = 'translateX(-' + (current * slider.offsetWidth) + 'px)';
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === current);
      }
    }

    function startAuto() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 6000);
    }

    for (var d = 0; d < dots.length; d++) {
      (function (idx) {
        dots[idx].addEventListener('click', function () {
          goTo(idx);
          startAuto();
        });
      })(d);
    }

    window.addEventListener('resize', function () { goTo(current); });
    goTo(0);
    startAuto();
  }

  var CATEGORY_COPY = {
    '24': { label: 'OUTER', desc: '계절의 첫인상을 만드는 단정한 레이어' },
    '25': { label: 'TOP', desc: '매일의 조합을 가장 편하게 시작하는 기본' },
    '26': { label: 'DRESS', desc: '특별한 날과 평범한 날 사이에 있는 옷' },
    '27': { label: 'BOTTOM', desc: '움직임은 편안하게, 선은 자연스럽게' },
    '28': { label: 'ACCESSORY', desc: '룩의 균형을 마무리하는 작은 선택' },
    '29': { label: 'OUTER', desc: '계절의 첫인상을 만드는 단정한 레이어' }
  };

  var CATEGORY_COPY_BY_KEY = {
    outer: CATEGORY_COPY['24'],
    top: CATEGORY_COPY['25'],
    knit: { label: 'KNIT', desc: '부드러운 온도와 오래 남는 질감' },
    shirt: { label: 'SHIRT', desc: '힘을 빼도 정돈돼 보이는 한 벌' },
    bottom: CATEGORY_COPY['27'],
    dress: CATEGORY_COPY['26'],
    bagshoes: CATEGORY_COPY['28']
  };

  function initCategoryCopy() {
    var intro = document.getElementById('lb-cat-page-intro');
    if (!intro) return;

    var eyebrow = document.getElementById('lb-cat-page-eyebrow');
    var desc = document.getElementById('lb-cat-page-desc');
    if (!eyebrow || !desc) return;

    var copy = null;
    var params = new URLSearchParams(window.location.search);
    var catKey = params.get('cat');
    var cateNo = params.get('cate_no');

    if (catKey && CATEGORY_COPY_BY_KEY[catKey]) {
      copy = CATEGORY_COPY_BY_KEY[catKey];
    } else if (cateNo && CATEGORY_COPY[cateNo]) {
      copy = CATEGORY_COPY[cateNo];
    }

    if (!copy) return;

    eyebrow.textContent = copy.label;
    desc.textContent = copy.desc;
    intro.hidden = false;
  }

  /*
   * 카테고리 아이콘 존 Swiper
   * CSS overflow-x:auto 는 부모 overflow:hidden 혹은 세로 스크롤 컨텍스트에서 신뢰성이 낮음.
   * Swiper.js 로 변환하면 터치 이벤트를 직접 처리하므로 안정적으로 좌우 스와이프됨.
   */
  function initCatZoneSwiper() {
    if (typeof Swiper === 'undefined') return;

    var zone = document.getElementById('lb-cat-zone');
    if (!zone) return;

    var inner = zone.querySelector('.lb-cat-inner');
    if (!inner) return;
    if (inner.classList.contains('swiper-initialized')) return;

    var items = Array.prototype.slice.call(inner.querySelectorAll('.lb-cat-item'));
    if (!items.length) return;

    /* 각 .lb-cat-item 을 swiper-slide 로 변환 */
    var wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    items.forEach(function(item) {
      item.parentNode.removeChild(item);
      var slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.appendChild(item);
      wrapper.appendChild(slide);
    });

    inner.appendChild(wrapper);

    /* .lb-cat-inner 를 Swiper 컨테이너로 변환 */
    inner.className = 'swiper lb-cat-swiper';

    new Swiper(inner, {
      slidesPerView: 'auto',   /* CSS width로 슬라이드 폭 제어 */
      spaceBetween: 0,
      freeMode: true,          /* 자유 스크롤 (snap 없음) */
      grabCursor: true,
      resistanceRatio: 0.6,
    });
  }

  function initFeatureSwiper() {
    if (typeof Swiper === 'undefined') return;
    var container = document.querySelector('.lb-feature-banners');
    if (!container) return;
    if (container.classList.contains('swiper-initialized')) return;
    /* slidesPerView:'auto' + CSS 너비 고정 → 페이지네이션이 슬라이드 위치와 정확히 일치 */
    new Swiper(container, {
      wrapperClass: 'lb-feature-inner',
      slideClass: 'lb-feature-box',
      slidesPerView: 'auto',
      spaceBetween: 12,
      grabCursor: true,
      centeredSlides: false,
      pagination: {
        el: '.lb-feature-pagination',
        clickable: true,
      },
    });
  }

  /*
   * WEEKLY BEST Swiper
   * Cafe24의 product_listmain_1 모듈은 ul.prdList > li.xans-record- 구조로 렌더링됨.
   * 이 함수가 렌더된 li 아이템을 Swiper 슬라이드로 변환하고 초기화한다.
   */
  function initWeeklyBestSwiper() {
    if (typeof Swiper === 'undefined') return;

    var section = document.getElementById('lb-section-best');
    if (!section) return;

    var prdWrap = section.querySelector('.lb-weekly-prd-wrap');
    if (!prdWrap) return;

    var prdList = prdWrap.querySelector('ul.prdList');
    if (!prdList) return;

    /* 이미 변환된 경우 중복 실행 방지 */
    if (section.querySelector('.lb-weekly-swiper')) return;

    /*
     * prdList.children: ul.prdList 의 직계 자식(li.xans-record-)만 선택.
     * querySelectorAll('li')를 쓰면 spec ul 내부 li 까지 포함되어 슬라이드가 파편화됨.
     */
    var items = Array.prototype.slice.call(prdList.children);
    /* 상품이 없으면 CSS fallback(scroll-snap)으로 표시 */
    if (items.length === 0) {
      prdList.style.cssText = 'display:flex;flex-wrap:nowrap;overflow-x:auto;gap:12px;padding:0 16px 12px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;';
      return;
    }

    /* Swiper DOM 생성 */
    var swiperEl = document.createElement('div');
    swiperEl.className = 'swiper lb-weekly-swiper';

    var wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    items.forEach(function(li) {
      var slide = document.createElement('div');
      slide.className = 'swiper-slide';
      /* li 내부 자식을 slide로 이동 */
      while (li.firstChild) {
        slide.appendChild(li.firstChild);
      }
      wrapper.appendChild(slide);
    });

    swiperEl.appendChild(wrapper);

    /* 페이지네이션 엘리먼트 */
    var pagiEl = section.querySelector('.lb-weekly-pagination');
    if (!pagiEl) {
      pagiEl = document.createElement('div');
      pagiEl.className = 'swiper-pagination lb-weekly-pagination';
      swiperEl.appendChild(pagiEl);
    }

    /* prdWrap 자리에 swiperEl 삽입 후 원본 숨김 */
    prdWrap.parentNode.insertBefore(swiperEl, prdWrap);
    prdWrap.style.display = 'none';

    /*
     * slidesPerView: 'auto' → CSS width(44vw)로 슬라이드 너비를 제어.
     * slidesPerView 숫자와 CSS width: 44vw !important 를 동시에 쓰면 충돌 발생.
     */
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      grabCursor: true,
      freeMode: false,
      pagination: {
        el: pagiEl,
        clickable: true,
      },
    });
  }

  function init() {
    ensureMarquee();
    fixMobileLogo();
    initHeroSlider();
    initCategoryCopy();
    /* Swiper가 로드된 뒤 실행 (CDN async) */
    if (typeof Swiper !== 'undefined') {
      initFeatureSwiper();
      initWeeklyBestSwiper();
    } else {
      window.addEventListener('load', function() {
        initFeatureSwiper();
        initWeeklyBestSwiper();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
