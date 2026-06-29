/**
 * ATELIER N - Product List Icons
 * 제품 목록에 좋아요, 옵션 미리보기 아이콘 추가
 */

(function() {
  'use strict';

  // 아이콘 추가 함수
  function enhanceProductItems() {
    // 모든 제품 아이템 찾기
    const productItems = document.querySelectorAll('.prdList li');
    
    productItems.forEach(function(item) {
      const thumbnail = item.querySelector('.thumbnail');
      if (!thumbnail) return;

      // 이미 처리된 항목은 스킵
      if (thumbnail.querySelector('.lb-product-actions')) return;

      const prdImg = thumbnail.querySelector('.prdImg');
      const iconArea = thumbnail.querySelector('.icon');
      
      if (!prdImg) return;

      // 제품 정보 가져오기
      const productNo = item.id.replace('anchorBoxId_', '');
      const link = prdImg.querySelector('a');
      const productLink = link ? link.getAttribute('href') : '#';

      // 아이콘 컨테이너 생성
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'lb-product-actions';

      // 1. 관심상품 (wish)
      const wishBtn = document.createElement('button');
      wishBtn.className = 'lb-action-btn lb-action-wish';
      wishBtn.setAttribute('type', 'button');
      wishBtn.setAttribute('title', '관심상품');
      wishBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
      
      wishBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 카페24 관심상품 아이콘 찾기
        const wishIcon = prdImg.querySelector('.icon_img.ec-product-listwishicon');
        if (wishIcon) {
          wishIcon.click();
        } else {
          // 관심상품 기능이 없으면 로그인 페이지로
          if (confirm('관심상품 등록은 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
            location.href = '/member/login.html';
          }
        }
      });
      actionsDiv.appendChild(wishBtn);

      // 2. 장바구니 버튼 
      const cartBtn = document.createElement('button');
      cartBtn.className = 'lb-action-btn lb-action-cart';
      cartBtn.setAttribute('type', 'button');
      cartBtn.setAttribute('title', '장바구니');
      cartBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
      
      cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 옵션이 있는 상품인지 확인 후 상세 페이지로 이동
        if (confirm('상품 상세 페이지에서 옵션을 선택하시겠습니까?')) {
          location.href = productLink;
        }
      });
      actionsDiv.appendChild(cartBtn);

      // 3. 좋아요 버튼
      const likeBtn = document.createElement('button');
      likeBtn.className = 'lb-action-btn lb-action-like';
      likeBtn.setAttribute('type', 'button');
      likeBtn.setAttribute('title', '좋아요');
      likeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';
      
      // 로컬 스토리지에서 좋아요 상태 확인
      const likeKey = 'lb-likes';
      const likes = JSON.parse(localStorage.getItem(likeKey) || '[]');
      if (likes.includes(productNo)) {
        likeBtn.classList.add('is-active');
      }
      
      likeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = this.classList.toggle('is-active');
        const likes = JSON.parse(localStorage.getItem(likeKey) || '[]');
        
        if (isActive) {
          if (!likes.includes(productNo)) {
            likes.push(productNo);
          }
        } else {
          const index = likes.indexOf(productNo);
          if (index > -1) {
            likes.splice(index, 1);
          }
        }
        
        localStorage.setItem(likeKey, JSON.stringify(likes));
      });
      actionsDiv.appendChild(likeBtn);

      // 4. 빠른 보기 버튼
      const quickViewBtn = document.createElement('button');
      quickViewBtn.className = 'lb-action-btn lb-action-quickview';
      quickViewBtn.setAttribute('type', 'button');
      quickViewBtn.setAttribute('title', '빠른 보기');
      quickViewBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      
      quickViewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 상품 상세 페이지로 이동
        window.location.href = productLink;
      });
      actionsDiv.appendChild(quickViewBtn);

      // 아이콘 영역에 추가
      if (iconArea) {
        // 기존 내용 제거
        iconArea.innerHTML = '';
        iconArea.appendChild(actionsDiv);
      } else {
        // icon 영역이 없으면 prdImg에 직접 추가
        const newIconArea = document.createElement('div');
        newIconArea.className = 'icon';
        newIconArea.appendChild(actionsDiv);
        prdImg.appendChild(newIconArea);
      }
    });
  }

  // DOM 로드 완료 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceProductItems);
  } else {
    enhanceProductItems();
  }

  // 동적 콘텐츠 로드를 위한 감시
  setTimeout(enhanceProductItems, 1000);
  setTimeout(enhanceProductItems, 2000);
})();

