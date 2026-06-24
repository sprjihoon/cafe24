/**
 * 움직이는 배너 Jquery Plug-in
 * @author  cafe24
 */

(function($){

    $.fn.floatBanner = function(options) {
        options = $.extend({}, $.fn.floatBanner.defaults , options);

        return this.each(function() {
            var aPosition = $(this).position();
            var jbOffset = $(this).offset();
            var node = this;

            $(window).on('scroll', function() {
                var _top = $(document).scrollTop();
                _top = (aPosition.top < _top) ? _top : aPosition.top;

                setTimeout(function () {
                    var newinit = $(document).scrollTop();

                    if ( newinit > jbOffset.top ) {
                        _top -= jbOffset.top;
                        var container_height = $("#wrap").height();
                        var quick_height = $(node).height();
                        var cul = container_height - quick_height;
                        if(_top > cul){
                            _top = cul;
                        }
                    } else {
                        _top = 0;
                    }

                    $(node).stop().animate({top: _top}, options.animate);
                }, options.delay);
            });
        });
    };

    $.fn.floatBanner.defaults = {
        'animate'  : 500,
        'delay'    : 500
    };

})(jQuery);

/**
 * 문서 구동후 시작
 */
$(function(){
    $('#banner:visible, #quick:visible').floatBanner();

    //placeholder
    $(".ePlaceholder input, .ePlaceholder textarea").each(function(i){
        var placeholderName = $(this).parents().attr('title');
        $(this).attr("placeholder", placeholderName);
    });
    /* placeholder ie8, ie9 */
    $.fn.extend({
        placeholder : function() {
            //IE 8 버전에는 hasPlaceholderSupport() 값이 false를 리턴
           if (hasPlaceholderSupport() === true) {
                return this;
            }
            //hasPlaceholderSupport() 값이 false 일 경우 아래 코드를 실행
            return this.each(function(){
                var findThis = $(this);
                var sPlaceholder = findThis.attr('placeholder');
                if ( ! sPlaceholder) {
                   return;
                }
                findThis.wrap('<label class="ePlaceholder" />');
                var sDisplayPlaceHolder = $(this).val() ? ' style="display:none;"' : '';
                findThis.before('<span' + sDisplayPlaceHolder + '>' + sPlaceholder + '</span>');
                this.onpropertychange = function(e){
                    e = event || e;
                    if (e.propertyName == 'value') {
                        $(this).trigger('focusout');
                    }
                };
                //공통 class
                var agent = navigator.userAgent.toLowerCase();
                if (agent.indexOf("msie") != -1) {
                    $(".ePlaceholder").css({"position":"relative"});
                    $(".ePlaceholder span").css({"position":"absolute", "padding":"0 4px", "color":"#878787"});
                    $(".ePlaceholder label").css({"padding":"0"});
                }
            });
        }
    });

    $(':input[placeholder]').placeholder(); //placeholder() 함수를 호출

    //클릭하면 placeholder 숨김
    $('body').on('click', '.ePlaceholder span', function(){
        $(this).hide();
    });

    //input창 포커스 인 일때 placeholder 숨김
    $('body').on('focusin', '.ePlaceholder :input', function(){
        $(this).prev('span').hide();
    });

    //input창 포커스 아웃 일때 value 가 true 이면 숨김, false 이면 보여짐
    $('body').on('focusout', '.ePlaceholder :input', function(){
        if (this.value) {
            $(this).prev('span').hide();
        } else {
            $(this).prev('span').show();
        }
    });

    //input에 placeholder가 지원이 되면 true를 안되면 false를 리턴값으로 던져줌
    function hasPlaceholderSupport() {
        if ('placeholder' in document.createElement('input')) {
            return true;
        } else {
            return false;
        }
    }
});

/**
 *  썸네일 이미지 엑박일경우 기본값 설정
 */
$(window).on('load', function() {
    $("img.thumb,img.ThumbImage,img.BigImage").each(function($i,$item){
        var $img = new Image();
        $img.onerror = function () {
            $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
});

/**
 *  tooltip
 */
$('.eTooltip').each(function(i){
    $(this).find('.btnClose').attr('tabIndex','-1');
});
//tooltip input focus
$('.eTooltip').find('input').on('focus', function() {
    var targetName = returnTagetName(this);
    targetName.siblings('.ec-base-tooltip').show();
});
$('.eTooltip').find('input').on('focusout', function() {
    var targetName = returnTagetName(this);
    targetName.siblings('.ec-base-tooltip').hide();
});
function returnTagetName(_this){
    var ePlacename = $(_this).parent().attr("class");
    var targetName;
    if(ePlacename == "ePlaceholder"){ //ePlaceholder 대응
        targetName = $(_this).parents();
    }else{
        targetName = $(_this);
    }
    return targetName;
}

/**
 *  eTab
 */
$("body").on("click", ".eTab a", function(e){
    // 클릭한 li 에 selected 클래스 추가, 기존 li에 있는 selected 클래스는 삭제.
    var _li = $(this).parent("li").addClass("selected").siblings().removeClass("selected"),
    _target = $(this).attr("href"),
    _siblings = $(_target).attr("class"),
    _arr = _siblings.split(" "),
    _classSiblings = "."+_arr[0];

    //클릭한 탭에 해당하는 요소는 활성화, 기존 요소는 비활성화 함.
    $(_target).show().siblings(_classSiblings).hide();


    //preventDefault 는 a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됨.
    e.preventDefault();
});

/* ============================================================
   LE BLANC DESIGN — 초기화 스크립트
   역할: layout.html에서 처리 안 된 부분을 보완
   ============================================================ */
(function() {

  /* ① 쇼핑몰 이름 채우기
     {$mall_name}은 모듈 컨텍스트 밖에서 미처리됨
     → module holder에 있는 로고 텍스트를 읽어서 lb-logo에 적용 */
  function fixMallName() {
    var lbLogo = document.querySelector('.lb-logo');
    if (!lbLogo) return;

    // 이미 정상 텍스트면 스킵
    var currentText = lbLogo.textContent.trim();
    if (currentText && currentText.indexOf('{$') === -1) return;

    // 1순위: module holder 안의 로고 링크 텍스트
    var holderLogo = document.querySelector('#lb-module-holder .xans-layout-logotop a, #lb-module-holder h1 a');
    if (holderLogo) {
      var name = holderLogo.textContent.trim();
      if (name && name.indexOf('{$') === -1) {
        lbLogo.textContent = name;
        return;
      }
    }

    // 2순위: 페이지 title에서 추출 (보통 "상품명 : 쇼핑몰명" 형태)
    var title = document.title;
    var parts = title.split(':');
    var shopName = parts[parts.length - 1].trim();
    if (shopName && shopName.length > 0 && shopName.indexOf('{$') === -1) {
      lbLogo.textContent = shopName;
    }
  }

  /* ② 마퀴 배너 안전 삽입
     layout.html에 있으면 중복 삽입 방지 */
  function ensureMarquee() {
    if (document.getElementById('marquee-banner')) return;

    var msg = 'TIMELESS MODERNITY &nbsp;&nbsp;·&nbsp;&nbsp; FREE SHIPPING OVER 50,000원 &nbsp;&nbsp;·&nbsp;&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;&nbsp;·&nbsp;&nbsp; 미니멀하고 클래식한 감성의 프리미엄 컨템포러리 &nbsp;&nbsp;·&nbsp;&nbsp; 30일 무료반품 &nbsp;&nbsp;·&nbsp;&nbsp; ';
    var html =
      '<div id="marquee-banner">' +
        '<div class="marquee-track">' +
          '<span>' + msg + '</span>' +
          '<span>' + msg + '</span>' +
        '</div>' +
      '</div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    var banner = el.firstChild;

    var skipNav = document.getElementById('skipNavigation');
    var header = document.getElementById('header');

    if (skipNav && skipNav.parentNode) {
      skipNav.parentNode.insertBefore(banner, skipNav.nextSibling);
    } else if (header && header.parentNode) {
      header.parentNode.insertBefore(banner, header);
    }
  }

  /* ③ 헤더 fallback — 새 헤더 구조 (로고 왼쪽) */
  function ensureHeader() {
    if (document.querySelector('.lb-header')) return;

    var header = document.getElementById('header');
    if (!header) return;

    header.innerHTML =
      '<div class="lb-header">' +
        '<div class="lb-header-left">' +
          '<button class="lb-hamburger" aria-label="메뉴 열기">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<a href="/index.html" class="lb-logo">SHOP</a>' +
        '</div>' +
        '<div class="lb-icons">' +
          '<a href="/order/basket.html" title="장바구니" class="lb-icon-cart">&#128717;</a>' +
          '<a href="/member/login.html" title="로그인">&#128100;</a>' +
          '<a href="/product/search.html" title="검색">&#128269;</a>' +
        '</div>' +
      '</div>';
  }

  /* ④ 탐색경로(breadcrumb) 스타일 보정 */
  function fixBreadcrumb() {
    var path = document.querySelector('.path');
    if (path) {
      path.style.cssText += 'margin:8px 0 0; padding:0 20px; box-sizing:border-box;';
    }
  }

  function init() {
    ensureMarquee();
    ensureHeader();
    fixMallName();
    fixBreadcrumb();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
