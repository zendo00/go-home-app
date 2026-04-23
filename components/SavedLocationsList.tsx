'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface SavedLocationsListProps {
  locale: Locale;
  onLocationSelect: (address: string) => void;
  onBack: () => void;
}

export default function SavedLocationsList({ locale, onLocationSelect, onBack }: SavedLocationsListProps) {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedLocations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Location[];
          setLocations(parsed);
        } catch (e) {
          console.error('Failed to parse saved locations:', e);
          setLocations([]);
        }
      } else {
        setLocations([]);
      }
    }
  };

  const handleLocationClick = (location: Location) => {
    onLocationSelect(location.address);
  };

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 opacity-50">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="text-lg">{t('menu.noSavedLocations', locale)}</p>
        <p className="text-sm mt-2 opacity-75">{t('menu.goManageToAdd', locale)}</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
          style={{ minHeight: '50px' }}
        >
          {t('common.back', locale)}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 返回按鈕 */}
      <button
        onClick={onBack}
        className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        style={{ minHeight: '40px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-lg font-medium">{t('common.back', locale)}</span>
      </button>
      {locations.map((location) => (
        <button
          key={location.id}
          onClick={() => handleLocationClick(location)}
          className="w-full text-left bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg p-5 transition-all duration-200 group"
          style={{ minHeight: '60px' }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {location.label}
              </h3>
              <p className="text-base text-gray-700 line-clamp-2">
                {location.address}
              </p>
            </div>
            <div className="flex-shrink-0 self-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
