/**
 * data/atelier-n-products.json → demo-products/products.json
 * images 필드(대표 1 + 추가 2 + 상세 3) 자동 부여
 */
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '..', 'data', 'atelier-n-products.json');
const OUT = path.join(__dirname, 'products.json');

const IMAGE_BASE = 'images/products';

function imagePaths(sku) {
  const dir = `${IMAGE_BASE}/${sku}`;
  return {
    main: `${dir}/${sku}_main.jpg`,
    additional: [
      `${dir}/${sku}_add_01.jpg`,
      `${dir}/${sku}_add_02.jpg`
    ],
    detail: [
      `${dir}/${sku}_detail_01.jpg`,
      `${dir}/${sku}_detail_02.jpg`,
      `${dir}/${sku}_detail_03.jpg`
    ]
  };
}

const source = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));

const output = {
  meta: {
    brand: source.brand,
    season: source.season,
    currency: source.currency,
    schema_version: '1.0',
    image_base_path: IMAGE_BASE,
    images_per_product: {
      main: 1,
      additional: 2,
      detail: 3,
      total: 6
    },
    product_count: source.products.length,
    note: '상품 등록 전 images/ 경로에 실제 JPG 파일을 배치하세요.'
  },
  products: source.products.map(function (p) {
    return Object.assign({}, p, { images: imagePaths(p.sku) });
  })
};

fs.writeFileSync(OUT, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log('Wrote', output.products.length, 'products to', OUT);
