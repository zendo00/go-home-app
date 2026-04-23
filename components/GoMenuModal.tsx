'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import MainMenuView from './MainMenuView';
import SavedLocationsView from './SavedLocationsView';
import ManageLocationsView from './ManageLocationsView';
import DirectInputView from './DirectInputView';

interface GoMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

type MenuView = 'main' | 'saved' | 'manage' | 'direct';

export default function GoMenuModal({ isOpen, onClose, locale }: GoMenuModalProps) {
  const [currentView, setCurrentView] = useState<MenuView>('main');

  // Reset view when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('main');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLocationSelect = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  };

  const handleDirectInput = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  };

  const renderView = () => {
    switch (currentView) {
      case 'main':
        return (
          <MainMenuView
            locale={locale}
            onNavigate={setCurrentView}
          />
        );
      case 'saved':
        return (
          <SavedLocationsView
            locale={locale}
            onLocationSelect={handleLocationSelect}
            onBack={() => setCurrentView('main')}
            onManage={() => setCurrentView('manage')}
          />
        );
      case 'manage':
        return (
          <ManageLocationsView
            locale={locale}
            onBack={() => setCurrentView('main')}
          />
        );
      case 'direct':
        return (
          <DirectInputView
            locale={locale}
            onSubmit={handleDirectInput}
            onBack={() => setCurrentView('main')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-2xl w-[95%] max-w-[500px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            {currentView === 'main' && t('menu.goMenu', locale)}
            {currentView === 'saved' && t('menu.savedLocations', locale)}
            {currentView === 'manage' && t('menu.manageLocations', locale)}
            {currentView === 'direct' && t('menu.enterDestination', locale)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="關閉"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
