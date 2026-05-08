const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/hotel.db');

const service = {
  name: 'Housekeeping Service',
  name_locale: JSON.stringify({ 
    en: 'Housekeeping Service', 
    de: 'Reinigungsdienst', 
    ko: '객실 청소 서비스', 
    ja: 'ルームクリーニングサービス', 
    zh: '客房清洁服务', 
    vi: 'Dịch vụ dọn dẹp' 
  }),
  description: 'Daily room cleaning service',
  description_locale: JSON.stringify({ 
    en: 'Daily room cleaning service', 
    de: 'Täglicher Reinigungsdienst', 
    ko: '매일 객실 청소 서비스', 
    ja: '毎日のルームクリーニング', 
    zh: '每日客房清洁服务', 
    vi: 'Dịch vụ dọn dẹp phòng hàng ngày' 
  }),
  price: 20.0,
  hotel_id: 1
};

db.run(
  'INSERT INTO services (name, name_locale, description, description_locale, price, hotel_id) VALUES (?, ?, ?, ?, ?, ?)',
  [service.name, service.name_locale, service.description, service.description_locale, service.price, service.hotel_id],
  function(err) {
    if (err) {
      console.error('Error inserting service:', err.message);
    } else {
      console.log(`Inserted service with ID: ${this.lastID}`);
    }
    db.close();
  }
);