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

    var html = window.ATELIER_SHORTS_DATA.map(function(item) {
      return createShortCard(item);
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
  function createShortCard(item) {
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
      <div class="swiper-slide">
        <div class="atelier-shorts__card" data-short-id="${item.id}" data-short-type="${type}">
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
      slideToClickedSlide: true,
      spaceBetween: 16,
      loop: true,  // 무한 루프 활성화
      initialSlide: 2,  // 3번째 슬라이드부터 시작 (0-based index)
      speed: 400,
      grabCursor: true,
      loopAdditionalSlides: 2,  // loop 모드에서 추가 복제 슬라이드 수

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
          playActiveSlide();
          startAutoSlide();
        },
        slideChange: function() {
          pauseAllVideos();
          closeAllYouTubeIframes();
          clearActiveSlideState();
          playActiveSlide();
          startAutoSlide();
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
    if (index == null && swiperInstance) {
      // loop 모드에서는 realIndex 사용 (실제 슬라이드 인덱스)
      index = (swiperInstance.realIndex || 0) + 1;
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

    updatePaginationText();

    if (prefersReducedMotion) return;

    resetProgressFill();

    autoSlideTimer = setTimeout(function() {
      goToNextSlide();
    }, AUTO_SLIDE_MS);
  }

  /**
   * 다음 슬라이드로 전환 (무한 루프)
   */
  function goToNextSlide() {
    if (!swiperInstance) return;
    // loop 모드에서는 자동으로 무한 반복됨
    swiperInstance.slideNext();
  }

  /**
   * 영상 컨트롤 초기화 (이벤트 위임 사용)
   */
  function initVideoControls() {
    var container = document.querySelector('.atelier-shorts__slider');
    if (!container) return;

    // 재생 버튼 클릭 (이벤트 위임)
    container.addEventListener('click', function(e) {
      var playBtn = e.target.closest('.atelier-shorts__play-btn');
      if (!playBtn) return;

      e.preventDefault();
      e.stopPropagation();

      var card = playBtn.closest('.atelier-shorts__card');
      if (!card) return;

      if (!isActiveSlide(card)) {
        slideToCard(card);
        return;
      }

      var type = card.getAttribute('data-short-type');

      if (type === 'youtube') {
        var videoId = playBtn.getAttribute('data-video-id');
        if (videoId) {
          pauseAllVideos();
          closeAllYouTubeIframes();
          createYouTubeIframe(card, videoId, false);
        }
      } else {
        var video = card.querySelector('.atelier-shorts__video');
        if (video) {
          if (video.paused) {
            playVideo(video, card);
          } else {
            pauseVideo(video);
          }
        }
      }
    });

    // 비디오 ended 이벤트 (이벤트 위임)
    container.addEventListener('ended', function(e) {
      if (e.target.tagName === 'VIDEO') {
        var card = e.target.closest('.atelier-shorts__card');
        console.log('ATELIER SHORTS: 영상 종료, 다음 슬라이드로 전환');
        if (card && isActiveSlide(card)) {
          goToNextSlide();
        }
      }
    }, true); // capture phase에서 처리

    // 비디오 에러 이벤트 (이벤트 위임)
    container.addEventListener('error', function(e) {
      if (e.target.tagName === 'VIDEO') {
        var card = e.target.closest('.atelier-shorts__card');
        console.error('ATELIER SHORTS: 영상 로드 실패 -', e.target.src);
        if (card) {
          card.classList.add('atelier-shorts__card--error');
        }
      }
    }, true); // capture phase에서 처리

    // YouTube 닫기 버튼 (이벤트 위임)
    container.addEventListener('click', function(e) {
      var closeBtn = e.target.closest('.atelier-shorts__youtube-close');
      if (!closeBtn) return;

      e.preventDefault();
      e.stopPropagation();

      var card = closeBtn.closest('.atelier-shorts__card');
      if (card) {
        closeYouTubeIframe(card);
        startAutoSlide();
      }
    });

    // 상품 링크 포커스 처리 (이벤트 위임)
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

  function isActiveSlide(card) {
    var slide = card.closest('.swiper-slide');
    return slide && slide.classList.contains('swiper-slide-active');
  }

  function slideToCard(card) {
    if (!swiperInstance) return;
    var slide = card.closest('.swiper-slide');
    if (!slide) return;
    
    // loop 모드에서는 data-swiper-slide-index 사용
    var realIndex = slide.getAttribute('data-swiper-slide-index');
    if (realIndex !== null) {
      swiperInstance.slideToLoop(parseInt(realIndex, 10));
    }
  }

  function clearActiveSlideState() {
    document.querySelectorAll('.atelier-shorts__card--active').forEach(function(card) {
      card.classList.remove('atelier-shorts__card--active');
    });
  }

  function playActiveSlide() {
    if (prefersReducedMotion) return;

    var activeSlide = document.querySelector('.atelier-shorts__slider .swiper-slide-active');
    if (!activeSlide) {
      console.warn('ATELIER SHORTS: 활성 슬라이드를 찾을 수 없습니다');
      return;
    }

    var card = activeSlide.querySelector('.atelier-shorts__card');
    if (!card) {
      console.warn('ATELIER SHORTS: 활성 슬라이드에 카드가 없습니다');
      return;
    }

    var shortId = card.getAttribute('data-short-id');
    console.log('ATELIER SHORTS: 슬라이드 활성화 -', shortId, 'realIndex:', swiperInstance ? swiperInstance.realIndex : 'N/A');

    card.classList.add('atelier-shorts__card--active');

    var type = card.getAttribute('data-short-type');

    if (type === 'youtube') {
      var playBtn = card.querySelector('.atelier-shorts__youtube-play');
      var videoId = playBtn && playBtn.getAttribute('data-video-id');
      if (videoId) {
        createYouTubeIframe(card, videoId, true);
      }
      return;
    }

    var video = card.querySelector('.atelier-shorts__video');
    if (video) {
      playVideo(video, card);
    }
  }

  /**
   * YouTube iframe 생성 및 재생
   */
  function createYouTubeIframe(card, videoId, muted) {
    var container = card.querySelector('.atelier-shorts__youtube-iframe-container');
    if (!container) return;

    var existingIframe = container.querySelector('iframe');
    if (existingIframe && container.style.display !== 'none') {
      return;
    }

    // 비디오 재생 중에는 자동 슬라이드 타이머 중지
    clearAutoSlide();
    pauseProgressFill();

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

    // 표시
    container.style.display = 'block';
    if (poster) poster.style.display = 'none';
    if (playBtn) playBtn.style.display = 'none';
    card.classList.add('atelier-shorts__card--playing');

    // YouTube IFrame API를 사용하여 비디오 종료 감지
    initYouTubePlayer(uniqueId, card);
  }

  /**
   * YouTube IFrame API를 사용하여 비디오 종료 감지
   */
  function initYouTubePlayer(iframeId, card) {
    // YouTube IFrame API가 로드되어 있는지 확인
    if (!window.YT || !window.YT.Player) {
      // API가 없으면 로드
      if (!window.youtubeAPILoading) {
        window.youtubeAPILoading = true;
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      
      // API 로드 완료 후 플레이어 초기화
      window.onYouTubeIframeAPIReady = function() {
        createYouTubePlayerInstance(iframeId, card);
      };
      return;
    }
    
    createYouTubePlayerInstance(iframeId, card);
  }

  /**
   * YouTube Player 인스턴스 생성
   */
  function createYouTubePlayerInstance(iframeId, card) {
    try {
      var player = new YT.Player(iframeId, {
        events: {
          'onStateChange': function(event) {
            // 비디오 종료 시 (0 = YT.PlayerState.ENDED)
            if (event.data === 0) {
              console.log('ATELIER SHORTS: YouTube 비디오 종료, 다음 슬라이드로 전환');
              if (isActiveSlide(card)) {
                goToNextSlide();
              }
            }
          }
        }
      });
    } catch (e) {
      console.warn('ATELIER SHORTS: YouTube Player 생성 실패', e);
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
  function playVideo(video, card) {
    // 다른 영상이 재생 중이면 정지
    if (currentPlayingVideo && currentPlayingVideo !== video) {
      pauseVideo(currentPlayingVideo);
    }

    // 비디오 재생 중에는 자동 슬라이드 타이머 중지
    clearAutoSlide();
    pauseProgressFill();

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
        })
        .catch(function(error) {
          console.warn('ATELIER SHORTS: 영상 재생 실패', error);
          // 재생 실패 시 타이머 재시작
          startAutoSlide();
        });
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

    playActiveSlide();
    startAutoSlide();
  });
})();
