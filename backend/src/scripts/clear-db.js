const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    clearData();
  }
});

function clearData() {
  db.serialize(() => {
    console.log('Clearing existing data...');
    
    db.run('DELETE FROM products', (err) => { if (err) console.error('Error deleting products:', err); else console.log('✓ Products cleared'); });
    db.run('DELETE FROM services', (err) => { if (err) console.error('Error deleting services:', err); else console.log('✓ Services cleared'); });
    db.run('DELETE FROM images', (err) => { if (err) console.error('Error deleting images:', err); else console.log('✓ Images cleared'); });
    db.run('DELETE FROM rooms', (err) => { if (err) console.error('Error deleting rooms:', err); else console.log('✓ Rooms cleared'); });
    db.run('DELETE FROM hotels', (err) => { if (err) console.error('Error deleting hotels:', err); else console.log('✓ Hotels cleared'); });
    
    setTimeout(() => {
      console.log('\nAll data cleared successfully!');
      db.close();
      process.exit(0);
    }, 1000);
  });
}
