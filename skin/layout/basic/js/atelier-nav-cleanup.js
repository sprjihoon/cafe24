/**
 * ATELIER 네비게이션 초기화 스크립트
 * 기존 구조를 즉시 제거하고 새 구조를 활성화
 */

(function() {
  'use strict';

  // 즉시 실행: 기존 구조 제거
  function removeOldStructure() {
    // #lb-nav 제거
    const oldNavs = document.querySelectorAll('#lb-nav, nav#lb-nav');
    oldNavs.forEach(function(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
        console.log('Removed #lb-nav');
      }
    });

    // #lb-fullmenu 제거
    const oldMenus = document.querySelectorAll('#lb-fullmenu, .lb-fullmenu');
    oldMenus.forEach(function(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
        console.log('Removed #lb-fullmenu');
      }
    });

    // .lb-hamburger 제거
    const oldBurgers = document.querySelectorAll('.lb-hamburger');
    oldBurgers.forEach(function(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
        console.log('Removed .lb-hamburger');
      }
    });
  }

  // 즉시 실행
  removeOldStructure();

  // DOM 로드 후에도 다시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeOldStructure);
  }

  // 0.5초 후에도 한 번 더 실행 (카페24가 나중에 주입하는 경우 대비)
  setTimeout(removeOldStructure, 500);

})();
