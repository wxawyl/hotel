import React from 'react';
import { useTranslation } from 'react-i18next';

const Culture = () => {
  const { t } = useTranslation();

  const attractions = [
    {
      name: {
        en: 'Hoi An Ancient Town',
        zh: '会安古城',
        ja: 'ホイアン旧市街',
        ko: '호이안 고대 도시',
        de: 'Hoi An Altstadt'
      },
      description: {
        en: 'UNESCO World Heritage Site with lantern-lit streets',
        zh: '联合国教科文组织世界遗产，灯笼点缀的街道',
        ja: 'ランタンが灯る街並みのユネスコ世界遺産',
        ko: '유네스코 세계문화유산으로 지정된 등불이 빛나는 거리',
        de: 'UNESCO-Weltkulturerbe mit laternenbeleuchteten Straßen'
      }
    },
    {
      name: {
        en: 'My Son Sanctuary',
        zh: '美山圣地',
        ja: 'ミーソン聖域',
        ko: '미손 성지',
        de: 'My Son Heiligtum'
      },
      description: {
        en: 'Ancient Cham temples nestled in the jungle',
        zh: '隐藏在丛林中的古代占婆寺庙',
        ja: 'ジャングルに佇む古代チャム王国の寺院',
        ko: '정글에 자리 잡은 고대 참파 왕국 사원',
        de: 'Antike Cham-Tempel im Dschungel'
      }
    },
    {
      name: {
        en: 'An Bang Beach',
        zh: '安邦海滩',
        ja: 'アンバンビーチ',
        ko: '안방 해수욕장',
        de: 'An Bang Strand'
      },
      description: {
        en: 'Pristine beach with golden sand and clear water',
        zh: '拥有金色沙滩和清澈海水的原始海滩',
        ja: '黄金の砂と澄んだ水の手つかずのビーチ',
        ko: '황금빛 모래와 맑은 물이 있는 깨끗한 해수욕장',
        de: 'Unberührter Strand mit goldenem Sand und klarem Wasser'
      }
    },
    {
      name: {
        en: 'Marble Mountains',
        zh: '五行山',
        ja: 'マーブルマウンテン',
        ko: '오행산',
        de: 'Marmorberge'
      },
      description: {
        en: 'Limestone caves and panoramic views',
        zh: '石灰岩洞穴和全景视野',
        ja: '石灰岩の洞窟とパノラマビュー',
        ko: '석회암 동굴과 파노라마 전경',
        de: 'Kalksteinhöhlen und Panoramablicke'
      }
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">{t('culture.title')}</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div key={index} className="card">
              <div className="h-48 bg-gradient-to-br from-sand to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{attraction.name.en}</h3>
                <p className="text-gray-600">{attraction.description.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Culture;
