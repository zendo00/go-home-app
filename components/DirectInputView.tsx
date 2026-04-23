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
        className="w-full flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-4 py-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xl font-bold">{t('common.back', locale)}</span>
      </button>

      {/* Input Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-5">
          {t('menu.enterDestination', locale)}
        </h3>

        {/* Address Input */}
        <div className="mb-6">
          <label className="block text-base font-bold text-white/90 mb-2">
            {t('menu.locationAddress', locale)}
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t('menu.locationAddressPlaceholder', locale)}
            className="w-full p-5 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-white placeholder:text-white/40 resize-none"
            rows={4}
            autoFocus
          />
        </div>

        {/* GO Button */}
        <button
          onClick={handleSubmit}
          disabled={!address.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold text-2xl py-5 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
          {t('modal.go', locale)}
        </button>
      </div>

      {/* Hint */}
      <p className="text-sm text-white/50 text-center">
        {locale === 'zh-HK' || locale === 'zh-CN' 
          ? '輸入地址後點擊出發，將直接開啟 Google 地圖導航' 
          : 'Enter address and click Go to open Google Maps navigation'}
      </p>
    </div>
  );
}
