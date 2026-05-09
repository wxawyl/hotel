const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('=== 图片数据存储位置 ===\n');
    checkImages();
  }
});

function checkImages() {
  // 检查 images 表的数据
  db.all('SELECT id, hotel_id, room_id, category, url, thumbnail_url FROM images ORDER BY id LIMIT 5', [], (err, rows) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('【数据库 images 表】存储图片元数据：');
      console.log('字段：id, hotel_id, room_id, category, url, thumbnail_url');
      console.log('\n示例数据：');
      rows.forEach(row => {
        console.log(`\n图片 ID ${row.id}:`);
        console.log(`  分类: ${row.category}`);
        console.log(`  完整URL: ${row.url}`);
        console.log(`  缩略图URL: ${row.thumbnail_url}`);
        console.log(`  关联酒店: ${row.hotel_id || '无'}`);
        console.log(`  关联房间: ${row.room_id || '无'}`);
      });
    }

    // 检查商品图片
    db.all('SELECT id, name, image_url FROM products LIMIT 3', [], (err, products) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log('\n\n【商品图片】存储方式：');
        products.forEach(p => {
          console.log(`\n商品: ${p.name}`);
          console.log(`  image_url: ${p.image_url}`);
          if (p.image_url) {
            if (p.image_url.startsWith('http')) {
              console.log(`  类型: 外部URL链接（Unsplash等）`);
            } else if (p.image_url.startsWith('/uploads/')) {
              console.log(`  类型: 本地文件上传（保存在 uploads/ 目录）`);
            }
          }
        });
      }

      console.log('\n\n=== 总结 ===');
      console.log('1. 图片数据主要存储在 SQLite 数据库的 images 表中');
      console.log('2. images 表存储的是图片的 URL 地址（外部链接或本地路径）');
      console.log('3. 图片实际存储位置有两种方式：');
      console.log('   a) 外部URL: https://images.unsplash.com/... (保存在云端)');
      console.log('   b) 本地上传: /uploads/products/... (保存在服务器文件系统)');
      console.log('4. 商品图片可以上传到本地，酒店/房间图片一般使用外部URL');

      db.close();
    });
  });
}
