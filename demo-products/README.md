# ATELIER N. 데모 상품 데이터

카페24 관리자 **상품등록** 화면에서 샘플 상품을 일괄 등록하기 위한 데이터·이미지 규칙입니다.  
**상품 등록은 이 문서 작성 시점에 실행하지 않습니다.** `products.json`과 이미지 파일만 준비합니다.

---

## 디렉터리 구조

```
demo-products/
├── README.md                 ← 이 문서 (카테고리 매핑, 이미지 규칙)
├── products.json             ← 23개 SKU 상품 마스터 데이터
├── build-products-json.js    ← data/atelier-n-products.json → products.json 재생성
└── images/
    └── products/
        └── {SKU}/            ← SKU별 이미지 폴더 (6장)
            ├── {SKU}_main.jpg
            ├── {SKU}_add_01.jpg
            ├── {SKU}_add_02.jpg
            ├── {SKU}_detail_01.jpg
            ├── {SKU}_detail_02.jpg
            └── {SKU}_detail_03.jpg
```

---

## 카테고리 매핑표

데모몰 `ecudemo394315.cafe24.com` 기준입니다.  
관리자 **상품 > 분류 관리**에서 카테고리 번호(`cate_no`)를 확인한 뒤, 아래 표와 일치하는지 검증하세요.

| 내부 category | 권장 쇼핑몰 분류명 | cate_no (데모몰) | products.json SKU 접두 | SKU 수 | 비고 |
|---------------|-------------------|------------------|------------------------|--------|------|
| **OUTER** | 아우터 (Outerwear) | **24** | `AN-OU-` | 4 | 재킷·코트·트렌치 |
| **TOP** | 상의 (Tops) | **25** | `AN-TP-` | 6 | 니트·셔츠·블라우스·가디건 |
| **BOTTOM** | 하의 (Bottoms) | **27** | `AN-BT-` | 5 | 슬랙스·스커트·데님 |
| **DRESS** | 원피스 (Dresses) | **26** | `AN-DR-` | 4 | 데모몰 분류명 Dresses |
| **BAG** | 가방 *(신규 권장)* | **28** *(임시)* | `AN-AC-001`, `AN-AC-002` | 2 | 현재 **Accessories(28)** 에 임시 배치 가능 |
| **SHOES** | 슈즈 *(신규 권장)* | **28** *(임시)* | `AN-AC-003`, `AN-AC-004` | 2 | 위와 동일 |

### 카테고리별 SKU 목록

| category | sku | name_kr |
|----------|-----|---------|
| OUTER | AN-OU-001 | 말로 울 재킷 |
| OUTER | AN-OU-002 | 로웬 더블 코트 |
| OUTER | AN-OU-003 | 룬 칼라리스 재킷 |
| OUTER | AN-OU-004 | 세레인 트렌치 코트 |
| TOP | AN-TP-001 | 레나 파인 니트 |
| TOP | AN-TP-002 | 미라 골지 터틀넥 |
| TOP | AN-TP-003 | 노아 코튼 셔츠 |
| TOP | AN-TP-004 | 엘린 소프트 블라우스 |
| TOP | AN-TP-005 | 애스터 버튼 가디건 |
| TOP | AN-TP-006 | 셀리아 브이 니트 |
| BOTTOM | AN-BT-001 | 에이븐 테일러드 슬랙스 |
| BOTTOM | AN-BT-002 | 레아 와이드 팬츠 |
| BOTTOM | AN-BT-003 | 멜로 미디 스커트 |
| BOTTOM | AN-BT-004 | 넬라 플리츠 스커트 |
| BOTTOM | AN-BT-005 | 소라 스트레이트 데님 |
| DRESS | AN-DR-001 | 엘로웬 슬립 드레스 |
| DRESS | AN-DR-002 | 마렌 벨트 드레스 |
| DRESS | AN-DR-003 | 아리엘 니트 드레스 |
| DRESS | AN-DR-004 | 린 롱슬리브 드레스 |
| BAG | AN-AC-001 | 에덴 데일리 백 |
| BAG | AN-AC-002 | 노라 숄더백 |
| SHOES | AN-AC-003 | 마일로 로퍼 |
| SHOES | AN-AC-004 | 아벨린 힐 |

### 카페24 등록 시 필드 매핑

| products.json 필드 | 카페24 관리자 입력란 |
|--------------------|---------------------|
| `name_kr` | 상품명 (한국어) |
| `name` | 상품명 (영문, 부가) 또는 검색어 |
| `sku` | **자체 상품코드** / **모델명** |
| `category` → 위 표 `cate_no` | **상품 분류** |
| `price` | **소비자가** (정가) |
| `sale_price` | **판매가** |
| `color[]` | **옵션** (색상) |
| `size[]` | **옵션** (사이즈) |
| `short_description` | **상품 요약설명** |
| `about` + `fit_note` + `fabric_note` + `styling_note` | **상품 상세설명** (HTML 병합) |
| `images.main` | **대표 이미지** |
| `images.additional[]` | **추가 이미지** (목록형) |
| `images.detail[]` | **상세설명** 영역 또는 추가 이미지 (스킨 정책에 따라) |
| `badge` | **아이콘** / **진열** 태그 (`BEST`, `NEW` 등) |

---

## 이미지 파일명 규칙

모든 이미지는 **SKU 단위 폴더**에 저장합니다. 확장자는 **`.jpg`** (소문자)를 사용합니다.

### 파일 종류 (SKU당 6장)

| 용도 | 카페24 등록 위치 | 파일명 패턴 | 장수 |
|------|-----------------|-------------|------|
| 대표 이미지 | 상품 대표 이미지 | `{SKU}_main.jpg` | 1 |
| 추가 이미지 | 추가 이미지 1, 2 | `{SKU}_add_01.jpg`, `{SKU}_add_02.jpg` | 2 |
| 상세 디테일 | 상세설명 본문 또는 추가 이미지 | `{SKU}_detail_01.jpg` ~ `{SKU}_detail_03.jpg` | 3 |

### 경로 예시 (AN-OU-001)

```
images/products/AN-OU-001/AN-OU-001_main.jpg
images/products/AN-OU-001/AN-OU-001_add_01.jpg
images/products/AN-OU-001/AN-OU-001_add_02.jpg
images/products/AN-OU-001/AN-OU-001_detail_01.jpg
images/products/AN-OU-001/AN-OU-001_detail_02.jpg
images/products/AN-OU-001/AN-OU-001_detail_03.jpg
```

`products.json`의 `images` 객체는 위 규칙으로 자동 생성됩니다.

### 촬영·제작 가이드 (권장)

| 구분 | 권장 내용 | 권장 비율 |
|------|-----------|-----------|
| `_main` | 정면 전체 컷, 배경 Ivory `#F7F5F0` | 3:4 (1000×1333px) |
| `_add_01` | 측면 또는 착용 컷 | 3:4 |
| `_add_02` | 디테일(소매·넥·단) 또는 뒷면 | 3:4 |
| `_detail_01` | 원단·질감 클로즈업 | 1:1 또는 4:5 |
| `_detail_02` | 핏·실루엣 설명 컷 | 1:1 또는 4:5 |
| `_detail_03` | 스타일링 또는 라벨·마감 | 1:1 또는 4:5 |

- 파일 용량: 장당 **500KB 이하** 권장 (카페24 업로드 안정성)
- 파일명: **영문 대문자 SKU + 언더스코어**만 사용 (공백·한글 금지)
- 전체 23 SKU × 6장 = **138개** JPG 파일

---

## products.json 스키마

```json
{
  "meta": {
    "brand": "ATELIER N.",
    "season": "2026 FALL COLLECTION",
    "currency": "KRW",
    "schema_version": "1.0",
    "image_base_path": "images/products",
    "images_per_product": { "main": 1, "additional": 2, "detail": 3, "total": 6 },
    "product_count": 23
  },
  "products": [
    {
      "sku": "AN-OU-001",
      "category": "OUTER",
      "name": "Marlow Wool Jacket",
      "name_kr": "말로 울 재킷",
      "price": 189000,
      "sale_price": 159000,
      "badge": "BEST",
      "color": ["Oatmeal", "Charcoal"],
      "size": ["S", "M"],
      "short_description": "...",
      "about": "...",
      "fit_note": "...",
      "fabric_note": "...",
      "styling_note": "...",
      "images": {
        "main": "images/products/AN-OU-001/AN-OU-001_main.jpg",
        "additional": ["..._add_01.jpg", "..._add_02.jpg"],
        "detail": ["..._detail_01.jpg", "..._detail_02.jpg", "..._detail_03.jpg"]
      }
    }
  ]
}
```

---

## 재생성 방법

원본 카탈로그(`data/atelier-n-products.json`)를 수정한 뒤:

```bash
node demo-products/build-products-json.js
```

---

## 다음 단계 (등록 전 체크리스트)

- [ ] `images/products/{SKU}/` 아래 138개 JPG 배치
- [ ] 카페24 분류 관리에서 **DRESS**, **BAG**, **SHOES** 전용 분류 생성 및 `cate_no` 확정
- [ ] 위 매핑표의 `cate_no`를 README에 갱신
- [ ] 관리자 상품등록 또는 CSV 일괄등록 실행 *(별도 작업)*
