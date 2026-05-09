const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    checkData();
  }
});

function checkData() {
  console.log('\n=== 检查数据库数据 ===\n');
  
  db.all('SELECT id, name, location FROM hotels', [], (err, hotels) => {
    if (err) console.error('Error:', err);
    else {
      console.log(`酒店数量: ${hotels.length}`);
      hotels.forEach(h => console.log(`  - ID ${h.id}: ${h.name} | ${h.location}`));
    }
    
    db.all('SELECT id, name, price FROM services', [], (err, services) => {
      if (err) console.error('Error:', err);
      else {
        console.log(`\n服务数量: ${services.length}`);
        services.forEach(s => console.log(`  - ID ${s.id}: ${s.name} | $${s.price}`));
      }
      
      db.all('SELECT id, name, price FROM products', [], (err, products) => {
        if (err) console.error('Error:', err);
        else {
          console.log(`\n商品数量: ${products.length}`);
          products.forEach(p => console.log(`  - ID ${p.id}: ${p.name} | $${p.price}`));
        }
        
        db.close();
      });
    });
  });
}
