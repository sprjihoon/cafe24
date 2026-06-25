/**
 * LE BLANC 헤더 JavaScript
 * 햄버거 메뉴, 언어 변경, 스크롤 효과 등
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
    initHamburgerMenu();
    initLanguageDropdown();
    initScrollHeader();
    initCartCount();
  }

  /**
   * 1. 햄버거 메뉴 → X 변환 + nav 아래 전체 메뉴 드롭다운
   */
  function initHamburgerMenu() {
    const hamburger = document.querySelector('.lb-hamburger');
    const fullmenu = document.getElementById('lb-fullmenu');
    const backdrop = fullmenu && fullmenu.querySelector('.lb-fullmenu-backdrop');
    const header = document.getElementById('header');
    if (!hamburger || !fullmenu) return;

    function updateHeaderBottom() {
      if (!header) return;
      var bottom = header.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty('--lb-header-bottom', bottom + 'px');
    }

    function setMenuOpen(open) {
      // 현재 스크롤 위치 저장
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (open) updateHeaderBottom();
      hamburger.classList.toggle('is-active', open);
      fullmenu.classList.toggle('is-open', open);
      document.body.classList.toggle('lb-menu-open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      fullmenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) updateHeaderBottom();
      
      // 스크롤 위치 복원 (메뉴 열 때 스크롤이 튀는 것 방지)
      setTimeout(function() {
        window.scrollTo(0, currentScroll);
      }, 0);
    }

    function toggleMenu() {
      setMenuOpen(!fullmenu.classList.contains('is-open'));
    }

    hamburger.addEventListener('click', toggleMenu);

    if (backdrop) {
      backdrop.addEventListener('click', function() {
        setMenuOpen(false);
      });
    }

    window.addEventListener('resize', function() {
      if (fullmenu.classList.contains('is-open')) updateHeaderBottom();
    });

    // 스크롤 시 헤더 위치가 변경되므로 메뉴 위치도 업데이트
    let scrollUpdateTimeout;
    window.addEventListener('scroll', function() {
      if (fullmenu.classList.contains('is-open')) {
        clearTimeout(scrollUpdateTimeout);
        scrollUpdateTimeout = setTimeout(function() {
          updateHeaderBottom();
        }, 10);
      }
    }, { passive: true });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && fullmenu.classList.contains('is-open')) {
        setMenuOpen(false);
      }
    });

    fullmenu.querySelectorAll('.lb-fullmenu-link').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });
  }

  /**
   * 2. 언어 변경 드롭다운
   * 실제 다국어 처리는 Cafe24 설정 필요
   */
  function initLanguageDropdown() {
    const langButtons = document.querySelectorAll('.lb-lang-dropdown a');
    const langBtn = document.querySelector('.lb-lang-btn span');

    langButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.dataset.lang;
        const langMap = {
          'ko': 'KR',
          'en': 'EN',
          'ja': 'JP',
          'zh': 'CN'
        };

        if (langBtn && langMap[lang]) {
          langBtn.textContent = langMap[lang];
        }

        // 실제 언어 변경 로직
        // TODO: Cafe24 다국어 쇼핑몰 설정 필요
        console.log('Language changed to:', lang);

        // 쿠키에 언어 저장
        document.cookie = 'lb_lang=' + lang + '; path=/; max-age=31536000';
      });
    });

    // 쿠키에서 언어 복원
    const savedLang = getCookie('lb_lang');
    if (savedLang && langBtn) {
      const langMap = {
        'ko': 'KR',
        'en': 'EN',
        'ja': 'JP',
        'zh': 'CN'
      };
      langBtn.textContent = langMap[savedLang] || 'KR';
    }
  }

  /**
   * 3. 스크롤 시 헤더 스타일 변경
   * 스크롤 다운 시 헤더 그림자 추가
   */
  function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 스크롤 방향 감지
        const scrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop;

        // 100px 이상 스크롤 시 그림자 추가
        if (scrollTop > 100) {
          header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
          header.style.boxShadow = 'none';
        }
      }, 50);
    });
  }

  /**
   * 4. 장바구니 개수 업데이트
   * Cafe24 모듈이 자동으로 처리하지만, 추가 스타일링 가능
   */
  function initCartCount() {
    const cartCount = document.querySelector('.lb-cart-count span');
    if (!cartCount) return;

    // 개수가 0이면 숨김
    const count = parseInt(cartCount.textContent, 10);
    if (count === 0) {
      cartCount.parentElement.style.display = 'none';
    } else {
      cartCount.parentElement.style.display = 'flex';
    }
  }

  /**
   * 유틸리티: 쿠키 읽기
   */
  function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

})();
