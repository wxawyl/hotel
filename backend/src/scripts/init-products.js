const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../../../database/hotel.db'));

const products = [
  {
    name: 'Vietnamese Coffee',
    name_locale: JSON.stringify({ en: 'Vietnamese Coffee', de: 'Vietnamesischer Kaffee', ko: '베트남 커피', ja: 'ベトナムコーヒー', zh: '越南咖啡', vi: 'Cà phê Việt Nam' }),
    description: 'Premium Vietnamese drip coffee',
    description_locale: JSON.stringify({ en: 'Premium Vietnamese drip coffee', de: 'Premium Vietnamesischer Tropfkaffee', ko: '고급 베트남 드립 커피', ja: 'プレミアムベトナムドリップコーヒー', zh: '优质越南滴漏咖啡', vi: 'Cà phê phin Việt Nam cao cấp' }),
    price: 12.0,
    category: 'food',
    image_url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=300&fit=crop',
    stock: 100
  },
  {
    name: 'Vietnamese Tea',
    name_locale: JSON.stringify({ en: 'Vietnamese Tea', de: 'Vietnamesischer Tee', ko: '베트남 차', ja: 'ベトナム茶', zh: '越南茶叶', vi: 'Trà Việt Nam' }),
    description: 'High quality green tea from the mountains',
    description_locale: JSON.stringify({ en: 'High quality green tea from the mountains', de: 'Hochwertiger Grüner Tee aus den Bergen', ko: '산악지역에서 생산된 고품질 녹차', ja: '山地産の高品質緑茶', zh: '高山优质绿茶', vi: 'Trà xanh chất lượng cao từ vùng núi' }),
    price: 18.0,
    category: 'food',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    stock: 80
  },
  {
    name: 'Silk Scarf',
    name_locale: JSON.stringify({ en: 'Silk Scarf', de: 'Seidentuch', ko: '비단 스카프', ja: 'シルクスカーフ', zh: '丝巾', vi: 'Khăn lụa' }),
    description: 'Handmade silk scarf with traditional patterns',
    description_locale: JSON.stringify({ en: 'Handmade silk scarf with traditional patterns', de: 'Handgemachtes Seidentuch mit traditionellem Muster', ko: '전통 무늬가 있는 수제 비단 스카프', ja: '伝統的な模様の手作りシルクスカーフ', zh: '手工制作的传统图案丝巾', vi: 'Khăn lụa thủ công với họa tiết truyền thống' }),
    price: 45.0,
    category: 'souvenir',
    image_url: 'https://images.unsplash.com/photo-1520975957996-972dec2617cf?w=300&h=300&fit=crop',
    stock: 50
  },
  {
    name: 'Handmade Lantern',
    name_locale: JSON.stringify({ en: 'Handmade Lantern', de: 'Handgemachtes Laterne', ko: '수제 랜턴', ja: '手作り提灯', zh: '手工灯笼', vi: 'Đèn lồng thủ công' }),
    description: 'Traditional Hoi An silk lantern',
    description_locale: JSON.stringify({ en: 'Traditional Hoi An silk lantern', de: 'Traditionelle Hoi An Seidenlaterne', ko: '호이안 전통 비단 랜턴', ja: '伝統的なホイアンシルク提灯', zh: '会安传统丝绸灯笼', vi: 'Đèn lồng lụa Hoi An truyền thống' }),
    price: 35.0,
    category: 'souvenir',
    image_url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=300&fit=crop',
    stock: 40
  },
  {
    name: 'Cotton Towel Set',
    name_locale: JSON.stringify({ en: 'Cotton Towel Set', de: 'Baumwolltuchset', ko: '면 수건 세트', ja: 'コットンタオルセット', zh: '棉质毛巾套装', vi: 'Bộ khăn cotton' }),
    description: 'Soft cotton bath towels',
    description_locale: JSON.stringify({ en: 'Soft cotton bath towels', de: 'Weiche Baumwoll-Badetücher', ko: '부드러운 면 목욕 수건', ja: '柔らかいコットンバスタオル', zh: '柔软的棉质浴巾', vi: 'Khăn tắm cotton mềm mại' }),
    price: 25.0,
    category: 'daily',
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop',
    stock: 100
  },
  {
    name: 'Slippers',
    name_locale: JSON.stringify({ en: 'Slippers', de: 'Hausschuhe', ko: '슬리퍼', ja: 'スリッパ', zh: '拖鞋', vi: 'Dép lười' }),
    description: 'Comfortable hotel slippers',
    description_locale: JSON.stringify({ en: 'Comfortable hotel slippers', de: 'Bequeme Hotel-Hausschuhe', ko: '편안한 호텔 슬리퍼', ja: '快適なホテルスリッパ', zh: '舒适的酒店拖鞋', vi: 'Dép lười khách sạn thoải mái' }),
    price: 15.0,
    category: 'daily',
    image_url: 'https://images.unsplash.com/photo-1523419408621-40d215379c85?w=300&h=300&fit=crop',
    stock: 150
  }
];

db.serialize(() => {
  products.forEach((product, index) => {
    db.run(
      'INSERT OR IGNORE INTO products (name, name_locale, description, description_locale, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [product.name, product.name_locale, product.description, product.description_locale, product.price, product.category, product.image_url, product.stock],
      function(err) {
        if (err) {
          console.error(`Error inserting product ${index + 1}: ${err.message}`);
        } else {
          console.log(`Inserted product ${index + 1}: ${product.name} with ID: ${this.lastID}`);
        }
      }
    );
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Database connection closed.');
});
