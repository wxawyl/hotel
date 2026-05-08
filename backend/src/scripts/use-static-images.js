const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const staticImages = {
  'Vietnamese Coffee': 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=300&fit=crop',
  'Silk Scarf': 'https://images.unsplash.com/photo-1520975957996-972dec2617cf?w=300&h=300&fit=crop',
  'Incense Sticks': 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
  'Handmade Ceramics': 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=300&fit=crop',
  'Bamboo Toothbrush': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=300&fit=crop',
  'Cotton Towel Set': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
  'Slippers': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop',
  'Vietnamese Tea': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
  'Fish Sauce': 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
  'Handwoven Basket': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
};

db.serialize(() => {
  Object.entries(staticImages).forEach(([name, imageUrl]) => {
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
  console.log('All static images updated!');
});
