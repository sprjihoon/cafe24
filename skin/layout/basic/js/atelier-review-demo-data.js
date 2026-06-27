/**
 * ATELIER N - 포토리뷰 데모 데이터
 * 
 * 이 파일은 디자인센터 샘플몰 전용입니다.
 * ATELIER_DEMO_MODE = true 일 때만 사용됩니다.
 * 
 * 실제 고객 쇼핑몰에서는 사용되지 않습니다.
 */

(function() {
  'use strict';

  // 데모 모드 토글 (기본값: false)
  window.ATELIER_DEMO_MODE = window.ATELIER_DEMO_MODE || false;

  // 데모 리뷰 데이터
  window.ATELIER_DEMO_REVIEWS = [
    {
      id: 'demo-review-01',
      image: '/web/upload/atelier-demo-reviews/review-01.jpg',
      imageFallback: '/web/upload/lookbook/look-1.jpg', // 이미지 없을 경우 대체
      title: '생각보다 부드럽고 편해요',
      body: '두꺼운 니트가 아니라 가볍게 입기 좋습니다. 촉감이라 자주 손이 가요. 차분한 컬러라 여러 하의와 자연스럽게 어울립니다.',
      rating: 5,
      author: '김*은',
      date: '2026.06.20',
      productName: 'Lena Fine Knit',
      productThumb: '/web/product/medium/202406_1.jpg',
      productThumbFallback: '/web/upload/lookbook/look-1.jpg',
      productUrl: '/product/detail.html?product_no=1'
    },
    {
      id: 'demo-review-02',
      image: '/web/upload/atelier-demo-reviews/review-02.jpg',
      imageFallback: '/web/upload/lookbook/look-2.jpg',
      title: '품질좋고 깔끔해요',
      body: '심플한 디자인이 마음에 듭니다. 두껍지 않아서 계절 전환기에 딱 좋을 것 같아요. 포장도 깔끔하게 잘 왔습니다.',
      rating: 5,
      author: '이*수',
      date: '2026.06.18',
      productName: 'Essential White Shirt',
      productThumb: '/web/product/medium/202406_2.jpg',
      productThumbFallback: '/web/upload/lookbook/look-2.jpg',
      productUrl: '/product/detail.html?product_no=2'
    },
    {
      id: 'demo-review-03',
      image: '/web/upload/atelier-demo-reviews/review-03.jpg',
      imageFallback: '/web/upload/lookbook/look-3.jpg',
      title: '아이보리 니트 추천합니다',
      body: '깔끔하고 부드러운 소재입니다. 입었을 때 애매한 기장이 아니라 여러 조합으로 스타일링 할 수 있어요. 색상도 사진과 동일합니다.',
      rating: 5,
      author: '박*현',
      date: '2026.06.15',
      productName: 'Soft Round Knit',
      productThumb: '/web/product/medium/202406_3.jpg',
      productThumbFallback: '/web/upload/lookbook/look-3.jpg',
      productUrl: '/product/detail.html?product_no=3'
    },
    {
      id: 'demo-review-04',
      image: '/web/upload/atelier-demo-reviews/review-04.jpg',
      imageFallback: '/web/upload/lookbook/look-4.jpg',
      title: '여름에 딱 좋은 슬라이드',
      body: '편하면서 깔끔해서 자주 신게 될 것 같아요. 사이즈도 정확하고 발이 아프지 않습니다. 심플한 디자인이 오히려 어떤 옷과도 잘 어울려요.',
      rating: 4,
      author: '최*영',
      date: '2026.06.12',
      productName: 'Minimal Slide Sandal',
      productThumb: '/web/product/medium/202406_4.jpg',
      productThumbFallback: '/web/upload/lookbook/look-4.jpg',
      productUrl: '/product/detail.html?product_no=4'
    },
    {
      id: 'demo-review-05',
      image: '/web/upload/atelier-demo-reviews/review-05.jpg',
      imageFallback: '/web/upload/lookbook/look-5.jpg',
      title: '색상 선택 신중히 하시길',
      body: '전체적인 품질은 만족스럽습니다. 심플한 디자인 덕분에 어디든 잘 어울리네요. 살짝 두꺼운 감이 있지만 그만큼 고급스러워 보입니다.',
      rating: 5,
      author: '정*아',
      date: '2026.06.10',
      productName: 'Classic Wool Coat',
      productThumb: '/web/product/medium/202406_5.jpg',
      productThumbFallback: '/web/upload/lookbook/look-5.jpg',
      productUrl: '/product/detail.html?product_no=5'
    }
  ];

  /**
   * 별점을 HTML로 변환
   * @param {number} rating - 1~5 점수
   * @returns {string} 별점 HTML
   */
  window.generateRatingStars = function(rating) {
    var fullStars = Math.floor(rating);
    var emptyStars = 5 - fullStars;
    var html = '';
    
    for (var i = 0; i < fullStars; i++) {
      html += '<span style="color:#f59e0b;">★</span>';
    }
    for (var j = 0; j < emptyStars; j++) {
      html += '<span style="color:#e5e7eb;">★</span>';
    }
    
    return html;
  };

  /**
   * 데모 리뷰 카드 HTML 생성
   * @param {Object} review - 리뷰 데이터 객체
   * @returns {string} 리뷰 카드 HTML
   */
  window.generateDemoReviewCard = function(review) {
    return `
      <li class="swiper-slide xans-record- atelier-demo-review" data-demo-id="${review.id}">
        <div class="lb-review-item">
          <a href="${review.productUrl}" class="lb-review-link">
            <!-- 리뷰 이미지 -->
            <div class="lb-review-image-wrapper">
              <img 
                src="${review.image}" 
                alt="${review.title}" 
                class="lb-review-image"
                onerror="this.src='${review.imageFallback}'"
              >
            </div>
            
            <!-- 리뷰 콘텐츠 -->
            <div class="lb-review-content">
              <!-- 별점 -->
              <div class="lb-review-stars">${window.generateRatingStars(review.rating)}</div>
              
              <!-- 제목 -->
              <h3 class="lb-review-title">${review.title}</h3>
              
              <!-- 내용 -->
              <p class="lb-review-text">${review.body}</p>
              
              <!-- 작성자 및 날짜 -->
              <div class="lb-review-meta">
                <span class="lb-review-author">${review.author}</span>
                <span class="lb-review-date">${review.date}</span>
              </div>
            </div>

            <!-- 연결 상품 정보 -->
            <div class="lb-review-product">
              <img 
                src="${review.productThumb}" 
                alt="${review.productName}" 
                class="lb-review-product-thumb"
                onerror="this.src='${review.productThumbFallback}'"
              >
              <span class="lb-review-product-name">${review.productName}</span>
            </div>
          </a>
        </div>
      </li>
    `;
  };

  console.log('[ATELIER N] 포토리뷰 데모 데이터 로드 완료');
  console.log('[ATELIER N] DEMO MODE:', window.ATELIER_DEMO_MODE);
  console.log('[ATELIER N] Demo reviews:', window.ATELIER_DEMO_REVIEWS.length);
})();
