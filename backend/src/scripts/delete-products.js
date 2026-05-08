const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const productsToDelete = [
  'Silk Scarf',
  'Incense Sticks',
  'Bamboo Toothbrush',
  'Fish Sauce',
  'Slippers',
  'Handwoven Basket'
];

console.log('Products to delete:');
console.log('-------------------');
productsToDelete.forEach(p => console.log(`- ${p}`));
console.log('');

db.serialize(() => {
  productsToDelete.forEach((productName) => {
    db.run(
      'DELETE FROM products WHERE name = ?',
      [productName],
      function(err) {
        if (err) {
          console.error(`Error deleting ${productName}: ${err.message}`);
        } else if (this.changes > 0) {
          console.log(`✓ Deleted: ${productName}`);
        } else {
          console.log(`✗ Not found: ${productName}`);
        }
      }
    );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('\nDeletion completed!');
});
