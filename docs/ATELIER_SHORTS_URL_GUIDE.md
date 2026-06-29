# ATELIER SHORTS URL 입력형 가이드

## 개요

ATELIER SHORTS는 운영자가 코드 수정 없이 영상 URL만 입력하면 새로운 영상 카드를 추가할 수 있는 시스템입니다.  
**MP4 직접 업로드**와 **YouTube Shorts 임베드** 두 가지 방식을 모두 지원합니다.

---

## 목차

1. [데이터 파일 위치](#데이터-파일-위치)
2. [MP4 영상 등록 방법](#mp4-영상-등록-방법)
3. [YouTube Shorts 등록 방법](#youtube-shorts-등록-방법)
4. [포스터 이미지 권장 규격](#포스터-이미지-권장-규격)
5. [상품 링크 연결](#상품-링크-연결)
6. [URL 규칙 및 보안](#url-규칙-및-보안)
7. [문제 해결](#문제-해결)

---

## 데이터 파일 위치

```
/skin/layout/basic/js/atelier-shorts-data.js
```

이 파일을 열어 영상 데이터를 추가/수정/삭제합니다.

### 기본 구조

```javascript
window.ATELIER_SHORTS_DATA = [
  {
    id: "고유 식별자",
    type: "mp4 또는 youtube",
    videoUrl: "영상 URL (HTTPS)",
    posterUrl: "썸네일 이미지 URL (HTTPS)",
    productUrl: "상품 링크 URL",
    productThumbUrl: "상품 썸네일 URL",
    productName: "상품명",
    price: "가격"
  },
  // ... 추가 카드
];
```

---

## MP4 영상 등록 방법

### 1. 영상 파일 준비

**요구사항:**
- 형식: MP4 (H.264 코덱)
- 비율: **9:16** (세로형)
- 해상도: 1080x1920 권장
- 용량: 10MB 이하 권장
- 길이: 15~60초 권장

### 2. 영상 업로드

**방법 A: 외부 CDN 사용**
- AWS S3, Google Cloud Storage, Cloudflare 등
- HTTPS URL만 사용 가능
- 예시: `https://cdn.example.com/videos/winter-collection.mp4`

**방법 B: 카페24 서버 업로드**
- 카페24 FTP로 `/web/upload/atelier-shorts/` 폴더에 업로드
- 예시: `https://쇼핑몰도메인.com/web/upload/atelier-shorts/shorts-01.mp4`

### 3. 데이터 입력 예시

```javascript
{
  id: "shorts-winter-01",
  type: "mp4",
  videoUrl: "https://cdn.example.com/videos/winter-collection.mp4",
  posterUrl: "https://cdn.example.com/images/winter-collection-poster.jpg",
  productUrl: "/product/detail.html?product_no=123",
  productThumbUrl: "https://쇼핑몰.com/web/product/medium/sample.jpg",
  productName: "Marlow Wool Jacket",
  price: "159,000원"
}
```

### MP4 동작 방식

- **PC**: 카드에 마우스를 올리면 자동 재생
- **모바일**: 재생 버튼을 눌러야 재생
- **음소거**: 항상 muted 상태 (브라우저 정책)
- **반복**: 영상이 끝나면 자동으로 다시 처음부터 재생

---

## YouTube Shorts 등록 방법

### 1. YouTube Shorts URL 확인

YouTube Shorts 페이지에서 URL을 복사합니다.

**지원하는 URL 형식:**
```
https://www.youtube.com/shorts/VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/watch?v=VIDEO_ID
```

예시:
```
https://www.youtube.com/shorts/dQw4w9WgXcQ
```

### 2. 포스터 이미지 준비

YouTube는 hover 자동재생이 불안정하므로 **썸네일 이미지가 필수**입니다.

**포스터 이미지 준비 방법:**
- YouTube Shorts 화면 캡처
- 또는 YouTube 썸네일 URL 사용:
  ```
  https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
  ```

### 3. 데이터 입력 예시

```javascript
{
  id: "shorts-youtube-01",
  type: "youtube",
  videoUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
  posterUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  productUrl: "/product/detail.html?product_no=456",
  productThumbUrl: "https://쇼핑몰.com/web/product/medium/sample.jpg",
  productName: "Lena Fine Knit",
  price: "69,000원"
}
```

### YouTube Shorts 동작 방식

- **기본 상태**: 썸네일 이미지 + 빨간 재생 버튼
- **PC/모바일 공통**: 재생 버튼 클릭 시 iframe으로 재생
- **자동재생 없음**: YouTube 정책상 hover 자동재생 불가
- **닫기 버튼**: 영상 우측 상단에 X 버튼으로 닫기 가능

---

## 포스터 이미지 권장 규격

### 이미지 규격

| 항목 | 권장 사양 |
|------|----------|
| 비율 | **9:16** (세로형) |
| 해상도 | 1080 x 1920px 또는 720 x 1280px |
| 형식 | JPEG, PNG, WebP |
| 용량 | 300KB 이하 |
| URL | HTTPS 필수 |

### 포스터 이미지 준비 방법

**방법 1: 영상 첫 프레임 캡처**
- 영상 편집 프로그램에서 첫 장면 추출
- 9:16 비율로 저장

**방법 2: 디자인 툴 사용**
- Figma, Photoshop 등에서 1080x1920px 캔버스 생성
- 브랜드 이미지와 텍스트 배치
- JPEG 또는 PNG로 내보내기

**방법 3: 온라인 툴**
- Canva, Adobe Express 등에서 Instagram Story 템플릿 사용
- 9:16 비율이 자동 적용됨

### 업로드 위치

- 외부 CDN 또는 이미지 호스팅 서비스
- 카페24 서버: `/web/upload/atelier-shorts/posters/`

---

## 상품 링크 연결

### 카페24 상품 연결

```javascript
{
  productUrl: "/product/detail.html?product_no=123",
  productThumbUrl: "https://쇼핑몰.com/web/product/medium/이미지파일명.jpg",
  productName: "상품명",
  price: "99,000원"
}
```

**상품 번호 확인 방법:**
1. 카페24 관리자 > 상품관리 > 상품조회
2. 해당 상품 클릭
3. URL에서 `product_no=` 뒤의 숫자 확인

**상품 썸네일 URL:**
- 카페24가 자동 생성한 이미지 경로 사용
- 경로 형식: `/web/product/medium/파일명.jpg`
- 또는 관리자에서 상품 이미지 우클릭 → 이미지 주소 복사

### 외부 링크 연결

```javascript
{
  productUrl: "https://example.com/product-page",
  productThumbUrl: "https://cdn.example.com/thumb.jpg",
  productName: "External Product",
  price: "$99"
}
```

### 상품 링크 없는 영상

브랜드 홍보 영상 등 상품 연결이 필요 없으면 모두 빈 문자열로:

```javascript
{
  id: "shorts-brand-story",
  type: "mp4",
  videoUrl: "https://cdn.example.com/brand-story.mp4",
  posterUrl: "https://cdn.example.com/brand-story-poster.jpg",
  productUrl: "",
  productThumbUrl: "",
  productName: "",
  price: ""
}
```

상품 링크가 비어있으면 하단 상품 카드가 자동으로 숨겨집니다.

---

## URL 규칙 및 보안

### HTTPS 필수

모든 URL은 반드시 **HTTPS**로 시작해야 합니다.

```javascript
// ✅ 올바른 예시
"https://cdn.example.com/video.mp4"
"https://www.youtube.com/shorts/VIDEO_ID"

// ❌ 잘못된 예시 (보안 경고 발생)
"http://cdn.example.com/video.mp4"
```

**이유:**
- HTTPS 페이지에서 HTTP 리소스를 불러오면 브라우저가 차단합니다
- "Mixed Content" 보안 경고가 발생합니다
- 영상이 표시되지 않습니다

### URL 검증

시스템이 자동으로 다음을 검증합니다:

1. **HTTPS 검사**: HTTP URL은 무시됨
2. **YouTube ID 추출**: 잘못된 YouTube URL은 placeholder로 대체
3. **로드 실패 처리**: 영상 로드 실패 시 포스터만 표시

### 에러 처리

| 상황 | 동작 |
|------|------|
| videoUrl이 비어있음 | Placeholder 표시 |
| posterUrl 로드 실패 | 회색 배경 표시 |
| 영상 로드 실패 | 포스터 + 재생 아이콘만 표시 |
| YouTube URL 오류 | Placeholder 표시 |

---

## 샘플 데이터

### 예시 1: MP4 영상 (외부 CDN)

```javascript
{
  id: "shorts-winter-collection",
  type: "mp4",
  videoUrl: "https://cdn.cloudflare.com/atelier/winter-2026.mp4",
  posterUrl: "https://cdn.cloudflare.com/atelier/winter-2026-poster.jpg",
  productUrl: "/product/detail.html?product_no=789",
  productThumbUrl: "https://쇼핑몰.cafe24.com/web/product/medium/jacket-001.jpg",
  productName: "Marlow Wool Jacket",
  price: "159,000원"
}
```

**설명:**
- Cloudflare CDN에 업로드한 MP4 영상
- PC에서 hover 시 자동 재생
- 상품 클릭 시 상세 페이지로 이동

---

### 예시 2: YouTube Shorts

```javascript
{
  id: "shorts-youtube-demo",
  type: "youtube",
  videoUrl: "https://www.youtube.com/shorts/dQw4w9WgXcQ",
  posterUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  productUrl: "/product/detail.html?product_no=456",
  productThumbUrl: "https://쇼핑몰.cafe24.com/web/product/medium/knit-002.jpg",
  productName: "Lena Fine Knit",
  price: "69,000원"
}
```

**설명:**
- YouTube Shorts URL 직접 사용
- 썸네일은 YouTube 자동 생성 이미지
- 클릭 시 iframe으로 재생

---

## 카드 추가하기

### 단계별 가이드

**1. 데이터 파일 열기**
```
/skin/layout/basic/js/atelier-shorts-data.js
```

**2. 배열에 새 객체 추가**
```javascript
window.ATELIER_SHORTS_DATA = [
  // ... 기존 카드들
  
  // 새 카드 추가
  {
    id: "shorts-new-01",
    type: "mp4",
    videoUrl: "https://your-cdn.com/new-video.mp4",
    posterUrl: "https://your-cdn.com/new-poster.jpg",
    productUrl: "/product/detail.html?product_no=999",
    productThumbUrl: "https://your-shop.com/web/product/medium/new.jpg",
    productName: "New Product",
    price: "129,000원"
  }
];
```

**3. 파일 저장 및 업로드**
- FTP로 서버에 업로드
- 또는 카페24 관리자 > 쇼핑몰 디자인 > 파일 관리

**4. 캐시 삭제 및 확인**
- 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
- 페이지 새로고침 (Ctrl+Shift+R)

---

## 카드 삭제하기

데이터 파일에서 해당 객체를 삭제하거나 주석 처리:

```javascript
window.ATELIER_SHORTS_DATA = [
  // 이 카드는 표시되지 않음
  /*
  {
    id: "shorts-old",
    type: "mp4",
    ...
  },
  */
  
  // 나머지 카드들
  {
    id: "shorts-active",
    ...
  }
];
```

---

## 문제 해결

### 영상이 표시되지 않음

**체크리스트:**
1. ✅ URL이 HTTPS로 시작하는가?
2. ✅ 영상 파일이 실제로 존재하는가?
3. ✅ 영상 형식이 MP4 (H.264)인가?
4. ✅ CORS 설정이 올바른가? (외부 CDN 사용 시)
5. ✅ 브라우저 콘솔에 에러가 있는가?

**해결 방법:**
```javascript
// 1. URL 직접 브라우저에서 열어보기
// 영상이 다운로드되면 URL은 올바름

// 2. 콘솔 확인
// F12 → Console 탭
// "ATELIER SHORTS: 영상 로드 실패" 메시지 확인

// 3. posterUrl만 먼저 테스트
{
  videoUrl: "",  // 비워두고
  posterUrl: "https://확인된-이미지-URL.jpg"  // 이것만 먼저 테스트
}
```

### YouTube Shorts가 재생되지 않음

**원인:**
- 잘못된 URL 형식
- YouTube가 임베드를 허용하지 않는 영상
- 네트워크 연결 문제

**해결 방법:**
```javascript
// 1. VIDEO_ID만 추출해서 확인
// https://www.youtube.com/shorts/dQw4w9WgXcQ
//                              ↑ 이 부분만 복사

// 2. 테스트 URL로 직접 접속
// https://www.youtube.com/embed/dQw4w9WgXcQ

// 3. 접속이 안되면 해당 영상은 임베드 불가
// → MP4로 다운로드해서 사용하거나 다른 영상 선택
```

### 상품 링크가 작동하지 않음

**체크리스트:**
1. ✅ `productUrl`이 비어있지 않은가?
2. ✅ 상품 번호가 올바른가?
3. ✅ 카페24 상품이 "진열"상태인가?

**해결 방법:**
```javascript
// 상품 URL 직접 테스트
// 브라우저 주소창에 입력:
// https://쇼핑몰.com/product/detail.html?product_no=123

// 페이지가 열리면 URL은 올바름
// "찾을 수 없음" 오류 → 상품 번호 확인
```

### PC에서 hover 재생이 안 됨

**원인:**
- `type`이 `youtube`로 설정됨 (YouTube는 hover 재생 불가)
- 브라우저 autoplay 정책
- `prefers-reduced-motion` 설정

**해결 방법:**
```javascript
// 1. type 확인
{
  type: "mp4",  // ← "youtube"가 아닌 "mp4"여야 함
  videoUrl: "https://...mp4"
}

// 2. 모바일이 아닌 PC로 테스트
// 3. 시크릿 모드에서 테스트
```

### 포스터 이미지가 깨짐

**원인:**
- 이미지 URL이 잘못됨
- 이미지가 삭제됨
- HTTPS가 아님

**해결 방법:**
```javascript
// 1. 이미지 URL을 브라우저에 직접 입력
// 이미지가 보이면 URL은 올바름

// 2. 임시로 다른 이미지로 교체
posterUrl: "https://via.placeholder.com/1080x1920"

// 3. 이미지 파일 재업로드
```

---

## 성능 최적화

### 영상 파일 최적화

**도구:**
- HandBrake (무료): https://handbrake.fr/
- FFmpeg (커맨드라인)
- Adobe Media Encoder

**권장 설정:**
```
형식: MP4
코덱: H.264
프로파일: High
레벨: 4.0
비트레이트: 2-5 Mbps
해상도: 1080x1920 또는 720x1280
프레임레이트: 30fps
```

### 이미지 최적화

**도구:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac)

**권장 설정:**
```
형식: JPEG (사진), PNG (투명배경), WebP (지원 시)
해상도: 1080x1920 (큰 화면) 또는 720x1280 (모바일)
품질: 80-85%
용량: 300KB 이하
```

---

## 자주 묻는 질문 (FAQ)

### Q1. 영상을 몇 개까지 추가할 수 있나요?

**A:** 기술적으로는 제한이 없지만, **8~12개**를 권장합니다.
- 너무 많으면 초기 로딩 시간이 길어집니다
- Swiper 슬라이더가 자동으로 페이지네이션을 처리합니다

---

### Q2. MP4와 YouTube를 섞어서 사용할 수 있나요?

**A:** 네, 가능합니다.

```javascript
window.ATELIER_SHORTS_DATA = [
  { type: "mp4", ... },      // MP4
  { type: "youtube", ... },  // YouTube
  { type: "mp4", ... },      // MP4
  { type: "youtube", ... },  // YouTube
];
```

---

### Q3. 영상 순서를 바꾸려면?

**A:** 배열의 순서를 바꾸면 됩니다.

```javascript
// 첫 번째 카드와 두 번째 카드 순서 교체
window.ATELIER_SHORTS_DATA = [
  { id: "shorts-02", ... },  // 이전 2번
  { id: "shorts-01", ... },  // 이전 1번
];
```

---

### Q4. 세로형이 아닌 가로형 영상도 가능한가요?

**A:** 기술적으로는 가능하지만 **권장하지 않습니다**.
- 카드 비율이 9:16으로 고정되어 있습니다
- 가로형 영상은 위아래에 검은 바가 생깁니다
- 모바일에서 최적화되지 않습니다

---

### Q5. YouTube 영상을 MP4로 다운로드해서 사용해도 되나요?

**A:** 저작권 문제가 없다면 가능합니다.
- 자사가 제작한 YouTube 콘텐츠: ✅ 가능
- 타사 콘텐츠: ❌ 저작권 침해

**다운로드 도구:**
- youtube-dl
- 4K Video Downloader
- 온라인 변환 사이트 (주의: 저작권 확인 필수)

---

## 업데이트 이력

### 2026-06-26
- URL 입력형 시스템으로 전환
- MP4 + YouTube Shorts 지원
- HTTPS URL 검증 추가
- 에러 처리 강화
- 상세 가이드 문서 작성

---

## 지원 및 문의

기술 지원이 필요하면:
1. 브라우저 개발자 도구 콘솔 확인 (F12 → Console)
2. 에러 메시지 캡처
3. 문제되는 URL과 데이터 준비
4. 개발팀에 문의

**관련 파일:**
- 데이터: `/skin/layout/basic/js/atelier-shorts-data.js`
- 기능: `/skin/layout/basic/js/atelier-shorts.js`
- 스타일: `/skin/layout/basic/css/layout.css`
- HTML: `/skin/index.html`
