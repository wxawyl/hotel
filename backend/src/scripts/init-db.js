const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      location TEXT,
      tags TEXT,
      distance_info TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      capacity INTEGER,
      area INTEGER,
      facilities TEXT,
      price REAL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER,
      room_id INTEGER,
      category TEXT,
      url TEXT,
      thumbnail_url TEXT,
      sort_order INTEGER DEFAULT 0,
      is_hidden INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_number TEXT UNIQUE,
      hotel_id INTEGER,
      room_id INTEGER,
      check_in DATE,
      check_out DATE,
      guest_name TEXT,
      guest_email TEXT,
      guest_phone TEXT,
      services TEXT,
      total_price REAL,
      currency TEXT DEFAULT 'USD',
      status TEXT DEFAULT 'pending',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS cultural_spots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      location TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE,
      value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS exchange_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      currency TEXT UNIQUE,
      rate_to_usd REAL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';

    db.run(`INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)`, 
      [adminUsername, hashedPassword], (err) => {
      if (err) {
        console.error('Error creating admin user:', err);
      } else {
        console.log('Admin user initialized');
      }
    });

    const defaultRates = [
      { currency: 'USD', rate: 1 },
      { currency: 'EUR', rate: 0.92 },
      { currency: 'GBP', rate: 0.79 },
      { currency: 'AUD', rate: 1.52 },
      { currency: 'VND', rate: 24000 }
    ];

    defaultRates.forEach(rate => {
      db.run(`INSERT OR IGNORE INTO exchange_rates (currency, rate_to_usd) VALUES (?, ?)`, 
        [rate.currency, rate.rate]);
    });

    insertDefaultData();
  });
}

function insertDefaultData() {
  const hotels = [
    {
      name: JSON.stringify({
        en: 'Ocean View Resort',
        de: 'Meerblick Resort',
        ko: '오션뷰 리조트',
        ja: 'オーシャンビューリゾート',
        zh: '海景度假村'
      }),
      description: JSON.stringify({
        en: 'Luxury oceanfront resort with stunning views',
        de: 'Luxuriöses Meerresort mit atemberaubendem Ausblick',
        ko: '멋진 전망을 갖춘 고급 해변 리조트',
        ja: '素晴らしい景色を望む高級オーシャンフロントリゾート',
        zh: '豪华海滨度假村，拥有迷人景色'
      }),
      location: 'Danang Beach',
      tags: JSON.stringify(['Ocean View', 'Beachfront', 'Pool', 'Spa']),
      distance_info: JSON.stringify({ en: '5 min to beach' })
    },
    {
      name: JSON.stringify({
        en: 'Sunset Villa Hotel',
        de: 'Sunset Villa Hotel',
        ko: '선셋 빌라 호텔',
        ja: 'サンセットヴィラホテル',
        zh: '日落别墅酒店'
      }),
      description: JSON.stringify({
        en: 'Boutique hotel with amazing sunset views',
        de: 'Boutique-Hotel mit atemberaubendem Sonnenuntergang',
        ko: '멋진 석양 전망을 갖춘 부티크 호텔',
        ja: '素敵な夕日の景色を望むブティックホテル',
        zh: '精品酒店，拥有壮丽的日落景色'
      }),
      location: 'Danang Coast',
      tags: JSON.stringify(['Sunset View', 'Boutique', 'Quiet']),
      distance_info: JSON.stringify({ en: '10 min to beach' })
    },
    {
      name: JSON.stringify({
        en: 'Hoi An Ancient House',
        de: 'Hoi An Altes Haus',
        ko: '호이안 고대의 집',
        ja: 'ホイアン古民家',
        zh: '会安古屋酒店'
      }),
      description: JSON.stringify({
        en: 'Traditional stay in the heart of Hoi An',
        de: 'Traditioneller Aufenthalt im Herzen von Hoi An',
        ko: '호이안 중심가의 전통 숙소',
        ja: 'ホイアンの中心部にある伝統的な宿泊施設',
        zh: '位于会安古城中心的传统住宿'
      }),
      location: 'Hoi An Old Town',
      tags: JSON.stringify(['Heritage', 'Central', 'Traditional']),
      distance_info: JSON.stringify({ en: 'Walk to old town' })
    }
  ];

  hotels.forEach(hotel => {
    db.run(`INSERT OR IGNORE INTO hotels (name, description, location, tags, distance_info) VALUES (?, ?, ?, ?, ?)`,
      [hotel.name, hotel.description, hotel.location, hotel.tags, hotel.distance_info]);
  });

  const services = [
    {
      name: JSON.stringify({ en: 'Breakfast', de: 'Frühstück', ko: '아침식사', ja: '朝食', zh: '早餐' }),
      description: JSON.stringify({ en: 'Daily buffet breakfast' }),
      price: 15
    },
    {
      name: JSON.stringify({ en: 'Airport Pickup', de: 'Flughafenabholung', ko: '공항 픽업', ja: '空港送迎', zh: '接机服务' }),
      description: JSON.stringify({ en: 'Private airport transfer' }),
      price: 30
    },
    {
      name: JSON.stringify({ en: 'Spa Treatment', de: 'Spa-Behandlung', ko: '스파 트리트먼트', ja: 'スパトリートメント', zh: '水疗服务' }),
      description: JSON.stringify({ en: '60-minute relaxing massage' }),
      price: 50
    }
  ];

  services.forEach(service => {
    db.run(`INSERT OR IGNORE INTO services (name, description, price) VALUES (?, ?, ?)`,
      [service.name, service.description, service.price]);
  });

  const defaultSettings = [
    { key: 'site_name', value: JSON.stringify({ en: 'Hoi An Hotel Collection' }) },
    { key: 'contact_email', value: 'info@hoianhotels.com' },
    { key: 'contact_phone', value: '+84 123 456 789' },
    { key: 'whatsapp', value: '+84 123 456 789' }
  ];

  defaultSettings.forEach(setting => {
    db.run(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`,
      [setting.key, setting.value]);
  });

  setTimeout(() => {
    console.log('Database initialization complete');
    db.close();
  }, 1000);
}
