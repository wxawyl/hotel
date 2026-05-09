const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database\n');
    checkAllData();
  }
});

function checkAllData() {
  // 检查酒店
  db.all('SELECT id, name, location FROM hotels ORDER BY id', [], (err, hotels) => {
    if (err) {
      console.error('Error checking hotels:', err);
    } else {
      console.log('=== HOTELS ===');
      console.log(`Total: ${hotels.length}`);
      hotels.forEach(h => console.log(`  ID ${h.id}: ${h.name} @ ${h.location}`));
    }

    // 检查服务
    db.all('SELECT id, name, price FROM services ORDER BY id', [], (err, services) => {
      if (err) {
        console.error('Error checking services:', err);
      } else {
        console.log('\n=== SERVICES ===');
        console.log(`Total: ${services.length}`);
        services.forEach(s => console.log(`  ID ${s.id}: ${s.name} - $${s.price}`));
      }

      // 检查商品
      db.all('SELECT id, name, price FROM products ORDER BY id', [], (err, products) => {
        if (err) {
          console.error('Error checking products:', err);
        } else {
          console.log('\n=== PRODUCTS ===');
          console.log(`Total: ${products.length}`);
          products.forEach(p => console.log(`  ID ${p.id}: ${p.name} - $${p.price}`));
        }

        db.close();
        console.log('\n=== Check complete ===');
      });
    });
  });
}
