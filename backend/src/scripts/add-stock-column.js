const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

db.serialize(() => {
  db.run(
    'ALTER TABLE products ADD COLUMN stock_quantity INTEGER DEFAULT 10',
    function(err) {
      if (err) {
        if (err.message.includes('duplicate column name')) {
          console.log('Column stock_quantity already exists');
        } else {
          console.error('Error adding column:', err.message);
        }
      } else {
        console.log('✓ Added stock_quantity column to products table');
        
        db.run(
          'UPDATE products SET stock_quantity = 10 WHERE stock_quantity IS NULL',
          function(err) {
            if (err) {
              console.error('Error updating stock quantities:', err.message);
            } else {
              console.log(`✓ Updated ${this.changes} products with default stock`);
            }
            db.close();
          }
        );
      }
    }
  );
});
