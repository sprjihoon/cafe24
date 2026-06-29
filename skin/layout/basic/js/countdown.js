/**
 * ATELIER N 타임세일 카운트다운 JavaScript
 * 실시간 카운터 업데이트
 */

(function() {
  'use strict';

  // DOM 로드 대기
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initCountdown();
  }

  /**
   * 타임세일 카운트다운
   * 종료 시간을 설정하고 실시간으로 업데이트
   */
  function initCountdown() {
    var countdown = document.getElementById('lb-countdown');
    if (!countdown) return;

    var daysEl = document.getElementById('countdown-days');
    var hoursEl = document.getElementById('countdown-hours');
    var minutesEl = document.getElementById('countdown-minutes');
    var secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // 타임세일 종료 시간 설정 (현재 시간 + 189일)
    // 실제 환경에서는 config.xml 또는 서버에서 설정된 시간 사용
    var endTime = getTimesaleEndTime();

    // 1초마다 업데이트
    var timer = setInterval(function() {
      var now = new Date().getTime();
      var distance = endTime - now;

      // 시간이 지나면 정지
      if (distance < 0) {
        clearInterval(timer);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      // 시간 계산
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // 업데이트
      daysEl.textContent = pad(days, 3);
      hoursEl.textContent = pad(hours, 2);
      minutesEl.textContent = pad(minutes, 2);
      secondsEl.textContent = pad(seconds, 2);

      // 애니메이션 효과 (초가 바뀔 때)
      if (seconds !== parseInt(secondsEl.dataset.prev || '0', 10)) {
        secondsEl.style.transform = 'scale(1.1)';
        setTimeout(function() {
          secondsEl.style.transform = 'scale(1)';
        }, 100);
      }
      secondsEl.dataset.prev = seconds;

    }, 1000);

    console.log('Countdown initialized');
  }

  /**
   * 타임세일 종료 시간 가져오기
   * 실제 환경에서는 설정값이나 서버에서 가져옴
   */
  function getTimesaleEndTime() {
    // 쿠키나 로컬스토리지에서 종료 시간 확인
    var savedEndTime = getCookie('lb_timesale_end');
    if (savedEndTime) {
      return parseInt(savedEndTime, 10);
    }

    // 없으면 현재 시간 + 189일 9시간 11분 46초로 설정
    var now = new Date().getTime();
    var duration = (189 * 24 * 60 * 60 * 1000) + // 189일
                   (9 * 60 * 60 * 1000) +         // 9시간
                   (11 * 60 * 1000) +             // 11분
                   (46 * 1000);                   // 46초
    var endTime = now + duration;

    // 쿠키에 저장 (30일)
    document.cookie = 'lb_timesale_end=' + endTime + '; path=/; max-age=' + (30 * 24 * 60 * 60);

    return endTime;
  }

  /**
   * 숫자를 지정된 자릿수로 패딩
   */
  function pad(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  /**
   * 쿠키 읽기
   */
  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

})();

