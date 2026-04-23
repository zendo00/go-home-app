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
            onClose={onClose}
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 w-[90%] max-w-[480px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderView()}
      </div>
    </div>
  );
}
