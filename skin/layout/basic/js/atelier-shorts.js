/**
 * ATELIER SHORTS - 세로형 영상 카드 슬라이더
 * 
 * 기능:
 * - PC: hover 시 영상 자동 재생
 * - 모바일: 재생 버튼 클릭 시 재생
 * - 영상 재생 중 상품 링크 카드 표시
 * - Swiper 라이브러리 활용
 * - 접근성 및 안정성 고려
 */

(function() {
  'use strict';

  var currentPlayingVideo = null;
  var swiperInstance = null;
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM 로드 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // 데이터가 없으면 종료
    if (!window.ATELIER_SHORTS_DATA || !window.ATELIER_SHORTS_DATA.length) {
      console.warn('ATELIER SHORTS: 데이터가 없습니다.');
      return;
    }

    var container = document.getElementById('atelier-shorts-container');
    if (!container) {
      console.warn('ATELIER SHORTS: 컨테이너가 없습니다.');
      return;
    }

    renderShorts();
    initSwiper();
    initVideoControls();
  }

  /**
   * 영상 카드 렌더링
   */
  function renderShorts() {
    var wrapper = document.querySelector('.atelier-shorts__slider-wrapper');
    if (!wrapper) return;

    var html = window.ATELIER_SHORTS_DATA.map(function(item) {
      return createShortCard(item);
    }).join('');

    wrapper.innerHTML = html;
  }

  /**
   * 개별 카드 HTML 생성
   */
  function createShortCard(item) {
    // 상품 링크가 없으면 상품 카드를 만들지 않음
    var productCardHTML = '';
    if (item.productUrl && item.productName) {
      productCardHTML = `
        <a href="${item.productUrl}" class="atelier-shorts__product-link" aria-label="${item.productName} 상품 보기">
          <div class="atelier-shorts__product-thumb">
            <img src="${item.productThumb}" alt="${item.productName}" loading="lazy" />
          </div>
          <div class="atelier-shorts__product-info">
            <p class="atelier-shorts__product-name">${item.productName}</p>
            <p class="atelier-shorts__product-price">${item.price}</p>
          </div>
          <svg class="atelier-shorts__product-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      `;
    }

    return `
      <div class="swiper-slide">
        <div class="atelier-shorts__card" data-short-id="${item.id}">
          <div class="atelier-shorts__video-wrapper">
            <video 
              class="atelier-shorts__video"
              src="${item.video}"
              poster="${item.poster}"
              muted
              playsinline
              loop
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
          
          ${productCardHTML}
        </div>
      </div>
    `;
  }

  /**
   * Swiper 초기화
   */
  function initSwiper() {
    if (!window.Swiper) {
      console.warn('ATELIER SHORTS: Swiper 라이브러리가 없습니다.');
      return;
    }

    var container = document.querySelector('.atelier-shorts__slider');
    if (!container) return;

    swiperInstance = new Swiper('.atelier-shorts__slider', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      loop: false,
      speed: 400,
      grabCursor: true,

      navigation: {
        nextEl: '.atelier-shorts__nav-next',
        prevEl: '.atelier-shorts__nav-prev',
      },

      pagination: {
        el: '.atelier-shorts__pagination',
        type: 'fraction',
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

      // 슬라이드 변경 시 모든 영상 정지
      on: {
        slideChange: function() {
          pauseAllVideos();
        },
      },
    });

    console.log('ATELIER SHORTS: Swiper 초기화 완료');
  }

  /**
   * 영상 컨트롤 초기화
   */
  function initVideoControls() {
    var cards = document.querySelectorAll('.atelier-shorts__card');

    cards.forEach(function(card) {
      var video = card.querySelector('.atelier-shorts__video');
      var playBtn = card.querySelector('.atelier-shorts__play-btn');

      if (!video) return;

      // PC: hover 자동 재생 (reduced motion이 아닐 때만)
      if (!isTouchDevice && !prefersReducedMotion) {
        card.addEventListener('mouseenter', function() {
          playVideo(video, card);
        });

        card.addEventListener('mouseleave', function() {
          pauseVideo(video);
        });
      }

      // 모바일: 재생 버튼 클릭
      if (playBtn) {
        playBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          if (video.paused) {
            playVideo(video, card);
          } else {
            pauseVideo(video);
          }
        });
      }

      // 키보드 포커스 시 상품 링크 표시
      var productLink = card.querySelector('.atelier-shorts__product-link');
      if (productLink) {
        productLink.addEventListener('focus', function() {
          card.classList.add('atelier-shorts__card--focused');
        });

        productLink.addEventListener('blur', function() {
          card.classList.remove('atelier-shorts__card--focused');
        });
      }

      // 영상 로드 에러 처리
      video.addEventListener('error', function() {
        console.error('ATELIER SHORTS: 영상 로드 실패 -', video.src);
        card.classList.add('atelier-shorts__card--error');
      });
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
    pauseAllVideos();
  });

  // Visibility API: 탭 전환 시 영상 정지
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      pauseAllVideos();
    }
  });
})();
