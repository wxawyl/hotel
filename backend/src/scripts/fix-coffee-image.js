const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const coffeeImage = {
  name: 'Vietnamese Coffee',
  url: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=300&h=300&fit=crop',
  description: 'Vietnamese drip coffee with phin filter'
};

console.log(`Fixing ${coffeeImage.name} image:`);
console.log(`URL: ${coffeeImage.url}`);
console.log(`Description: ${coffeeImage.description}`);

db.run(
  'UPDATE products SET image_url = ? WHERE name = ?',
  [coffeeImage.url, coffeeImage.name],
  function(err) {
    if (err) {
      console.error(`Error updating: ${err.message}`);
    } else if (this.changes > 0) {
      console.log(`✓ Successfully updated ${coffeeImage.name} image!`);
    } else {
      console.log(`✗ Product ${coffeeImage.name} not found`);
    }
    db.close();
  }
);
