'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GoButton from '@/components/GoButton';
import HomeButton from '@/components/HomeButton';
import BottomNav from '@/components/BottomNav';
import InstallPrompt from '@/components/InstallPrompt';
import LegalInfoModal from '@/components/LegalInfoModal';
import { Locale, languages, t } from '@/locales';

// ==================== Settings 視圖組件 ====================
function SettingsView({ onNavigate }: { onNavigate: (view: 'home' | 'settings') => void }) {
  const [homeAddress, setHomeAddress] = useState<string>('');
  const [fontSize, setFontSize] = useState<Locale>('medium');
  const [locale, setLocale] = useState<Locale>('zh-HK');
  const [isSaved, setIsSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalTab, setLegalTab] = useState<'about' | 'privacy' | 'terms' | 'contact'>('about');

  useEffect(() => {
    setIsClient(true);
    const savedAddress = localStorage.getItem('homeAddress') ?? '';
    const savedFontSize = (localStorage.getItem('fontSize') as Locale) ?? 'medium';
    const savedLocale = (localStorage.getItem('locale') as Locale) ?? 'zh-HK';
    
    setHomeAddress(savedAddress);
    setFontSize(savedFontSize);
    setLocale(savedLocale);
  }, []);

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHomeAddress(e.target.value);
  };

  const handleSaveAddress = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('homeAddress', homeAddress);
      localStorage.setItem('home_address', homeAddress);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1000);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Locale;
    setFontSize(value);
    localStorage.setItem('fontSize', value);
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Locale;
    setLocale(value);
    localStorage.setItem('locale', value);
  };

  const openLegalInfo = (tab: 'about' | 'privacy' | 'terms' | 'contact') => {
    setLegalTab(tab);
    setShowLegalModal(true);
  };

  // 字體大小對應的 Tailwind 類
  // small=標準 (text-base), medium=大 (text-lg), large=超大 (text-xl)
  const fontSizeClass = fontSize === 'large' ? 'text-xl' : fontSize === 'medium' ? 'text-lg' : 'text-base';

  return (
    <div className={`min-h-screen bg-white flex flex-col font-sans ${fontSizeClass}`}>
      <Header />

      <main className="flex-1 flex flex-col px-4 py-6 gap-6 pb-28">
        {/* Home Address Section */}
        <section className="bg-gray-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-3">{t('settings.homeAddress', locale)}</h2>
          <textarea
            value={homeAddress}
            onChange={handleAddressChange}
            placeholder={t('settings.homeAddressPlaceholder', locale)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none text-gray-900"
          />
          {isClient && homeAddress && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{t('settings.preview', locale)}</span> {homeAddress}
            </p>
          )}
          
          <button
            onClick={handleSaveAddress}
            className={`mt-4 w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isSaved 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSaved ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {t('settings.saveSuccess', locale)}
              </>
            ) : (
              t('settings.saveAddress', locale)
            )}
          </button>
        </section>

        {/* Display Section */}
        <section className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">{t('settings.display', locale)}</h2>
          
          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('settings.fontSize', locale)}</label>
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">{t('settings.fontSize.small', locale)}</option>
              <option value="medium">{t('settings.fontSize.medium', locale)}</option>
              <option value="large">{t('settings.fontSize.large', locale)}</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-2">語言 (Language)</label>
            <select
              value={locale}
              onChange={handleLocaleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Company & Legal Section */}
        <section className="bg-gray-50 rounded-lg p-4 pb-6">
          <h2 className="text-lg font-semibold mb-3">{t('settings.companyLegal', locale)}</h2>
          
          <div className="space-y-2">
            <button
              onClick={() => openLegalInfo('about')}
              className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between border border-gray-200"
            >
              <span className="text-gray-700">{t('settings.about', locale)}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            <button
              onClick={() => openLegalInfo('privacy')}
              className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between border border-gray-200"
            >
              <span className="text-gray-700">{t('settings.privacy', locale)}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            <button
              onClick={() => openLegalInfo('terms')}
              className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between border border-gray-200"
            >
              <span className="text-gray-700">{t('settings.terms', locale)}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            <button
              onClick={() => openLegalInfo('contact')}
              className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between border border-gray-200"
            >
              <span className="text-gray-700">{t('settings.contact', locale)}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </section>
      </main>

      <LegalInfoModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        type={legalTab}
        locale={locale}
      />

      <BottomNav currentPath="settings" onNavigate={onNavigate} />
    </div>
  );
}

// ==================== Home 視圖組件 ====================
function HomeView({ onNavigate }: { onNavigate: (view: 'home' | 'settings') => void }) {
  const [locale, setLocale] = useState<Locale>('zh-HK');

  useEffect(() => {
    const savedLocale = (localStorage.getItem('locale') as Locale) ?? 'zh-HK';
    setLocale(savedLocale);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-24 gap-8">
        <GoButton locale={locale} />
        <HomeButton locale={locale} />
      </main>

      <BottomNav currentPath="home" onNavigate={onNavigate} />
    </div>
  );
}

// ==================== 主頁面組件 ====================
export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'settings'>('home');

  const handleNavigate = (view: 'home' | 'settings') => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === 'home' ? (
        <HomeView onNavigate={handleNavigate} />
      ) : (
        <SettingsView onNavigate={handleNavigate} />
      )}
      <InstallPrompt />
    </>
  );
}
