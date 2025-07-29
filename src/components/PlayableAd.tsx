"use client"

import { useState } from 'react';

interface PlayableAdProps {
  title: string;
  description: string;
  adPath: string;
}

export default function PlayableAd({ title, description, adPath }: PlayableAdProps) {
  const [iframeError, setIframeError] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const getFullUrl = (path: string) => {
    // 如果是相对路径，确保它以 / 开头
    if (path.startsWith('/')) {
      // 在生产环境中，使用完整的 URL
      if (typeof window !== 'undefined' && window.location.origin) {
        return `${window.location.origin}${path}`;
      }
      return path;
    }
    return `/${path}`;
  };

  const fullUrl = getFullUrl(adPath);

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="w-full h-96 border rounded overflow-hidden bg-gray-100 relative">
        {iframeError ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <div>
              <div className="text-2xl mb-2">🎮</div>
              <div className="text-gray-600 font-medium">游戏加载失败</div>
              <div className="text-sm text-gray-500 mt-1">请检查网络连接或稍后重试</div>
              <div className="text-xs text-gray-400 mt-2">路径: {fullUrl}</div>
            </div>
          </div>
        ) : (
          <>
            <iframe
              src={fullUrl}
              className="w-full h-full"
              title={title}
              frameBorder="0"
              allow="autoplay; fullscreen; gamepad"
              onError={handleIframeError}
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                调试: {fullUrl}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}