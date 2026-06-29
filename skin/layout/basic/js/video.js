/**
 * ATELIER N 영상 배너 JavaScript
 * YouTube IFrame API 사용
 */

(function() {
  'use strict';

  var player;
  var videoId;

  // DOM 로드 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    loadYouTubeAPI();
    initVideoButton();
  }

  /**
   * YouTube IFrame API 로드
   */
  function loadYouTubeAPI() {
    if (window.YT) return;

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  /**
   * 영상 재생 버튼 초기화
   */
  function initVideoButton() {
    var playBtn = document.querySelector('.lb-video-play-btn');
    if (!playBtn) return;

    videoId = playBtn.dataset.videoId;
    if (!videoId) return;

    playBtn.addEventListener('click', function() {
      playVideo();
    });
  }

  /**
   * YouTube API 준비 완료 콜백
   */
  window.onYouTubeIframeAPIReady = function() {
    console.log('YouTube API ready');
  };

  /**
   * 영상 재생
   */
  function playVideo() {
    var container = document.getElementById('lb-youtube-player');
    if (!container || !videoId) return;

    // 이미 플레이어가 있으면 재생
    if (player) {
      player.playVideo();
      return;
    }

    // 플레이어 생성
    if (window.YT && window.YT.Player) {
      player = new YT.Player('lb-youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: function(event) {
            event.target.playVideo();
          },
        },
      });
    } else {
      // API가 아직 로드되지 않은 경우 iframe 직접 삽입
      container.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    }
  }

})();

