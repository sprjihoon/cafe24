# 브랜드 무드 가이드

## 브랜드 한 줄 정의

일상에 가장 자연스럽게 스며드는, 정돈된 여성복.

## 브랜드 키워드

Timeless / Quiet / Refined / Everyday / Modern / Comfortable / Considered

## 무드

* 절제된 여성스러움
* 도시적이지만 차갑지 않은 분위기
* 편안하지만 흐트러져 보이지 않는 실루엣
* 유행보다 오래 입는 기본
* 출근, 약속, 여행, 일상 어디에나 이어지는 옷

## 컬러 톤

| 이름 | CSS 변수 | Hex |
|------|----------|-----|
| Ivory | `--color-ivory` | `#faf8f5` |
| Oatmeal | `--color-oatmeal` | `#f0ebe3` |
| Taupe | `--color-taupe` | `#9a8878` |
| Cocoa | `--color-cocoa` | `#6b5344` |
| Charcoal | `--color-charcoal` | `#2d2825` |
| Black | `--color-black` | `#1a1a1a` |
| Soft Blue | `--color-soft-blue` | `#b8c4ce` |

정의 위치: `skin/layout/basic/css/leblanc.css` `:root` 블록

## 말투

담백하고 조용하게.
과장된 "완벽한", "압도적인", "가장 특별한" 대신
"자연스럽게", "오래", "편안하게", "정돈된", "매일" 같은 단어를 사용한다.

## 피해야 할 표현

* 인생템
* 무조건 소장
* 역대급
* 품절대란
* 여신핏
* 체형 커버 끝판왕
* 럭셔리 그 자체

## 스킨 카피 적용 위치

| 영역 | 파일 |
|------|------|
| 마퀴 배너 | `layout.html`, `basic.js` (fallback) |
| 로고 태그라인 | `layout.html` |
| 히어로 1–4 (슬라이더) | `index.html`, `basic.js` |
| NEW IN / MOST LOVED / THE DAILY UNIFORM | `index.html` (product_listmain_2/3/1) |
| 브랜드 소개 | `index.html` |

## 메인페이지 카피 세트

### 히어로 1 — THE QUIET EDIT
- 조용한 날들에 더 잘 어울리는 옷
- CTA: SHOP COLLECTION

### 히어로 2 — MADE FOR EVERYDAY
- 가장 자주 손이 가는 이유
- CTA: VIEW NEW ARRIVALS

### 히어로 3 — AUTUMN IN FORM
- 계절을 오래 입는 방식
- CTA: DISCOVER THE EDIT

### 히어로 4 — LESS, BUT BETTER
- 많이 필요하지 않은 옷장
- CTA: SHOP ESSENTIALS

### NEW IN
지금 가장 자연스럽게 입을 수 있는 새 옷

### MOST LOVED
시간이 지나도 자주 선택되는 아이템

### THE DAILY UNIFORM
매일의 기준이 되는 옷

### 브랜드 소개 — CLOTHES FOR QUIET CONFIDENCE
옷이 먼저 말하지 않아도, 입는 사람의 태도는 자연스럽게 드러납니다.

## 상품·카테고리 카피

### 카테고리 (메인 + 목록)
| 카테고리 | 설명 |
|----------|------|
| OUTER | 계절의 첫인상을 만드는 단정한 레이어 |
| TOP | 매일의 조합을 가장 편하게 시작하는 기본 |
| KNIT | 부드러운 온도와 오래 남는 질감 |
| SHIRT | 힘을 빼도 정돈돼 보이는 한 벌 |
| BOTTOM | 움직임은 편안하게, 선은 자연스럽게 |
| DRESS | 특별한 날과 평범한 날 사이에 있는 옷 |
| BAG & SHOES | 룩의 균형을 마무리하는 작은 선택 |

목록 페이지: `?cat=knit` 등 쿼리로 세부 카피 구분 (`basic.js`)

### 상품상세 (`product/detail.html`)
- ABOUT THIS PIECE / FIT NOTE / FABRIC NOTE / STYLING NOTE

### 배송 안내
- YOUR ORDER, CAREFULLY PREPARED

### 리뷰
- WORN IN REAL LIFE

### 뉴스레터 (`layout.html` footer)
- A QUIETER WAY TO DRESS

## ATELIER N. 상품 카탈로그 (23 SKU)

- 원본 JSON: `data/atelier-n-products.json`
- Cafe24 일괄등록 CSV: `data/atelier-n-import.csv` (`node data/generate-import-csv.js`로 재생성)
- 상품상세 자동 카피: `skin/layout/basic/js/atelier-products.js` + `product-copy.js`
- **자체상품코드 = SKU** (예: `AN-OU-001`)로 등록하면 상세 페이지 노트가 자동 매칭됩니다.

| 카테고리 | SKU 수 | Cafe24 cate_no |
|----------|--------|----------------|
| OUTER | 4 | 26 |
| TOP | 6 | 27 |
| BOTTOM | 5 | 28 |
| DRESS | 4 | 27 |
| BAG | 2 | 29 |
| SHOES | 2 | 29 |

### 등록 순서 (관리자)
1. 쇼핑몰 설정 → 쇼핑몰명 **ATELIER N.** (선택)
2. 상품 → 상품 등록 (또는 엑셀 일괄등록) — CSV 참고
3. 자체상품코드에 SKU 입력, 상품명은 `name_kr` 사용
4. 메인 진열: NEW IN / MOST LOVED / DAILY UNIFORM 모듈에 상품 배치
5. 상품상세에서 `[AN-OU-001]` 형식으로 코드 확인 → 카피 자동 적용
