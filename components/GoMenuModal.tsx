'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import SavedLocationsList from './SavedLocationsList';
import ManageLocations from './ManageLocations';
import LocationForm from './LocationForm';

interface GoMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

type MenuView = 'saved' | 'manage' | 'enter';

export default function GoMenuModal({ isOpen, onClose, locale }: GoMenuModalProps) {
  const [currentView, setCurrentView] = useState<MenuView>('saved');

  // 重置視圖當模態框打開/關閉
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('saved');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLocationSelect = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  };

  const handleEnterDestination = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[95%] max-w-[500px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {currentView === 'saved' && t('menu.savedLocations', locale)}
            {currentView === 'manage' && t('menu.manageLocations', locale)}
            {currentView === 'enter' && t('menu.enterDestination', locale)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="關閉"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {currentView === 'saved' && (
            <SavedLocationsList
              locale={locale}
              onLocationSelect={handleLocationSelect}
            />
          )}
          {currentView === 'manage' && (
            <ManageLocations
              locale={locale}
              onBack={() => setCurrentView('saved')}
            />
          )}
          {currentView === 'enter' && (
            <LocationForm
              locale={locale}
              onSubmit={handleEnterDestination}
              onCancel={() => setCurrentView('saved')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
