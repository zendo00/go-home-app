'use client';

import { useState } from 'react';

interface BottomNavProps {
  currentPath?: string;
  onNavigate?: (view: 'home' | 'settings') => void;
}

// 內部元件：只負責渲染，不訂閱路由
function BottomNavContent({ path, onNavigate }: { path: string; onNavigate?: (view: 'home' | 'settings') => void }) {
  const isHomeActive = path === '/' || path === 'home';
  const isSettingsActive = path === '/settings' || path === 'settings';

  const handleNavigate = (target: 'home' | 'settings') => {
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="flex justify-around items-center py-3 px-2 w-full">
      <button onClick={() => handleNavigate('home')} className="flex flex-col items-center cursor-pointer" type="button">
        {/* 現代化 Home 圖標 - Apple SF Symbols 風格 */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={isHomeActive ? "mb-1 text-black" : "mb-1 text-gray-400"}>
          <path d="M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363Z"/>
        </svg>
        <span className={isHomeActive ? "text-[15px] font-medium text-black" : "text-[15px] font-medium text-gray-400"}>Home</span>
      </button>
      <button onClick={() => handleNavigate('settings')} className="flex flex-col items-center cursor-pointer" type="button">
        {/* 現代化 Settings 圖標 - 標準 Apple SF Symbols 齒輪 */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={isSettingsActive ? "mb-1 text-black" : "mb-1 text-gray-400"}>
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.19-.15.28-.41.21-.64l-1.92-3.32c-.14-.26-.41-.35-.68-.26l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.05-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.25-.09-.52 0-.68.26L2.74 8.87c-.14.23-.08.49.13.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.19.15-.27.41-.13.64l1.92 3.32c.14.26.41.35.68.26l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.25.09.52 0 .68-.26l1.92-3.32c.14-.23.07-.49-.13-.64l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
        <span className={isSettingsActive ? "text-[15px] font-medium text-black" : "text-[15px] font-medium text-gray-400"}>Settings</span>
      </button>
    </div>
  );
}

export default function BottomNav({ currentPath, onNavigate }: BottomNavProps) {
  // 如果傳入 currentPath，直接使用；否則才使用 usePathname（減少訂閱）
  if (currentPath) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <BottomNavContent path={currentPath} onNavigate={onNavigate} />
      </div>
    );
  }

  // 只有在沒有傳入 currentPath 時才使用 window.location（後備方案）
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <BottomNavContent path={pathname} />
    </div>
  );
}
