'use client';

import { Locale, t } from '@/locales';

interface MainMenuViewProps {
  locale: Locale;
  onNavigate: (view: 'main' | 'saved' | 'manage' | 'direct') => void;
  onClose: () => void;
}

export default function MainMenuView({ locale, onNavigate, onClose }: MainMenuViewProps) {
  const options = [
    { view: 'saved' as const, icon: '📍', color: 'bg-blue-600' },
    { view: 'manage' as const, icon: '➕', color: 'bg-green-600' },
    { view: 'direct' as const, icon: '✏️', color: 'bg-orange-500' },
  ];

  const getLabel = (view: string) => {
    if (view === 'saved') return t('menu.savedLocations', locale);
    if (view === 'manage') return t('menu.manageLocations', locale);
    return t('menu.enterDestination', locale);
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-2xl">
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
            <span className="text-5xl">{opt.icon}</span>
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
    </div>
  );
}
