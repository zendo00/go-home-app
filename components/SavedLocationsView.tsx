'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import { IconPin } from './ui/Icons';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface SavedLocationsViewProps {
  locale: Locale;
  onLocationSelect: (address: string) => void;
  onBack: () => void;
  onManage: () => void;
}

// Accent color palette for left bars (Tailwind classes - same as ManageLocationsView)
const ACCENT_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
];

// Helper function to get accent color class based on index
const getAccentColor = (index: number): string => {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
};

export default function SavedLocationsView({ locale, onLocationSelect, onBack, onManage }: SavedLocationsViewProps) {
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
    // Navigate to Google Maps in driving mode
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-900">
        <IconPin className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
        <p className="text-lg mb-2">{t('menu.noSavedLocations', locale)}</p>
        <p className="text-sm text-gray-500 mb-6">{t('menu.goManageToAdd', locale)}</p>
        <button
          onClick={onManage}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xl transition-all duration-200 active:scale-95 shadow-lg"
        >
          {t('menu.manageLocations', locale)}
        </button>
        <button
          onClick={onBack}
          className="mt-4 px-8 py-4 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-900 font-bold text-xl transition-all duration-200 active:scale-95"
        >
          {t('common.back', locale)}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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

      {/* Scrollable Locations List */}
      <div className="max-h-[60vh] overflow-y-auto space-y-3">
        {locations.map((location, index) => {
          const accentColor = getAccentColor(index);
          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-3 p-4">
                {/* Left Accent Bar */}
                <div className={`flex-shrink-0 w-2 h-full ${accentColor} rounded-l-xl`} />

                {/* Icon */}
                <div className="flex-shrink-0">
                  <IconPin className="w-6 h-6 text-gray-400" />
                </div>

                {/* Center: Name + Address */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {location.label}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {location.address}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Manage Button */}
      <button
        onClick={onManage}
        className="w-full mt-4 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl text-white font-bold text-xl transition-all duration-200 active:scale-95 shadow-lg"
      >
        {t('menu.manageLocations', locale)}
      </button>
    </div>
  );
}
