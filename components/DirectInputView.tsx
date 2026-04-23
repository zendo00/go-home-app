'use client';

import { useState } from 'react';
import { Locale, t } from '@/locales';

interface DirectInputViewProps {
  locale: Locale;
  onSubmit: (address: string) => void;
  onBack: () => void;
}

export default function DirectInputView({ locale, onSubmit, onBack }: DirectInputViewProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    const trimmedAddress = address.trim();
    if (!trimmedAddress) return;
    onSubmit(trimmedAddress);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors mb-4 py-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xl font-bold">{t('common.back', locale)}</span>
      </button>

      {/* Input Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-5">
          {t('menu.enterDestination', locale)}
        </h3>

        {/* Address Input */}
        <div className="mb-6">
          <label className="block text-base font-bold text-gray-900 mb-2">
            {t('menu.locationAddress', locale)}
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('menu.locationAddressPlaceholder', locale)}
            className="w-full p-5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-900 placeholder:text-gray-400 resize-none"
            rows={4}
            autoFocus
          />
        </div>

        {/* GO Button */}
        <button
          onClick={handleSubmit}
          disabled={!address.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-2xl py-5 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
          {t('modal.go', locale)}
        </button>
      </div>

      {/* Hint */}
      <p className="text-sm text-gray-500 text-center">
        {locale === 'zh-HK' || locale === 'zh-CN' 
          ? '輸入地址後點擊出發，將直接開啟 Google 地圖導航' 
          : 'Enter address and click Go to open Google Maps navigation'}
      </p>
    </div>
  );
}
