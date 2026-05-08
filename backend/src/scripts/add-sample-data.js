const db = require('../config/database');

const sampleHotels = [
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

async function addSampleHotels() {
  console.log('Adding sample hotels...');

  for (const hotel of sampleHotels) {
    const stmt = db.prepare(`
      INSERT INTO hotels (name, description, location, tags, distance_info, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    stmt.run(
      hotel.name,
      hotel.description,
      hotel.location,
      hotel.tags,
      hotel.distance_info,
      hotel.is_active
    );

    console.log(`Added hotel: ${JSON.parse(hotel.name).en}`);
  }

  console.log('Sample hotels added successfully!');
  process.exit(0);
}

addSampleHotels();
