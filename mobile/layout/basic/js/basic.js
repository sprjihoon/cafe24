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
    '26': { label: 'OUTER', desc: '계절의 첫인상을 만드는 단정한 레이어' },
    '27': { label: 'TOP', desc: '매일의 조합을 가장 편하게 시작하는 기본' },
    '28': { label: 'BOTTOM', desc: '움직임은 편안하게, 선은 자연스럽게' },
    '29': { label: 'BAG & SHOES', desc: '룩의 균형을 마무리하는 작은 선택' },
    '30': { label: 'ACCESSORY', desc: '룩의 균형을 마무리하는 작은 선택' }
  };

  var CATEGORY_COPY_BY_KEY = {
    outer: CATEGORY_COPY['26'],
    top: CATEGORY_COPY['27'],
    knit: { label: 'KNIT', desc: '부드러운 온도와 오래 남는 질감' },
    shirt: { label: 'SHIRT', desc: '힘을 빼도 정돈돼 보이는 한 벌' },
    bottom: CATEGORY_COPY['28'],
    dress: { label: 'DRESS', desc: '특별한 날과 평범한 날 사이에 있는 옷' },
    bagshoes: CATEGORY_COPY['29']
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

  function init() {
    ensureMarquee();
    fixMobileLogo();
    initHeroSlider();
    initCategoryCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
