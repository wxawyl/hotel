const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const productImages = {
  'Slippers': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop',
  'Fish Sauce': 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
  'Handmade Ceramics': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=300&fit=crop',
  'Silk Scarf': 'https://images.unsplash.com/photo-1515405068779-1dc098a28f4a?w=300&h=300&fit=crop',
  'Incense Sticks': 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
};

db.serialize(() => {
  Object.entries(productImages).forEach(([name, imageUrl]) => {
    db.run(
      'UPDATE products SET image_url = ? WHERE name = ?',
      [imageUrl, name],
      function(err) {
        if (err) {
          console.error(`Error updating ${name}: ${err.message}`);
        } else if (this.changes > 0) {
          console.log(`Updated ${name}`);
        } else {
          console.log(`Product ${name} not found`);
        }
      }
    );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Images updated!');
});
