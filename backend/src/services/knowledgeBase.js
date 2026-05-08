const knowledgeBase = {
  hotels: [
    {
      name: { en: "Hoi An Ancient House", zh: "会安古屋酒店", vi: "Khách sạn Nhà Cổ Hội An", ja: "ホイアンアンシエントハウス", ko: "호이안 고택 호텔", de: "Hoi An Ancient House" },
      location: { en: "Hoi An, Vietnam", zh: "越南会安", vi: "Hội An, Việt Nam", ja: "ベトナム・ホイアン", ko: "베트남 호이안", de: "Hoi An, Vietnam" },
      description: { en: "A boutique hotel located in the heart of Hoi An's ancient town, offering traditional Vietnamese architecture with modern amenities.", zh: "位于会安古镇中心的精品酒店，融合传统越南建筑风格与现代设施。", vi: "Khách sạn boutique nằm ở trung tâm thị trấn cổ Hội An, kết hợp kiến trúc truyền thống Việt Nam với tiện nghi hiện đại.", ja: "ホイアンの古代都市の中心に位置するブティックホテルで、伝統的なベトナム建築と現代的な設備を兼ね備えています。", ko: "호이안 고도 중심에 위치한 부티크 호텔로, 전통 베트남 건축과 현대 편의 시설을 결합했습니다.", de: "Ein Boutique-Hotel im Herzen der Altstadt von Hoi An, das traditionelle vietnamesische Architektur mit modernen Annehmlichkeiten kombiniert." },
      priceFrom: 150,
      currency: "USD",
      amenities: ["Free Breakfast", "Swimming Pool", "Spa", "Free WiFi", "Airport Transfer"]
    },
    {
      name: { en: "Da Nang Beach Resort", zh: "岘港海滩度假村", vi: "Khu nghỉ dưỡng Bãi biển Đà Nẵng", ja: "ダナンビーチリゾート", ko: "다낭 비치 리조트", de: "Da Nang Beach Resort" },
      location: { en: "Da Nang, Vietnam", zh: "越南岘港", vi: "Đà Nẵng, Việt Nam", ja: "ベトナム・ダナン", ko: "베트남 다낭", de: "Da Nang, Vietnam" },
      description: { en: "A luxury beachfront resort with stunning ocean views and world-class facilities.", zh: "豪华海滨度假村，拥有壮丽的海景和世界级设施。", vi: "Khu nghỉ dưỡng hạng sang trên bãi biển với view biển tuyệt đẹp và tiện nghi đẳng cấp quốc tế.", ja: "息をのむような海の景色とワールドクラスの設備を備えた高級ビーチフロントリゾートです。", ko: "화려한 바다 전망과 세계 클래스 시설을 갖춘 고급 해변 리조트입니다.", de: "Ein luxuriöses Strandresort mit atemberaubender Meerblick und erstklassigen Einrichtungen." },
      priceFrom: 200,
      currency: "USD",
      amenities: ["Private Beach", "Infinity Pool", "Fine Dining", "Golf Course", "Helicopter Transfer"]
    },
    {
      name: { en: "Hue Imperial Palace Hotel", zh: "顺化皇城酒店", vi: "Khách sạn Hoàng thành Huế", ja: "フエ皇帝宮殿ホテル", ko: "훼 궁궐 호텔", de: "Hue Imperial Palace Hotel" },
      location: { en: "Hue, Vietnam", zh: "越南顺化", vi: "Huế, Việt Nam", ja: "ベトナム・フエ", ko: "베트남 훼", de: "Hue, Vietnam" },
      description: { en: "Experience royal luxury near the historic Hue Imperial City with elegant accommodations.", zh: "在历史悠久的顺化皇城附近体验皇家奢华，享受优雅的住宿。", vi: "Trải nghiệm sự sang trọng Hoàng gia gần thành cổ Huế với những chỗ ở trang nhã.", ja: "歴史的なフエ皇城の近くで王室の贅沢を体験し、エレガントな宿泊施設をお楽しみください。", ko: "역사적인 훼 궁성 근처에서 왕실의 호화로움을 경험하고 우아한 숙박을 즐기세요.", de: "Erleben Sie königlichen Luxus in der Nähe der historischen Kaiserstadt Hue mit eleganten Unterkünften." },
      priceFrom: 180,
      currency: "USD",
      amenities: ["Royal Spa", "Traditional Dining", "Garden View", "Concierge Service", "Car Rental"]
    }
  ],
  services: [
    {
      name: { en: "Breakfast", zh: "早餐", vi: "Bữa sáng", ja: "朝食", ko: "아침 식사", de: "Frühstück" },
      description: { en: "Complimentary buffet breakfast with Vietnamese and international dishes.", zh: "免费自助早餐，提供越南和国际美食。", vi: "Bữa sáng buffet miễn phí với các món ăn Việt Nam và quốc tế.", ja: "ベトナム料理と国際料理が楽しめる無料ビュッフェ朝食です。", ko: "베트남 및 국제 음식이 제공되는 무료 뷔페 아침 식사입니다.", de: "Kostenloses Buffet-Frühstück mit vietnamesischen und internationalen Gerichten." },
      price: 25,
      currency: "USD"
    },
    {
      name: { en: "Airport Pickup", zh: "机场接送", vi: "Đưa đón sân bay", ja: "空港送迎", ko: "공항 픽업", de: "Flughafentransfer" },
      description: { en: "Private airport transfer service available 24/7.", zh: "全天候私人机场接送服务。", vi: "Dịch vụ đưa đón sân bay riêng 24/7.", ja: "年中無休のプライベート空港送迎サービス。", ko: "24시간 이용 가능한 개인 공항 픽업 서비스입니다.", de: "Privater Flughafentransfer rund um die Uhr verfügbar." },
      price: 40,
      currency: "USD",
      multiplier: 2
    },
    {
      name: { en: "Spa Treatment", zh: "水疗护理", vi: "Dịch vụ spa", ja: "スパトリートメント", ko: "스파 트리트먼트", de: "Spa-Behandlung" },
      description: { en: "Traditional Vietnamese massage and wellness treatments.", zh: "传统越南按摩和健康护理。", vi: "Massage truyền thống Việt Nam và các dịch vụ chăm sóc sức khỏe.", ja: "伝統的なベトナムマッサージとウェルネストリートメント。", ko: "전통 베트남 마사지 및 웰니스 트리트먼트입니다.", de: "Traditionelle vietnamesische Massage und Wellness-Behandlungen." },
      price: 80,
      currency: "USD"
    }
  ],
  policies: {
    cancellation: {
      en: "Free cancellation up to 48 hours before arrival. Cancellations within 48 hours will incur a 50% charge.",
      zh: "入住前48小时内可免费取消。48小时内取消将收取50%的费用。",
      vi: "Hủy phòng miễn phí trong 48 giờ trước khi đến. Hủy trong vòng 48 giờ sẽ bị tính 50% chi phí.",
      ja: "到着48時間前まで無料キャンセル可能。48時間以内のキャンセルは50%の料金が発生します。",
      ko: "체크인 48시간 전까지 무료 취소 가능. 48시간 이내 취소 시 50% 요금이 청구됩니다.",
      de: "Kostenlose Stornierung bis 48 Stunden vor Ankunft. Stornierungen innerhalb von 48 Stunden führen zu einer 50%igen Gebühr."
    },
    checkIn: {
      en: "Check-in time is from 2:00 PM onwards.",
      zh: "入住时间从下午2点开始。",
      vi: "Thời gian nhận phòng từ 14:00.",
      ja: "チェックインは午後2時以降です。",
      ko: "체크인 시간은 오후 2시부터입니다.",
      de: "Check-in ab 14:00 Uhr."
    },
    checkOut: {
      en: "Check-out time is by 11:00 AM.",
      zh: "退房时间为上午11点前。",
      vi: "Thời gian trả phòng trước 11:00.",
      ja: "チェックアウトは午前11時までです。",
      ko: "체크아웃 시간은 오전 11시까지입니다.",
      de: "Check-out bis 11:00 Uhr."
    },
    children: {
      en: "Children under 12 stay free when sharing with parents.",
      zh: "12岁以下儿童与父母同住可免费。",
      vi: "Trẻ dưới 12 tuổi ở cùng bố mẹ không tính phí.",
      ja: "12歳以下の子供は両親と同室の場合無料です。",
      ko: "12세 미만 어린이가 부모와 동거 시 무료입니다.",
      de: "Kinder unter 12 Jahren wohnen kostenlos mit Eltern."
    },
    payment: {
      en: "We accept Visa, MasterCard, PayPal, and VNPay.",
      zh: "我们接受Visa、MasterCard、PayPal和VNPay。",
      vi: "Chúng tôi chấp nhận Visa, MasterCard, PayPal và VNPay.",
      ja: "Visa、MasterCard、PayPal、VNPayをご利用いただけます。",
      ko: "Visa, MasterCard, PayPal, VNPay를 받습니다.",
      de: "Wir akzeptieren Visa, MasterCard, PayPal und VNPay."
    }
  },
  frequentlyAskedQuestions: [
    {
      question: { en: "Do you offer airport pickup service?", zh: "你们提供机场接送服务吗？", vi: "Bạn có cung cấp dịch vụ đưa đón sân bay không?", ja: "空港送迎サービスはありますか？", ko: "공항 픽업 서비스를 제공하나요？", de: "Bieten Sie einen Flughafentransfer an?" },
      answer: { en: "Yes, we offer 24/7 airport pickup service for $40 round trip.", zh: "是的，我们提供全天候机场接送服务，往返费用为40美元。", vi: "Có, chúng tôi cung cấp dịch vụ đưa đón sân bay 24/7 với chi phí 40 USD cho khứ hồi.", ja: "はい、年中無休で空港送迎サービスを提供しており、往復40ドルです。", ko: "네, 24시간 공항 픽업 서비스를 제공하며 왕복 40달러입니다.", de: "Ja, wir bieten einen Flughafentransfer rund um die Uhr für 40 USD Hin- und Rückfahrt an." }
    },
    {
      question: { en: "Is breakfast included?", zh: "早餐包含在内吗？", vi: "Bữa sáng có bao gồm không?", ja: "朝食は含まれていますか？", ko: "아침 식사가 포함되나요？", de: "Ist Frühstück inbegriffen?" },
      answer: { en: "Yes, complimentary buffet breakfast is included with all room bookings.", zh: "是的，所有客房预订都包含免费自助早餐。", vi: "Có, bữa sáng buffet miễn phí được bao gồm với tất cả các đặt phòng.", ja: "はい、すべての部屋予約に無料ビュッフェ朝食が含まれています。", ko: "네, 모든 객실 예약에 무료 뷔페 아침 식사가 포함됩니다.", de: "Ja, ein kostenloses Buffet-Frühstück ist bei allen Zimmerbuchungen inbegriffen." }
    },
    {
      question: { en: "Can I cancel my reservation?", zh: "我可以取消预订吗？", vi: "Tôi có thể hủy đặt phòng không?", ja: "予約をキャンセルできますか？", ko: "예약을 취소할 수 있나요？", de: "Kann ich meine Reservierung stornieren?" },
      answer: { en: "Free cancellation is available up to 48 hours before arrival. Cancellations within 48 hours incur a 50% charge.", zh: "入住前48小时内可免费取消。48小时内取消将收取50%的费用。", vi: "Hủy phòng miễn phí trong 48 giờ trước khi đến. Hủy trong vòng 48 giờ sẽ bị tính 50% chi phí.", ja: "到着48時間前まで無料キャンセル可能です。48時間以内のキャンセルは50%の料金が発生します。", ko: "체크인 48시간 전까지 무료 취소 가능합니다. 48시간 이내 취소 시 50% 요금이 청구됩니다.", de: "Kostenlose Stornierung bis 48 Stunden vor Ankunft. Stornierungen innerhalb von 48 Stunden führen zu einer 50%igen Gebühr." }
    },
    {
      question: { en: "What is the check-in time?", zh: "入住时间是什么时候？", vi: "Thời gian nhận phòng là khi nào?", ja: "チェックイン時間は何時ですか？", ko: "체크인 시간은 몇 시인가요？", de: "Wann ist die Check-in-Zeit?" },
      answer: { en: "Check-in time is from 2:00 PM onwards. Early check-in may be available upon request.", zh: "入住时间从下午2点开始。提前入住可根据要求安排。", vi: "Thời gian nhận phòng từ 14:00. Nhận phòng sớm có thể được sắp xếp theo yêu cầu.", ja: "チェックインは午後2時以降です。事前のリクエストにより早期チェックインが可能な場合があります。", ko: "체크인 시간은 오후 2시부터입니다. 요청 시 조기 체크인이 가능할 수 있습니다.", de: "Check-in ab 14:00 Uhr. Früherer Check-in kann auf Anfrage möglich sein." }
    },
    {
      question: { en: "Do you have a spa?", zh: "你们有水疗中心吗？", vi: "Bạn có spa không?", ja: "スパはありますか？", ko: "스파가 있나요？", de: "Haben Sie ein Spa?" },
      answer: { en: "Yes, we have a full-service spa offering traditional Vietnamese massage and wellness treatments starting at $80.", zh: "是的，我们有全方位服务的水疗中心，提供传统越南按摩和健康护理，起价80美元。", vi: "Có, chúng tôi có spa dịch vụ đầy đủ với massage truyền thống Việt Nam và các dịch vụ chăm sóc sức khỏe từ 80 USD.", ja: "はい、伝統的なベトナムマッサージとウェルネストリートメントを提供するフルサービススパがあり、料金は80ドルからです。", ko: "네, 전통 베트남 마사지 및 웰니스 트리트먼트를 제공하는 풀 서비스 스파가 있으며 80달러부터 이용하실 수 있습니다.", de: "Ja, wir haben ein Full-Service-Spa mit traditionellen vietnamesischen Massagen und Wellness-Behandlungen ab 80 USD." }
    }
  ]
};

function getKnowledgeBaseText(language = 'en') {
  let text = "=== HOTEL INFORMATION ===\n\n";
  
  knowledgeBase.hotels.forEach(hotel => {
    text += `Hotel: ${hotel.name[language] || hotel.name.en}\n`;
    text += `Location: ${hotel.location[language] || hotel.location.en}\n`;
    text += `Description: ${hotel.description[language] || hotel.description.en}\n`;
    text += `Price From: ${hotel.priceFrom} ${hotel.currency}\n`;
    text += `Amenities: ${hotel.amenities.join(', ')}\n\n`;
  });
  
  text += "=== SERVICES ===\n\n";
  knowledgeBase.services.forEach(service => {
    text += `Service: ${service.name[language] || service.name.en}\n`;
    text += `Description: ${service.description[language] || service.description.en}\n`;
    text += `Price: ${service.price} ${service.currency}\n\n`;
  });
  
  text += "=== POLICIES ===\n\n";
  text += `Cancellation Policy: ${knowledgeBase.policies.cancellation[language] || knowledgeBase.policies.cancellation.en}\n\n`;
  text += `Check-in Time: ${knowledgeBase.policies.checkIn[language] || knowledgeBase.policies.checkIn.en}\n\n`;
  text += `Check-out Time: ${knowledgeBase.policies.checkOut[language] || knowledgeBase.policies.checkOut.en}\n\n`;
  text += `Children Policy: ${knowledgeBase.policies.children[language] || knowledgeBase.policies.children.en}\n\n`;
  text += `Payment Methods: ${knowledgeBase.policies.payment[language] || knowledgeBase.policies.payment.en}\n\n`;
  
  text += "=== FREQUENTLY ASKED QUESTIONS ===\n\n";
  knowledgeBase.frequentlyAskedQuestions.forEach((faq, index) => {
    text += `${index + 1}. Q: ${faq.question[language] || faq.question.en}\n`;
    text += `   A: ${faq.answer[language] || faq.answer.en}\n\n`;
  });
  
  return text;
}

module.exports = { knowledgeBase, getKnowledgeBaseText };