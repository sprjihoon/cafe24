# Atelier Shorts 자동 슬라이드 개선

## 문제점
- 숏츠가 재생되지 않고 왼쪽 앞의 것만 계속 재생됨
- 비디오가 끝나도 다음 슬라이드로 자동 전환되지 않음
- 하단 슬라이드 버튼은 정상 작동하지만 비디오와 슬라이드가 동기화되지 않음
- 30초 타이머로만 슬라이드 전환이 이루어짐
- 7번 슬라이드 이후 1번으로 돌아가지 않음
- 1번부터 시작하는 대신 3번부터 시작하고 싶음
- loop 모드에서 활성 슬라이드와 재생 슬라이드가 일치하지 않음

## 해결 방법

### 1. MP4 비디오 자동 전환 추가 (이벤트 위임)
```javascript
// 컨테이너에 이벤트 위임 - 복제된 슬라이드에도 작동
container.addEventListener('ended', function(e) {
  if (e.target.tagName === 'VIDEO') {
    var card = e.target.closest('.atelier-shorts__card');
    if (card && isActiveSlide(card)) {
      goToNextSlide();
    }
  }
}, true);
```

### 2. YouTube 비디오 자동 전환 추가
- YouTube IFrame API를 사용하여 비디오 종료 감지
- 고유한 iframe ID 생성으로 loop 모드에서 중복 방지
- `enablejsapi=1` 파라미터 추가로 API 활성화

```javascript
// 고유한 ID로 중복 방지
var uniqueId = 'youtube-player-' + videoId + '-' + Date.now();
```

### 3. 이벤트 위임 방식으로 변경 ⭐
- 모든 이벤트를 컨테이너에 위임하여 loop 모드의 복제된 슬라이드에서도 정상 작동
- 각 카드에 개별 리스너를 등록하지 않아 메모리 효율성 향상
- 복제된 슬라이드에 중복 이벤트 등록 문제 해결

```javascript
// 재생 버튼, 닫기 버튼, 포커스 등 모든 이벤트를 컨테이너에 위임
container.addEventListener('click', function(e) {
  var playBtn = e.target.closest('.atelier-shorts__play-btn');
  if (!playBtn) return;
  // ...
});
```

### 4. slideToCard 함수 loop 모드 대응 ⭐
- loop 모드에서는 `data-swiper-slide-index` 속성 사용
- `slideToLoop()` 메서드로 정확한 슬라이드로 이동

```javascript
function slideToCard(card) {
  if (!swiperInstance) return;
  var slide = card.closest('.swiper-slide');
  if (!slide) return;
  
  var realIndex = slide.getAttribute('data-swiper-slide-index');
  if (realIndex !== null) {
    swiperInstance.slideToLoop(parseInt(realIndex, 10));
  }
}
```

### 5. 무한 루프 슬라이더 구현
- Swiper의 `loop: true` 옵션 활성화로 무한 스크롤 구현
- `initialSlide: 2` 설정으로 3번째 슬라이드부터 시작
- `loopAdditionalSlides: 2` 설정으로 매끄러운 전환 보장

```javascript
swiperInstance = new Swiper('.atelier-shorts__slider', {
  loop: true,
  initialSlide: 2,
  loopAdditionalSlides: 2,
  // ...
});
```

### 6. 디버깅 로그 추가
- 활성 슬라이드 ID와 realIndex를 콘솔에 출력
- 어떤 슬라이드가 재생되는지 추적 가능

```javascript
console.log('ATELIER SHORTS: 슬라이드 활성화 -', shortId, 'realIndex:', swiperInstance.realIndex);
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
4. **이벤트 위임**: 복제된 슬라이드에서도 이벤트가 정상 작동

### 자동 재생 및 전환 플로우
1. **초기 로드**: 3번 슬라이드가 가운데 위치하며 자동 재생
2. **슬라이드 활성화**: Swiper가 슬라이드를 활성화하면 `playActiveSlide()` 호출
3. **정확한 슬라이드 찾기**: `.swiper-slide-active` 클래스로 현재 활성 슬라이드 선택
4. **비디오 자동 재생**: 
   - MP4: `playVideo()` 호출하여 자동 재생
   - YouTube: `createYouTubeIframe()` 호출하여 iframe 생성 및 자동 재생
5. **타이머 중지**: 비디오 재생 시 30초 자동 슬라이드 타이머 중지
6. **비디오 종료 감지**: 
   - MP4: `ended` 이벤트 (이벤트 위임)
   - YouTube: IFrame API `onStateChange` 이벤트
7. **다음 슬라이드로 전환**: 비디오가 끝나면 `goToNextSlide()` 호출
8. **무한 반복**: 
   - 3 → 4 → 5 → 6 → 7 → 1 → 2 → 3 → 4 → ... (무한 반복)

## 파일 수정 내역
- `skin/layout/basic/js/atelier-shorts.js`: 
  - 이벤트 위임 방식으로 변경
  - loop 모드 대응 개선
  - YouTube iframe 고유 ID 생성
  - 디버깅 로그 추가

## 테스트 방법
1. ✅ 페이지 로드 후 **3번째 슬라이드**가 가운데 위치하며 자동 재생되는지 확인
2. ✅ 콘솔에서 "ATELIER SHORTS: 슬라이드 활성화 - shorts-03 realIndex: 2" 확인
3. ✅ 비디오가 끝나면 자동으로 다음 슬라이드로 전환되는지 확인
4. ✅ 7번 슬라이드 재생 후 **1번 슬라이드로 자동 전환**되는지 확인
5. ✅ 1번 슬라이드 이전으로 이동하면 **7번 슬라이드가 나오는지** 확인
6. ✅ 활성 슬라이드와 재생되는 비디오가 일치하는지 확인
7. ✅ prev/next 버튼으로 수동 전환이 정상 작동하는지 확인
8. ✅ YouTube 비디오도 동일하게 작동하는지 확인
9. ✅ 하단 pagination이 올바른 번호를 표시하는지 확인

## 주요 변경 사항 요약
| 항목 | 이전 | 현재 |
|------|------|------|
| 시작 슬라이드 | 1번 | **3번** ⭐ |
| 무한 루프 | ❌ (7번에서 끝) | ✅ (7번 → 1번 자동 전환) ⭐ |
| 이벤트 등록 | 각 카드에 개별 등록 | **컨테이너에 위임** ⭐ |
| 슬라이드 이동 | `slideTo(index)` | **`slideToLoop(realIndex)`** ⭐ |
| YouTube iframe ID | 고정 ID (중복 가능) | **고유 ID (타임스탬프 추가)** ⭐ |
| 비디오 자동 전환 | ❌ (30초 타이머만) | ✅ (비디오 끝나면 즉시 전환) |
| 활성 슬라이드 추적 | 부정확 | **정확 (디버깅 로그 추가)** ⭐ |

## 주의사항
- YouTube IFrame API가 처음 로드될 때 약간의 지연이 있을 수 있음
- 비디오 로드 실패 시 자동으로 타이머가 재시작되어 30초 후 다음 슬라이드로 전환
- 모바일에서는 자동 재생이 브라우저 정책에 따라 제한될 수 있음
- loop 모드에서는 Swiper가 내부적으로 슬라이드를 복제하므로 DOM에 추가 요소가 생성됨
- 이벤트 위임 방식으로 변경하여 복제된 슬라이드에서도 정상 작동
- 콘솔 로그를 확인하여 올바른 슬라이드가 재생되는지 검증 가능
