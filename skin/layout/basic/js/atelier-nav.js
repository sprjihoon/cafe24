/**
 * ATELIER 단순 네비게이션 JavaScript
 * - 모바일 메뉴 토글만 처리
 * - 드롭다운, 전체메뉴, 오버레이 없음
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
    removeOldNavStructure();
    initDropdownMenus();
    initMobileMenu();
    initLanguageDropdown();
    initScrollHeader();
    initCartCount();
  }

  /**
   * 기존 네비게이션 구조 완전 제거
   */
  function removeOldNavStructure() {
    const oldNav = document.querySelector('#lb-nav');
    if (oldNav && oldNav.parentNode) {
      oldNav.parentNode.removeChild(oldNav);
    }

    const oldFullmenu = document.querySelector('#lb-fullmenu');
    if (oldFullmenu && oldFullmenu.parentNode) {
      oldFullmenu.parentNode.removeChild(oldFullmenu);
    }

    const oldHamburger = document.querySelector('.lb-hamburger');
    if (oldHamburger && oldHamburger.parentNode) {
      oldHamburger.parentNode.removeChild(oldHamburger);
    }

    console.log('Old navigation structure removed');
  }

  /**
   * 드롭다운 메뉴 hover 처리
   */
  function initDropdownMenus() {
    const navLinks = document.querySelectorAll('.atelier-nav-link[data-menu]');
    
    navLinks.forEach(function(link) {
      const menuId = link.getAttribute('data-menu');
      const dropdown = document.querySelector('.atelier-dropdown[data-dropdown="' + menuId + '"]');
      
      if (!dropdown) return;

      let hoverTimeout;

      // 메뉴 링크에 hover
      link.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        link.classList.add('is-active');
        dropdown.classList.add('is-active');
      });

      link.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(function() {
          link.classList.remove('is-active');
          dropdown.classList.remove('is-active');
        }, 200);
      });

      // 드롭다운에 hover
      dropdown.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        link.classList.add('is-active');
        dropdown.classList.add('is-active');
      });

      dropdown.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(function() {
          link.classList.remove('is-active');
          dropdown.classList.remove('is-active');
        }, 200);
      });
    });
  }

  /**
   * 모바일 메뉴 토글
   */
  function initMobileMenu() {
    const menuBtn = document.querySelector('.atelier-mobile-menu-btn');
    const mobileMenu = document.querySelector('.atelier-mobile-menu');
    const closeBtn = mobileMenu && mobileMenu.querySelector('.atelier-mobile-menu-close');
    
    if (!menuBtn || !mobileMenu) return;

    function setMenuOpen(open) {
      menuBtn.classList.toggle('is-active', open);
      mobileMenu.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      
      // body 스크롤 제어 제거 - 백그라운드 스크롤 허용
      // 사용자 요청: 전체메뉴 열릴 때 다른 영역 비활성화 제거
    }

    function toggleMenu() {
      setMenuOpen(!mobileMenu.classList.contains('is-open'));
    }

    menuBtn.addEventListener('click', toggleMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        setMenuOpen(false);
      });
    }

    // backdrop 클릭 이벤트 제거 - backdrop 자체를 제거했으므로 불필요

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenuOpen(false);
      }
    });

    // 메뉴 링크 클릭 시 닫기
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });
  }

  /**
   * 언어 변경 드롭다운
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

        console.log('Language changed to:', lang);
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
   * 스크롤 시 헤더 스타일 변경
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

        const scrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop;

        if (scrollTop > 100) {
          header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
          header.style.boxShadow = 'none';
        }
      }, 50);
    });
  }

  /**
   * 장바구니 개수 업데이트
   */
  function initCartCount() {
    const cartCount = document.querySelector('.lb-cart-count span');
    if (!cartCount) return;

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
