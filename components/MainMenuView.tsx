'use client';

import { Locale, t } from '@/locales';

interface MainMenuViewProps {
  locale: Locale;
  onNavigate: (view: 'main' | 'saved' | 'manage' | 'direct') => void;
}

export default function MainMenuView({ locale, onNavigate }: MainMenuViewProps) {
  return (
    <div className="flex flex-col gap-6 px-4">
      {/* 常用地點 - 常用地點 */}
      <button
        onClick={() => onNavigate('saved')}
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        aria-label={t('menu.savedLocations', locale)}
      >
        {/* 箭頭形狀背景 */}
        <svg
          viewBox="0 0 400 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
            className={
              "fill-[#3F51B5] transition-all duration-200 group-hover:brightness-110 group-active:brightness-90"
            }
          />
        </svg>
        {/* 內容 - 使用 justify-start + pl-[25%] 精確對齊 */}
        <div className="absolute inset-0 flex items-center justify-start pl-[25%]">
          {/* 白色三角形箭頭 */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {/* 文字 */}
          <span className="text-4xl font-bold text-white tracking-wide ml-2">
            {t('menu.savedLocations', locale)}
          </span>
        </div>
      </button>

      {/* 新增地點 */}
      <button
        onClick={() => onNavigate('manage')}
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        aria-label={t('menu.manageLocations', locale)}
      >
        {/* 箭頭形狀背景 */}
        <svg
          viewBox="0 0 400 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
            className={
              "fill-[#4CAF50] transition-all duration-200 group-hover:brightness-110 group-active:brightness-90"
            }
          />
        </svg>
        {/* 內容 - 使用 justify-start + pl-[25%] 精確對齊 */}
        <div className="absolute inset-0 flex items-center justify-start pl-[25%]">
          {/* 白色圖標 */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 20v-6M6 20V10M18 20V4" />
          </svg>
          {/* 文字 */}
          <span className="text-4xl font-bold text-white tracking-wide ml-2">
            {t('menu.manageLocations', locale)}
          </span>
        </div>
      </button>

      {/* 輸入地址 */}
      <button
        onClick={() => onNavigate('direct')}
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        aria-label={t('menu.enterDestination', locale)}
      >
        {/* 箭頭形狀背景 */}
        <svg
          viewBox="0 0 400 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
            className={
              "fill-[#9C27B0] transition-all duration-200 group-hover:brightness-110 group-active:brightness-90"
            }
          />
        </svg>
        {/* 內容 - 使用 justify-start + pl-[25%] 精確對齊 */}
        <div className="absolute inset-0 flex items-center justify-start pl-[25%]">
          {/* 白色圖標 */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
          {/* 文字 */}
          <span className="text-4xl font-bold text-white tracking-wide ml-2">
            {t('menu.enterDestination', locale)}
          </span>
        </div>
      </button>
    </div>
  );
}
