const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../../database/hotel.db');
const exportDir = path.join(__dirname, '../../../data-backup');

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
});

const exportData = async () => {
  console.log('Starting data export...');

  const tables = ['hotels', 'rooms', 'images', 'services', 'products'];
  const allData = {};

  for (const table of tables) {
    allData[table] = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log(`  ✓ Exported ${allData[table].length} records from ${table}`);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const exportFile = path.join(exportDir, `hotel-data-${timestamp}.json`);
  
  fs.writeFileSync(exportFile, JSON.stringify(allData, null, 2));
  console.log(`\n✓ Export completed!`);
  console.log(`  File: ${exportFile}`);
  console.log(`  Size: ${(fs.statSync(exportFile).size / 1024).toFixed(2)} KB`);

  const latestFile = path.join(exportDir, 'hotel-data-latest.json');
  fs.writeFileSync(latestFile, JSON.stringify(allData, null, 2));
  console.log(`  Latest file updated: ${latestFile}`);

  db.close();
};

exportData().catch((err) => {
  console.error('Export failed:', err);
  db.close();
  process.exit(1);
});