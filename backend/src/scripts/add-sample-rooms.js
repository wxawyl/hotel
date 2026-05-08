const db = require('../config/database');

const sampleRooms = [
  {
    hotel_id: 1,
    name: JSON.stringify({
      en: 'Deluxe Ocean View Room',
      zh: '豪华海景房',
      ja: 'デラックスオーシャンビュールーム',
      ko: '델럭스 오션 뷰 룸',
      de: 'Deluxe Zimmer mit Meerblick',
      vi: 'Phòng Deluxe View Biển'
    }),
    description: JSON.stringify({
      en: 'Spacious room with stunning ocean view, king bed, and modern amenities.',
      zh: '宽敞的房间，享有迷人海景，配有特大号床和现代设施。',
      ja: '広々とした部屋に素晴らしい海の景色、キングベッド、そしてモダンな設備が備わっています。',
      ko: '놀라운 바다 전망이 펼쳐지는 넓은 방, 킹 베드, 현대적인 편의 시설이 갖춰져 있습니다.',
      de: 'Geräumiges Zimmer mit atemberaubendem Meerblick, Kingsize-Bett und modernen Annehmlichkeiten.',
      vi: 'Phòng rộng rãi với tầm nhìn ra biển tuyệt đẹp, giường king size và tiện nghi hiện đại.'
    }),
    capacity: 2,
    area: 45,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Balcony']),
    price: 150,
    is_active: 1
  },
  {
    hotel_id: 1,
    name: JSON.stringify({
      en: 'Premium Suite',
      zh: '高级套房',
      ja: 'プレミアムスイート',
      ko: '프리미엄 스위트',
      de: 'Premium-Suite',
      vi: 'Phòng Suite Cao cấp'
    }),
    description: JSON.stringify({
      en: 'Luxurious suite with separate living area, private terrace, and panoramic ocean views.',
      zh: '豪华套房，配有独立起居区、私人露台和全景海景。',
      ja: '独立したリビングエリア、プライベートテラス、そしてパノラマの海の景色が楽しめる豪華なスイート。',
      ko: '독립적인 거실 공간, 개인 테라스, 파노라마 바다 전망을 즐길 수 있는 럭셔리 스위트.',
      de: 'Luxuriöse Suite mit separatem Wohnbereich, privater Terrasse und Panoramameerblick.',
      vi: 'Chỗ ở sang trọng với khu vực khách riêng, sân thượng riêng và tầm nhìn ra biển toàn cảnh.'
    }),
    capacity: 4,
    area: 85,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Balcony', 'Living Room', 'Kitchenette']),
    price: 300,
    is_active: 1
  },
  {
    hotel_id: 1,
    name: JSON.stringify({
      en: 'Standard Room',
      zh: '标准间',
      ja: 'スタンダードルーム',
      ko: '스탠다드 룸',
      de: 'Standardzimmer',
      vi: 'Phòng Tiêu chuẩn'
    }),
    description: JSON.stringify({
      en: 'Comfortable room with garden view, queen bed, and essential amenities.',
      zh: '舒适的房间，享有花园景观，配有大号床和基本设施。',
      ja: '庭の景色を望む快適な部屋、クイーンベッド、そして基本的な設備が備わっています。',
      ko: '정원 전망이 펼쳐지는 편안한 방, 퀸 베드, 필수적인 편의 시설이 갖춰져 있습니다.',
      de: 'Komfortables Zimmer mit Gartenblick, Queen-Bett und wesentlichen Annehmlichkeiten.',
      vi: 'Phòng thoải mái với view vườn, giường queen size và tiện nghi cơ bản.'
    }),
    capacity: 2,
    area: 35,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom']),
    price: 100,
    is_active: 1
  },
  {
    hotel_id: 2,
    name: JSON.stringify({
      en: 'Ocean Front Room',
      zh: '海滨房',
      ja: 'オーシャンフロントルーム',
      ko: '오션 프론트 룸',
      de: 'Strandfront-Zimmer',
      vi: 'Phòng Đối diện Biển'
    }),
    description: JSON.stringify({
      en: 'Modern room with direct beach access and beautiful sea views.',
      zh: '现代风格的房间，可直接通往海滩，享有美丽海景。',
      ja: 'ビーチに直接アクセスでき、美しい海の景色を望むモダンな部屋。',
      ko: '해변에 직접 접근할 수 있고 아름다운 바다 전망을 즐길 수 있는 모던한 방.',
      de: 'Modernes Zimmer mit direktem Strandzugang und wunderschönem Meerblick.',
      vi: 'Phòng hiện đại với quyền truy cập trực tiếp vào bãi biển và view biển tuyệt đẹp.'
    }),
    capacity: 2,
    area: 40,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Beach Access']),
    price: 180,
    is_active: 1
  },
  {
    hotel_id: 2,
    name: JSON.stringify({
      en: 'Family Room',
      zh: '家庭房',
      ja: 'ファミリールーム',
      ko: '패밀리 룸',
      de: 'Familienzimmer',
      vi: 'Phòng Gia đình'
    }),
    description: JSON.stringify({
      en: 'Spacious room ideal for families, with two double beds and extra space.',
      zh: '宽敞的房间，非常适合家庭入住，配有两张双人床和额外空间。',
      ja: 'ファミリーに最適な広々とした部屋、2台のダブルベッドと余分なスペースが備わっています。',
      ko: '가족에게 이상적인 넓은 방, 두 침대와 추가 공간이 갖춰져 있습니다.',
      de: 'Geräumiges Zimmer, ideal für Familien, mit zwei Doppelbetten und extra Platz.',
      vi: 'Phòng rộng rãi lý tưởng cho gia đình, với hai giường đôi và không gian thêm.'
    }),
    capacity: 4,
    area: 55,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Minibar', 'Bathroom', 'Extra Bed']),
    price: 220,
    is_active: 1
  },
  {
    hotel_id: 3,
    name: JSON.stringify({
      en: 'Traditional Suite',
      zh: '传统套房',
      ja: 'トラディショナルスイート',
      ko: '트래디셔널 스위트',
      de: 'Traditionelle Suite',
      vi: 'Phòng Suite Truyền thống'
    }),
    description: JSON.stringify({
      en: 'Authentic Vietnamese architecture with modern comforts in the heart of Hoi An.',
      zh: '正宗的越南建筑风格，在会安中心地带享受现代舒适。',
      ja: 'ホイアンの中心部にある伝統的なベトナム建築で、モダンな快適さを享受できます。',
      ko: '호이안 중심부에 위치한 본격적인 베트남 건축 양식으로 현대적인 편안함을 즐길 수 있습니다.',
      de: 'Authentische vietnamesische Architektur mit modernem Komfort im Herzen von Hoi An.',
      vi: 'Kiến trúc Việt Nam chính thống với sự thoải mái hiện đại ở trung tâm Hội An.'
    }),
    capacity: 2,
    area: 50,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Traditional Decor']),
    price: 160,
    is_active: 1
  },
  {
    hotel_id: 3,
    name: JSON.stringify({
      en: 'Garden Room',
      zh: '花园房',
      ja: 'ガーデンルーム',
      ko: '가든 룸',
      de: 'Gartenzimmer',
      vi: 'Phòng View Vườn'
    }),
    description: JSON.stringify({
      en: 'Charming room overlooking the hotel garden with traditional design elements.',
      zh: '迷人的房间，俯瞰酒店花园，融合传统设计元素。',
      ja: 'ホテルの庭園を眺めることができ、伝統的なデザイン要素が融合した魅力的な部屋。',
      ko: '호텔 정원을 내려다볼 수 있고 전통적인 디자인 요소가 결합된 매력적인 방.',
      de: 'Charmantes Zimmer mit Blick auf den Hotelgarten und traditionelle Designelemente.',
      vi: 'Phòng xinh xắn nhìn ra vườn khách sạn với các yếu tố thiết kế truyền thống.'
    }),
    capacity: 2,
    area: 38,
    facilities: JSON.stringify(['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'Garden View']),
    price: 120,
    is_active: 1
  }
];

async function addSampleRooms() {
  console.log('Adding sample rooms...');

  for (const room of sampleRooms) {
    const stmt = db.prepare(`
      INSERT INTO rooms (hotel_id, name, description, capacity, area, facilities, price, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    stmt.run(
      room.hotel_id,
      room.name,
      room.description,
      room.capacity,
      room.area,
      room.facilities,
      room.price,
      room.is_active
    );

    console.log(`Added room: ${JSON.parse(room.name).en} (Hotel ${room.hotel_id})`);
  }

  console.log('Sample rooms added successfully!');
  process.exit(0);
}

addSampleRooms();