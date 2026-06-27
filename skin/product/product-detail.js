/**
 * LE BLANC - Product Detail Page JavaScript
 * 상품 상세 페이지 인터랙션
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
    initImageSliders();
    loadPhotoReviews();
    enhanceProductOptions();
    enhanceQuantitySelector();
    initProductTabs();
    dedupeProductNameRow();
    initWishlistButton();
  }

  /**
   * 관심상품 아이콘 버튼 — 클릭 시 찜 상태 토글
   */
  function initWishlistButton() {
    var wishBtn = document.querySelector('.xans-product-detail .lb-buy-wish');
    if (!wishBtn) return;

    wishBtn.addEventListener('click', function() {
      var self = this;
      window.setTimeout(function() {
        self.classList.toggle('is-wished');
      }, 300);
    });
  }

  /**
   * 상품정보표의 '상품명' 행이 headingArea와 중복되면 숨김
   */
  function dedupeProductNameRow() {
    var root = document.querySelector('.xans-product-detail');
    if (!root) return;

    var titleEl = root.querySelector('.headingArea .lb-product-title, .headingArea h2');
    if (!titleEl) return;

    var titleText = titleEl.textContent.replace(/\[.*?\]\s*/, '').trim();
    if (!titleText) return;

    root.querySelectorAll('.xans-product-detaildesign table tr').forEach(function(tr) {
      var th = tr.querySelector('th');
      var td = tr.querySelector('td');
      if (!th || !td) return;

      var label = th.textContent.trim();
      if (label !== '상품명' && label !== 'Product Name') return;

      var cellText = td.textContent.trim();
      if (cellText === titleText || cellText.indexOf(titleText) === 0) {
        tr.classList.add('is-duplicate-name');
        tr.setAttribute('aria-hidden', 'true');
        var cells = tr.querySelectorAll('th, td');
        for (var i = 0; i < cells.length; i++) {
          cells[i].setAttribute('hidden', 'hidden');
        }
      }
    });
  }

  /**
   * 상품 탭 메뉴 초기화
   */
  function initProductTabs() {
    const tabMenus = document.querySelectorAll('.ec-base-tab .menu');
    if (!tabMenus.length) return;

    // 각 탭 메뉴에 대해 처리
    tabMenus.forEach(function(menu) {
      const tabs = menu.querySelectorAll('li a');
      
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // 모든 탭에서 selected 제거
            const allMenus = document.querySelectorAll('.ec-base-tab .menu');
            allMenus.forEach(function(m) {
              m.querySelectorAll('li').forEach(function(item) {
                item.classList.remove('selected');
              });
            });
            
            // 클릭한 탭에 selected 추가
            this.parentElement.classList.add('selected');
            
            // 스무스 스크롤
            const headerHeight = 120; // 헤더 + 탭 높이
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    });

    // 스크롤 시 active 탭 감지
    window.addEventListener('scroll', function() {
      updateActiveTab();
    }, { passive: true });
  }

  /**
   * 스크롤 위치에 따라 active 탭 업데이트
   */
  function updateActiveTab() {
    const sections = [
      { id: 'prdDetail', element: document.getElementById('prdDetail') },
      { id: 'prdInfo', element: document.getElementById('prdInfo') },
      { id: 'prdReview', element: document.getElementById('prdReview') },
      { id: 'prdQnA', element: document.getElementById('prdQnA') },
      { id: 'prdRelated', element: document.querySelector('.relation') }
    ];

    const scrollPos = window.pageYOffset + 200;

    let currentSection = null;

    sections.forEach(function(section) {
      if (section.element) {
        const sectionTop = section.element.offsetTop;
        const sectionHeight = section.element.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      }
    });

    if (currentSection) {
      const allMenus = document.querySelectorAll('.ec-base-tab .menu');
      allMenus.forEach(function(menu) {
        menu.querySelectorAll('li').forEach(function(item) {
          const link = item.querySelector('a');
          const href = link.getAttribute('href');
          
          if (href === '#' + currentSection) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });
      });
    }
  }

  /**
   * 이미지 슬라이더 초기화 (Swiper)
   */
  function initImageSliders() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper not loaded');
      return;
    }

    // 썸네일 슬라이더
    const thumbSwiper = new Swiper('.lb-thumb-swiper', {
      spaceBetween: 8,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    // 메인 슬라이더
    const mainSwiper = new Swiper('.lb-main-swiper', {
      spaceBetween: 0,
      thumbs: {
        swiper: thumbSwiper,
      },
      pagination: {
        el: '.lb-gallery-pagination',
        clickable: true,
      },
      navigation: false,
      keyboard: {
        enabled: true,
      },
      loop: false,
    });
  }

  /**
   * 포토리뷰 로드
   */
  function loadPhotoReviews() {
    const container = document.querySelector('.lb-photo-reviews-items');
    if (!container) return;

    // 포토리뷰 데이터 (실제로는 API나 모듈에서 가져와야 함)
    // 여기서는 예시 데이터를 사용
    const reviews = [
      { no: 1, image: '/web/upload/reviews/review-1.jpg' },
      { no: 2, image: '/web/upload/reviews/review-2.jpg' },
      { no: 3, image: '/web/upload/reviews/review-3.jpg' },
    ];

    reviews.forEach(function(review) {
      const item = document.createElement('div');
      item.className = 'lb-review-photo-item';
      item.innerHTML = '<a href="#prdReview"><img src="' + review.image + '" alt="포토리뷰 ' + review.no + '" onerror="this.src=\'/web/upload/lookbook/look-1.jpg\'"></a>';
      container.appendChild(item);
    });
  }

  /**
   * 옵션 선택 UI 개선
   */
  function enhanceProductOptions() {
    // 컬러 옵션 스타일 개선
    const colorOptions = document.querySelectorAll('.ec-product-button li');
    colorOptions.forEach(function(item) {
      const link = item.querySelector('a');
      if (link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // 모든 옵션에서 selected 제거
          colorOptions.forEach(function(opt) {
            opt.classList.remove('selected');
          });
          
          // 현재 옵션에 selected 추가
          item.classList.add('selected');
          
          // 실제 select 값도 변경
          const value = link.getAttribute('data-value') || link.textContent.trim();
          const select = link.closest('td').querySelector('select');
          if (select) {
            const options = select.querySelectorAll('option');
            options.forEach(function(option) {
              if (option.textContent.trim() === value) {
                option.selected = true;
                // change 이벤트 트리거
                const event = new Event('change', { bubbles: true });
                select.dispatchEvent(event);
              }
            });
          }
        });
      }
    });

    // 라디오 버튼 옵션 스타일 개선
    const radioOptions = document.querySelectorAll('.ec-product-radio li label');
    radioOptions.forEach(function(label) {
      const radio = label.querySelector('input[type="radio"]');
      if (radio) {
        radio.addEventListener('change', function() {
          // 모든 라벨에서 selected 제거
          const allLabels = label.closest('.ec-product-radio').querySelectorAll('label');
          allLabels.forEach(function(lbl) {
            lbl.classList.remove('selected');
          });
          
          // 현재 라벨에 selected 추가
          if (this.checked) {
            label.classList.add('selected');
          }
        });
      }
    });
  }

  /**
   * 이미지 갤러리 개선
   */
  function enhanceImageGallery() {
    const listImages = document.querySelectorAll('.imgArea .listImg li img');
    const mainImage = document.querySelector('.imgArea .keyImg img');
    
    if (!mainImage) return;

    listImages.forEach(function(img) {
      img.addEventListener('click', function() {
        // 메인 이미지 변경
        const newSrc = this.src.replace('_small', '').replace('_medium', '').replace('_list', '');
        mainImage.src = newSrc;
        
        // 모든 썸네일에서 active 제거
        listImages.forEach(function(thumb) {
          thumb.parentElement.classList.remove('active');
        });
        
        // 현재 썸네일에 active 추가
        this.parentElement.classList.add('active');
      });
    });

    // 첫 번째 썸네일을 active로 설정
    if (listImages.length > 0) {
      listImages[0].parentElement.classList.add('active');
    }
  }

  /**
   * 수량 선택기 개선
   */
  function enhanceQuantitySelector() {
    const qtyInputs = document.querySelectorAll('.ec-base-qty input[type="text"]');
    
    qtyInputs.forEach(function(input) {
      const upBtn = input.parentElement.querySelector('.qtyUp, .QuantityUp');
      const downBtn = input.parentElement.querySelector('.qtyDown, .QuantityDown');
      
      if (upBtn) {
        upBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const currentVal = parseInt(input.value) || 1;
          input.value = currentVal + 1;
          
          // change 이벤트 트리거
          const event = new Event('change', { bubbles: true });
          input.dispatchEvent(event);
        });
      }
      
      if (downBtn) {
        downBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const currentVal = parseInt(input.value) || 1;
          if (currentVal > 1) {
            input.value = currentVal - 1;
            
            // change 이벤트 트리거
            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
          }
        });
      }

      // 직접 입력 시 검증
      input.addEventListener('change', function() {
        let val = parseInt(this.value) || 1;
        if (val < 1) val = 1;
        this.value = val;
      });
    });
  }

  /**
   * 스크롤 시 이미지 sticky 효과
   */
  function initStickyImage() {
    const imgArea = document.querySelector('.detailArea .imgArea');
    const infoArea = document.querySelector('.detailArea .infoArea');
    
    if (!imgArea || !infoArea) return;

    function adjustSticky() {
      const infoHeight = infoArea.offsetHeight;
      const imgHeight = imgArea.offsetHeight;
      
      // 정보 영역이 이미지보다 높으면 sticky 유지
      if (infoHeight > imgHeight) {
        imgArea.style.position = 'sticky';
      } else {
        imgArea.style.position = 'static';
      }
    }

    // 초기 실행
    adjustSticky();

    // 윈도우 리사이즈 시 재조정
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustSticky, 200);
    });
  }

  // sticky 이미지 초기화
  setTimeout(initStickyImage, 500);

})();
