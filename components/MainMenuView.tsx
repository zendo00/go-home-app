'use client';

import { Locale, t } from '@/locales';

interface MainMenuViewProps {
  locale: Locale;
  onNavigate: (view: 'main' | 'saved' | 'manage' | 'direct') => void;
  onClose: () => void;
}

export default function MainMenuView({ locale, onNavigate, onClose }: MainMenuViewProps) {
  const options = [
    { view: 'saved' as const, color: 'bg-blue-600' },
    { view: 'manage' as const, color: 'bg-green-600' },
    { view: 'direct' as const, color: 'bg-orange-500' },
  ];

  const getIcon = (view: string) => {
    if (view === 'saved') {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      );
    }
    if (view === 'manage') {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      );
    }
    return (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    );
  };

  const getLabel = (view: string) => {
    if (view === 'saved') return t('menu.savedLocations', locale);
    if (view === 'manage') return t('menu.manageLocations', locale);
    return t('menu.enterDestination', locale);
  };

  return (
    <>
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        出發
      </h2>

      <div className="flex flex-col gap-5">
        {options.map((opt) => (
          <button
            key={opt.view}
            className={`w-full h-28 ${opt.color} hover:brightness-110 active:brightness-90 text-white rounded-2xl flex items-center justify-center gap-5 transition-all active:scale-[0.98]`}
            onClick={() => onNavigate(opt.view)}
          >
            {getIcon(opt.view)}
            <span className="text-4xl font-bold">{getLabel(opt.view)}</span>
          </button>
        ))}
      </div>

      <button
        className="w-full h-16 mt-6 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 text-3xl font-bold rounded-2xl transition-colors"
        onClick={onClose}
      >
        取消
      </button>
    </>
  );
}
