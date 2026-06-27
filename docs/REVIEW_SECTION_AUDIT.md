# 리뷰 섹션 현재 상태 감사 문서

**작성일**: 2026-06-26  
**위치**: `/skin/index.html` (라인 1230-1290)

---

## 1. 현재 HTML 구조

### 섹션 컨테이너
```html
<div class="lb-photo-review-section" id="lb-section-review">
```

### 헤더 구조
```html
<div class="lb-section-header">
    <div class="lb-section-copy">
        <p class="lb-section-eyebrow">REAL CUSTOMER REVIEWS</p>
        <h2 class="lb-section-title">고객이 직접 남긴 착용 후기</h2>
    </div>
    <a href="/board/review/list.html?board_no=4" class="lb-section-more">모두보기</a>
</div>
```

### 카페24 모듈 구조
```html
<div module="board_listpackage_4" class="lb-board-review-wrapper">
    <div class="swiper lb-review-swiper">
        <ul module="board_list_4" class="xans-board-list swiper-wrapper">
```

**사용 모듈**: `board_listpackage_4`, `board_list_4`  
**게시판 번호**: `board_no=4` (리뷰 게시판)

### 리뷰 카드 구조
```html
<li class="xans-record- swiper-slide">
    <div class="lb-review-item">
        <!-- 썸네일 -->
        <a href="{$link_board_detail}" class="lb-review-link">
            <div class="lb-review-image-wrapper">
                <img src="{$thumbnail_file}" alt="{$subject}" class="lb-review-image">
            </div>
            
            <!-- 리뷰 정보 -->
            <div class="lb-review-content">
                <div class="lb-review-stars">{$display_product_review}</div>
                <h3 class="lb-review-title">{$subject}</h3>
                <p class="lb-review-text">{$content_cut}</p>
                <div class="lb-review-meta">
                    <span class="lb-review-author">{$writer}</span>
                    <span class="lb-review-date">{$write_date}</span>
                </div>
            </div>
        </a>
    </div>
</li>
```

### 슬라이더 컨트롤
```html
<!-- 네비게이션 버튼 -->
<div class="swiper-button-prev lb-review-prev"></div>
<div class="swiper-button-next lb-review-next"></div>

<!-- 페이지네이션 -->
<div class="swiper-pagination lb-review-pagination"></div>
```

---

## 2. 카페24 변수

| 변수명 | 설명 |
|--------|------|
| `{$link_board_detail}` | 리뷰 상세 페이지 링크 |
| `{$thumbnail_file}` | 리뷰 썸네일 이미지 |
| `{$subject}` | 리뷰 제목 |
| `{$display_product_review}` | 별점 표시 |
| `{$content_cut}` | 리뷰 내용 (잘린 버전) |
| `{$writer}` | 작성자명 |
| `{$write_date}` | 작성일 |
| `{$display_board_attachment}` | 첨부파일 표시 |

**모듈 설정 주석**:
```html
<!--
    $count = 8
    $main_list = yes
    $main_list_reply_view = no
-->
```

---

## 3. 현재 문제점

### A. 빈 리뷰 상태
- 실제 리뷰가 0개일 때 빈 슬라이더 컨테이너와 화살표가 남아 있음
- 빈 상태 메시지나 대체 콘텐츠가 없음
- 완성도가 떨어지고 버그처럼 보임

### B. 디자인
- 현재 카드 디자인이 레퍼런스와 다름
- 상품 연결 정보 없음 (리뷰가 어떤 상품에 대한 것인지 불명확)
- 카드 비율, 간격, 스타일이 미정의

### C. 슬라이더 초기화
- Swiper 초기화 스크립트가 없음
- 드래그, 반응형 설정 없음

---

## 4. 구현 목표

### A. 실제 쇼핑몰 모드 (기본)
1. **리뷰 1개 이상**: 실제 리뷰 카드만 표시
2. **리뷰 0개**: 
   - 좌우 화살표, 페이지네이션 숨김
   - 빈 상태 메시지 표시:
     ```
     아직 첫 번째 착용 후기를 기다리고 있습니다.
     상품을 경험하신 뒤, 당신의 일상을 들려주세요.
     ```
3. **더보기 링크**: 실제 리뷰 게시판 연결 유지

### B. DEMO MODE (디자인센터 전용)
- `ATELIER_DEMO_MODE = true`일 때만 작동
- 실제 리뷰 0개여도 데모 카드 5개 노출
- 일반 고객 쇼핑몰에서는 절대 작동하지 않음 (기본값 `false`)

---

## 5. 데모 데이터 구조

### 파일 위치
`/skin/layout/basic/js/atelier-review-demo-data.js`

### 데이터 스키마
```javascript
{
  image: "/web/upload/atelier-demo-reviews/review-01.jpg",
  title: "가볍고 편안한 니트",
  body: "부드러운 촉감이라...",
  rating: 5,
  author: "DEMO CUSTOMER",
  productName: "Lena Fine Knit",
  productThumb: "/web/product/medium/AN-TP-001.jpg",
  productUrl: "/product/detail.html?product_no=1"
}
```

---

## 6. 디자인 요구사항

### 카드 구조
- **상단**: 리뷰 이미지 (4:3 또는 1:1)
- **중단**: 제목, 본문 (2~3줄 말줄임), 별점, 작성자
- **하단**: 상품 썸네일 + 상품명

### 스타일
- 카드 모서리: `10px~12px` border-radius
- 카드 높이: 모두 동일
- 그림자: 절제된 수준
- 회색 테두리, 파란 포인트 금지

### 슬라이더
- PC: 5개 카드 한 화면
- 모바일: 1.2개 카드 (스와이프 힌트)
- 리뷰 2개 이하: 화살표/페이지네이션 숨김
- 3개 이상: 슬라이더 활성화

---

## 7. 구현 체크리스트

- [ ] 현재 상태 문서화 (이 파일)
- [ ] 데모 데이터 파일 생성
- [ ] HTML 구조 수정 (빈 상태 추가)
- [ ] CSS 스타일 작성
- [ ] JavaScript 초기화 로직
- [ ] DEMO MODE 토글 구현
- [ ] 실제 리뷰 0개 상태 테스트
- [ ] 데모 모드 활성화 테스트
- [ ] 실제 리뷰 존재 시나리오 테스트
- [ ] FTP 반영 및 브라우저 확인

---

## 8. 주의사항

1. **카페24 모듈 보존**: `board_listpackage_4`, `board_list_4` 모듈 삭제/변조 금지
2. **게시판 링크 유지**: `/board/review/list.html?board_no=4` 그대로 유지
3. **데모 모드 분리**: 실제 리뷰 모듈과 데모 데이터 완전 분리
4. **기본값 false**: 일반 쇼핑몰에서 `ATELIER_DEMO_MODE` 기본값은 `false`
5. **외부 라이브러리 금지**: 기존 Swiper만 사용, 새 라이브러리 추가 금지
