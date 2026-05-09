const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../../database/hotel.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    createTables().then(() => {
      initAllData();
    });
  }
});

const createTables = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        tags TEXT,
        distance_info TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hotel_id) REFERENCES hotels(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER,
        room_id INTEGER,
        url TEXT,
        thumbnail_url TEXT,
        category TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hotel_id) REFERENCES hotels(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_locale TEXT,
        description TEXT,
        description_locale TEXT,
        icon TEXT,
        price REAL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_locale TEXT,
        description TEXT,
        description_locale TEXT,
        price REAL,
        category TEXT,
        image_url TEXT,
        stock INTEGER DEFAULT 1,
        stock_quantity INTEGER DEFAULT 100,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotel_id INTEGER,
        room_id INTEGER,
        guest_name TEXT,
        guest_email TEXT,
        check_in DATE,
        check_out DATE,
        guests INTEGER,
        total_price REAL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hotel_id) REFERENCES hotels(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'user',
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      console.log('✓ All tables created or already exist');
      resolve();
    });
  });
};

const hotels = [
  {
    name: JSON.stringify({
      en: 'La Maison Resort Hoi An',
      zh: '会安拉梅森度假村',
      ja: 'ホイアン・ラ・メゾン・リゾート',
      ko: '라 메종 리조트 호이안',
      de: 'La Maison Resort Hoi An',
      vi: 'Khu nghỉ dưỡng La Maison Hội An'
    }),
    description: JSON.stringify({
      en: 'A luxurious beachfront resort offering stunning ocean views and world-class amenities.',
      zh: '一个豪华的海滨度假村，提供迷人的海景和世界级的设施。',
      ja: '美しい海の景色とワールドクラスの設備を提供する豪華な海滨リゾート。',
      ko: '놀라운 바다 전망과 세계 수준의 시설을 제공하는 럭셔리한 해변 리조트.',
      de: 'Ein luxuriöses Strandresort mit atemberaubendem Meerblick und erstklassigen Annehmlichkeiten.',
      vi: 'Khu nghỉ dưỡng bãi biển sang trọng với tầm nhìn ra biển tuyệt đẹp và tiện nghi hàng đầu thế giới.'
    }),
    location: 'An Bang Beach, Hoi An',
    tags: JSON.stringify(['beachfront', 'luxury', 'spa', 'pool']),
    distance_info: JSON.stringify({
      en: '5 min to Hoi An Ancient Town',
      zh: '会安古城5分钟',
      ja: 'ホイアン旧市街まで5分',
      ko: '호이안 고대 도시간 5분',
      de: '5 Min. bis zur Altstadt Hoi An',
      vi: '5 phút đến phố cổ Hội An'
    }),
    is_active: 1
  },
  {
    name: JSON.stringify({
      en: 'Golden Sea Hotel',
      zh: '金色海洋酒店',
      ja: 'ゴールデンシーウェイホテル',
      ko: '골든 씨 호텔',
      de: 'Golden Sea Hotel',
      vi: 'Khách sạn Golden Sea'
    }),
    description: JSON.stringify({
      en: 'Modern beachfront hotel with excellent service and comfortable rooms.',
      zh: '现代海滨酒店，提供优质服务和舒适的客房。',
      ja: '優れたサービスと心地よいルームを提供する現代的な海滨ホテル。',
      ko: '훌륭한 서비스와 편안한 객실을 갖춘 모던 해변 호텔.',
      de: 'Modernes Strandhotel mit ausgezeichnetem Service und komfortablen Zimmern.',
      vi: 'Khách sạn hiện đại ven biển với dịch vụ tuyệt vời và phòng nghỉ thoải mái.'
    }),
    location: 'Cua Dai Beach, Hoi An',
    tags: JSON.stringify(['beachfront', 'modern', 'family']),
    distance_info: JSON.stringify({
      en: '10 min to Hoi An Ancient Town',
      zh: '会安古城10分钟',
      ja: 'ホイアン旧市街まで10分',
      ko: '호이안 고대 도시간 10분',
      de: '10 Min. bis zur Altstadt Hoi An',
      vi: '10 phút đến phố cổ Hội An'
    }),
    is_active: 1
  },
  {
    name: JSON.stringify({
      en: 'Ancient House Hotel',
      zh: '古宅酒店',
      ja: 'アンティークハウスホテル',
      ko: '에인션트 하우스 호텔',
      de: 'Ancient House Hotel',
      vi: 'Khách sạn Nhà Cổ'
    }),
    description: JSON.stringify({
      en: 'Charming boutique hotel near Hoi An Ancient Town with traditional Vietnamese architecture.',
      zh: '迷人的精品酒店，靠近会安古城，采用传统越南建筑风格。',
      ja: 'ベトナム伝統建築で、会安旧市街近郊の魅惑的なブティックホテル。',
      ko: '베트남 전통 건축으로 지어진 호이안古城 인근 매력적인 부티크 호텔.',
      de: 'Charmantes Boutique-Hotel in der Nähe der Altstadt von Hoi An mit traditioneller vietnamesischer Architektur.',
      vi: 'Khách sạn boutique xinh xắn gần phố cổ Hội An với kiến trúc Việt Nam truyền thống.'
    }),
    location: 'Near Hoi An Ancient Town',
    tags: JSON.stringify(['boutique', 'traditional', 'walking-distance']),
    distance_info: JSON.stringify({
      en: '2 min walk to Ancient Town',
      zh: '步行2分钟到古城',
      ja: '旧市街まで步行2分',
      ko: '고대 도시간 도보 2분',
      de: '2 Min. zu Fuß zur Altstadt',
      vi: 'Đi bộ 2 phút đến phố cổ'
    }),
    is_active: 1
  }
];

const rooms = [
  { hotel_id: 1, name: JSON.stringify({ en: 'Deluxe Ocean View Room', zh: '豪华海景房', ja: 'デラックスオーシャンビュールーム', ko: '델럭스 오션 뷰 룸', de: 'Deluxe Zimmer mit Meerblick', vi: 'Phòng Deluxe View Biển' }), description: JSON.stringify({ en: 'Spacious room with stunning ocean view, king bed, and modern amenities.', zh: '宽敞的房间，享有迷人海景，配有特大号床和现代设施。', ja: '広々とした部屋に素晴らしい海の景色、キングベッド、そしてモダンな設備が備わっています。', ko: '놀라운 바다 전망이 펼쳐지는 넓은 방, 킹 베드, 현대적인 편의 시설이 갖춰져 있습니다.', de: 'Geräumiges Zimmer mit atemberaubendem Meerblick, Kingsize-Bett und modernen Annehmlichkeiten.', vi: 'Phòng rộng rãi với tầm nhìn ra biển tuyệt đẹp, giường king size và tiện nghi hiện đại.' }), capacity: 2, area: 45, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Balcony']), price: 150, is_active: 1 },
  { hotel_id: 1, name: JSON.stringify({ en: 'Premium Suite', zh: '高级套房', ja: 'プレミアムスイート', ko: '프리미엄 스위트', de: 'Premium-Suite', vi: 'Phòng Suite Cao cấp' }), description: JSON.stringify({ en: 'Luxurious suite with separate living area, private terrace, and panoramic ocean views.', zh: '豪华套房，配有独立起居区、私人露台和全景海景。', ja: '独立したリビングエリア、プライベートテラス、そしてパノラマの海の景色が楽しめる豪華なスイート。', ko: '독립적인 거실 공간, 개인 테라스, 파노라마 바다 전망을 즐길 수 있는 럭셔리 스위트.', de: 'Luxuriöse Suite mit separatem Wohnbereich, privater Terrasse und Panoramameerblick.', vi: 'Chỗ ở sang trọng với khu vực khách riêng, sân thượng riêng và tầm nhìn ra biển toàn cảnh.' }), capacity: 4, area: 85, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Balcony', 'Living Room', 'Kitchenette']), price: 300, is_active: 1 },
  { hotel_id: 1, name: JSON.stringify({ en: 'Standard Room', zh: '标准间', ja: 'スタンダードルーム', ko: '스탠다드 룸', de: 'Standardzimmer', vi: 'Phòng Tiêu chuẩn' }), description: JSON.stringify({ en: 'Comfortable room with garden view, queen bed, and essential amenities.', zh: '舒适的房间，享有花园景观，配有大号床和基本设施。', ja: '庭の景色を望む快適な部屋、クイーンベッド、そして基本的な設備が備わっています。', ko: '정원 전망이 펼쳐지는 편안한 방, 퀸 베드, 필수적인 편의 시설이 갖춰져 있습니다.', de: 'Komfortables Zimmer mit Gartenblick, Queen-Bett und wesentlichen Annehmlichkeiten.', vi: 'Phòng thoải mái với view vườn, giường queen size và tiện nghi cơ bản.' }), capacity: 2, area: 35, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom']), price: 100, is_active: 1 },
  { hotel_id: 2, name: JSON.stringify({ en: 'Ocean Front Room', zh: '海滨房', ja: 'オーシャンフロントルーム', ko: '오션 프론트 룸', de: 'Strandfront-Zimmer', vi: 'Phòng Đối diện Biển' }), description: JSON.stringify({ en: 'Modern room with direct beach access and beautiful sea views.', zh: '现代风格的房间，可直接通往海滩，享有美丽海景。', ja: 'ビーチに直接アクセスでき、美しい海の景色を望むモダンな部屋。', ko: '해변에 직접 접근할 수 있고 아름다운 바다 전망을 즐길 수 있는 모던한 방.', de: 'Modernes Zimmer mit direktem Strandzugang und wunderschönem Meerblick.', vi: 'Phòng hiện đại với quyền truy cập trực tiếp vào bãi biển và view biển tuyệt đẹp.' }), capacity: 2, area: 40, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Beach Access']), price: 180, is_active: 1 },
  { hotel_id: 2, name: JSON.stringify({ en: 'Family Room', zh: '家庭房', ja: 'ファミリールーム', ko: '패밀리 룸', de: 'Familienzimmer', vi: 'Phòng Gia đình' }), description: JSON.stringify({ en: 'Spacious room ideal for families, with two double beds and extra space.', zh: '宽敞的房间，非常适合家庭入住，配有两张双人床和额外空间。', ja: 'ファミリーに最適な広々とした部屋、2台のダブルベッドと余分なスペースが備わっています。', ko: '가족에게 이상적인 넓은 방, 두 침대와 추가 공간이 갖춰져 있습니다.', de: 'Geräumiges Zimmer, ideal für Familien, mit zwei Doppelbetten und extra Platz.', vi: 'Phòng rộng rãi lý tưởng cho gia đình, với hai giường đôi và không gian thêm.' }), capacity: 4, area: 55, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Extra Bed']), price: 220, is_active: 1 },
  { hotel_id: 3, name: JSON.stringify({ en: 'Traditional Suite', zh: '传统套房', ja: 'トラディショナルスイート', ko: '트래디셔널 스위트', de: 'Traditionelle Suite', vi: 'Phòng Suite Truyền thống' }), description: JSON.stringify({ en: 'Authentic Vietnamese architecture with modern comforts in the heart of Hoi An.', zh: '正宗的越南建筑风格，在会安中心地带享受现代舒适。', ja: 'ホイアンの中心部にある伝統的なベトナム建築で、モダンな快適さを享受できます。', ko: '호이안 중심부에 위치한 본격적인 베트남 건축 양식으로 현대적인 편안함을 즐길 수 있습니다.', de: 'Authentische vietnamesische Architektur mit modernem Komfort im Herzen von Hoi An.', vi: 'Kiến trúc Việt Nam chính thống với sự thoải mái hiện đại ở trung tâm Hội An.' }), capacity: 2, area: 50, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Traditional Decor']), price: 160, is_active: 1 },
  { hotel_id: 3, name: JSON.stringify({ en: 'Garden Room', zh: '花园房', ja: 'ガーデンルーム', ko: '가든 룸', de: 'Gartenzimmer', vi: 'Phòng View Vườn' }), description: JSON.stringify({ en: 'Charming room overlooking the hotel garden with traditional design elements.', zh: '迷人的房间，俯瞰酒店花园，融合传统设计元素。', ja: 'ホテルの庭園を眺めることができ、伝統的なデザイン要素が融合した魅力的な部屋。', ko: '호텔 정원을 내려다볼 수 있고 전통적인 디자인 요소가 결합된 매력적인 방.', de: 'Charmantes Zimmer mit Blick auf den Hotelgarten und traditionelle Designelemente.', vi: 'Phòng xinh xắn nhìn ra vườn khách sạn với các yếu tố thiết kế truyền thống.' }), capacity: 2, area: 38, facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Garden View']), price: 120, is_active: 1 }
];

const images = [
  { hotel_id: 1, category: 'exterior', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', sort_order: 1, is_hidden: 0 },
  { hotel_id: 1, category: 'pool', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', sort_order: 2, is_hidden: 0 },
  { hotel_id: 1, category: 'room', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', sort_order: 3, is_hidden: 0, room_id: 1 },
  { hotel_id: 1, category: 'room', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop', sort_order: 4, is_hidden: 0, room_id: 2 },
  { hotel_id: 1, category: 'breakfast', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop', sort_order: 5, is_hidden: 0 },
  { hotel_id: 2, category: 'exterior', url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop', sort_order: 1, is_hidden: 0 },
  { hotel_id: 2, category: 'beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', sort_order: 2, is_hidden: 0 },
  { hotel_id: 2, category: 'room', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop', sort_order: 3, is_hidden: 0, room_id: 4 },
  { hotel_id: 3, category: 'exterior', url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop', sort_order: 1, is_hidden: 0 },
  { hotel_id: 3, category: 'traditional', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop', sort_order: 2, is_hidden: 0 },
  { hotel_id: 3, category: 'room', url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop', thumbnail_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop', sort_order: 3, is_hidden: 0, room_id: 6 }
];

const services = [
  { name: JSON.stringify({ en: 'Breakfast', de: 'Frühstück', ko: '아침식사', ja: '朝食', zh: '早餐', vi: 'Bữa sáng' }), description: JSON.stringify({ en: 'Daily buffet breakfast', zh: '每日自助早餐', ja: '日替わりビュッフェ朝食', ko: '매일 아침 뷔페', de: 'Tägliches Frühstücksbuffet', vi: 'Bữa sáng buffet hàng ngày' }), price: 15, is_active: 1 },
  { name: JSON.stringify({ en: 'Airport Pickup', de: 'Flughafenabholung', ko: '공항 픽업', ja: '空港送迎', zh: '接机服务', vi: 'Đón sân bay' }), description: JSON.stringify({ en: 'Private airport transfer', zh: '私人机场接送', ja: 'プライベート空港送迎', ko: '개인 공항 이동', de: 'Privater Flughafentransfer', vi: 'Dịch vụ đưa đón sân bay riêng' }), price: 30, is_active: 1 },
  { name: JSON.stringify({ en: 'Spa Treatment', de: 'Spa-Behandlung', ko: '스파 트리트먼트', ja: 'スパトリートメント', zh: '水疗服务', vi: 'Dịch vụ Spa' }), description: JSON.stringify({ en: '60-minute relaxing massage', zh: '60分钟放松按摩', ja: '60分間のリラックスマッサージ', ko: '60분 릴랙싱 마사지', de: '60-minütige entspannende Massage', vi: 'Massage thư giãn 60 phút' }), price: 50, is_active: 1 }
];

const products = [
  { name: 'Vietnamese Coffee', name_locale: JSON.stringify({ en: 'Vietnamese Coffee', de: 'Vietnamesischer Kaffee', ko: '베트남 커피', ja: 'ベトナムコーヒー', zh: '越南咖啡', vi: 'Cà phê Việt Nam' }), description: 'Premium Vietnamese drip coffee', description_locale: JSON.stringify({ en: 'Premium Vietnamese drip coffee', de: 'Premium Vietnamesischer Tropfkaffee', ko: '고급 베트남 드립 커피', ja: 'プレミアムベトナムドリップコーヒー', zh: '优质越南滴漏咖啡', vi: 'Cà phê phin Việt Nam cao cấp' }), price: 12.0, category: 'food', image_url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=300&fit=crop', stock: 100, stock_quantity: 100, is_active: 1 },
  { name: 'Vietnamese Tea', name_locale: JSON.stringify({ en: 'Vietnamese Tea', de: 'Vietnamesischer Tee', ko: '베트남 차', ja: 'ベトナム茶', zh: '越南茶叶', vi: 'Trà Việt Nam' }), description: 'High quality green tea from the mountains', description_locale: JSON.stringify({ en: 'High quality green tea from the mountains', de: 'Hochwertiger Grüner Tee aus den Bergen', ko: '산악지역에서 생산된 고품질 녹차', ja: '山地産の高品質緑茶', zh: '高山优质绿茶', vi: 'Trà xanh chất lượng cao từ vùng núi' }), price: 18.0, category: 'food', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop', stock: 80, stock_quantity: 80, is_active: 1 },
  { name: 'Silk Scarf', name_locale: JSON.stringify({ en: 'Silk Scarf', de: 'Seidentuch', ko: '비단 스카프', ja: 'シルクスカーフ', zh: '丝巾', vi: 'Khăn lụa' }), description: 'Handmade silk scarf with traditional patterns', description_locale: JSON.stringify({ en: 'Handmade silk scarf with traditional patterns', de: 'Handgemachtes Seidentuch mit traditionellem Muster', ko: '전통 무늬가 있는 수제 비단 스카프', ja: '伝統的な模様の手作りシルクスカーフ', zh: '手工制作的传统图案丝巾', vi: 'Khăn lụa thủ công với họa tiết truyền thống' }), price: 45.0, category: 'souvenir', image_url: 'https://images.unsplash.com/photo-1520975957996-972dec2617cf?w=300&h=300&fit=crop', stock: 50, stock_quantity: 50, is_active: 1 },
  { name: 'Handmade Lantern', name_locale: JSON.stringify({ en: 'Handmade Lantern', de: 'Handgemachtes Laterne', ko: '수제 랜턴', ja: '手作り提灯', zh: '手工灯笼', vi: 'Đèn lồng thủ công' }), description: 'Traditional Hoi An silk lantern', description_locale: JSON.stringify({ en: 'Traditional Hoi An silk lantern', de: 'Traditionelle Hoi An Seidenlaterne', ko: '호이안 전통 비단 랜턴', ja: '伝統的なホイアンシルク提灯', zh: '会安传统丝绸灯笼', vi: 'Đèn lồng lụa Hội An truyền thống' }), price: 35.0, category: 'souvenir', image_url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=300&h=300&fit=crop', stock: 40, stock_quantity: 40, is_active: 1 },
  { name: 'Cotton Towel Set', name_locale: JSON.stringify({ en: 'Cotton Towel Set', de: 'Baumwolltuchset', ko: '면 수건 세트', ja: 'コットンタオルセット', zh: '棉质毛巾套装', vi: 'Bộ khăn cotton' }), description: 'Soft cotton bath towels', description_locale: JSON.stringify({ en: 'Soft cotton bath towels', de: 'Weiche Baumwoll-Badetücher', ko: '부드러운 면 목욕 수건', ja: '柔らかいコットンバスタオル', zh: '柔软的棉质浴巾', vi: 'Khăn tắm cotton mềm mại' }), price: 25.0, category: 'daily', image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop', stock: 100, stock_quantity: 100, is_active: 1 },
  { name: 'Slippers', name_locale: JSON.stringify({ en: 'Slippers', de: 'Hausschuhe', ko: '슬리퍼', ja: 'スリッパ', zh: '拖鞋', vi: 'Dép lười' }), description: 'Comfortable hotel slippers', description_locale: JSON.stringify({ en: 'Comfortable hotel slippers', de: 'Bequeme Hotel-Hausschuhe', ko: '편안한 호텔 슬리퍼', ja: '快適なホテルスリッパ', zh: '舒适的酒店拖鞋', vi: 'Dép lười khách sạn thoải mái' }), price: 15.0, category: 'daily', image_url: 'https://images.unsplash.com/photo-1523419408621-40d215379c85?w=300&h=300&fit=crop', stock: 150, stock_quantity: 150, is_active: 1 }
];

function initAllData() {
  db.serialize(() => {
    console.log('=== Starting database initialization ===');

    console.log('1. Inserting hotels...');
    hotels.forEach((hotel, index) => {
      db.run(`INSERT INTO hotels (name, description, location, tags, distance_info, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, 
        [hotel.name, hotel.description, hotel.location, hotel.tags, hotel.distance_info, hotel.is_active],
        (err) => { if (err) console.error('Error inserting hotel:', err); else console.log(`   ✓ Added hotel ${index + 1}`); }
      );
    });

    console.log('2. Inserting rooms...');
    rooms.forEach((room, index) => {
      db.run(`INSERT INTO rooms (hotel_id, name, description, capacity, area, facilities, price, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`, 
        [room.hotel_id, room.name, room.description, room.capacity, room.area, room.facilities, room.price, room.is_active],
        (err) => { if (err) console.error('Error inserting room:', err); else console.log(`   ✓ Added room ${index + 1}`); }
      );
    });

    console.log('3. Inserting images...');
    images.forEach((img, index) => {
      db.run(`INSERT INTO images (hotel_id, room_id, category, url, thumbnail_url, sort_order, is_hidden, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`, 
        [img.hotel_id, img.room_id || null, img.category, img.url, img.thumbnail_url, img.sort_order, img.is_hidden],
        (err) => { if (err) console.error('Error inserting image:', err); else console.log(`   ✓ Added image ${index + 1}`); }
      );
    });

    console.log('4. Inserting services...');
    services.forEach((service, index) => {
      db.run(`INSERT OR IGNORE INTO services (name, description, price, is_active, created_at) VALUES (?, ?, ?, ?, datetime('now'))`, 
        [service.name, service.description, service.price, service.is_active],
        (err) => { if (err) console.error('Error inserting service:', err); else console.log(`   ✓ Added service ${index + 1}`); }
      );
    });

    console.log('5. Inserting products...');
    products.forEach((product, index) => {
      db.run(`INSERT INTO products (name, name_locale, description, description_locale, price, category, image_url, stock, stock_quantity, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`, 
        [product.name, product.name_locale, product.description, product.description_locale, product.price, product.category, product.image_url, product.stock, product.stock_quantity, product.is_active],
        (err) => { if (err) console.error('Error inserting product:', err); else console.log(`   ✓ Added product ${index + 1}`); }
      );
    });

    setTimeout(() => {
      console.log('\n=== Database initialization complete! ===');
      console.log('\nSummary:');
      console.log('  - Hotels:', hotels.length);
      console.log('  - Rooms:', rooms.length);
      console.log('  - Images:', images.length);
      console.log('  - Services:', services.length);
      console.log('  - Products:', products.length);
      db.close();
      process.exit(0);
    }, 2000);
  });
}
