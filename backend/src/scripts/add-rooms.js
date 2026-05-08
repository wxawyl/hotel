const db = require('../config/database');

const rooms = [
  {
    hotel_id: 1,
    name: { en: 'Deluxe Ocean View Room', zh: '豪华海景房', ja: 'デラックスオーシャンビュー', ko: '델럭스 오션 뷰', de: 'Deluxe Meerblick', vi: 'Phòng Deluxe View Biển' },
    description: { en: 'Spacious ocean view room', zh: '宽敞的海景房', ja: '広々としたオーシャンビュールーム', ko: '넓은 오션 뷰 룸', de: 'Geräumiges Meerblickzimmer', vi: 'Phòng view biển rộng rãi' },
    capacity: 2,
    area: 45,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Balcony'],
    price: 150
  },
  {
    hotel_id: 1,
    name: { en: 'Premium Suite', zh: '高级套房', ja: 'プレミアムスイート', ko: '프리미엄 스위트', de: 'Premium Suite', vi: 'Phòng Suite Cao cấp' },
    description: { en: 'Luxurious suite', zh: '豪华套房', ja: '豪華スイート', ko: '럭셔리 스위트', de: 'Luxuriöse Suite', vi: 'Chỗ ở sang trọng' },
    capacity: 4,
    area: 85,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Balcony', 'Living Room'],
    price: 300
  },
  {
    hotel_id: 1,
    name: { en: 'Standard Room', zh: '标准间', ja: 'スタンダードルーム', ko: '스탠다드 룸', de: 'Standardzimmer', vi: 'Phòng Tiêu chuẩn' },
    description: { en: 'Comfortable room', zh: '舒适的房间', ja: '快適な部屋', ko: '편안한 방', de: 'Komfortables Zimmer', vi: 'Phòng thoải mái' },
    capacity: 2,
    area: 35,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Bathroom'],
    price: 100
  },
  {
    hotel_id: 2,
    name: { en: 'Ocean Front Room', zh: '海滨房', ja: 'オーシャンフロントルーム', ko: '오션 프론트 룸', de: 'Strandfront-Zimmer', vi: 'Phòng Đối diện Biển' },
    description: { en: 'Modern beach room', zh: '现代海滨房', ja: 'モダンなビーチルーム', ko: '모던 비치 룸', de: 'Modernes Strandzimmer', vi: 'Phòng hiện đại ven biển' },
    capacity: 2,
    area: 40,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Beach Access'],
    price: 180
  },
  {
    hotel_id: 2,
    name: { en: 'Family Room', zh: '家庭房', ja: 'ファミリールーム', ko: '패밀리 룸', de: 'Familienzimmer', vi: 'Phòng Gia đình' },
    description: { en: 'Spacious family room', zh: '宽敞的家庭房', ja: '広々としたファミリールーム', ko: '넓은 패밀리 룸', de: 'Geräumiges Familienzimmer', vi: 'Phòng rộng rãi cho gia đình' },
    capacity: 4,
    area: 55,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Extra Bed'],
    price: 220
  },
  {
    hotel_id: 3,
    name: { en: 'Traditional Suite', zh: '传统套房', ja: 'トラディショナルスイート', ko: '트래디셔널 스위트', de: 'Traditionelle Suite', vi: 'Phòng Suite Truyền thống' },
    description: { en: 'Traditional Vietnamese style', zh: '越南传统风格', ja: '伝統的なベトナムスタイル', ko: '베트남 전통 스타일', de: 'Traditioneller vietnamesischer Stil', vi: 'Phong cách Việt Nam truyền thống' },
    capacity: 2,
    area: 50,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Traditional Decor'],
    price: 160
  },
  {
    hotel_id: 3,
    name: { en: 'Garden Room', zh: '花园房', ja: 'ガーデンルーム', ko: '가든 룸', de: 'Gartenzimmer', vi: 'Phòng View Vườn' },
    description: { en: 'Garden view room', zh: '花园景房', ja: '庭園の景色を望む部屋', ko: '정원 전망 룸', de: 'Zimmer mit Gartenblick', vi: 'Phòng view vườn' },
    capacity: 2,
    area: 38,
    facilities: ['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Garden View'],
    price: 120
  }
];

let count = 0;
rooms.forEach((room, index) => {
  db.run(
    'INSERT INTO rooms (hotel_id, name, description, capacity, area, facilities, price, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime("now"))',
    [
      room.hotel_id,
      JSON.stringify(room.name),
      JSON.stringify(room.description),
      room.capacity,
      room.area,
      JSON.stringify(room.facilities),
      room.price,
      1
    ],
    function(err) {
      if (err) {
        console.error('Error inserting room:', err);
        return;
      }
      count++;
      if (count === rooms.length) {
        console.log(`Successfully inserted ${count} rooms!`);
        process.exit(0);
      }
    }
  );
});