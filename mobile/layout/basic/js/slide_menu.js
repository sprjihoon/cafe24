/* ATELIER N Mobile — Slide Menu (사이드바 드로어) */
(function () {
  'use strict';

  var aside, dimmer;

  function openAside() {
    aside.classList.add('open');
    dimmer.classList.add('visible');
    document.documentElement.classList.add('lb-aside-open');
  }

  function closeAside() {
    aside.classList.remove('open');
    dimmer.classList.remove('visible');
    document.documentElement.classList.remove('lb-aside-open');
  }

  function initAccordion() {
    /* ── 카테고리 목록은 기본 펼침, 나머지(기획전/즐겨찾기/다국어)는 기본 닫힘 ── */
    var collapsedIds = ['slideProjectList', 'bookmarkCategory', 'slideMultishopList'];

    aside.querySelectorAll('#slideCateList h2, #slideProjectList h2, .bookmarkCategory > h2, .multishop h2').forEach(function (h2) {
      var icoBtn = h2.querySelector('.icoCategory');
      var nextEl  = h2.nextElementSibling;

      /* 부모가 기본 닫힘 그룹인지 확인 */
      var isCollapsed = false;
      for (var i = 0; i < collapsedIds.length; i++) {
        if (h2.closest('#' + collapsedIds[i])) { isCollapsed = true; break; }
      }

      if (isCollapsed) {
        if (nextEl) nextEl.style.display = 'none';
      } else {
        /* 카테고리 목록 기본 펼침 */
        if (nextEl) nextEl.style.display = '';
        h2.classList.add('open');
      }

      if (!icoBtn) return;
      icoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = h2.classList.contains('open');
        if (isOpen) {
          h2.classList.remove('open');
          if (nextEl) nextEl.style.display = 'none';
        } else {
          h2.classList.add('open');
          if (nextEl) nextEl.style.display = '';
        }
      });
    });
  }

  function init() {
    aside = document.getElementById('aside');
    if (!aside) return;

    /* ── 어둠 배경(dimmer) 생성 ── */
    dimmer = document.createElement('div');
    dimmer.className = 'lb-aside-dimmer';
    document.body.appendChild(dimmer);
    dimmer.addEventListener('click', closeAside);

    /* ── .fold 클래스 버튼 (햄버거) ── */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.fold');
      if (!btn) return;
      /* aside 내부의 fold 클릭(카테고리 버튼 등)은 무시 */
      if (aside.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      if (aside.classList.contains('open')) closeAside();
      else openAside();
    });

    /* ── aside 내부 닫기 버튼 ── */
    var closeBtn = aside.querySelector('.btnClose, .lb-aside-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeAside();
      });
    }

    /* ── ESC 키 닫기 ── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAside();
    });

    initAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

