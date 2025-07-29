import PlayableAd from '@/components/PlayableAd';

interface AdData {
  id: number;
  title: string;
  description: string;
  adPath: string;
}

async function getAdsData(): Promise<AdData[]> {
  try {
    // 在服务器端直接读取文件，而不是通过 fetch
    const adsData = require('../../../public/data/ads.json');
    return adsData;
  } catch (error) {
    // 如果 require 失败，尝试 fetch 方法
    try {
      const adsResponse = await fetch('/data/ads.json', {
        cache: 'no-store',
      });
      
      if (!adsResponse.ok) {
        throw new Error('Failed to fetch ads data');
      }
      
      return adsResponse.json();
    } catch (fetchError) {
      console.error('Error loading ads data:', fetchError);
      // 返回默认数据作为备用
      return [
        {
          id: 1,
          title: "示例游戏",
          description: "这是一个示例游戏广告",
          adPath: "/ads/sample/index.html"
        }
      ];
    }
  }
}

export default async function Home() {
  const ads = await getAdsData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🎮 Playable 试玩广告展示</h1>
          <p className="mt-2 text-gray-600">体验最新的游戏试玩广告，随时随地畅享游戏乐趣</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad: AdData) => (
            <PlayableAd
              key={ad.id}
              title={ad.title}
              description={ad.description}
              adPath={ad.adPath}
            />
          ))}
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Playable 试玩广告展示平台. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
