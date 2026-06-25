(function () {
  'use strict';

  var CATEGORY_CATE = {
    OUTER: '24',
    TOP: '25',
    BOTTOM: '27',
    DRESS: '26',
    BAG: '28',
    SHOES: '28'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getSku() {
    var heading = document.querySelector('.headingArea h2');
    if (!heading) return null;
    var match = heading.textContent.match(/\[(AN-[A-Z]{2}-\d{3})\]/);
    if (match) return match[1];
    var codeEl = document.querySelector('[data-product-code]');
    if (codeEl) return codeEl.getAttribute('data-product-code');
    return null;
  }

  function getProduct() {
    if (!window.ATELIER_N || !window.ATELIER_N.bySku) return null;

    var sku = getSku();
    if (sku && window.ATELIER_N.bySku[sku]) {
      return window.ATELIER_N.bySku[sku];
    }

    var heading = document.querySelector('.headingArea h2');
    if (!heading) return null;
    var nameMatch = heading.textContent.replace(/\[.*?\]/, '').trim();
    if (!nameMatch) return null;

    var bySku = window.ATELIER_N.bySku;
    for (var key in bySku) {
      if (!Object.prototype.hasOwnProperty.call(bySku, key)) continue;
      var item = bySku[key];
      if (item.name_kr === nameMatch || item.name === nameMatch) {
        return item;
      }
    }
    return null;
  }

  function setNote(index, text) {
    var notes = document.querySelectorAll('.lb-product-note');
    if (!notes[index]) return;
    var p = notes[index].querySelector('p');
    if (p) p.textContent = text;
  }

  function applyProductCopy() {
    var product = getProduct();
    if (!product) return;

    setNote(0, product.about);
    setNote(1, product.fit_note);
    setNote(2, product.fabric_note);
    setNote(3, product.styling_note);

    var summary = document.getElementById('lb-product-summary');
    if (summary) {
      summary.textContent = product.short_description;
      summary.hidden = false;
    }

    var meta = document.getElementById('lb-product-meta');
    if (meta) {
      var colorText = product.color.join(' · ');
      var sizeText = product.size.join(' · ');
      meta.innerHTML =
        '<span class="lb-product-meta-item"><em>COLOR</em> ' + escapeHtml(colorText) + '</span>' +
        '<span class="lb-product-meta-item"><em>SIZE</em> ' + escapeHtml(sizeText) + '</span>';
      meta.hidden = false;
    }

    if (product.badge) {
      var badge = document.getElementById('lb-product-badge');
      if (badge) {
        badge.textContent = product.badge;
        badge.hidden = false;
      }
    }
  }

  function init() {
    applyProductCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
