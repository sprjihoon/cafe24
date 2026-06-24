const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'atelier-n-products.json');
const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const catMap = { OUTER: 26, TOP: 27, BOTTOM: 28, DRESS: 27, BAG: 29, SHOES: 29 };

function esc(v) {
  return '"' + String(v).replace(/"/g, '""') + '"';
}

const header = [
  '자체상품코드',
  '상품명',
  '영문상품명',
  '카테고리번호',
  '판매가',
  '할인판매가',
  '간략설명',
  '상품상세설명',
  '진열상태'
].join(',');

const rows = j.products.map(function (p) {
  const detail = [p.about, p.fit_note, p.fabric_note, p.styling_note].join('\n\n');
  return [
    p.sku,
    p.name_kr,
    p.name,
    catMap[p.category] || '',
    p.price,
    p.sale_price,
    p.short_description,
    detail,
    'Y'
  ].map(esc).join(',');
});

const csv = '\ufeff' + header + '\n' + rows.join('\n');
fs.writeFileSync(path.join(__dirname, 'atelier-n-import.csv'), csv, 'utf8');
console.log('Wrote', rows.length, 'products to atelier-n-import.csv');
