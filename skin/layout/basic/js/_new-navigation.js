/**
 * ATELIER N - 네비게이션 (수정됨 - 동작 보장)
 */

(function() {
  'use strict';

  console.log('🚀 Navigation script loading...');

  /**
   * 전체메뉴 초기화 (nav 외부 fixed 위치)
   */
  function initFullMenu() {
    const allmenuBtn = document.querySelector('.atelier-allmenu-btn');
    const mobileBtn = document.querySelector('.atelier-mobile-btn');
    const fullmenu = document.getElementById('lb-fullmenu');
    const panel = fullmenu ? fullmenu.querySelector('.lb-fullmenu-panel') : null;
    const nav = document.getElementById('lb-nav');

    console.log('전체메뉴 버튼:', allmenuBtn);
    console.log('모바일 버튼:', mobileBtn);
    console.log('전체메뉴:', fullmenu);
    console.log('네비게이션:', nav);

    if (!fullmenu) {
      console.error('❌ 전체메뉴 요소를 찾을 수 없습니다!');
      return;
    }

    // 🔹 동적 위치 계산 (nav 바로 아래에 붙도록)
    function updateMenuPosition() {
      if (nav) {
        const navRect = nav.getBoundingClientRect();
        const headerRect = document.getElementById('header').getBoundingClientRect();
        // nav의 bottom 위치를 페이지 기준으로 계산
        const topPosition = navRect.bottom - headerRect.top;
        fullmenu.style.top = topPosition + 'px';
        fullmenu.style.position = 'absolute';
        console.log('메뉴 위치 업데이트 - navBottom:', navRect.bottom, 'headerTop:', headerRect.top, 'topPosition:', topPosition);
      }
    }
    
    updateMenuPosition();

    // 🔹 Cafe24 CSS 캐시 우회: 강제로 height auto 설정
    if (panel) {
      panel.style.height = 'auto';
      panel.style.minHeight = '300px';
    }
    fullmenu.style.height = 'auto';

    // 전체메뉴 토글
    function toggleFullMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      updateMenuPosition(); // 열 때마다 위치 재계산
      
      const isOpen = fullmenu.classList.contains('is-open');
      
      if (isOpen) {
        fullmenu.classList.remove('is-open');
        if (allmenuBtn) allmenuBtn.classList.remove('is-active');
        if (mobileBtn) mobileBtn.classList.remove('is-active');
        console.log('✓ 전체메뉴 닫힘');
      } else {
        fullmenu.classList.add('is-open');
        if (allmenuBtn) allmenuBtn.classList.add('is-active');
        if (mobileBtn) mobileBtn.classList.add('is-active');
        console.log('✓ 전체메뉴 열림');
      }
    }

    // PC 전체메뉴 버튼
    if (allmenuBtn) {
      allmenuBtn.addEventListener('click', toggleFullMenu);
      console.log('✅ PC 전체메뉴 버튼 이벤트 등록');
    }

    // 모바일 햄버거 버튼
    if (mobileBtn) {
      mobileBtn.addEventListener('click', toggleFullMenu);
      console.log('✅ 모바일 햄버거 버튼 이벤트 등록');
    }

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && fullmenu.classList.contains('is-open')) {
        fullmenu.classList.remove('is-open');
        if (allmenuBtn) allmenuBtn.classList.remove('is-active');
        if (mobileBtn) mobileBtn.classList.remove('is-active');
        console.log('✓ ESC로 전체메뉴 닫힘');
      }
    });

    // 외부 클릭으로 닫기
    document.addEventListener('click', function(e) {
      const isFullmenu = e.target.closest('#lb-fullmenu');
      const isMenuBtn = e.target.closest('.atelier-allmenu-btn, .atelier-mobile-btn');
      
      if (!isFullmenu && !isMenuBtn && fullmenu.classList.contains('is-open')) {
        fullmenu.classList.remove('is-open');
        if (allmenuBtn) allmenuBtn.classList.remove('is-active');
        if (mobileBtn) mobileBtn.classList.remove('is-active');
        console.log('✓ 외부 클릭으로 전체메뉴 닫힘');
      }
    });

    // 링크 클릭 시 메뉴 닫기
    const links = fullmenu.querySelectorAll('.atelier-fullmenu-link');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        fullmenu.classList.remove('is-open');
        if (allmenuBtn) allmenuBtn.classList.remove('is-active');
        if (mobileBtn) mobileBtn.classList.remove('is-active');
        console.log('✓ 링크 클릭으로 전체메뉴 닫힘');
      });
    });

    console.log('✅ 전체메뉴 초기화 완료');
  }

  /**
   * 드롭다운 메뉴 디버깅
   */
  function initDropdownDebug() {
    const navItems = document.querySelectorAll('.atelier-nav-item');
    
    console.log('드롭다운 메뉴 개수:', navItems.length);

    navItems.forEach(function(item, index) {
      const dropdown = item.querySelector('.atelier-dropdown');
      
      if (dropdown) {
        console.log('✓ 드롭다운 ' + (index + 1) + ' 발견');
        
        item.addEventListener('mouseenter', function() {
          console.log('드롭다운 ' + (index + 1) + ' 호버');
        });
      } else {
        console.warn('⚠️ 드롭다운 ' + (index + 1) + ' 없음');
      }
    });

    console.log('✅ 드롭다운 디버깅 완료');
  }

  /**
   * 현재 페이지 활성화
   */
  function initActiveLink() {
    const currentUrl = window.location.pathname + window.location.search;
    
    const pcLinks = document.querySelectorAll('.atelier-nav-link');
    pcLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && currentUrl.indexOf(href) === 0) {
        link.classList.add('is-active');
      }
    });

    console.log('✅ 활성 링크 설정 완료');
  }

  /**
   * 초기화
   */
  function init() {
    console.log('=== ATELIER Navigation 초기화 시작 ===');
    
    initFullMenu();
    initDropdownDebug();
    initActiveLink();
    
    console.log('=== ATELIER Navigation 초기화 완료 ===');
  }

  // DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 페이지 로드 완료 후에도 한 번 더 확인
  window.addEventListener('load', function() {
    console.log('🔍 페이지 로드 완료 - 네비게이션 상태 확인');
    console.log('- #lb-nav:', document.querySelector('#lb-nav'));
    console.log('- #lb-fullmenu:', document.getElementById('lb-fullmenu'));
    console.log('- .atelier-dropdown:', document.querySelectorAll('.atelier-dropdown').length + '개');
  });

})();
