const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const matchedImages = {
  'Vietnamese Coffee': {
    url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=300&fit=crop',
    description: 'Vietnamese drip coffee'
  },
  'Silk Scarf': {
    url: 'https://images.unsplash.com/photo-1520975957996-972dec2617cf?w=300&h=300&fit=crop',
    description: 'Silk scarf'
  },
  'Incense Sticks': {
    url: 'https://images.unsplash.com/photo-1514428003490-969c509318bf?w=300&h=300&fit=crop',
    description: 'Incense sticks'
  },
  'Handmade Ceramics': {
    url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=300&fit=crop',
    description: 'Handmade ceramics'
  },
  'Bamboo Toothbrush': {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=300&fit=crop',
    description: 'Bamboo toothbrush'
  },
  'Cotton Towel Set': {
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    description: 'Cotton towels'
  },
  'Slippers': {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop',
    description: 'Hotel slippers'
  },
  'Vietnamese Tea': {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    description: 'Green tea'
  },
  'Fish Sauce': {
    url: 'https://images.unsplash.com/photo-1547592166-23ac5539339d?w=300&h=300&fit=crop',
    description: 'Fish sauce bottle'
  },
  'Handwoven Basket': {
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
    description: 'Woven basket'
  },
};

console.log('Matching product images:');
console.log('------------------------');

db.serialize(() => {
  Object.entries(matchedImages).forEach(([name, info]) => {
    console.log(`Product: ${name}`);
    console.log(`Image: ${info.description}`);
    console.log('------------------------');
    
    db.run(
      'UPDATE products SET image_url = ? WHERE name = ?',
      [info.url, name],
      function(err) {
        if (err) {
          console.error(`Error updating ${name}: ${err.message}`);
        } else if (this.changes > 0) {
          console.log(`✓ Updated ${name}`);
        }
      }
    );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('\nAll product images matched!');
});
