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
}

export default function SavedLocationsList({ locale, onLocationSelect }: SavedLocationsListProps) {
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
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
