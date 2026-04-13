'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'about' | 'privacy' | 'terms' | 'contact';
  locale: Locale;
}

const COMPANY_NAME = 'Zendo Holdings Limited';
const EMAIL = 'zendo19b@gmail.com';

export default function LegalInfoModal({ isOpen, onClose, type, locale }: LegalInfoModalProps) {
  const [activeTab, setActiveTab] = useState(type);

  // 當 type 改變時，同步更新 activeTab
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'about', label: t('settings.about', locale) },
    { id: 'privacy', label: t('settings.privacy', locale) },
    { id: 'terms', label: t('settings.terms', locale) },
    { id: 'contact', label: t('settings.contact', locale) },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{t('legal.aboutTitle', locale)}</h3>
            <p className="text-gray-700 leading-relaxed">
              {locale === 'en' 
                ? 'Go Home is a minimalist navigation app developed by Zendo Holdings Limited, committed to providing simple, reliable navigation for all users, especially seniors.'
                : 'Go Home 是由 Zendo Holdings Limited 開發的極簡導航應用，致力於為所有用戶（特別是長者）提供簡單、可靠的導航體驗。'}
            </p>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} {COMPANY_NAME}. {t('legal.copyright', locale)}.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{t('legal.privacyTitle', locale)}</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">{locale === 'en' ? 'Data Storage' : '數據存儲'}</h4>
                <p className="text-sm text-gray-700">
                  {locale === 'en' ? (
                    <>
                      All data (home address, settings) is stored{' '}
                      <span className="font-semibold">locally on your device</span>. We do not collect or upload any personal information.
                    </>
                  ) : (
                    <>
                      所有數據（家地址、設置）均存儲在{' '}
                      <span className="font-semibold">您設備本地</span>。我們不收集或上傳任何個人信息。
                    </>
                  )}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{locale === 'en' ? 'Third-Party Services' : '第三方服務'}</h4>
                <p className="text-sm text-gray-700">
                  {locale === 'en' 
                    ? 'This app uses Google Maps API for navigation. Location data is temporarily sent to Google for route calculation.'
                    : '本應用使用 Google Maps API 進行導航。位置數據會暫時傳輸給 Google 以計算路線。'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{t('legal.termsTitle', locale)}</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">{locale === 'en' ? 'Disclaimer' : '免責聲明'}</h4>
                <p className="text-sm text-gray-700">
                  {locale === 'en' ? (
                    <>
                      Navigation information is for{' '}
                      <span className="font-semibold">reference only</span>. Users should judge route safety themselves.{' '}
                      <span className="font-semibold">{COMPANY_NAME}</span> is not liable for any accidents or losses.
                    </>
                  ) : (
                    <>
                      導航信息僅供{' '}
                      <span className="font-semibold">參考</span>。用戶應自行判斷路線安全性。{' '}
                      <span className="font-semibold">{COMPANY_NAME}</span> 不對任何事故或損失負責。
                    </>
                  )}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{locale === 'en' ? 'Intellectual Property' : '知識產權'}</h4>
                <p className="text-sm text-gray-700">
                  {locale === 'en' ? (
                    <>
                      All app content (icons, design, code) is owned by{' '}
                      <span className="font-semibold">{COMPANY_NAME}</span> and protected by copyright laws.
                    </>
                  ) : (
                    <>
                      本應用所有內容（圖標、設計、代碼）均歸{' '}
                      <span className="font-semibold">{COMPANY_NAME}</span> 所有，受版權法保護。
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">{t('legal.contactTitle', locale)}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{locale === 'en' ? 'Contact' : '聯繫我們'}</h4>
                  <p className="text-sm text-gray-600 mb-1">{locale === 'en' ? 'For any inquiries:' : '如有任何問題：'}</p>
                  <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline font-medium">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                <strong>{COMPANY_NAME}</strong><br />
                {locale === 'en' ? 'Hong Kong' : '香港'}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
