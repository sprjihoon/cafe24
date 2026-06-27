/**
 * ATELIER SHORTS
 */
(function() {
  'use strict';

  var START_INDEX = 2;
  var AUTO_SLIDE_MS = 20000;
  var swiper = null;
  var progressFillEl = null;
  var progressTextEl = null;
  var autoSlideTimer = null;

  window.__ATELIER_SHORTS_BUILD__ = 'LOOP-FIX-20260627-F';
  console.log('[ATELIER SHORTS] loaded DEBUG-20260626-A');
  window.__atelierShortsInitCount = (window.__atelierShortsInitCount || 0) + 1;
  console.log('[ATELIER SHORTS] init count:', window.__atelierShortsInitCount);
  window.__atelierShortsCurrentIndex = -1;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (!window.ATELIER_SHORTS_DATA || !window.ATELIER_SHORTS_DATA.length) return;
    if (!document.getElementById('atelier-shorts-container')) return;

    renderShorts();
    progressFillEl = document.querySelector('.atelier-shorts__pagination-fill');
    progressTextEl = document.querySelector('.atelier-shorts__pagination-text');

    initSwiper();
    bindCardEvents();
  }

  function renderShorts() {
    var wrapper = document.querySelector('.atelier-shorts__slider-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = window.ATELIER_SHORTS_DATA.map(function(item, index) {
      var type = item.type === 'youtube' ? 'youtube' : 'mp4';
      var videoHtml = type === 'youtube' ? createYouTubeCard(item) : createMp4Card(item);
      var productHtml = '';
      if (item.productUrl && item.productName) {
        productHtml = `
          <a href="${item.productUrl}" class="atelier-shorts__product-link atelier-shorts__product-banner" aria-label="${item.productName} 상품 보기">
            <div class="atelier-shorts__product-thumb">
              <img src="${item.productThumbUrl || ''}" alt="${item.productName}" loading="lazy" />
            </div>
            <div class="atelier-shorts__product-info">
              <p class="atelier-shorts__product-name">${item.productName}</p>
              <p class="atelier-shorts__product-price">${item.price || ''}</p>
            </div>
            <svg class="atelier-shorts__product-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        `;
      }

      return `
        <div class="swiper-slide atelier-shorts__slide" data-short-index="${index}">
          <div class="atelier-shorts__card" data-short-index="${index}" data-short-type="${type}">
            ${videoHtml}
            ${productHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  function createMp4Card(item) {
    return `
      <div class="atelier-shorts__video-wrapper">
        <video class="atelier-shorts__video" src="${item.videoUrl || ''}" poster="${item.posterUrl || ''}" muted playsinline preload="metadata"></video>
        <button class="atelier-shorts__play-btn" type="button" aria-label="영상 재생">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.4)"/>
            <path d="M19 15L33 24L19 33V15Z" fill="white"/>
          </svg>
        </button>
      </div>
    `;
  }

  function getYoutubeId(url) {
    if (!url) return '';
    var shorts = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shorts) return shorts[1];
    var shortUrl = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortUrl) return shortUrl[1];
    var watch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    return watch ? watch[1] : '';
  }

  function createYouTubeCard(item) {
    var videoId = getYoutubeId(item.videoUrl);
    return `
      <div class="atelier-shorts__video-wrapper atelier-shorts__youtube-wrapper">
        <div class="atelier-shorts__youtube-poster" style="background-image:url('${item.posterUrl || ''}')">
          <img src="${item.posterUrl || ''}" alt="${item.productName || ''}" class="atelier-shorts__poster-img" />
        </div>
        <button class="atelier-shorts__play-btn atelier-shorts__youtube-play" type="button" data-video-id="${videoId}" aria-label="YouTube Shorts 재생">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(255,0,0,0.9)"/>
            <path d="M19 15L33 24L19 33V15Z" fill="white"/>
          </svg>
        </button>
        <div class="atelier-shorts__youtube-iframe-container" style="display:none;"></div>
      </div>
    `;
  }

  function initSwiper() {
    if (!window.Swiper) return;
    // Swiper 11 loop = 슬라이드 DOM 재배치 방식 (클론 없음)
    // initialSlide로 시작 위치 설정 → slideToLoop 불필요
    // findActiveCardByIndex는 data-swiper-slide-index 기준으로 검색해야 함
    swiper = new Swiper('.atelier-shorts__slider', {
      slidesPerView: 1.2,
      centeredSlides: true,
      slideToClickedSlide: false,
      initialSlide: START_INDEX,
      spaceBetween: 16,
      loop: true,
      speed: 400,
      grabCursor: true,
      allowTouchMove: true,
      navigation: {
        nextEl: '.atelier-shorts__nav-next',
        prevEl: '.atelier-shorts__nav-prev',
      },
      breakpoints: {
        480: { slidesPerView: 1.4, spaceBetween: 16 },
        640: { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1440: { slidesPerView: 4, spaceBetween: 24 },
      },
      on: {
        init: function() {
          var self = this;
          // loopFix(): 초기 진입 시 순환 버퍼를 즉시 구성
          // 이걸 호출해야 initialSlide 주변에 루프 슬라이드(7,1,2 등)가 배치됨
          if (typeof self.loopFix === 'function') {
            self.loopFix();
          }
          requestAnimationFrame(function() {
            setActiveShort(self.realIndex, { autoplay: true, source: 'initial' });
          });
        },
        slideChangeTransitionEnd: function() {
          setActiveShort(this.realIndex, { autoplay: true, source: 'transition' });
        },
      },
    });
  }

  function bindCardEvents() {
    var slider = document.querySelector('.atelier-shorts__slider');
    if (!slider) return;

    slider.addEventListener('click', function(e) {
      var card = e.target.closest('.atelier-shorts__card');
      if (!card || !swiper) return;
      var index = parseInt(card.dataset.shortIndex, 10);
      if (Number.isNaN(index)) return;
      swiper.slideToLoop(index);
    });

    slider.addEventListener('ended', function(e) {
      if (e.target.tagName !== 'VIDEO' || !swiper) return;
      if (window.__atelierShortsCurrentIndex !== swiper.realIndex) return;
      swiper.slideNext();
    }, true);

    slider.querySelectorAll('.atelier-shorts__card').forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        card.classList.add('is-hovered');
        playCardMedia(card, false);
      });

      card.addEventListener('mouseleave', function() {
        card.classList.remove('is-hovered');
        pauseCardMedia(card);
      });

      card.addEventListener('focusin', function(e) {
        if (e.target.closest('.atelier-shorts__product-link')) {
          card.classList.add('is-hovered');
        }
      });

      card.addEventListener('focusout', function(e) {
        if (!card.contains(e.relatedTarget)) {
          card.classList.remove('is-hovered');
        }
      });
    });
  }

  function clearProgressTimer() {
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function resetProgressBar() {
    if (!progressFillEl) return;
    progressFillEl.classList.remove('atelier-shorts__pagination-fill--active');
    progressFillEl.classList.remove('atelier-shorts__pagination-fill--paused');
    void progressFillEl.offsetWidth;
  }

  function startProgress(index) {
    clearProgressTimer();
    resetProgressBar();
    if (progressFillEl) progressFillEl.classList.add('atelier-shorts__pagination-fill--active');
    autoSlideTimer = setTimeout(function() {
      if (!swiper) return;
      swiper.slideNext();
    }, AUTO_SLIDE_MS);
  }

  function closeAllYoutubeIframes() {
    document.querySelectorAll('.atelier-shorts__card').forEach(function(card) {
      var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
      var poster = card.querySelector('.atelier-shorts__youtube-poster');
      var playBtn = card.querySelector('.atelier-shorts__youtube-play');
      if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
      }
      if (poster) poster.style.display = 'block';
      if (playBtn) playBtn.style.display = 'flex';
    });
  }

  function pauseAllVideos() {
    document.querySelectorAll('.atelier-shorts__video').forEach(function(video) {
      video.pause();
      video.currentTime = 0;
    });
  }

  function clearCardState() {
    document.querySelectorAll('.atelier-shorts__card').forEach(function(card) {
      card.classList.remove('atelier-shorts__card--active', 'atelier-shorts__card--playing', 'is-active', 'is-playing');
    });
  }

  function findActiveCardByIndex(index) {
    // Swiper 11 loop = DOM 재배치 방식 (swiper-slide-duplicate 없음)
    // data-swiper-slide-index 속성으로 논리 인덱스 조회 (DOM 순서와 무관)
    var slide = document.querySelector(
      '.atelier-shorts__slider .swiper-slide[data-swiper-slide-index="' + index + '"]'
    );
    if (slide) {
      var card = slide.querySelector('.atelier-shorts__card');
      if (card) return card;
    }
    // 폴백: 카드의 data-short-index로 직접 검색
    return document.querySelector(
      '.atelier-shorts__card[data-short-index="' + index + '"]'
    );
  }

  function setActiveShort(index, opts) {
    if (!swiper) return;
    if (index < 0 || index >= window.ATELIER_SHORTS_DATA.length) return;

    clearProgressTimer();
    pauseAllVideos();
    closeAllYoutubeIframes();
    clearCardState();

    var card = findActiveCardByIndex(index);
    if (!card) return;

    card.classList.add('atelier-shorts__card--active', 'atelier-shorts__card--playing', 'is-active', 'is-playing');
    window.__atelierShortsCurrentIndex = index;
    if (progressTextEl) {
      progressTextEl.textContent = (index + 1) + ' / ' + window.ATELIER_SHORTS_DATA.length;
    }

    playCardMedia(card, true);
    startProgress(index);
    logState(index, opts && opts.source ? opts.source : 'unknown');
  }

  function playCardMedia(card, muted) {
    var type = card.getAttribute('data-short-type');
    if (type === 'youtube') {
      var videoId = card.querySelector('.atelier-shorts__youtube-play')?.getAttribute('data-video-id');
      if (!videoId) return;
      var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
      var poster = card.querySelector('.atelier-shorts__youtube-poster');
      var playBtn = card.querySelector('.atelier-shorts__youtube-play');
      var muteParam = muted ? '1' : '0';
      var src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=' + muteParam + '&playsinline=1&controls=1&enablejsapi=1&rel=0';
      if (container) {
        container.innerHTML = '<iframe src="' + src + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="atelier-shorts__youtube-iframe"></iframe>';
        container.style.display = 'block';
      }
      if (poster) poster.style.display = 'none';
      if (playBtn) playBtn.style.display = 'none';
      return;
    }

    var video = card.querySelector('.atelier-shorts__video');
    if (!video) return;
    video.currentTime = 0;
    video.muted = !!muted;
    video.play().catch(function() {});
  }

  function pauseCardMedia(card) {
    if (!card) return;
    var video = card.querySelector('.atelier-shorts__video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
    var poster = card.querySelector('.atelier-shorts__youtube-poster');
    var playBtn = card.querySelector('.atelier-shorts__youtube-play');
    if (container) {
      container.innerHTML = '';
      container.style.display = 'none';
    }
    if (poster) poster.style.display = 'block';
    if (playBtn) playBtn.style.display = 'flex';
    card.classList.remove('atelier-shorts__card--playing', 'is-playing');
  }

  function logState(index, source) {
    if (!swiper) return;
    console.log('[SHORTS STATE]', {
      source: source || 'event',
      activeIndex: swiper.activeIndex,
      requestedIndex: index,
      playingIndex: window.__atelierShortsCurrentIndex,
      activeCard: document.querySelector('.atelier-shorts__card.is-active')?.dataset.shortIndex,
      playingVideo: document.querySelector('.atelier-shorts__card.is-playing')?.dataset.shortIndex
    });
  }
})();
