'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import { IconPin } from './ui/Icons';

interface Location {
  id: string;
  label: string;
  address: string;
  colorIndex?: number;
}

interface SavedLocationsViewProps {
  locale: Locale;
  onLocationSelect: (address: string) => void;
  onBack: () => void;
  onManage: () => void;
}

// Accent color palette for top borders (Hex codes for inline styles)
const ACCENT_COLORS = [
  '#2563EB', // Blue
  '#16A34A', // Green
  '#EA580C', // Orange
  '#7C3AED', // Purple
  '#DC2626', // Red
  '#0891B2', // Cyan
  '#059669', // Emerald
  '#D97706', // Amber
];

// Helper function to get accent color hex code based on index
const getAccentColor = (index: number): string => {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
};

// Deterministic hash function to generate color index from location ID
const hashToColorIndex = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % ACCENT_COLORS.length;
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
          let parsed = JSON.parse(saved) as Location[];
          // Backward compatibility: assign colorIndex to locations that don't have it
          const needsUpdate = parsed.some(loc => loc.colorIndex === undefined);
          if (needsUpdate) {
            parsed = parsed.map(loc => {
              if (loc.colorIndex === undefined) {
                return { ...loc, colorIndex: hashToColorIndex(loc.id) };
              }
              return loc;
            });
            localStorage.setItem('savedLocations', JSON.stringify(parsed));
          }
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
        {locations.map((location) => {
          const colorIndex = location.colorIndex ?? hashToColorIndex(location.id);
          const accentColor = getAccentColor(colorIndex);
          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-3 hover:opacity-90 transition-opacity"
              style={{ borderTop: `4px solid ${accentColor}` }}
            >
              <div className="p-4 flex items-center">
                {/* Icon immediately before name */}
                <IconPin className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" />

                {/* Name + Address */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-bold text-gray-900 truncate">
                    {location.label}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
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
