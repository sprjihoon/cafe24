import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';

const root = path.resolve('..');
const config = JSON.parse(fs.readFileSync('./watcher.config.json', 'utf8'));

const files = [
  // Mobile (기존)
  { local: 'mobile/index.html', remote: '/sde_design/mobile/index.html' },
  { local: 'mobile/layout/basic/css/lb-mobile.css', remote: '/sde_design/mobile/layout/basic/css/lb-mobile.css' },
  { local: 'mobile/layout/basic/js/basic.js', remote: '/sde_design/mobile/layout/basic/js/basic.js' },
  { local: 'mobile/layout/basic/js/product-copy.js', remote: '/sde_design/mobile/layout/basic/js/product-copy.js' },
  
  // PC (전체 Phase 완료)
  { local: 'skin/index.html', remote: '/sde_design/base/index.html' },
  { local: 'skin/layout/basic/layout.html', remote: '/sde_design/base/layout/basic/layout.html' },
  { local: 'skin/layout/basic/css/layout.css', remote: '/sde_design/base/layout/basic/css/layout.css' },
  { local: 'skin/layout/basic/css/leblanc.css', remote: '/sde_design/base/layout/basic/css/leblanc.css' },
  { local: 'skin/layout/basic/css/widgets.css', remote: '/sde_design/base/layout/basic/css/widgets.css' },
  { local: 'skin/layout/basic/js/basic.js', remote: '/sde_design/base/layout/basic/js/basic.js' },
  { local: 'skin/layout/basic/js/header.js', remote: '/sde_design/base/layout/basic/js/header.js' },
  { local: 'skin/layout/basic/js/widgets.js', remote: '/sde_design/base/layout/basic/js/widgets.js' },
  { local: 'skin/layout/basic/js/sliders.js', remote: '/sde_design/base/layout/basic/js/sliders.js' },
  { local: 'skin/layout/basic/js/countdown.js', remote: '/sde_design/base/layout/basic/js/countdown.js' }, // Phase 3
  { local: 'skin/layout/basic/js/video.js', remote: '/sde_design/base/layout/basic/js/video.js' }, // Phase 4
  { local: 'skin/layout/basic/js/product-copy.js', remote: '/sde_design/base/layout/basic/js/product-copy.js' },
  { local: 'skin/layout/basic/js/product-icons.js', remote: '/sde_design/base/layout/basic/js/product-icons.js' },
  { local: 'skin/config.xml', remote: '/sde_design/base/config.xml' }, // Phase 6
  
  // Product Detail Page
  { local: 'skin/product/detail.html', remote: '/sde_design/base/product/detail.html' },
  { local: 'skin/product/product-detail.css', remote: '/sde_design/base/product/product-detail.css' },
  { local: 'skin/product/product-detail.js', remote: '/sde_design/base/product/product-detail.js' },
  
  // Order Pages
  { local: 'skin/order/basket.html', remote: '/sde_design/base/order/basket.html' },
  { local: 'skin/order/basket.css', remote: '/sde_design/base/order/basket.css' },
  
  // Lookbook Images
  { local: 'skin/web/upload/lookbook/look-1.jpg', remote: '/web/upload/lookbook/look-1.jpg' },
  { local: 'skin/web/upload/lookbook/look-2.jpg', remote: '/web/upload/lookbook/look-2.jpg' },
  { local: 'skin/web/upload/lookbook/look-3.jpg', remote: '/web/upload/lookbook/look-3.jpg' },
  { local: 'skin/web/upload/lookbook/look-4.jpg', remote: '/web/upload/lookbook/look-4.jpg' },
  { local: 'skin/web/upload/lookbook/look-5.jpg', remote: '/web/upload/lookbook/look-5.jpg' },
  { local: 'skin/web/upload/lookbook/look-6.jpg', remote: '/web/upload/lookbook/look-6.jpg' },
  { local: 'skin/web/upload/lookbook/look-7.jpg', remote: '/web/upload/lookbook/look-7.jpg' },
  { local: 'skin/web/upload/lookbook/look-8.jpg', remote: '/web/upload/lookbook/look-8.jpg' },
  
  // Hero Banner Images
  { local: 'skin/web/upload/hero/hero-1.jpg', remote: '/web/upload/hero/hero-1.jpg' },
  { local: 'skin/web/upload/hero/hero-2.jpg', remote: '/web/upload/hero/hero-2.jpg' },
  { local: 'skin/web/upload/hero/hero-3.jpg', remote: '/web/upload/hero/hero-3.jpg' },
  { local: 'skin/web/upload/hero/hero-4.jpg', remote: '/web/upload/hero/hero-4.jpg' },
  
  // Promo & Banner Images
  { local: 'skin/web/upload/promo/promo-1.jpg', remote: '/web/upload/promo/promo-1.jpg' },
  { local: 'skin/web/upload/promo/promo-2.jpg', remote: '/web/upload/promo/promo-2.jpg' },
  { local: 'skin/web/upload/banner/banner-1.jpg', remote: '/web/upload/banner/banner-1.jpg' },
  { local: 'skin/web/upload/banner/banner-2.jpg', remote: '/web/upload/banner/banner-2.jpg' },
  { local: 'skin/web/upload/banner/banner-3.jpg', remote: '/web/upload/banner/banner-3.jpg' },
  
  // Category Images
  { local: 'skin/web/upload/category/default.jpg', remote: '/web/upload/category/default.jpg' },
  { local: 'skin/web/upload/category/24.jpg', remote: '/web/upload/category/24.jpg' },
  { local: 'skin/web/upload/category/25.jpg', remote: '/web/upload/category/25.jpg' },
  { local: 'skin/web/upload/category/27.jpg', remote: '/web/upload/category/27.jpg' },
  { local: 'skin/web/upload/category/32.jpg', remote: '/web/upload/category/32.jpg' },
  
  // Timesale Images
  { local: 'skin/web/upload/timesale/watch.jpg', remote: '/web/upload/timesale/watch.jpg' },
  { local: 'skin/web/upload/timesale/watch-new.png', remote: '/web/upload/timesale/watch-new.png' },
  
  // Review Images
  { local: 'skin/web/upload/reviews/review-1.jpg', remote: '/web/upload/reviews/review-1.jpg' },
  { local: 'skin/web/upload/reviews/review-2.jpg', remote: '/web/upload/reviews/review-2.jpg' },
  { local: 'skin/web/upload/reviews/review-3.jpg', remote: '/web/upload/reviews/review-3.jpg' },
];

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  await client.access({
    host: config.host,
    user: config.user,
    password: config.pass,
    port: config.port || 21,
    secure: config.secure || false,
  });

  for (const { local, remote } of files) {
    const localPath = path.join(root, local);
    await client.ensureDir(path.posix.dirname(remote));
    await client.uploadFrom(localPath, remote);
    console.log('OK', local);
  }

  client.close();
  console.log('Done:', files.length, 'files');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
