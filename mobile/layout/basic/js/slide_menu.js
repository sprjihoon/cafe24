/* LE BLANC Mobile — Slide Menu (사이드바 드로어) */
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

    /* ── 카테고리 아코디언 ── */
    aside.querySelectorAll('.categoryCont h2, #slideCateList h2').forEach(function (h2) {
      var icoBtn = h2.querySelector('.icoCategory');
      if (!icoBtn) return;
      /* 기본 닫힘 */
      var nextEl = h2.nextElementSibling;
      if (nextEl) nextEl.style.display = 'none';
      h2.classList.remove('selected');

      icoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = h2.classList.contains('open');
        var section = h2.closest('.categoryCont, #slideCateList, #slideProjectList, .bookmarkCategory, .multishop');
        /* 같은 그룹 내 다른 항목 닫기 */
        if (section) {
          section.querySelectorAll('h2.open').forEach(function (oh2) {
            oh2.classList.remove('open');
            var on = oh2.nextElementSibling;
            if (on) on.style.display = 'none';
          });
        }
        if (!isOpen) {
          h2.classList.add('open');
          var next = h2.nextElementSibling;
          if (next) next.style.display = '';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
