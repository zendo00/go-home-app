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

type MenuView = 'menu' | 'saved' | 'manage' | 'enter';

export default function GoMenuModal({ isOpen, onClose, locale }: GoMenuModalProps) {
  const [currentView, setCurrentView] = useState<MenuView>('menu');

  // 重置視圖當模態框打開/關閉
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('menu');
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
            {currentView === 'menu' && '選擇模式'}
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
          {/* Main Menu */}
          {currentView === 'menu' && (
            <div className="flex flex-col gap-6">
              <button
                onClick={() => setCurrentView('saved')}
                className="w-full h-[120px] bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold rounded-lg shadow-lg transition-colors"
              >
                {t('menu.savedLocations', locale)}
              </button>
              <button
                onClick={() => setCurrentView('manage')}
                className="w-full h-[120px] bg-green-600 hover:bg-green-500 text-white text-2xl font-bold rounded-lg shadow-lg transition-colors"
              >
                {t('menu.manageLocations', locale)}
              </button>
              <button
                onClick={() => setCurrentView('enter')}
                className="w-full h-[120px] bg-purple-600 hover:bg-purple-500 text-white text-2xl font-bold rounded-lg shadow-lg transition-colors"
              >
                {t('menu.enterDestination', locale)}
              </button>
            </div>
          )}
          
          {/* Saved Locations View */}
          {currentView === 'saved' && (
            <SavedLocationsList
              locale={locale}
              onLocationSelect={handleLocationSelect}
              onBack={() => setCurrentView('menu')}
            />
          )}
          
          {/* Manage Locations View */}
          {currentView === 'manage' && (
            <ManageLocations
              locale={locale}
              onBack={() => setCurrentView('menu')}
            />
          )}
          
          {/* Enter Destination View */}
          {currentView === 'enter' && (
            <LocationForm
              locale={locale}
              onSubmit={handleEnterDestination}
              onCancel={() => setCurrentView('menu')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
