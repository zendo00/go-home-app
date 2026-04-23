'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils";
import GoMenuModal from './GoMenuModal';
import { Locale, t } from '@/locales';

interface GoButtonProps {
  locale: Locale;
}

export default function GoButton({ locale }: GoButtonProps) {
  const [showMenuModal, setShowMenuModal] = useState(false);

  return (
    <>
      <button
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        onClick={() => setShowMenuModal(true)}
        aria-label="GO"
      >
        {/* 箭頭形狀背景 - 調整為視覺平衡的對稱設計 */}
        <svg
          viewBox="0 0 400 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
            className={cn(
              "fill-[#3F51B5]",
              "transition-all duration-200",
              "group-hover:brightness-110",
              "group-active:brightness-90"
            )}
          />
        </svg>
        {/* 內容 - 使用 justify-start + pl-[25%] 精確對齊到箭頭視覺中心 */}
        <div className="absolute inset-0 flex items-center justify-start pl-[25%]">
          {/* 白色三角形箭頭 - 縮細 */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {/* GO 文字 - 縮細 */}
          <span className="text-4xl font-bold text-white tracking-wide ml-2">
            GO
          </span>
        </div>
      </button>

      {/* Go 按鈕使用主選單模態框 */}
      <GoMenuModal
        isOpen={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        locale={locale}
      />
    </>
  );
}
