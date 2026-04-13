'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (address: string) => void;
  title?: string;
  placeholder?: string;
  showPreview?: boolean;
  isGoButton?: boolean;
  locale?: Locale;
}

export default function AddressModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder,
  showPreview = true,
  isGoButton = false,
  locale = 'zh-HK',
}: AddressModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // 每次開啟時，如果是設置家地址，預填已保存的地址；Go 按鈕不預填
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      if (isGoButton) {
        // Go 按鈕：清空輸入框，不預填家地址
        setInputValue('');
      } else {
        const saved = localStorage.getItem('homeAddress') ?? localStorage.getItem('home_address') ?? '';
        setInputValue(saved);
      }
      setIsSaved(false);
    }
  }, [isOpen, isGoButton]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // 只有當標題不包含「目的地」且不是 Go 按鈕時（即設置家地址），才保存到 localStorage
    if (typeof window !== 'undefined' && !title?.includes('目的地') && !isGoButton) {
      localStorage.setItem('homeAddress', trimmed);
      localStorage.setItem('home_address', trimmed);
    }
    // Go 按鈕和目的地：不保存，只用於當次導航

    // Go 按鈕：直接觸發 onConfirm，不顯示成功狀態
    if (isGoButton) {
      onConfirm(trimmed);
      onClose();
    } else {
      // 設置家地址：短暫顯示成功狀態，再觸發父元件的 onConfirm
      setIsSaved(true);
      setTimeout(() => {
        onConfirm(trimmed);
        setIsSaved(false);
      }, 600);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[90%] max-w-[420px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Body */}
        <div className="bg-gray-50 mx-5 rounded-lg p-5">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none text-sm text-gray-900 placeholder:text-gray-400 bg-white"
            autoFocus
          />

          {/* 預覽 - 只在非 Go 按鈕時顯示 */}
          {showPreview && inputValue.trim() && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{t('modal.preview', locale)}</span>
              {inputValue.trim()}
            </p>
          )}

          {/* 按鈕 */}
          <button
            onClick={handleSave}
            disabled={!inputValue.trim()}
            className={`mt-4 w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isSaved
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isGoButton ? (
              t('modal.go', locale)
            ) : isSaved ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t('modal.saveSuccess', locale)}
              </>
            ) : (
              title?.includes(t('modal.destination', locale)) ? t('modal.go', locale) : t('modal.saveAddress', locale)
            )}
          </button>
        </div>

        {/* Footer padding */}
        <div className="h-5" />
      </div>
    </div>
  );
}
