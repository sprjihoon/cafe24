/**
 * ATELIER N 슬라이더 JavaScript
 * Swiper.js를 사용한 상품 슬라이더
 * - WEEKLY BEST
 * - SHORTS (Phase 2.3)
 * - 포토리뷰 (Phase 4.2)
 */

(function() {
  'use strict';

  // DOM 로드 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initWeeklyBestSlider();
    initShortsSlider(); // Phase 2.3 ✓
    initPhotoReviewSlider(); // Phase 4.2 ✓
  }

  /**
   * 1. WEEKLY BEST 슬라이더
   * 4개 제품씩 보여주는 슬라이더
   */
  function initWeeklyBestSlider() {
    var container = document.querySelector('.lb-weekly-swiper');
    if (!container || !window.Swiper) return;

    // Swiper 초기화
    new Swiper('.lb-weekly-swiper', {
      // 기본 설정
      slidesPerView: 1.5,
      spaceBetween: 16,
      loop: false,
      speed: 600,

      // 자동 재생 (선택)
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },

      // 네비게이션
      navigation: {
        nextEl: '.lb-weekly-next',
        prevEl: '.lb-weekly-prev',
      },

      // 페이지네이션
      pagination: {
        el: '.lb-weekly-pagination',
        clickable: true,
        dynamicBullets: false,
      },

      // 반응형
      breakpoints: {
        // 640px 이상
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // 768px 이상
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        // 1024px 이상
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },

      // 접근성
      a11y: {
        prevSlideMessage: '이전 상품',
        nextSlideMessage: '다음 상품',
        paginationBulletMessage: '{{index}}번 슬라이드로 이동',
      },

      // 키보드
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    });

    console.log('WEEKLY BEST slider initialized');
  }

  /**
   * 2. SHORTS 숏폼 영상 슬라이더
   * Phase 2.3 ✓
   */
  function initShortsSlider() {
    var container = document.querySelector('.lb-shorts-swiper');
    if (!container || !window.Swiper) return;

    new Swiper('.lb-shorts-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: false,
      speed: 500,

      navigation: {
        nextEl: '.lb-shorts-next',
        prevEl: '.lb-shorts-prev',
      },

      pagination: {
        el: '.lb-shorts-pagination',
        clickable: true,
      },

      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 5,
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

      // 슬라이드 변경 시 영상 정지
      on: {
        slideChange: function() {
          pauseAllShortsVideos();
        },
      },
    });

    // 영상 재생/정지 이벤트
    var playButtons = document.querySelectorAll('.lb-shorts-play');
    playButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var item = this.closest('.lb-shorts-item');
        var video = item.querySelector('.lb-shorts-video');
        
        if (video.paused) {
          // 모든 영상 정지
          pauseAllShortsVideos();
          // 현재 영상 재생
          video.play();
          item.classList.add('is-playing');
        } else {
          video.pause();
          item.classList.remove('is-playing');
        }
      });
    });

    // 영상 클릭 시 재생/정지
    var videos = document.querySelectorAll('.lb-shorts-video');
    videos.forEach(function(video) {
      video.addEventListener('click', function() {
        var item = this.closest('.lb-shorts-item');
        var playBtn = item.querySelector('.lb-shorts-play');
        if (playBtn) {
          playBtn.click();
        }
      });

      // 영상 종료 시 재생 버튼 표시
      video.addEventListener('ended', function() {
        var item = this.closest('.lb-shorts-item');
        item.classList.remove('is-playing');
      });
    });

    console.log('SHORTS slider initialized');
  }

  /**
   * 모든 SHORTS 영상 정지
   */
  function pauseAllShortsVideos() {
    var videos = document.querySelectorAll('.lb-shorts-video');
    videos.forEach(function(video) {
      video.pause();
      var item = video.closest('.lb-shorts-item');
      if (item) {
        item.classList.remove('is-playing');
      }
    });
  }

  /**
   * 3. 포토리뷰 슬라이더 (카페24 게시판 모듈)
   * Phase 4.2에서 구현
   * 카페24 모듈이 로드된 후 초기화
   */
  function initPhotoReviewSlider() {
    var container = document.querySelector('.lb-review-swiper');
    if (!container || !window.Swiper) return;

    // 카페24 모듈이 렌더링될 시간을 주기 위해 약간의 딜레이
    setTimeout(function() {
      var slides = container.querySelectorAll('.xans-record-');
      if (slides.length === 0) {
        // 슬라이드가 없으면 다시 시도
        setTimeout(arguments.callee, 200);
        return;
      }

      new Swiper('.lb-review-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: slides.length > 1, // 슬라이드가 2개 이상일 때만 loop
        speed: 600,

        autoplay: slides.length > 1 ? {
          delay: 4000,
          disableOnInteraction: false,
        } : false,

        navigation: {
          nextEl: '.lb-review-next',
          prevEl: '.lb-review-prev',
        },

        pagination: {
          el: '.lb-review-pagination',
          clickable: true,
          dynamicBullets: true,
        },

        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        },

        a11y: {
          prevSlideMessage: '이전 리뷰',
          nextSlideMessage: '다음 리뷰',
        },

        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });

      console.log('Photo Review slider initialized with ' + slides.length + ' slides');
    }, 100);
  }

})();

