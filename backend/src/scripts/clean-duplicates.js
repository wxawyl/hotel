const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    cleanDuplicates();
  }
});

function cleanDuplicates() {
  console.log('\n=== 清理重复数据 ===\n');
  
  // 先查看当前数据
  db.all('SELECT id, name, location FROM hotels ORDER BY id', [], (err, hotels) => {
    if (err) console.error('Error:', err);
    else {
      console.log(`当前酒店数量: ${hotels.length}`);
      hotels.forEach(h => console.log(`  - ID ${h.id}: ${h.name}`));
    }
    
    db.all('SELECT id, name, price FROM services ORDER BY id', [], (err, services) => {
      if (err) console.error('Error:', err);
      else {
        console.log(`\n当前服务数量: ${services.length}`);
        services.forEach(s => console.log(`  - ID ${s.id}: ${s.name}`));
      }
      
      // 清理：只保留最小 ID 的记录
      db.run(`DELETE FROM hotels WHERE id NOT IN (
        SELECT MIN(id) FROM hotels GROUP BY name
      )`, [], (err) => {
        if (err) console.error('Error cleaning hotels:', err);
        else console.log('\n✓ 酒店重复数据已清理');
        
        db.run(`DELETE FROM services WHERE id NOT IN (
          SELECT MIN(id) FROM services GROUP BY name
        )`, [], (err) => {
          if (err) console.error('Error cleaning services:', err);
          else console.log('✓ 服务重复数据已清理');
          
          db.run(`DELETE FROM products WHERE id NOT IN (
            SELECT MIN(id) FROM products GROUP BY name
          )`, [], (err) => {
            if (err) console.error('Error cleaning products:', err);
            else console.log('✓ 商品重复数据已清理');
            
            // 再次查看清理后的数据
            console.log('\n=== 清理后数据 ===');
            db.all('SELECT id, name FROM hotels', [], (err, hotels) => {
              if (!err) console.log(`\n酒店: ${hotels.length} 个`);
              
              db.all('SELECT id, name FROM services', [], (err, services) => {
                if (!err) console.log(`服务: ${services.length} 个`);
                
                db.all('SELECT id, name FROM products', [], (err, products) => {
                  if (!err) console.log(`商品: ${products.length} 个`);
                  
                  console.log('\n✅ 重复数据清理完成！');
                  db.close();
                });
              });
            });
          });
        });
      });
    });
  });
}
