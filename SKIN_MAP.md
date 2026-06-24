# SKIN_MAP — 카페24 스킨 구조 및 모듈 목록

> **작성일**: 2026-06-24  
> **원칙**: 아래 모든 모듈·변수·반복문·조건문은 카페24 서버가 처리하는 영역이다.  
> **절대 삭제·이름변경 금지**. CSS/JS로 스타일만 제어할 것.

---

## 목차
1. [카페24 템플릿 문법 규칙](#1-카페24-템플릿-문법-규칙)
2. [LAYOUT — layout/basic/layout.html](#2-layout--layoutbasiclayouthtml)
3. [INDEX — index.html](#3-index--indexhtml)
4. [PRODUCT LIST — product/list.html](#4-product-list--productlisthtml)
5. [PRODUCT DETAIL — product/detail.html](#5-product-detail--productdetailhtml)
6. [ORDER — order/orderform.html](#6-order--orderorderformhtml)
7. [MEMBER — member/login.html & join.html](#7-member--memberloginhtml--joinhtml)
8. [전체 모듈 목록 (페이지별)](#8-전체-모듈-목록-페이지별)
9. [전체 변수 목록 (용도별)](#9-전체-변수-목록-용도별)
10. [CSS 타겟팅 가이드 (수정 가능 영역)](#10-css-타겟팅-가이드-수정-가능-영역)

---

## 1. 카페24 템플릿 문법 규칙

### 변수
```
{$변수명}                    → 값 출력
{$변수명|display}            → 조건부 display 값 ("" or "none") → CSS display 제어
{$변수명|numberformat}       → 숫자 포맷 (천 단위 콤마)
```

### 조건문 (카페24 방식)
```html
<!-- display 조건 — 클래스에 적용 -->
<li class="{$disp_cate_1|display}">...</li>
→ 해당 변수가 값이 없으면 class="none" → CSS .none { display:none }

<!-- style에 직접 적용 -->
<span style="display: {$category_title_text_display};">...</span>
→ 서버가 "block" 또는 "none" 문자열 출력
```

### 반복문 (카페24 방식)
```html
<!-- 동일한 li 2개 이상 = 서버가 반복 처리 -->
<li id="anchorBoxId_{$product_no}">...</li>
<li id="anchorBoxId_{$product_no}">...</li>
→ 실제 렌더링 시 상품 수만큼 반복 출력됨
```

### 모듈 선언
```html
<div module="모듈명">          → 이 div 전체를 모듈이 제어
<ul module="하위모듈명">       → 반복 출력 담당 하위 모듈
<!--@css(경로)-->              → CSS 번들 포함
<!--@js(경로)-->               → JS 번들 포함
<!--@import(경로)-->           → 다른 HTML 파일 포함
<!--@contents-->               → 페이지별 콘텐츠 삽입 위치
<!--@layout(경로)-->           → 사용할 레이아웃 선언 (파일 첫 줄)
<!--@define(변수명)-->         → 변수 정의
```

### 모듈 파라미터 설정 (주석 내부)
```html
<div module="product_listnormal">
    <!--
        $count = 12          → 출력 상품 수
        $basket_result = /product/add_basket.html
    -->
```

---

## 2. LAYOUT — layout/basic/layout.html

### 파일 역할
전체 쇼핑몰 페이지에 공통 적용되는 레이아웃. 헤더·네비·사이드바·푸터 포함.  
`<!--@contents-->` 위치에 각 페이지 콘텐츠가 삽입됨.

### 포함 리소스
```
<!--@css(/layout/basic/css/common.css)-->
<!--@css(/layout/basic/css/layout.css)-->        ← LE BLANC 커스텀 CSS
<!--@css(/layout/basic/css/ec-base-ui.css)-->
<!--@css(/layout/basic/css/ec-base-tooltip.css)-->
<!--@css(/layout/basic/css/ec-base-help.css)-->
<!--@css(/layout/basic/css/ec-base-product.css)-->
<!--@css(/layout/basic/css/ec-base-paginate.css)-->
<!--@css(/layout/basic/css/ec-base-tab.css)-->
<!--@css(/layout/basic/css/ec-base-button.css)-->
<!--@css(/layout/basic/css/ec-base-box.css)-->
<!--@css(/layout/basic/css/ec-base-table.css)-->
<!--@css(/layout/basic/css/ec-base-desc.css)-->
<!--@css(/layout/basic/css/leblanc.css)-->       ← LE BLANC 보조 CSS
<!--@js(/layout/basic/js/basic.js)-->            ← LE BLANC 초기화 JS
<!--@js(/js/common.js)-->
<!--@js(/js/module/layout/quick_view.js)-->
<!--@js(/js/login_redirect.js)-->
```

### 모듈 목록

| 모듈명 | 위치 | 역할 |
|--------|------|------|
| `Layout_LogoTop` | `#lb-module-holder h1` | 쇼핑몰 로고 + `{$mall_name}` 처리 |
| `Layout_SearchHeader` | `#lb-module-holder` | 헤더 검색창 |
| `Layout_multishopList` | `#lb-module-holder` | 다국어/멀티샵 목록 |
| `Layout_multishopListitem` | `ul` (하위) | 멀티샵 항목 반복 |
| `Layout_multishopListmultioption` | 내부 | 멀티샵 옵션 |
| `Layout_statelogoff` | `#lb-module-holder`, 헤더 | **비로그인** 시 출력 영역 |
| `Layout_stateLogon` | `#lb-module-holder`, 헤더 | **로그인** 시 출력 영역 |
| `Layout_shoppingInfo` | `#lb-module-holder` | 적립금·쿠폰·관심상품 정보 |
| `Layout_bookmark` | `.link` | 즐겨찾기 링크 |
| `Layout_shortcut` | `.link` | 바로가기 링크 |
| `Layout_category` | `#sidebar #category` | 사이드바 카테고리 목록 |
| `Layout_BoardInfo` | `#sidebar` | 사이드바 게시판 목록 |
| `Layout_SearchSide` | `#sidebar` | 사이드바 검색창 |
| `Layout_project` | `#sidebar` | 사이드바 쇼핑기획전 |
| `Layout_login` | `#sidebar` | 사이드바 로그인 폼 |
| `Layout_Info` | `#sidebar` | 고객센터 전화번호 |
| `Layout_Myshop` | `#sidebar` | 마이쇼핑 링크 |
| `Layout_Poll` | `#sidebar` | 설문조사 |
| `Layout_giftBanner` | `.banner` | 사은품 배너 |
| `Layout_opdiaryBanner` | `.banner` | 운영일지 배너 |
| `Layout_sosBanner` | `.banner` | 긴급문의 배너 |
| `Layout_attendBanner` | `.banner` | 출석체크 배너 |
| `Layout_couponzoneBanner` | `.banner` | 쿠폰존 배너 |
| `Layout_calendarBanner` | `.banner` | 캘린더 배너 |
| `Layout_orderBasketcount` | `#quick` | 퀵메뉴 장바구니 수량 |
| `Layout_productRecent` | `#quick` | 최근 본 상품 |
| `Layout_LogoBottom` | `#footer` | 하단 로고 |
| `Layout_footer` | `#footer` | 푸터 정보 (주소·저작권 등) |
| `Layout_ReferenceCurrencyList` | `#footer` | 기준통화 선택 |
| `Layout_ReferenceCurrencyListitem` | `ul` (하위) | 통화 목록 반복 |
| `Layout_multishopShipping` | `body` 하단 | 국제배송 레이어 |
| `Layout_conversionPc` | `body` 하단 | 모바일 전환 링크 |
| `Layout_orderBasketCount` | `.lb-cart-count` | 헤더 장바구니 수량 뱃지 |

### 변수 목록

| 변수 | 위치 | 설명 |
|------|------|------|
| `{$mall_name}` | 로고, 푸터 | 쇼핑몰 이름 (모듈 내부에서만 처리됨) |
| `{$basket_count}` | 장바구니 | 장바구니 상품 수 |
| `{$basket_cnt}` | `Layout_shoppingInfo` | 장바구니 수 (다른 형태) |
| `{$basket_price}` | `Layout_shoppingInfo` | 장바구니 합계 금액 |
| `{$mileage_name}` | `Layout_shoppingInfo` | 적립금 명칭 |
| `{$mileage}` | `Layout_shoppingInfo` | 현재 적립금 |
| `{$coupon_cnt}` | `Layout_shoppingInfo` | 보유 쿠폰 수 |
| `{$deposit_name}` | `Layout_shoppingInfo` | 예치금 명칭 |
| `{$deposit}` | `Layout_shoppingInfo` | 예치금 잔액 |
| `{$name}` | `Layout_stateLogon` | 로그인 회원 이름 |
| `{$action_logout}` | `Layout_stateLogon` | 로그아웃 액션 URL |
| `{$interest_prd_cnt}` | `Layout_shoppingInfo` | 관심상품 수 |
| `{$recent_img}` | `Layout_productRecent` | 최근 본 상품 이미지 |
| `{$phone}` | `Layout_Info`, 푸터 | 고객센터 전화번호 |
| `{$fax}` | 푸터 | 팩스번호 |
| `{$company_name}` | 푸터 | 상호명 |
| `{$president_name}` | 푸터 | 대표자명 |
| `{$company_regno}` | 푸터 | 사업자등록번호 |
| `{$mall_addr1}` | 푸터 | 주소 |
| `{$email}` | 푸터 | 이메일 |
| `{$attend_url}` | `.banner` | 출석체크 URL |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$basket_count_display\|display}` | 장바구니 수량 표시 여부 |
| `{$use_mileage\|display}` | 적립금 기능 사용 여부 |
| `{$use_basket_cnt\|display}` | 장바구니 수량 표시 여부 |
| `{$use_interest_prd\|display}` | 관심상품 기능 사용 여부 |
| `{$use_coupon_cnt\|display}` | 쿠폰 기능 사용 여부 |
| `{$use_deposit\|display}` | 예치금 기능 사용 여부 |
| `{$board_display\|display}` | 게시판 메뉴 표시 여부 |
| `{$consult_display\|display}` | 1:1 상담 메뉴 표시 여부 |
| `{$disp_recent\|display}` | 최근 본 상품 존재 여부 |

### 반복문

| 반복 모듈 | 반복 단위 |
|-----------|-----------|
| `Layout_multishopListitem` | 멀티샵 목록 항목 |
| `Layout_shoppingInfo` | 쇼핑 정보 항목 |
| `Layout_BoardInfo` | 게시판 목록 항목 |
| `Layout_category` | 카테고리 목록 항목 |
| `Layout_productRecent` | 최근 본 상품 항목 |
| `Layout_ReferenceCurrencyListitem` | 통화 목록 항목 |
| `Layout_Poll` (설문항목) | 설문 선택지 |

---

## 3. INDEX — index.html

### 파일 역할
메인 페이지. `<!--@layout(/layout/basic/main.html)-->` 사용 (layout.html과 다른 레이아웃).  
상품 진열 슬롯 7개 + 게시판 2개 구성.

### 모듈 목록

| 모듈명 | 역할 |
|--------|------|
| `product_listmain_1` ~ `product_listmain_7` | 메인 상품 진열 슬롯 1~7번 (관리자에서 카테고리 지정) |
| `product_ListItem` | 상품 개별 스펙 항목 (반복) |
| `product_Imagestyle` | 상품 이미지 아이콘 스타일 |
| `board_listpackage_5` | 자유게시판 최신글 목록 |
| `board_list_5` | 자유게시판 목록 항목 (반복) |
| `board_listpackage_6` | 상품 Q&A 최신글 목록 |
| `board_list_6` | Q&A 목록 항목 (반복) |

### 변수 목록

| 변수 | 모듈 | 설명 |
|------|------|------|
| `{$product_no}` | `product_listmain_*` | 상품 고유번호 (앵커 ID용) |
| `{$link_product_detail}` | `product_listmain_*` | 상품 상세 링크 |
| `{$image_medium}` | `product_listmain_*` | 상품 목록 이미지 URL |
| `{$image_medium_id}` | `product_listmain_*` | 이미지 요소 ID |
| `{$seo_alt_tag}` | `product_listmain_*` | 이미지 alt 텍스트 |
| `{$product_name}` | `product_listmain_*` | 상품명 |
| `{$product_name_title}` | `product_listmain_*` | 상품명 앞 타이틀 |
| `{$category_title_text}` | `product_listmain_*` | 진열 카테고리 타이틀 텍스트 |
| `{$category_title_img}` | `product_listmain_*` | 진열 카테고리 타이틀 이미지 |
| `{$icon_class_name}` | `product_Imagestyle` | 아이콘 CSS 클래스명 |
| `{$icon_url}` | `product_Imagestyle` | 아이콘 이미지 URL |
| `{$list_wish_icon}` | `product_listmain_*` | 찜하기 아이콘 |
| `{$soldout_icon}` | `product_listmain_*` | 품절 아이콘 |
| `{$stock_icon}` | `product_listmain_*` | 재고 아이콘 |
| `{$recommend_icon}` | `product_listmain_*` | 추천 아이콘 |
| `{$new_icon}` | `product_listmain_*` | 신상품 아이콘 |
| `{$product_icons}` | `product_listmain_*` | 기타 상품 아이콘 묶음 |
| `{$basket_icon}` | `product_listmain_*` | 장바구니 담기 아이콘 |
| `{$zoom_icon}` | `product_listmain_*` | 이미지 확대 아이콘 |
| `{$option_preview_icon}` | `product_listmain_*` | 옵션 미리보기 아이콘 |
| `{$disp_likeprd_icon}` | `product_listmain_*` | 좋아요 아이콘 |
| `{$disp_likeprd_count}` | `product_listmain_*` | 좋아요 수 |
| `{$rental_maximum_price}` | `product_listmain_*` | 월 렌탈 최저가 |
| `{$rental_maximum_term}` | `product_listmain_*` | 렌탈 최장 기간 |
| `{$item_title}` | `product_ListItem` | 스펙 항목 타이틀 |
| `{$item_content}` | `product_ListItem` | 스펙 항목 내용 |
| `{$subject}` | `board_list_5/6` | 게시글 제목 |
| `{$write_date}` | `board_list_5/6` | 게시글 날짜 |
| `{$link_board_detail}` | `board_list_5/6` | 게시글 상세 링크 |
| `{$block_target_class}` | `board_list_5/6` | 차단 대상 클래스 |
| `{$block_data_attr}` | `board_list_5/6` | 차단 데이터 속성 |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$category_title_text_display}` | 카테고리 타이틀 텍스트 표시 (block/none) |
| `{$category_title_img_display}` | 카테고리 타이틀 이미지 표시 (block/none) |
| `{$product_name_display\|display}` | 상품명 표시 여부 |
| `{$product_name_title_display\|display}` | 상품명 앞 타이틀 표시 여부 |
| `{$exclusive_purchase_olny\|display}` | 단독구매 여부 표시 |
| `{$rental_icon\|display}` | 렌탈 상품 여부 |
| `{$disp_likeprd_class}` | 좋아요 표시 여부 클래스 |
| `{$item_display\|display}` | 스펙 항목 표시 여부 |
| `{$item_title_display\|display}` | 스펙 타이틀 표시 여부 |

### 반복문

| 반복 모듈 | 반복 단위 |
|-----------|-----------|
| `product_listmain_1` ~ `7` | `<li>` — 상품 카드 |
| `product_ListItem` | `<li>` — 상품 스펙 항목 |
| `board_list_5` | `<tr>` — 게시글 행 |
| `board_list_6` | `<tr>` — 게시글 행 |

### 모듈 파라미터 (관리자 연동)
```
product_listmain_1~7:
  $count = 8                     → 출력 상품 수 (최대 200)
  $basket_result = /product/add_basket.html
  $basket_option = /product/basket_option.html

board_list_5/6:
  $count = 5                     → 출력 게시글 수
  $main_list = yes               → 메인 목록 모드
  $subject_cut = 25              → 제목 최대 글자수
  $main_list_reply_view = no     → 답글 표시 여부
```

---

## 4. PRODUCT LIST — product/list.html

### 파일 역할
상품 목록 페이지. `<!--@layout(/layout/basic/layout.html)-->` 사용.  
카테고리 메뉴, 추천상품, 신상품, 일반 상품 목록, 페이지네이션 구성.

### 모듈 목록

| 모듈명 | 역할 |
|--------|------|
| `Product_menupackage` | 전체 메뉴/카테고리 패키지 래퍼 |
| `product_headcategory` | 현재 위치(breadcrumb) + 카테고리 타이틀 |
| `product_displaycategory` | 카테고리 탭 메뉴 항목 (반복) |
| `product_children` | 중분류 카테고리 (반복, 중첩 가능) |
| `product_listrecommend` | 추천상품 목록 |
| `product_listnew` | 신상품 목록 |
| `product_normalpackage` | 일반 상품 목록 전체 패키지 |
| `product_normalmenu` | 정렬/필터 메뉴 |
| `product_Orderby` | 정렬 옵션 목록 (반복) |
| `product_FirstSelect` | 조건 검색 1단계 선택 (반복) |
| `product_SecondSelect` | 조건 검색 2단계 선택 (반복) |
| `product_listnormal` | 일반 상품 목록 (반복) |
| `product_ListItem` | 상품 스펙 항목 (반복) |
| `product_Imagestyle` | 상품 이미지 아이콘 |
| `product_normalpaging` | 페이지네이션 |

### 변수 목록 (product/list 전용)

| 변수 | 모듈 | 설명 |
|------|------|------|
| `{$title_text_or_image}` | `product_headcategory` | 카테고리 타이틀 |
| `{$top_image1_tag}` ~ `{$top_image3_tag}` | `product_headcategory` | 카테고리 상단 배너 이미지 |
| `{$disp_cate_1}` ~ `{$disp_cate_4}` | `product_headcategory` | 분류 단계별 표시 여부 |
| `{$link_product_list_1}` ~ `{$link_product_list_4}` | `product_headcategory` | 각 분류 링크 |
| `{$name_1}` ~ `{$name_4}` | `product_headcategory` | 각 분류 이름 |
| `{$category_name}` | `product_displaycategory` | 카테고리명 |
| `{$link_product_list_sub}` | `product_displaycategory` | 카테고리 링크 |
| `{$product_count}` | `product_displaycategory` | 카테고리 상품 수 |
| `{$children_icon}` | `product_children` | 하위 카테고리 열기 아이콘 |
| `{$total_count}` | `product_normalmenu` | 전체 상품 등록 수 |
| `{$sort_name}` | `product_Orderby` | 정렬 옵션 이름 |
| `{$param}` | `product_Orderby`, paging | 정렬 파라미터 |
| `{$style}` | `product_Orderby` | 현재 선택된 정렬 스타일 |
| `{$value}`, `{$title}`, `{$selected}` | `product_FirstSelect` 등 | 선택 옵션 |
| `{$param_first}`, `{$param_last}` | `product_normalpaging` | 첫/마지막 페이지 파라미터 |
| `{$param_before}`, `{$param_next}` | `product_normalpaging` | 이전/다음 페이지 파라미터 |
| `{$no}` | `product_normalpaging` | 페이지 번호 |
| `{$param_class}` | `product_normalpaging` | 현재 페이지 CSS 클래스 |
| `{$disp_likecate_icon}` | `product_headcategory` | 카테고리 좋아요 아이콘 |
| `{$disp_likecate_count}` | `product_headcategory` | 카테고리 좋아요 수 |
| `{$product_compare_class}` | `product_listnormal` | 상품비교 체크박스 클래스 |
| `{$product_compare_action}` | `product_normalmenu` | 상품비교 실행 액션 |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$disp_cate_1\|display}` ~ `{$disp_cate_4\|display}` | breadcrumb 단계별 표시 |
| `{$selected}` | 카테고리 선택 상태 클래스 |
| `{$display}` | 카테고리 항목 표시 여부 |
| `{$product_count_display\|display}` | 상품 수 표시 여부 |
| `{$select_search_display\|display}` | 조건 검색 표시 여부 |
| `{$product_compare_display\|display}` | 상품 비교 기능 표시 여부 |
| `{$disp_likecate_class}` | 카테고리 좋아요 표시 여부 |

### 반복문

| 반복 모듈 | 반복 단위 |
|-----------|-----------|
| `product_displaycategory` | `<li>` — 카테고리 탭 항목 |
| `product_children` | `<li>` — 하위 카테고리 항목 (중첩) |
| `product_Orderby` | `<li>` — 정렬 옵션 |
| `product_FirstSelect` | `<option>` — 1차 조건 선택지 |
| `product_SecondSelect` | `<option>` — 2차 조건 선택지 |
| `product_listrecommend` | `<li>` — 추천상품 카드 |
| `product_listnew` | `<li>` — 신상품 카드 |
| `product_listnormal` | `<li>` — 일반 상품 카드 |
| `product_ListItem` | `<li>` — 상품 스펙 항목 |
| `product_normalpaging` | `<li>` — 페이지 번호 |

---

## 5. PRODUCT DETAIL — product/detail.html

### 파일 역할
상품 상세 페이지. `<!--@layout(/layout/basic/layout.html)-->` 사용.  
이미지, 상품정보 테이블, 옵션 선택, 구매 버튼, 탭(상세정보/리뷰/Q&A) 구성.

### 모듈 목록

| 모듈명 | 역할 |
|--------|------|
| `product_headcategory` | breadcrumb (현재 위치) |
| `product_detail` | 상품 상세 전체 래퍼 |
| `product_image` | 상품 대표 이미지 영역 |
| `product_addimage` | 추가 이미지 목록 |
| `product_Imagestyle` | 이미지 아이콘 스타일 |
| `product_Colorchip` | 컬러칩 목록 |
| `product_action` | 추천메일/상품조르기/대량구매 버튼 |
| `product_detaildesign` | 상품 기본 정보 테이블 |
| `product_rental` | 렌탈 기간/금액 목록 (반복) |
| `product_regularDelivery` | 정기배송 옵션 |
| `product_option` | 상품 옵션 선택 |
| `product_quantity` | 구매 수량 |
| `product_soldout` | 품절 처리 |
| `product_addcart` | 장바구니 담기 버튼 |
| `product_buynow` | 바로구매 버튼 |
| `product_detailDesignTab` | 상세정보/리뷰/Q&A 탭 |
| `product_detailContent` | 상세설명 본문 |
| `product_review` | 리뷰 탭 |
| `product_qna` | Q&A 탭 |
| `product_relation` | 연관 상품 |
| `product_Imagestyle` | 상품 아이콘 |

### 변수 목록 (product/detail 전용)

| 변수 | 모듈 | 설명 |
|------|------|------|
| `{$product_code}` | `product_detail` | 상품 코드 |
| `{$name}` | `product_detail` | 상품명 |
| `{$big_img}` | `product_image` | 대표 이미지 (large) |
| `{$big_img_class}` | `product_image` | 이미지 CSS 클래스 |
| `{$zoom_param}` | `product_image` | 이미지 확대 파라미터 |
| `{$img_display\|display}` | `product_image` | 이미지 표시 여부 |
| `{$add_img}` | `product_addimage` | 추가 이미지 태그 |
| `{$wish_icon}` | `product_image` | 찜하기 아이콘 |
| `{$color}` | `product_Colorchip` | 컬러칩 색상값 |
| `{$supply_top_logo}` | `product_detail` | 공급사 로고 |
| `{$supply_go_img}` | `product_detail` | 공급사 바로가기 이미지 |
| `{$supply_go_action}` | `product_detail` | 공급사 바로가기 액션 |
| `{$rental_maximum_price}` | `product_detail` | 렌탈 최대 금액 |
| `{$rental_maximum_term}` | `product_detail` | 렌탈 최대 기간 |
| `{$rental_term}` | `product_rental` | 렌탈 기간 옵션 |
| `{$rental_price}` | `product_rental` | 렌탈 기간별 금액 |
| `{$item_title}` | `product_detaildesign` | 상품정보 항목 제목 |
| `{$item_content}` | `product_detaildesign` | 상품정보 항목 내용 |
| `{$action_recommend}` | `product_action` | 추천메일 보내기 액션 |
| `{$action_request}` | `product_action` | 상품조르기 액션 |
| `{$inquiry_param}` | `product_action` | 대량구매 파라미터 |
| `{$disp_likeprd_icon}` | `product_detail` | 좋아요 아이콘 |
| `{$disp_likeprd_count}` | `product_detail` | 좋아요 수 |
| `{$seo_alt_tag}` | `product_image` | SEO alt 텍스트 |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$delvtype_display\|display}` | 해외배송 가능 표시 |
| `{$supply_link_display\|display}` | 공급사 링크 표시 여부 |
| `{$colorchip_display\|display}` | 컬러칩 표시 여부 |
| `{$img_display\|display}` | 이미지 표시 여부 |
| `{$rental_information_display\|display}` | 렌탈 정보 표시 여부 |
| `{$regular_delivery_display\|display}` | 정기배송 표시 여부 |
| `{$request_display\|display}` | 상품조르기 버튼 표시 |
| `{$inquiry_display\|display}` | 대량구매 문의 표시 |
| `{$item_display\|display}` | 상품정보 항목 표시 여부 |
| `{$disp_likeprd_class}` | 좋아요 표시 여부 클래스 |

### 반복문

| 반복 모듈 | 반복 단위 |
|-----------|-----------|
| `product_addimage` | `<li>` — 추가 이미지 |
| `product_Colorchip` | `<span>` — 컬러칩 |
| `product_detaildesign` | `<tr>` — 상품정보 행 |
| `product_rental` | `<li>` — 렌탈 옵션 |

---

## 6. ORDER — order/orderform.html

### 파일 역할
주문서 작성 페이지. 레이아웃을 별도 사용 (layout.html 미사용).  
`<!--@import-->` 로 분할된 다수의 서브 파일로 구성됨.

### 포함 리소스
```
<!--@css(/css/module/order/ec_orderform/form_onetouch.css)-->
<!--@css(/css/module/order/ec_orderform/form_onetouch_v2.css)-->
<!--@js(/layout/basic/js/common.js)-->
<!--@js(/js/module/order/ec_orderform/orders.js)-->
<!--@js(/js/module/order/ec_orderform/orders_v2.js)-->
```

### 서브 파일 구조 (`<!--@import-->`)

| 서브 파일 | 역할 |
|-----------|------|
| `/order/ec_orderform/header.html` | 주문서 상단 영역 |
| `/order/ec_orderform/product_detail.html` | 바로구매 상품 정보 |
| `/order/ec_orderform/orderProduct_v2.html` | 장바구니 주문 상품 목록 |
| `/order/ec_orderform/gift.html` | 사은품 정보 |
| `/order/ec_orderform/billingNshipping_v2.html` | 주문자/배송지 정보 |
| `/order/ec_orderform/discount.html` | 할인/부가결제 |
| `/order/ec_orderform/additionalInput.html` | 추가정보 입력 |
| `/order/ec_orderform/paymethod_v2.html` | 결제수단 선택 |
| `/order/ec_orderform/payment_v2.html` | 결제 정보 요약 |
| `/order/ec_orderform/benefit.html` | 적립 혜택 정보 |
| `/order/ec_orderform/agreement_v2.html` | 약관 동의 |
| `/order/ec_orderform/confirm.html` | 주문 확인 레이어 팝업 |

### 핵심 모듈

| 모듈명 | 역할 |
|--------|------|
| `Order_form` | 주문서 전체 폼 래퍼 |

### 핵심 변수

| 변수 | 설명 |
|------|------|
| `{$total_order_price_front}` | 결제금액 |
| `{$total_order_price_front_head}` | 결제금액 앞 텍스트 |
| `{$total_order_price_front_tail}` | 결제금액 뒷 텍스트 |
| `{$btn_payment_id}` | 결제하기 버튼 ID |
| `{$gift_orderform_id}` | 사은품 영역 ID |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$subscription_hide_display\|display}` | 일반 결제 텍스트 표시 |
| `{$subscription_show_display\|display}` | 정기배송 신청 텍스트 표시 |

### 모듈 파라미터
```
Order_form:
  $move_order_after = /order/order_result.html   → 주문완료 후 이동
  $move_basket = /order/basket.html              → 장바구니 이동
  $paymethod_selector = textButton               → 결제수단 UI 타입
  $email_type = emailcompact                     → 이메일 입력 UI
  $product_weight_display = F                    → 상품 무게 표시 여부
```

---

## 7. MEMBER — member/login.html & join.html

### 파일 역할
회원 로그인 페이지. `<!--@layout(/layout/basic/layout.html)-->` 사용.

### 모듈 목록

| 모듈명 | 역할 |
|--------|------|
| `member_login` | 회원 로그인 폼 전체 |
| `MyShop_OrderHistoryNologin` | 비회원 주문 조회 폼 |

### 변수 목록

| 변수 | 모듈 | 설명 |
|------|------|------|
| `{$login_id_type_text}` | `member_login` | 아이디 입력 placeholder 텍스트 |
| `{$form.member_id}` | `member_login` | 아이디 입력 폼 |
| `{$form.member_passwd}` | `member_login` | 비밀번호 입력 폼 |
| `{$form.member_check_save_id}` | `member_login` | 아이디 저장 체크박스 |
| `{$form.member_check_secret_connect}` | `member_login` | 보안접속 체크박스 |
| `{$action_func_login}` | `member_login` | 로그인 실행 액션 |
| `{$naver_func_login}` | `member_login` | 네이버 로그인 액션 |
| `{$facebook_func_login}` | `member_login` | 페이스북 로그인 액션 |
| `{$google_func_login}` | `member_login` | 구글 로그인 액션 |
| `{$kakao_func_login}` | `member_login` | 카카오 로그인 액션 |
| `{$line_func_login}` | `member_login` | LINE 로그인 액션 |
| `{$apple_func_login}` | `member_login` | Apple 로그인 액션 |
| `{$yahoojp_func_login}` | `member_login` | Yahoo! JAPAN 로그인 액션 |
| `{$returnUrl}` | `member_login` | 로그인 후 돌아갈 URL |
| `{$action_nomember_order}` | `member_login` | 비회원 구매 액션 |
| `{$form_label.order_name}` | `MyShop_OrderHistoryNologin` | 주문자명 라벨 |
| `{$form.order_name}` | `MyShop_OrderHistoryNologin` | 주문자명 폼 |
| `{$form.order_id}` | `MyShop_OrderHistoryNologin` | 주문번호 폼 |
| `{$form.order_password}` | `MyShop_OrderHistoryNologin` | 주문 비밀번호 폼 |

### 조건문

| 조건 변수 | 의미 |
|-----------|------|
| `{$display_naver\|display}` | 네이버 로그인 버튼 표시 |
| `{$display_facebook\|display}` | 페이스북 로그인 버튼 표시 |
| `{$display_google\|display}` | 구글 로그인 버튼 표시 |
| `{$display_kakao\|display}` | 카카오 로그인 버튼 표시 |
| `{$display_line\|display}` | LINE 로그인 버튼 표시 |
| `{$display_apple\|display}` | Apple 로그인 버튼 표시 |
| `{$display_yahoojp\|display}` | Yahoo! JAPAN 로그인 버튼 표시 |
| `{$display_nomember\|display}` | 비회원 구매 안내 표시 |

### 모듈 파라미터
```
member_login:
  $defaultReturnUrl = /index.html      → 로그인 후 기본 이동 URL
  $forbidIpUrl = member/adminFail.html → IP 차단 시 이동 URL

MyShop_OrderHistoryNologin:
  $orderDetailUrl = /myshop/order/list.html
```

---

## 8. 전체 모듈 목록 (페이지별)

| 모듈명 | layout | index | list | detail | order | member |
|--------|:------:|:-----:|:----:|:------:|:-----:|:------:|
| `Layout_LogoTop` | ✅ | | | | | |
| `Layout_statelogoff` | ✅ | | | | | |
| `Layout_stateLogon` | ✅ | | | | | |
| `Layout_category` | ✅ | | | | | |
| `Layout_orderBasketCount` | ✅ | | | | | |
| `Layout_productRecent` | ✅ | | | | | |
| `Layout_footer` | ✅ | | | | | |
| `product_listmain_1~7` | | ✅ | | | | |
| `board_listpackage_5/6` | | ✅ | | | | |
| `Product_menupackage` | | | ✅ | | | |
| `product_headcategory` | | | ✅ | ✅ | | |
| `product_displaycategory` | | | ✅ | | | |
| `product_listrecommend` | | | ✅ | | | |
| `product_listnew` | | | ✅ | | | |
| `product_listnormal` | | | ✅ | | | |
| `product_normalpaging` | | | ✅ | | | |
| `product_detail` | | | | ✅ | | |
| `product_image` | | | | ✅ | | |
| `product_addimage` | | | | ✅ | | |
| `product_Colorchip` | | | | ✅ | | |
| `product_detaildesign` | | | | ✅ | | |
| `product_rental` | | | | ✅ | | |
| `Order_form` | | | | | ✅ | |
| `member_login` | | | | | | ✅ |
| `MyShop_OrderHistoryNologin` | | | | | | ✅ |

---

## 9. 전체 변수 목록 (용도별)

### 상품 공통 변수 (list, detail, main에서 공통 사용)

| 변수 | 설명 |
|------|------|
| `{$product_no}` | 상품 고유번호 |
| `{$product_name}` | 상품명 |
| `{$link_product_detail}` | 상품 상세 링크 |
| `{$image_medium}` | 목록 이미지 URL |
| `{$seo_alt_tag}` | 이미지 SEO alt |
| `{$soldout_icon}` | 품절 아이콘 |
| `{$new_icon}` | 신상품 아이콘 |
| `{$recommend_icon}` | 추천 아이콘 |
| `{$basket_icon}` | 장바구니 아이콘 |
| `{$zoom_icon}` | 이미지 확대 아이콘 |
| `{$list_wish_icon}` | 찜하기 아이콘 |
| `{$disp_likeprd_icon}` | 좋아요 아이콘 |
| `{$disp_likeprd_count}` | 좋아요 수 |
| `{$option_preview_icon}` | 옵션 미리보기 아이콘 |
| `{$item_title}` | 스펙 항목 타이틀 |
| `{$item_content}` | 스펙 항목 내용 |

### 가격/금액 변수

| 변수 | 설명 |
|------|------|
| `{$rental_maximum_price\|numberformat}` | 렌탈 최저가 (천단위 콤마) |
| `{$rental_price\|numberformat}` | 렌탈 기간별 가격 |
| `{$total_order_price_front}` | 주문서 결제금액 |
| `{$mileage}` | 보유 적립금 |
| `{$deposit}` | 보유 예치금 |
| `{$basket_price}` | 장바구니 금액 |

### 폼 변수 (`{$form.xxx}`)

| 변수 | 설명 |
|------|------|
| `{$form.member_id}` | 아이디 입력 |
| `{$form.member_passwd}` | 비밀번호 입력 |
| `{$form.keyword}` | 검색어 입력 |
| `{$form.order_name}` | 주문자명 (비회원) |
| `{$form.order_id}` | 주문번호 (비회원) |
| `{$form.order_password}` | 주문 비밀번호 (비회원) |
| `{$form.check_save_id}` | 아이디 저장 |

### 액션 변수 (`{$action_xxx}`)

| 변수 | 설명 |
|------|------|
| `{$action_func_login}` | 로그인 실행 |
| `{$action_logout}` | 로그아웃 실행 |
| `{$action_nomember_order}` | 비회원 구매 |
| `{$action_search_submit}` | 검색 제출 |
| `{$action_recommend}` | 추천메일 보내기 |
| `{$action_request}` | 상품조르기 |
| `{$action_poll_result}` | 설문 결과보기 |
| `{$action_poll_submit}` | 설문 투표하기 |

---

## 10. CSS 타겟팅 가이드 (수정 가능 영역)

> 변수·모듈·반복문은 건드리지 않고, **CSS 클래스를 타겟팅**해서 스타일만 변경한다.

### 페이지별 body 클래스 (서브페이지 구분)

```css
body                        /* 전체 공통 */
body.xans-index             /* 메인 페이지 */
body.xans-product-listmain  /* 메인 상품목록 */
body.xans-product-list      /* 상품 목록 */
body.xans-product-detail    /* 상품 상세 */
body.xans-order             /* 주문 */
body.xans-member            /* 회원 */
body.xans-myshop            /* 마이쇼핑 */
body.xans-board             /* 게시판 */
```

### 상품 카드 구조 (수정 가능)

```css
.ec-base-product .prdList       /* 상품 grid ul */
.ec-base-product li             /* 개별 상품 */
.ec-base-product .thumbnail     /* 이미지 영역 */
.ec-base-product .prdImg        /* 이미지 내부 */
.ec-base-product .description   /* 텍스트 영역 */
.ec-base-product .name a        /* 상품명 링크 */
.ec-base-product .icon          /* 아이콘 오버레이 */
```

### 카테고리/브레드크럼

```css
.path                           /* 현재 위치 breadcrumb */
.path ol                        /* 경로 목록 */
.menuCategory                   /* 카테고리 탭 */
.menuCategory li.selected       /* 현재 선택 카테고리 */
.subCategory                    /* 중분류 */
```

### 정렬/페이지네이션

```css
#type                           /* 정렬 옵션 */
.prdCount                       /* 상품 수 */
.ec-base-paginate               /* 페이지네이션 */
.ec-base-paginate a.first       /* 첫 페이지 */
.ec-base-paginate a.last        /* 마지막 페이지 */
```

### 상품 상세

```css
.detailArea                     /* 상세 전체 */
.imgArea                        /* 이미지 영역 */
.infoArea                       /* 정보 영역 */
.keyImg                         /* 대표 이미지 */
.listImg                        /* 추가 이미지 목록 */
.headingArea                    /* 상품명 영역 */
```

### 주문서 (CSS 수정 가이드)

```css
/* 주문서는 별도 레이아웃 — layout.css 영향 안 받음 */
/* 수정 방법: #userStyle #mCafe24Order { } 셀렉터 사용 */
#userStyle #mCafe24Order        /* 주문서 루트 */
#userStyle #mCafe24Order .leftGroup   /* 좌측 (주문정보) */
#userStyle #mCafe24Order .rightGroup  /* 우측 (결제정보) */
```

### 회원/로그인

```css
.ec-base-box.typeThin           /* 로그인 박스 */
.snsArea                        /* SNS 로그인 버튼 영역 */
.btnLogin                       /* 로그인 버튼 */
```

---

*이 문서는 파일 분석으로 자동 추출됨. 모듈/변수는 카페24 서버 전용 — 임의 변경 금지.*

---

## 11. 디자인 토큰 체계 (Design Tokens)

> **최종 업데이트**: 2026-06-24  
> 판매용 스킨 베이스 구축 작업 — `leblanc.css` 상단 `:root {}` 블록에 정의됨.  
> 새 스킨 제작 시 이 블록의 값만 교체하면 전체 디자인이 바뀐다.

### 11-1. 변경된 파일 목록

| 파일 | 변경 내용 | 역할 |
|------|-----------|------|
| `layout/basic/css/leblanc.css` | **전면 재작성** — `:root {}` 토큰 블록 추가, 모든 하드코딩 값 → `var()` 로 교체, 마퀴/헤더/네비/그리드/반응형 통합 | 디자인 토큰 정의 + LE BLANC 스타일 |
| `layout/basic/css/layout.css` | **리팩터링** — 카페24 기본 구조 보존, SKIN OVERRIDE 섹션을 `var()` 기반으로 교체, 페이지별 레이아웃 정리 | 카페24 기본 레이아웃 + 스킨 오버라이드 |

### 11-2. 토큰 목록

#### 색상 (Color Tokens)

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| `--color-primary` | `#222` | 메인 텍스트, 버튼, 강조 |
| `--color-accent` | `#ff4d7d` | 포인트 컬러 (SALE, 배지, hover) |
| `--color-accent-dark` | `#e0004a` | 포인트 darken (hover) |
| `--color-bg` | `#fff` | 페이지 배경 |
| `--color-bg-subtle` | `#f8f8f8` | 푸터, 카드 배경 |
| `--color-border` | `#e8e8e8` | 일반 구분선 |
| `--color-border-strong` | `#d8d8d8` | 강조 구분선 |
| `--color-text` | `#222` | 본문 텍스트 |
| `--color-text-muted` | `#888` | 보조 텍스트 |
| `--color-text-faint` | `#999` | 흐린 텍스트 |
| `--color-danger` | `#c00` | 오류, SALE 강조 |
| `--color-marquee-bg` | `#ff4d7d` | 마퀴 배너 배경 (스킨별 교체 포인트) |
| `--color-marquee-text` | `#fff` | 마퀴 배너 텍스트 |
| `--color-header-bg` | `#fff` | 헤더 배경 |
| `--color-header-border` | `#e8e8e8` | 헤더 하단 구분선 |

#### 폰트 (Typography Tokens)

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| `--font-sans` | `'Noto Sans KR', 'Montserrat', sans-serif` | 기본 본문 폰트 |
| `--font-display` | `'Montserrat', sans-serif` | 로고, 영문 강조 |
| `--font-serif` | `'Times New Roman', serif` | 세리프 액센트 |
| `--font-size-xs` | `11px` | 최소 |
| `--font-size-sm` | `12px` | 보조 텍스트 |
| `--font-size-base` | `13px` | 기본 |
| `--font-size-md` | `14px` | 상품명, 설명 |
| `--font-size-lg` | `16px` | 섹션 타이틀 |
| `--font-size-xl` | `18px` | 페이지 타이틀 |
| `--font-size-2xl` | `22px` | 로고 |
| `--letter-spacing-widest` | `0.15em` | 로고 |

#### 여백 (Spacing Tokens — 8px 베이스)

| 토큰 | 값 | px 기준 |
|------|-----|---------|
| `--space-1` | `4px` | 최소 간격 |
| `--space-2` | `8px` | 기본 내부 간격 |
| `--space-3` | `12px` | 소 여백 |
| `--space-4` | `16px` | 중 여백 |
| `--space-6` | `24px` | content-padding |
| `--space-8` | `32px` | 섹션 간격 |
| `--space-10` | `40px` | 푸터 패딩 |
| `--space-15` | `60px` | 섹션 하단 여백 |

#### 레이아웃 (Layout Tokens)

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| `--max-width` | `1400px` | 전체 최대 너비 |
| `--content-padding` | `24px` | 좌우 패딩 |
| `--header-height` | `60px` | 헤더 높이 |
| `--nav-height` | `44px` | 네비 높이 |
| `--marquee-height` | `36px` | 마퀴 배너 높이 |
| `--max-width-product-detail` | `1200px` | 상품 상세 최대 너비 |
| `--max-width-myshop` | `900px` | 마이쇼핑 최대 너비 |
| `--max-width-member` | `680px` | 회원 페이지 최대 너비 |
| `--max-width-order` | `1100px` | 주문서 최대 너비 |

#### 상품 그리드 (Grid Tokens)

| 토큰 | 기본값 | 설명 |
|------|--------|------|
| `--grid-cols` | `4` | 데스크탑 열 수 (반응형에서 자동 변경) |
| `--grid-gap-row` | `32px` | 행 간격 |
| `--grid-gap-col` | `20px` | 열 간격 |
| `--product-img-ratio` | `3/4` | 상품 이미지 비율 |

#### 테두리 / 그림자 / 전환 (UI Tokens)

| 토큰 | 기본값 | 용도 |
|------|--------|------|
| `--radius-sm` | `2px` | 작은 모서리 |
| `--radius-md` | `4px` | 버튼, 입력 |
| `--radius-lg` | `8px` | 카드 |
| `--radius-full` | `9999px` | 배지, pill |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | 가벼운 그림자 |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.12)` | 카드 그림자 |
| `--transition-base` | `0.2s ease` | 기본 전환 속도 |
| `--z-header` | `1000` | 헤더 z-index |

### 11-3. 새 스킨 제작 시 교체 방법

```css
/* 새 스킨: mybrand.css — :root 오버라이드만 작성 */
:root {
  --color-primary:       #1a1a2e;   /* 다크 네이비 */
  --color-accent:        #e94560;   /* 레드 포인트 */
  --color-marquee-bg:    #1a1a2e;
  --font-display:        'Playfair Display', serif;
  --grid-cols:           3;
  --product-img-ratio:   1/1;       /* 정사각형 이미지 */
}
```

이 파일을 layout.html에 `<!--@css(/layout/basic/css/mybrand.css)-->` 로 추가하면  
leblanc.css 의 모든 `var()` 값이 자동으로 교체됨.

### 11-4. 반응형 브레이크포인트

| 구간 | 조건 | `--grid-cols` |
|------|------|---------------|
| 데스크탑 | `> 1024px` | `4` |
| 태블릿 | `≤ 1024px` | `2` |
| 모바일 | `≤ 640px` | `2` (패딩 축소) |
