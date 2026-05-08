import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';
import Modal from '../components/Modal';

const Culture = () => {
  const { t } = useTranslation();
  const { language } = useContext(BookingContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: 'food',
      title: {
        en: 'Local Cuisine',
        zh: '美食推荐',
        ja: '地元の食べ物',
        ko: '로컬 음식',
        de: 'Lokale Küche',
        vi: 'Ẩm thực địa phương'
      },
      items: [
        {
          name: {
            en: 'White Rose Dumplings',
            zh: '白玫瑰饺子',
            ja: 'ホワイトローズ餃子',
            ko: '화이트 로즈 만두',
            de: 'Weiße Rosenknödel',
            vi: 'Bánh bao hồng'
          },
          description: {
            en: 'Delicate shrimp and pork dumplings shaped like roses',
            zh: '精致的虾肉馅饺子，形状像玫瑰',
            ja: 'バラの形をしたエビと豚肉の団子',
            ko: '장미 모양의 새우와 돼지고기 만두',
            de: 'Zarte Garnelen- und Schweinefleischknödel in Rosenform',
            vi: 'Bánh bao tôm thịt thẩm mỹ, hình dạng giống hoa hồng'
          },
          details: {
            en: 'White Rose Dumplings are Hoi An\'s most iconic dish. These delicate dumplings are made with a translucent rice flour wrapper filled with shrimp and minced pork. They are steamed to perfection and served with a special dipping sauce made from fish sauce, lime, and chili.',
            zh: '白玫瑰饺子是会安最具标志性的美食。这些精致的饺子用半透明的米粉皮包裹虾仁和猪肉馅蒸制而成，搭配鱼露、青柠和辣椒制成的特制蘸酱食用。',
            ja: 'ホワイトローズ餃子はホイアンの最も象徴的な料理です。これらの繊細な餃子は、エビとミンチ肉を詰めた半透明の米粉の皮で作られています。完璧に蒸され、魚醤、ライム、チリで作られた特別なディッピングソースと一緒に提供されます。',
            ko: '화이트 로즈 만두는 호이안의 가장 상징적인 요리입니다. 이 정교한 만두는 새우와 다진 돼지고기를 넣은 반투명 쌀가루 껍질로 만들어집니다. 완벽하게 찐 다음 어장, 라임, 칠리로 만든 특별한 딥 소스와 함께 제공됩니다.',
            de: 'Weiße Rosenknödel sind Hoianans ikonischstes Gericht. Diese zarten Knödel werden aus durchscheinender Reismehlhülle mit Garnelen und Hackfleisch gefüllt. Sie werden perfekt gedämpft und mit einer speziellen Dippingsauce aus Fischsauce, Limette und Chili serviert.',
            vi: 'Bánh bao hồng là món ăn biểu tượng nhất của Hội An. Những cái bao này được làm từ bột gạo trong mờ chứa tôm và thịt băm. Chúng được hấp chín hoàn hảo và phục vụ với nước chấm đặc biệt làm từ nước mắm, chanh và ớt.'
          },
          images: [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1547592166-23ac550576e7?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'Cao Lau',
            zh: '高捞面',
            ja: 'カオラウ',
            ko: '카오 라우',
            de: 'Cao Lau',
            vi: 'Cao lầu'
          },
          description: {
            en: 'Traditional Hoi An noodle dish with pork and herbs',
            zh: '会安传统面食，配有猪肉和香草',
            ja: 'ホイアンの伝統的な麺料理、豚肉とハーブ付き',
            ko: '호이안 전통 국수 요리, 돼지고기와 허브 포함',
            de: 'Traditionelles Hoi An-Nudelgericht mit Schweinefleisch und Kräutern',
            vi: 'Món mì truyền thống Hội An với thịt lợn và thảo mộc'
          },
          details: {
            en: 'Cao Lau is a unique noodle dish that can only be found in Hoi An. The noodles are made with water from a local well, giving them a distinctive texture and flavor. They are served with slices of barbecued pork, fresh herbs, and a rich broth.',
            zh: '高捞面是会安独有的特色面食。面条使用当地井水制作，口感和风味独特。配有叉烧肉、新鲜香草和浓郁的汤头。',
            ja: 'カオラウはホイアンでしか見つけられないユニークな麺料理です。麺は地元の井戸の水で作られ、独特な食感と風味を持っています。バーベキュー豚肉のスライス、新鮮なハーブ、そして豊かなスープと一緒に提供されます。',
            ko: '카오 라우는 호이안에서만 찾을 수 있는 독특한 국수 요리입니다. 국수는 지역 우물물로 만들어져 독특한 식감과 맛을 가지고 있습니다. 바베큐 돼지고기 슬라이스, 신선한 허브, 그리고 풍부한 육수와 함께 제공됩니다.',
            de: 'Cao Lau ist ein einzigartiges Nudelgericht, das nur in Hoi An zu finden ist. Die Nudeln werden mit Wasser aus einem lokalen Brunnen hergestellt, was ihnen eine einzigartige Textur und einen einzigartigen Geschmack verleiht. Sie werden mit Scheiben von gegrilltem Schweinefleisch, frischen Kräutern und einem reichen Brühe serviert.',
            vi: 'Cao lầu là món mì độc đáo chỉ có tại Hội An. Mì được làm bằng nước từ giếng địa phương, mang lại kết cấu và hương vị đặc biệt. Chúng được phục vụ với thịt nướng, thảo mộc tươi và nước dùng rich.'
          },
          images: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1547592166-eac499469717?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'Wonton Soup',
            zh: '馄饨汤',
            ja: 'ワンタンスープ',
            ko: '완탄 수프',
            de: 'Wontonsuppe',
            vi: 'Súp hoành thánh'
          },
          description: {
            en: 'Delicious soup with pork and shrimp wontons',
            zh: '美味的猪肉虾馄饨汤',
            ja: '豚肉とエビのワンタン入り美味しいスープ',
            ko: '돼지고기와 새우 완탄이 들어간 맛있는 수프',
            de: 'Leckere Suppe mit Schweinefleisch- und Garnelenwontons',
            vi: 'Súp ngon với hoành thánh thịt lợn và tôm'
          },
          details: {
            en: 'Hoi An\'s wonton soup is famous for its light yet flavorful broth and plump wontons filled with a mixture of pork and shrimp. The soup is garnished with fresh cilantro and green onions, making it a comforting and satisfying dish.',
            zh: '会安的馄饨汤以清淡却浓郁的汤头和饱满的猪肉虾馅馄饨而闻名。汤上点缀着新鲜香菜和葱花，是一道温暖人心的美食。',
            ja: 'ホイアンのワンタンスープは、軽いが風味豊かな出汁と豚肉とエビの混合物を詰めたふっくらとしたワンタンで有名です。スープは新鮮なコリアンダーとネギで飾られ、心地よく満足のいく料理になっています。',
            ko: '호이안의 완탄 수프는 가벼우면서도 맛있는 육수와 돼지고기와 새우 혼합물을 넣은 통통한 완탄으로 유명합니다. 수프는 신선한 고수와 파로 장식되어 위안과 만족을 주는 요리입니다.',
            de: 'Hoianans Wontonsuppe ist berühmt für ihre leichte, aber aromatische Brühe und prall gefüllte Wontons mit Schweinefleisch-Garnelen-Mischung. Die Suppe wird mit frischem Koriander und Frühlingszwiebeln garniert und ist ein wohltuendes und befriedigendes Gericht.',
            vi: 'Súp hoành thánh Hội An nổi tiếng với nước dùng nhẹ nhàng nhưng đậm đà và hoành thánh đầy đặn chứa hỗn hợp thịt lợn và tôm. Súp được trang trí với ngò tươi và hành lá, tạo thành một món ăn ấm áp và hài lòng.'
          },
          images: [
            'https://images.unsplash.com/photo-1547592166-eac499469717?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop'
          ]
        }
      ]
    },
    {
      id: 'activities',
      title: {
        en: 'Activities',
        zh: '游乐项目',
        ja: 'アクティビティ',
        ko: '액티비티',
        de: 'Aktivitäten',
        vi: 'Hoạt động'
      },
      items: [
        {
          name: {
            en: 'Cooking Class',
            zh: '烹饪课程',
            ja: 'クッキングクラス',
            ko: '요리 클래스',
            de: 'Kochkurs',
            vi: 'Khóa học nấu ăn'
          },
          description: {
            en: 'Learn to cook traditional Vietnamese dishes',
            zh: '学习烹饪传统越南菜肴',
            ja: '伝統的なベトナム料理を調理する方法を学ぶ',
            ko: '전통 베트남 요리를 요리하는 방법 배우기',
            de: 'Lernen Sie traditionelle vietnamesische Gerichte zu kochen',
            vi: 'Học cách nấu các món ăn truyền thống Việt Nam'
          },
          details: {
            en: 'Join a cooking class and learn to prepare authentic Vietnamese dishes. You\'ll visit a local market to select fresh ingredients, then learn the techniques to create dishes like spring rolls, pho, and stir-fried vegetables. Classes are hands-on and fun for all skill levels.',
            zh: '参加烹饪课程，学习制作正宗越南菜肴。您将参观当地市场挑选新鲜食材，然后学习制作春卷、河粉和炒蔬菜等菜肴的技巧。课程注重实践，适合所有技能水平的人。',
            ja: 'クッキングクラスに参加して本格的なベトナム料理を作る方法を学びましょう。地元の市場に行って新鮮な食材を選び、春巻き、フォー、野菜炒めなどの料理を作る技術を学びます。クラスは実践的で、どのスキルレベルの方にも楽しめます。',
            ko: '요리 클래스에 참가하여 정통 베트남 요리를 만드는 방법을 배우세요. 현지 시장에 가서 신선한 재료를 선택하고, 스프링 롤, 포, 볶음 채소 등의 요리를 만드는 기술을 배웁니다. 수업은 실습 위주로 모든 기술 수준의 사람들에게 재미있습니다.',
            de: 'Nehmen Sie an einem Kochkurs teil und lernen Sie, authentische vietnamesische Gerichte zuzubereiten. Sie besuchen einen lokalen Markt, um frische Zutaten auszuwählen, und lernen dann die Techniken, um Gerichte wie Frühlingsrollen, Pho und gebratene Gemüse zuzubereiten. Die Kurse sind praktisch und Spaß für alle Erfahrungslevel.',
            vi: 'Tham gia khóa học nấu ăn và học cách chuẩn bị các món ăn Việt Nam đích thực. Bạn sẽ đến chợ địa phương để chọn nguyên liệu tươi, sau đó học kỹ thuật chế biến các món như nem rán, phở và rau xào. Các khóa học thực hành và thú vị cho mọi trình độ.'
          },
          images: [
            'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'Cycling Tour',
            zh: '自行车游览',
            ja: '自転車ツアー',
            ko: '자전거 투어',
            de: 'Fahrradtour',
            vi: 'Tour xe đạp'
          },
          description: {
            en: 'Explore Hoi An and surrounding villages by bike',
            zh: '骑自行车探索会安及周边村庄',
            ja: '自転車でホイアンと周辺の村を探検',
            ko: '자전거로 호이안과 주변 마을 탐험',
            de: 'Erkunden Sie Hoi An und die umliegenden Dörfer mit dem Fahrrad',
            vi: 'Khám phá Hội An và các làng xung quanh bằng xe đạp'
          },
          details: {
            en: 'Discover Hoi An and its countryside on a guided cycling tour. Ride through rice paddies, visit traditional villages, and stop at local craft workshops. The tour offers a unique perspective of the region\'s rural life and natural beauty.',
            zh: '参加有向导的自行车之旅，探索会安及其乡村。骑行穿过稻田，参观传统村庄，在当地手工艺作坊停留。这次旅行提供了独特的视角来了解该地区的乡村生活和自然美景。',
            ja: 'ガイド付き自転車ツアーでホイアンとその田園地帯を発見しましょう。田んぼを通り抜け、伝統的な村を訪れ、地元の工芸工房に立ち寄ります。ツアーは地域の田舎の生活と自然の美しさを独特な視点から提供します。',
            ko: '가이드가 동행하는 자전거 투어로 호이안과 그 교외를 발견하세요. 벼밭을 지나가며, 전통 마을을 방문하고, 현지 공예 공방에 들러보세요. 투어는 지역의 농촌 생활과 자연 아름다움에 대한 독특한 관점을 제공합니다.',
            de: 'Entdecken Sie Hoi An und seine Landschaft bei einer geführten Fahrradtour. Fahren Sie durch Reisfelder, besuchen Sie traditionelle Dörfer und halten Sie an lokalen Handwerkswerkstätten. Die Tour bietet eine einzigartige Perspektive auf das ländliche Leben und die natürliche Schönheit der Region.',
            vi: 'Khám phá Hội An và vùng nông thôn của nó trong chuyến du lịch xe đạp có hướng dẫn. Đi qua ruộng lúa, thăm các làng truyền thống và dừng lại tại các xưởng thủ công địa phương. Chuyến đi mang đến góc nhìn độc đáo về cuộc sống nông thôn và vẻ đẹp tự nhiên của khu vực.'
          },
          images: [
            'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'Lantern Making',
            zh: '灯笼制作',
            ja: '提灯作り',
            ko: '등불 만들기',
            de: 'Laternenherstellung',
            vi: 'Làm đèn lồng'
          },
          description: {
            en: 'Create your own traditional Vietnamese lantern',
            zh: '制作自己的传统越南灯笼',
            ja: '自分だけの伝統的なベトナム提灯を作る',
            ko: '직접 전통 베트남 등불 만들기',
            de: 'Machen Sie sich Ihre eigene traditionelle vietnamesische Laterne',
            vi: 'Tự làm đèn lồng truyền thống Việt Nam của riêng bạn'
          },
          details: {
            en: 'Learn the art of lantern making from local artisans. Choose from a variety of colors and materials to create a unique lantern that reflects your personal style. This hands-on workshop is a fun and creative activity for all ages.',
            zh: '向当地工匠学习灯笼制作艺术。从各种颜色和材料中选择，制作一个独特的灯笼，展现您的个人风格。这个实践工作坊适合所有年龄段的人，既有趣又富有创意。',
            ja: '地元の職人から提灯作りの技術を学びましょう。さまざまな色と素材から選んで、自分の個性を反映したユニークな提灯を作ります。このハンズオンワークショップは、どの年齢層にも楽しくクリエイティブなアクティビティです。',
            ko: '현지 장인으로부터 등불 만들기 기술을 배우세요. 다양한 색상과 재료 중에서 선택하여 자신의 개성을 반영하는 독특한 등불을 만드세요. 이 실습 워크숍은 모든 연령대에게 재미있고 창의적인 활동입니다.',
            de: 'Lernen Sie die Kunst der Laternenherstellung von lokalen Handwerkern. Wählen Sie aus einer Vielzahl von Farben und Materialien, um eine einzigartige Laterne zu erstellen, die Ihren persönlichen Stil widerspiegelt. Dieser praktische Workshop ist eine unterhaltsame und kreative Aktivität für alle Altersklassen.',
            vi: 'Học nghệ thuật làm đèn lồng từ các thợ thủ công địa phương. Chọn từ nhiều màu sắc và vật liệu để tạo ra một chiếc đèn lồng độc đáo phản ánh phong cách cá nhân của bạn. Buổi workshop thực hành này là một hoạt động thú vị và sáng tạo cho mọi lứa tuổi.'
          },
          images: [
            'https://images.unsplash.com/photo-1517400508447-f8dd518b68af?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1559599746-c0f31b8e2b6a?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop'
          ]
        }
      ]
    },
    {
      id: 'attractions',
      title: {
        en: 'Attractions',
        zh: '景点推荐',
        ja: '観光名所',
        ko: '명소 추천',
        de: 'Sehenswürdigkeiten',
        vi: 'Địa điểm tham quan'
      },
      items: [
        {
          name: {
            en: 'Hoi An Ancient Town',
            zh: '会安古城',
            ja: 'ホイアン旧市街',
            ko: '호이안 고대 도시',
            de: 'Hoi An Altstadt',
            vi: 'Thành cổ Hội An'
          },
          description: {
            en: 'UNESCO World Heritage Site with lantern-lit streets',
            zh: '联合国教科文组织世界遗产，灯笼点缀的街道',
            ja: 'ランタンが灯る街並みのユネスコ世界遺産',
            ko: '유네스코 세계문화유산으로 지정된 등불이 빛나는 거리',
            de: 'UNESCO-Weltkulturerbe mit laternenbeleuchteten Straßen',
            vi: 'Di sản thế giới UNESCO với những con đường rực rỡ đèn lồng'
          },
          details: {
            en: 'Hoi An Ancient Town is a well-preserved example of a Southeast Asian trading port dating from the 15th to the 19th century. Its buildings and street plan reflect the influences of indigenous and foreign cultures, particularly Chinese and Japanese. The town is famous for its colorful lanterns that light up the streets at night.',
            zh: '会安古城是一个保存完好的东南亚贸易港口范例，可追溯至15至19世纪。其建筑和街道规划反映了本土和外来文化的影响，特别是中国和日本文化。这座城市以夜晚点亮街道的彩色灯笼而闻名。',
            ja: 'ホイアン旧市街は、15世紀から19世紀にかけての東南アジアの貿易港としてよく保存された例です。建物や道路計画は、特に中国や日本の影響を反映しています。街は夜になるとランタンが灯ることで有名です。',
            ko: '호이안 고대 도시는 15세기부터 19세기까지 동남아시아 무역 항구로서 잘 보존된 예시입니다. 건축물과 거리 계획은 특히 중국과 일본의 영향을 반영하고 있습니다. 도시는 밤에 거리를 밝히는 화려한 등불로 유명합니다.',
            de: 'Die Hoi An Altstadt ist ein gut erhaltenes Beispiel für einen südostasiatischen Handelshafen aus dem 15. bis 19. Jahrhundert. Ihre Gebäude und Straßenplanung spiegeln den Einfluss einheimischer und ausländischer Kulturen wider, insbesondere chinesischer und japanischer. Die Stadt ist berühmt für ihre bunten Laternen, die nachts die Straßen erhellen.',
            vi: 'Thành cổ Hội An là một ví dụ được bảo tồn tốt của cảng thương mại Đông Nam Á từ thế kỷ 15 đến 19. Các tòa nhà và kế hoạch đường phố phản ánh ảnh hưởng của văn hóa bản địa và nước ngoài, đặc biệt là Trung Quốc và Nhật Bản. Thành phố nổi tiếng với những chiếc đèn lồng màu sắc rực rỡ chiếu sáng các con đường vào ban đêm.'
          },
          images: [
            'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1517400508447-f8dd518b68af?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1559599746-c0f31b8e2b6a?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'My Son Sanctuary',
            zh: '美山圣地',
            ja: 'ミーソン聖域',
            ko: '미손 성지',
            de: 'My Son Heiligtum',
            vi: 'Thánh địa Mỹ Sơn'
          },
          description: {
            en: 'Ancient Cham temples nestled in the jungle',
            zh: '隐藏在丛林中的古代占婆寺庙',
            ja: 'ジャングルに佇む古代チャム王国の寺院',
            ko: '정글에 자리 잡은 고대 참파 왕국 사원',
            de: 'Antike Cham-Tempel im Dschungel',
            vi: 'Các ngôi đền Chăm cổ đại nằm sâu trong rừng cây'
          },
          details: {
            en: 'My Son Sanctuary is a cluster of ancient temples built by the Champa civilization between the 4th and 14th centuries. These red brick structures are dedicated to the Hindu god Shiva and showcase impressive architectural styles. The site is surrounded by lush jungle, creating a mystical atmosphere.',
            zh: '美山圣地是占婆文明在4至14世纪建造的古代寺庙群。这些红砖建筑供奉印度教湿婆神，展示了令人印象深刻的建筑风格。该遗址被茂密的丛林环绕，营造出神秘的氛围。',
            ja: 'ミーソン聖域は、4世紀から14世紀にかけてチャム文明によって建てられた古代寺院群です。これらのレンガ造りの建造物はヒンドゥー教のシヴァ神に捧げられており、印象的な建築様式を見せてくれます。遺跡は豊かなジャングルに囲まれており、神秘的な雰囲気を醸し出しています。',
            ko: '미손 성지는 4세기부터 14세기까지 참파 문명이 건립한 고대 사원군입니다. 이 붉은 벽돌 건물들은 힌두교 시바 신을 위해 세워졌으며 인상적인 건축 양식을 보여줍니다. 유적지는 울창한 정글로 둘러싸여 신비로운 분위기를 자아냅니다.',
            de: 'Das My Son Heiligtum ist ein Komplex antiker Tempel, der von der Champa-Zivilisation zwischen dem 4. und 14. Jahrhundert erbaut wurde. Diese rotbackenen Strukturen sind dem Hindu-Gott Shiva geweiht und zeigen beeindruckende architektonische Stile. Die Anlage ist von üppigem Dschungel umgeben, was eine mystische Atmosphäre schafft.',
            vi: 'Thánh địa Mỹ Sơn là một cụm đền cổ được xây dựng bởi văn minh Chăm giữa thế kỷ 4 và 14. Những cấu trúc gạch đỏ này được xây dựng để thờ thần Hindu Shiva và trưng bày phong cách kiến trúc ấn tượng. Khu vực này được bao quanh bởi rừng cây rậm rạp, tạo nên một không khí huyền bí.'
          },
          images: [
            'https://images.unsplash.com/photo-1546436029-e357479f4697?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1503883234195-1f3b93ddfd08?w=600&h=400&fit=crop'
          ]
        },
        {
          name: {
            en: 'An Bang Beach',
            zh: '安邦海滩',
            ja: 'アンバンビーチ',
            ko: '안방 해수욕장',
            de: 'An Bang Strand',
            vi: 'Bãi An Bàng'
          },
          description: {
            en: 'Pristine beach with golden sand and clear water',
            zh: '拥有金色沙滩和清澈海水的原始海滩',
            ja: '黄金の砂と澄んだ水の手つかずのビーチ',
            ko: '황금빛 모래와 맑은 물이 있는 깨끗한 해수욕장',
            de: 'Unberührter Strand mit goldenem Sand und klarem Wasser',
            vi: 'Bãi biển hoang sơ với cát vàng và nước trong vắt'
          },
          details: {
            en: 'An Bang Beach is a beautiful stretch of golden sand located just north of Hoi An. This quiet beach offers calm waters perfect for swimming and a relaxed atmosphere away from the crowds. The beach is lined with coconut palms and seafood restaurants, making it a perfect spot for a day of relaxation.',
            zh: '安邦海滩位于会安以北，是一片美丽的金色沙滩。这片宁静的海滩提供平静的海水，非常适合游泳，远离人群，氛围轻松。海滩两旁种满椰子树和海鲜餐厅，是放松一天的完美场所。',
            ja: 'アンバンビーチはホイアンのすぐ北に位置する美しい黄金の砂浜です。この静かなビーチは泳ぐのに最適な穏やかな水を提供し、観光客から離れたリラックスした雰囲気を提供します。ビーチはココナッツの木とシーフードレストランで縁取られており、一日のリラクゼーションに最適な場所です。',
            ko: '안방 해수욕장은 호이안 북쪽에 위치한 아름다운 황금 모래 해변입니다. 이 조용한 해변은 수영하기에 완벽한 평온한 물을 제공하며, 사람들로부터 떨어진 편안한 분위기를 제공합니다. 해변은 코코넛 야자수와 해산물 식당으로 늘어서 있어 휴식의 하루에 완벽한 장소입니다.',
            de: 'Der An Bang Strand ist eine wunderschöne goldene Sandstrasse nördlich von Hoi An. Dieser ruhige Strand bietet ruhiges Wasser, perfekt zum Schwimmen, und eine entspannte Atmosphäre abseits der Massen. Der Strand ist mit Kokospalmen und Meeresfrüchtestellen gesäumt und bietet einen perfekten Ort für einen entspannten Tag.',
            vi: 'Bãi An Bàng là một đoạn bãi cát vàng đẹp nằm ngay phía Bắc Hội An. Bãi biển yên tĩnh này cung cấp nước yên bình hoàn hảo để bơi lội và không khí thư giãn xa khỏi đám đông. Bãi biển được lấp lánh với những cây dừa và nhà hàng hải sản, làm cho nó trở thành một địa điểm hoàn hảo cho một ngày thư giãn.'
          },
          images: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop'
          ]
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">{t('culture.title')}</h1>
        
        {categories.map((category) => (
          <section key={category.id} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-ocean">
              {category.title[language] || category.title.en}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="card overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="h-48 bg-gradient-to-br from-sand to-gray-200 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name.en}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.name[language] || item.name.en}</h3>
                    <p className="text-gray-600 text-sm">{item.description[language] || item.description.en}</p>
                    <p className="text-ocean mt-4 text-sm font-medium flex items-center gap-1">
                      {t('view.details')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem?.name[language] || selectedItem?.name.en}
        size="xl"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {selectedItem.images.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${selectedItem.name.en} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{t('description')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedItem.details[language] || selectedItem.details.en}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Culture;