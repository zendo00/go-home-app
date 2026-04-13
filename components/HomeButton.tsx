'use client';

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AddressModal from './AddressModal';
import HomeOptionsModal from './HomeOptionsModal';
import { Locale, t } from '@/locales';

interface HomeButtonProps {
  locale: Locale;
}

export default function HomeButton({ locale }: HomeButtonProps) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [homeAddress, setHomeAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('home_address');
      setHomeAddress(saved);
    }
  }, []);

  const navigateHome = (mode: string) => {
    if (!homeAddress) {
      setShowAddressModal(true);
      return;
    }
    
    let travelMode = 'driving';
    if (mode === 'transit') travelMode = 'transit';
    if (mode === 'walking') travelMode = 'walking';

    const encodedDestination = encodeURIComponent(homeAddress);
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}&travelmode=${travelMode}`;
    
    window.location.href = url;
  };

  const handleAddressConfirm = (address: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('home_address', address);
      setHomeAddress(address);
    }
    setShowAddressModal(false);
  };

  const handleOptionsConfirm = (mode: string) => {
    navigateHome(mode);
  };

  return (
    <>
      <button
        className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
        onClick={() => setShowOptionsModal(true)}
        aria-label="HOME"
      >
        <svg
          viewBox="0 0 400 180"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
            className={cn(
              "fill-[#4CAF50]",
              "transition-all duration-200",
              "group-hover:brightness-110",
              "group-active:brightness-90"
            )}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-start pl-[15%]">
          {/* 白色房屋圖標 - 縮細 */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
            className="mr-2"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          {/* HOME 文字 - 縮細 */}
          <span className="text-4xl font-bold text-white tracking-wide">
            HOME
          </span>
        </div>
      </button>

      <HomeOptionsModal
        isOpen={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        onConfirm={handleOptionsConfirm}
        locale={locale}
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onConfirm={handleAddressConfirm}
        title={t('modal.setHome', locale)}
        placeholder={locale === 'en' ? 'e.g., 12th Floor, ICC, Central' : locale === 'zh-CN' ? '例如：中环国际金融中心' : '例如：中環國際金融中心'}
      />
    </>
  );
}
