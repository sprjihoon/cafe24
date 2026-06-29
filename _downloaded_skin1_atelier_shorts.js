/**
 * ATELIER SHORTS - 세로형 영상 카드 슬라이더 (URL 입력형)
 * 
 * 기능:
 * - MP4: 활성 슬라이드 자동 재생 (음소거), 모바일 버튼 재생
 * - YouTube Shorts: 활성 슬라이드 자동 재생 (음소거), 클릭 시 음성 재생
 * - 영상 재생 중 상품 링크 카드 표시
 * - Swiper 라이브러리 활용
 * - 접근성 및 안정성 고려
 * - HTTPS URL 검증
 */

(function() {
  'use strict';

  var currentPlayingVideo = null;
  var swiperInstance = null;
  var autoSlideTimer = null;
  var progressFillEl = null;
  var progressTextEl = null;
  var currentRealIndex = -1;
  var AUTO_SLIDE_MS = 30000;
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM 로드 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('ATELIER SHORTS: 초기화 시작');
    
    // 데이터가 없으면 종료
    if (!window.ATELIER_SHORTS_DATA || !window.ATELIER_SHORTS_DATA.length) {
      console.warn('ATELIER SHORTS: 데이터가 없습니다.');
      return;
    }
    
    console.log('ATELIER SHORTS: 데이터 확인 완료', window.ATELIER_SHORTS_DATA.length, '개');

    var container = document.getElementById('atelier-shorts-container');
    if (!container) {
      console.warn('ATELIER SHORTS: 컨테이너가 없습니다.');
      return;
    }
    
    console.log('ATELIER SHORTS: 컨테이너 확인 완료');

    renderShorts();
    initProgressPagination();
    initSwiper();
    initVideoControls();
    
    console.log('ATELIER SHORTS: 초기화 완료');
  }

  /**
   * 영상 카드 렌더링
   */
  function renderShorts() {
    var wrapper = document.querySelector('.atelier-shorts__slider-wrapper');
    if (!wrapper) {
      console.error('ATELIER SHORTS: wrapper를 찾을 수 없습니다.');
      return;
    }

    var html = window.ATELIER_SHORTS_DATA.map(function(item, index) {
      return createShortCard(item, index);
    }).join('');

    wrapper.innerHTML = html;
    console.log('ATELIER SHORTS: 카드 렌더링 완료', window.ATELIER_SHORTS_DATA.length, '개');
  }

  /**
   * YouTube Shorts URL에서 VIDEO_ID 추출
   */
  function extractYouTubeId(url) {
    if (!url) return null;
    
    // https://www.youtube.com/shorts/VIDEO_ID
    var shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];
    
    // https://youtu.be/VIDEO_ID
    var shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];
    
    // https://www.youtube.com/watch?v=VIDEO_ID
    var watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];
    
    return null;
  }

  /**
   * URL이 HTTPS인지 검증
   */
  function isSecureUrl(url) {
    if (!url) return false;
    return url.toLowerCase().startsWith('https://');
  }

  /**
   * 개별 카드 HTML 생성
   */
  function createShortCard(item, index) {
    // URL 검증
    var videoUrl = isSecureUrl(item.videoUrl) ? item.videoUrl : '';
    var posterUrl = isSecureUrl(item.posterUrl) ? item.posterUrl : '';
    
    // 타입 결정
    var type = item.type === 'youtube' ? 'youtube' : 'mp4';
    var hasProduct = item.productUrl && item.productName;
    
    // YouTube 처리
    var videoHTML = '';
    if (type === 'youtube') {
      var videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        videoHTML = createYouTubeCard(item, videoId, posterUrl);
      } else {
        console.warn('ATELIER SHORTS: 잘못된 YouTube URL -', item.id);
        videoHTML = createPlaceholderCard(posterUrl);
      }
    } else {
      // MP4 처리
      if (videoUrl) {
        videoHTML = createMP4Card(item, videoUrl, posterUrl);
      } else {
        console.warn('ATELIER SHORTS: 영상 URL이 없습니다 -', item.id);
        videoHTML = createPlaceholderCard(posterUrl);
      }
    }

    // 상품 링크 카드
    var productCardHTML = '';
    if (hasProduct) {
      productCardHTML = `
        <a href="${item.productUrl}" class="atelier-shorts__product-link" aria-label="${item.productName} 상품 보기">
          <div class="atelier-shorts__product-thumb">
            <img src="${item.productThumbUrl || ''}" alt="${item.productName}" loading="lazy" onerror="this.style.opacity='0.3'" />
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
        <div class="atelier-shorts__card" data-short-id="${item.id}" data-short-type="${type}" data-short-index="${index}">
          ${videoHTML}
          ${productCardHTML}
        </div>
      </div>
    `;
  }

  /**
   * MP4 카드 생성
   */
  function createMP4Card(item, videoUrl, posterUrl) {
    return `
      <div class="atelier-shorts__video-wrapper">
        <video 
          class="atelier-shorts__video"
          src="${videoUrl}"
          poster="${posterUrl}"
          muted
          playsinline
          preload="metadata"
          aria-label="영상: ${item.productName || item.id}"
        ></video>
        
        <button class="atelier-shorts__play-btn" type="button" aria-label="영상 재생">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.4)"/>
            <path d="M19 15L33 24L19 33V15Z" fill="white"/>
          </svg>
        </button>
      </div>
    `;
  }

  /**
   * YouTube 카드 생성
   */
  function createYouTubeCard(item, videoId, posterUrl) {
    return `
      <div class="atelier-shorts__video-wrapper atelier-shorts__youtube-wrapper">
        <div class="atelier-shorts__youtube-poster" style="background-image: url('${posterUrl}')">
          <img src="${posterUrl}" alt="${item.productName || 'YouTube Shorts'}" class="atelier-shorts__poster-img" />
        </div>
        
        <button 
          class="atelier-shorts__play-btn atelier-shorts__youtube-play" 
          type="button" 
          aria-label="YouTube Shorts 재생"
          data-video-id="${videoId}"
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(255,0,0,0.9)"/>
            <path d="M19 15L33 24L19 33V15Z" fill="white"/>
          </svg>
        </button>
        
        <div class="atelier-shorts__youtube-iframe-container" style="display: none;"></div>
      </div>
    `;
  }

  /**
   * Placeholder 카드 생성 (에러 시)
   */
  function createPlaceholderCard(posterUrl) {
    return `
      <div class="atelier-shorts__video-wrapper atelier-shorts__placeholder">
        ${posterUrl ? `<img src="${posterUrl}" alt="Placeholder" class="atelier-shorts__poster-img" />` : ''}
        <div class="atelier-shorts__placeholder-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.2)"/>
            <path d="M24 14V24M24 30V34" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    `;
  }

  /**
   * Swiper 초기화
   */
  function initSwiper() {
    if (!window.Swiper) {
      console.error('ATELIER SHORTS: Swiper 라이브러리가 없습니다.');
      return;
    }
    
    console.log('ATELIER SHORTS: Swiper 라이브러리 확인 완료');

    var container = document.querySelector('.atelier-shorts__slider');
    if (!container) {
      console.error('ATELIER SHORTS: Swiper 컨테이너를 찾을 수 없습니다.');
      return;
    }

    swiperInstance = new Swiper('.atelier-shorts__slider', {
      slidesPerView: 1.2,
      centeredSlides: true,
      slideToClickedSlide: false,
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
        480: {
          slidesPerView: 1.35,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },

      a11y: {
        prevSlideMessage: '이전 영상',
        nextSlideMessage: '다음 영상',
      },

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      on: {
        init: function() {
          this.slideToLoop(2, 0, false);
          syncShortsState(2);
        },
        slideChangeTransitionEnd: function() {
          syncShortsState(this.realIndex);
        },
      },
    });

    console.log('ATELIER SHORTS: Swiper 초기화 완료');
  }

  function initProgressPagination() {
    progressFillEl = document.querySelector('.atelier-shorts__pagination-fill');
    progressTextEl = document.querySelector('.atelier-shorts__pagination-text');
    updatePaginationText();
  }

  function updatePaginationText(current) {
    if (!progressTextEl) return;
    var total = window.ATELIER_SHORTS_DATA.length;
    var index = current;
    if (index == null) {
      index = currentRealIndex + 1;
    }
    progressTextEl.textContent = index + ' / ' + total;
  }

  function clearAutoSlide() {
    if (autoSlideTimer) {
      clearTimeout(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function pauseProgressFill() {
    if (progressFillEl) {
      progressFillEl.classList.add('atelier-shorts__pagination-fill--paused');
    }
  }

  function resetProgressFill() {
    if (!progressFillEl) return;
    progressFillEl.classList.remove('atelier-shorts__pagination-fill--active');
    progressFillEl.classList.remove('atelier-shorts__pagination-fill--paused');
    void progressFillEl.offsetWidth;
    progressFillEl.classList.add('atelier-shorts__pagination-fill--active');
  }

  function startAutoSlide() {
    clearAutoSlide();
    if (!swiperInstance) return;

    updatePaginationText(currentRealIndex + 1);

    if (prefersReducedMotion) return;

    resetProgressFill();

    autoSlideTimer = setTimeout(function() {
      goToNextSlide();
    }, AUTO_SLIDE_MS);
  }

  /**
   * 다음 슬라이드로 전환
   */
  function goToNextSlide() {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
  }

  function getActiveSlide() {
    if (!swiperInstance || !swiperInstance.slides) return null;
    return swiperInstance.slides[swiperInstance.activeIndex] || null;
  }

  function getSlideRealIndex(slideEl) {
    if (!slideEl) return -1;
    var idx = parseInt(slideEl.getAttribute('data-short-index'), 10);
    return Number.isNaN(idx) ? -1 : idx;
  }

  function syncShortsState(realIndex) {
    if (!swiperInstance) return;
    if (realIndex == null || realIndex < 0) return;

    currentRealIndex = realIndex;
    clearAutoSlide();
    pauseProgressFill();
    resetProgressFill();
    pauseAllVideos();
    closeAllYouTubeIframes();
    clearActiveSlideState();

    var activeSlide = getActiveSlide();
    if (!activeSlide) return;

    var activeCard = activeSlide.querySelector('.atelier-shorts__card');
    if (!activeCard) return;

    activeCard.classList.add('atelier-shorts__card--active');
    updatePaginationText(realIndex + 1);

    var type = activeCard.getAttribute('data-short-type');
    if (type === 'youtube') {
      var playBtn = activeCard.querySelector('.atelier-shorts__youtube-play');
      var videoId = playBtn && playBtn.getAttribute('data-video-id');
      if (videoId) {
        createYouTubeIframe(activeCard, videoId, true, function() {
          startAutoSlide();
        });
      }
    } else {
      var video = activeCard.querySelector('.atelier-shorts__video');
      if (video) {
        playVideo(video, activeCard, function() {
          startAutoSlide();
        });
      }
    }

    console.log('[SHORTS SYNC]', {
      activeIndex: swiperInstance.activeIndex,
      realIndex: swiperInstance.realIndex,
      playingIndex: realIndex,
      total: window.ATELIER_SHORTS_DATA.length
    });
  }

  /**
   * 영상 컨트롤 초기화
   */
  function initVideoControls() {
    var container = document.querySelector('.atelier-shorts__slider');
    if (!container) return;

    container.addEventListener('click', function(e) {
      var card = e.target.closest('.atelier-shorts__card');
      if (!card || !swiperInstance) return;

      var clickedSlide = card.closest('.swiper-slide');
      var clickedIndex = getSlideRealIndex(clickedSlide);
      if (clickedIndex < 0) return;
      swiperInstance.slideToLoop(clickedIndex);
    });

    container.addEventListener('ended', function(e) {
      if (e.target.tagName === 'VIDEO') {
        var card = e.target.closest('.atelier-shorts__card');
        var slide = card && card.closest('.swiper-slide');
        if (getSlideRealIndex(slide) === currentRealIndex) {
          goToNextSlide();
        }
      }
    }, true);

    container.addEventListener('error', function(e) {
      if (e.target.tagName === 'VIDEO') {
        var card = e.target.closest('.atelier-shorts__card');
        console.error('ATELIER SHORTS: 영상 로드 실패 -', e.target.src);
        if (card) {
          card.classList.add('atelier-shorts__card--error');
        }
      }
    }, true);

    container.addEventListener('focus', function(e) {
      if (e.target.classList.contains('atelier-shorts__product-link')) {
        var card = e.target.closest('.atelier-shorts__card');
        if (card) {
          card.classList.add('atelier-shorts__card--focused');
        }
      }
    }, true);

    container.addEventListener('blur', function(e) {
      if (e.target.classList.contains('atelier-shorts__product-link')) {
        var card = e.target.closest('.atelier-shorts__card');
        if (card) {
          card.classList.remove('atelier-shorts__card--focused');
        }
      }
    }, true);
  }

  function clearActiveSlideState() {
    document.querySelectorAll('.atelier-shorts__card--active').forEach(function(card) {
      card.classList.remove('atelier-shorts__card--active');
    });
  }

  /**
   * YouTube iframe 생성 및 재생
   */
  function createYouTubeIframe(card, videoId, muted, onReady) {
    var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
    if (!container) return;

    var poster = card.querySelector('.atelier-shorts__youtube-poster');
    var playBtn = card.querySelector('.atelier-shorts__youtube-play');
    var muteParam = muted ? '1' : '0';
    
    // 고유한 iframe ID 생성 (loop 모드에서 중복 방지)
    var uniqueId = 'youtube-player-' + videoId + '-' + Date.now();

    // YouTube IFrame API를 사용하여 비디오 종료 감지 (enablejsapi=1 추가)
    var iframeSrc = 'https://www.youtube.com/embed/' + videoId +
                    '?autoplay=1&mute=' + muteParam +
                    '&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1';

    // iframe HTML (loop 제거 - 비디오 종료 감지를 위해)
    container.innerHTML = `
      <iframe
        src="${iframeSrc}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="atelier-shorts__youtube-iframe"
        id="${uniqueId}"
      ></iframe>
      <button class="atelier-shorts__youtube-close" type="button" aria-label="닫기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6L18 18M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;

    container.style.display = 'block';
    if (poster) poster.style.display = 'none';
    if (playBtn) playBtn.style.display = 'none';
    card.classList.add('atelier-shorts__card--playing');

    initYouTubePlayer(uniqueId, card, onReady);
  }

  /**
   * YouTube IFrame API를 사용하여 비디오 종료 감지
   */
  function initYouTubePlayer(iframeId, card, onReady) {
    if (!window.YT || !window.YT.Player) {
      if (!window.youtubeAPILoading) {
        window.youtubeAPILoading = true;
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = function() {
        createYouTubePlayerInstance(iframeId, card, onReady);
      };
      return;
    }

    createYouTubePlayerInstance(iframeId, card, onReady);
  }

  /**
   * YouTube Player 인스턴스 생성
   */
  function createYouTubePlayerInstance(iframeId, card, onReady) {
    try {
      new YT.Player(iframeId, {
        events: {
          onReady: function() {
            if (typeof onReady === 'function') {
              onReady();
            }
          },
          onStateChange: function(event) {
            if (event.data === 0) {
              var slide = card.closest('.swiper-slide');
              if (getSlideRealIndex(slide) === currentRealIndex) {
                goToNextSlide();
              }
            }
          }
        }
      });
    } catch (e) {
      console.warn('ATELIER SHORTS: YouTube Player 생성 실패', e);
      if (typeof onReady === 'function') {
        onReady();
      }
    }
  }

  /**
   * YouTube iframe 닫기
   */
  function closeYouTubeIframe(card) {
    var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
    var poster = card.querySelector('.atelier-shorts__youtube-poster');
    var playBtn = card.querySelector('.atelier-shorts__youtube-play');

    if (container) {
      container.innerHTML = '';
      container.style.display = 'none';
    }
    if (poster) poster.style.display = 'block';
    if (playBtn) playBtn.style.display = 'flex';
    card.classList.remove('atelier-shorts__card--playing');
  }

  /**
   * 모든 YouTube iframe 닫기
   */
  function closeAllYouTubeIframes() {
    var containers = document.querySelectorAll('.atelier-shorts__youtube-iframe-container');
    containers.forEach(function(container) {
      var card = container.closest('.atelier-shorts__card');
      if (card) {
        closeYouTubeIframe(card);
      }
    });
  }

  /**
   * 영상 재생
   */
  function playVideo(video, card, onReady) {
    video.currentTime = 0;
    var playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(function() {
          currentPlayingVideo = video;
          card.classList.add('atelier-shorts__card--playing');
          var playBtn = card.querySelector('.atelier-shorts__play-btn');
          if (playBtn) {
            playBtn.setAttribute('aria-label', '영상 정지');
          }
          if (typeof onReady === 'function') {
            onReady();
          }
        })
        .catch(function(error) {
          console.warn('ATELIER SHORTS: 영상 재생 실패', error);
          if (typeof onReady === 'function') {
            onReady();
          }
        });
      return;
    }

    if (typeof onReady === 'function') {
      onReady();
    }
  }

  /**
   * 영상 정지
   */
  function pauseVideo(video) {
    if (!video) return;
    video.pause();
    video.currentTime = 0;

    var card = video.closest('.atelier-shorts__card');
    if (card) {
      card.classList.remove('atelier-shorts__card--playing');
      var playBtn = card.querySelector('.atelier-shorts__play-btn');
      if (playBtn) {
        playBtn.setAttribute('aria-label', '영상 재생');
      }
    }

    if (currentPlayingVideo === video) {
      currentPlayingVideo = null;
    }
  }

  /**
   * 모든 영상 정지
   */
  function pauseAllVideos() {
    var videos = document.querySelectorAll('.atelier-shorts__video');
    videos.forEach(function(video) {
      pauseVideo(video);
    });
  }

  // 페이지 이탈 시 모든 영상 정지
  window.addEventListener('beforeunload', function() {
    clearAutoSlide();
    pauseAllVideos();
    closeAllYouTubeIframes();
  });

  // Visibility API: 탭 전환 시 영상 정지
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      clearAutoSlide();
      pauseProgressFill();
      pauseAllVideos();
      closeAllYouTubeIframes();
      return;
    }

    if (swiperInstance) {
      syncShortsState(swiperInstance.realIndex);
    }
  });
})();
