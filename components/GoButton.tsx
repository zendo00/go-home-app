'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AddressModal from './AddressModal';
import { Locale, t } from '@/locales';

interface GoButtonProps {
  locale: Locale;
}

export default function GoButton({ locale }: GoButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = (address: string) => {
    setShowModal(false);
    const encodedAddress = encodeURIComponent(address);
    // 直接導航到目的地，不保存地址，不顯示 Toast
    window.location.href = `geo:0,0?q=${encodedAddress}`;
  };

  return (
    <>
      <button
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        onClick={() => setShowModal(true)}
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
        {/* 內容 - 使用 justify-center + pl-[15%] 向左移動，對齊到箭頭視覺中心 */}
        <div className="absolute inset-0 flex items-center justify-center pl-[15%]">
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

      {/* Go 按鈕使用獨立的 Modal，標題為「請輸入目的地」，無預覽 */}
      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title={t('modal.destination', locale)}
        showPreview={false}
        isGoButton={true}
      />
    </>
  );
}
