/**
 * ATELIER N 플로팅 위젯 JavaScript
 * 우측: 채팅, 카카오톡, 위로 가기
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
    initFloatingButtons();
  }

  /**
   * 1. 우측 플로팅 버튼
   * 스크롤 300px 이상 시 표시
   */
  function initFloatingButtons() {
    var floatingRight = document.querySelector('.lb-floating-right');
    if (!floatingRight) return;

    var topBtn = document.querySelector('.lb-floating-top');

    // 스크롤 이벤트
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
          floatingRight.classList.add('is-visible');
        } else {
          floatingRight.classList.remove('is-visible');
        }
      }, 50);
    });

    // 위로 가기 버튼
    if (topBtn) {
      topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }


})();

