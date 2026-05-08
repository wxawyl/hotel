const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

db.all('SELECT id, name, image_url FROM products', (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Product Images:');
    console.log('-----------------------------------');
    rows.forEach(row => {
      console.log(`ID: ${row.id}`);
      console.log(`Name: ${row.name}`);
      console.log(`Image URL: ${row.image_url || 'NULL'}`);
      console.log('-----------------------------------');
    });
  }
  db.close();
});
