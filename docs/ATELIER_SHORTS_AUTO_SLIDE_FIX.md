# Atelier Shorts 자동 슬라이드 개선

## 문제점
- 숏츠가 재생되지 않고 왼쪽 앞의 것만 계속 재생됨
- 비디오가 끝나도 다음 슬라이드로 자동 전환되지 않음
- 하단 슬라이드 버튼은 정상 작동하지만 비디오와 슬라이드가 동기화되지 않음
- 30초 타이머로만 슬라이드 전환이 이루어짐
- 7번 슬라이드 이후 1번으로 돌아가지 않음
- 1번부터 시작하는 대신 3번부터 시작하고 싶음

## 해결 방법

### 1. MP4 비디오 자동 전환 추가
```javascript
// 영상 종료 시 다음 슬라이드로 전환
video.addEventListener('ended', function() {
  console.log('ATELIER SHORTS: 영상 종료, 다음 슬라이드로 전환');
  if (isActiveSlide(card)) {
    goToNextSlide();
  }
});
```

### 2. YouTube 비디오 자동 전환 추가
- YouTube IFrame API를 사용하여 비디오 종료 감지
- `enablejsapi=1` 파라미터 추가로 API 활성화
- `onStateChange` 이벤트에서 비디오 종료 시 다음 슬라이드로 전환

```javascript
var player = new YT.Player('youtube-player-' + videoId, {
  events: {
    'onStateChange': function(event) {
      // 비디오 종료 시 (0 = YT.PlayerState.ENDED)
      if (event.data === 0) {
        console.log('ATELIER SHORTS: YouTube 비디오 종료, 다음 슬라이드로 전환');
        if (isActiveSlide(card)) {
          goToNextSlide();
        }
      }
    }
  }
});
```

### 3. 비디오 재생 중 타이머 중지
- 비디오가 재생되면 자동 슬라이드 타이머 중지
- 비디오가 끝나면 자동으로 다음 슬라이드로 전환

```javascript
// playVideo 함수에서
clearAutoSlide();
pauseProgressFill();
```

### 4. loop 속성 제거
- MP4 비디오의 `loop` 속성을 제거하여 비디오가 끝나면 `ended` 이벤트 발생
- 이제 비디오가 한 번 재생되고 끝나면 자동으로 다음 슬라이드로 전환

### 5. goToNextSlide 함수 추가
- 다음 슬라이드로 전환하는 로직을 별도 함수로 분리
- Swiper의 loop 모드를 사용하여 무한 반복

```javascript
function goToNextSlide() {
  if (!swiperInstance) return;
  // loop 모드에서는 자동으로 무한 반복됨
  swiperInstance.slideNext();
}
```

### 6. 무한 루프 슬라이더 구현 (NEW) ⭐
- Swiper의 `loop: true` 옵션 활성화로 무한 스크롤 구현
- `initialSlide: 2` 설정으로 3번째 슬라이드부터 시작
- `loopAdditionalSlides: 2` 설정으로 매끄러운 전환 보장

```javascript
swiperInstance = new Swiper('.atelier-shorts__slider', {
  loop: true,  // 무한 루프 활성화
  initialSlide: 2,  // 3번째 슬라이드부터 시작 (0-based index)
  loopAdditionalSlides: 2,  // loop 모드에서 추가 복제 슬라이드 수
  // ... 기타 설정
});
```

### 7. Pagination 텍스트 수정
- loop 모드에서 `realIndex` 사용으로 올바른 슬라이드 번호 표시
- 7번 다음에 1번이 표시되도록 순환

```javascript
function updatePaginationText(current) {
  if (!progressTextEl) return;
  var total = window.ATELIER_SHORTS_DATA.length;
  var index = current;
  if (index == null && swiperInstance) {
    // loop 모드에서는 realIndex 사용 (실제 슬라이드 인덱스)
    index = (swiperInstance.realIndex || 0) + 1;
  }
  progressTextEl.textContent = index + ' / ' + total;
}
```

## 작동 방식

### 무한 루프 슬라이더 ⭐
1. **초기 상태**: 3번째 슬라이드(shorts-03 - Cashmere Blend Coat)가 가운데 위치하며 자동 재생
2. **무한 스크롤**: 
   - 7번 슬라이드(Essential Silk Blouse) 다음에 1번 슬라이드(Marlow Wool Jacket)가 자동으로 표시됨
   - 1번 슬라이드 이전으로 가면 7번 슬라이드가 표시됨
   - 사용자에게는 끊김 없는 무한 스크롤처럼 보임
   - 7번 → 1번 → 2번 → 3번 → ... → 7번 → 1번 (무한 반복)
3. **슬라이드 복제**: Swiper가 내부적으로 슬라이드를 복제하여 매끄러운 전환 구현

### 자동 재생 및 전환 플로우
1. **초기 로드**: 3번 슬라이드가 가운데 위치하며 자동 재생
2. **슬라이드 활성화**: Swiper가 슬라이드를 활성화하면 `playActiveSlide()` 호출
3. **비디오 자동 재생**: 
   - MP4: `playVideo()` 호출하여 자동 재생
   - YouTube: `createYouTubeIframe()` 호출하여 iframe 생성 및 자동 재생
4. **타이머 중지**: 비디오 재생 시 30초 자동 슬라이드 타이머 중지
5. **비디오 종료 감지**: 
   - MP4: `ended` 이벤트 리스너
   - YouTube: IFrame API `onStateChange` 이벤트
6. **다음 슬라이드로 전환**: 비디오가 끝나면 `goToNextSlide()` 호출
7. **무한 반복**: 
   - 3 → 4 → 5 → 6 → 7 → 1 → 2 → 3 → 4 → ... (무한 반복)
   - 7번 다음에는 자동으로 1번이 나타남

### 수동 조작
- **슬라이드 버튼**: 언제든지 prev/next 버튼으로 수동 전환 가능
- **재생 버튼**: 비활성 슬라이드 클릭 시 해당 슬라이드로 이동 후 재생
- **닫기 버튼**: YouTube iframe 닫기 시 타이머 재시작
- **좌우 스와이프**: 터치/마우스 드래그로 슬라이드 전환 가능

## 파일 수정 내역
- `skin/layout/basic/js/atelier-shorts.js`: 비디오 자동 전환 및 무한 루프 로직 추가

## 테스트 방법
1. ✅ 페이지 로드 후 **3번째 슬라이드**가 가운데 위치하며 자동 재생되는지 확인
2. ✅ 비디오가 끝나면 자동으로 다음 슬라이드로 전환되는지 확인
3. ✅ 7번 슬라이드 재생 후 **1번 슬라이드로 자동 전환**되는지 확인
4. ✅ 1번 슬라이드 이전으로 이동하면 **7번 슬라이드가 나오는지** 확인
5. ✅ prev/next 버튼으로 수동 전환이 정상 작동하는지 확인
6. ✅ YouTube 비디오도 동일하게 작동하는지 확인
7. ✅ 하단 pagination이 올바른 번호를 표시하는지 확인 (1/7 ~ 7/7 순환)
8. ✅ 무한 스크롤이 자연스럽게 작동하는지 확인 (7 → 1, 1 → 7)

## 주요 변경 사항 요약
| 항목 | 이전 | 현재 |
|------|------|------|
| 시작 슬라이드 | 1번 | **3번** ⭐ |
| 무한 루프 | ❌ (7번에서 끝) | ✅ (7번 → 1번 자동 전환) ⭐ |
| 비디오 자동 전환 | ❌ (30초 타이머만) | ✅ (비디오 끝나면 즉시 전환) |
| MP4 loop | ✅ (무한 반복) | ❌ (1회 재생 후 다음 슬라이드) |
| YouTube 종료 감지 | ❌ | ✅ (IFrame API 사용) |

## 주의사항
- YouTube IFrame API가 처음 로드될 때 약간의 지연이 있을 수 있음
- 비디오 로드 실패 시 자동으로 타이머가 재시작되어 30초 후 다음 슬라이드로 전환
- 모바일에서는 자동 재생이 브라우저 정책에 따라 제한될 수 있음
- loop 모드에서는 Swiper가 내부적으로 슬라이드를 복제하므로 DOM에 추가 요소가 생성됨
- `realIndex`를 사용하여 pagination 텍스트가 올바르게 표시됨 (복제된 슬라이드 제외)
