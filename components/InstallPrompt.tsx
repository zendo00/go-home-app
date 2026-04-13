'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'android' | 'ios' | 'other'>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 檢測是否已經安裝（PWA 模式）
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setShowPrompt(false);
      return;
    }

    // 檢測設備平台
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      setPlatform('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform('ios');
    }

    // 檢測是否應該顯示提示（僅在首次訪問且未安裝時）
    const hasSeenPrompt = localStorage.getItem('hasSeenInstallPrompt');
    if (!hasSeenPrompt) {
      // 延遲 3 秒後顯示，避免干擾用戶
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 監聽 PWA 安裝事件 (Android/Chrome)
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // 如果用戶沒看到提示，現在顯示
      if (!showPrompt) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [showPrompt]);

  const handleInstall = async () => {
    if (platform === 'android' && deferredPrompt) {
      // Android: 觸發系統安裝對話框
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('hasSeenInstallPrompt', 'true');
        setShowPrompt(false);
      }
      
      setDeferredPrompt(null);
    } else if (platform === 'ios') {
      // iOS: 用戶需要手動操作，提示後隱藏
      localStorage.setItem('hasSeenInstallPrompt', 'true');
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenInstallPrompt', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-[9999] animate-slide-up">
      <div className="max-w-md mx-auto">
        {platform === 'android' ? (
          // Android 提示
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">安裝 Go Home</h3>
                <p className="text-sm text-gray-600">將應用添加到主屏幕，快速訪問</p>
              </div>
            </div>
            <button
              onClick={handleInstall}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
            >
              安裝
            </button>
          </div>
        ) : (
          // iOS 提示
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">安裝 Go Home</h3>
                <p className="text-sm text-gray-600">點擊分享按鈕 → 添加到主屏幕</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                <path d="M16 17l-4-4V7h4V5h-4V3l-2-2-2 2v2H4v2h4v6l-4 4v2h4v2l2 2 2-2v-2h4v-2h-4v-2z"/>
              </svg>
              <span>點擊底部分享圖標，選擇「添加到主屏幕」</span>
            </div>
          </div>
        )}
        
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
