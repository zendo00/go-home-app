'use client';

import { Locale, t } from '@/locales';

interface MainMenuViewProps {
  locale: Locale;
  onNavigate: (view: 'main' | 'saved' | 'manage' | 'direct') => void;
}

export default function MainMenuView({ locale, onNavigate }: MainMenuViewProps) {
  const menuItems = [
    {
      id: 'saved' as const,
      label: t('menu.savedLocations', locale),
      color: '#3F51B5',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" className="mr-2">
          <path d="M8 5v14l11-7z" />
        </svg>
      ),
    },
    {
      id: 'manage' as const,
      label: t('menu.manageLocations', locale),
      color: '#4CAF50',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" className="mr-2">
          <path d="M12 20v-6M6 20V10M18 20V4" />
        </svg>
      ),
    },
    {
      id: 'direct' as const,
      label: t('menu.enterDestination', locale),
      color: '#9C27B0',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" className="mr-2">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="relative w-[90%] max-w-[400px] h-[140px] group focus:outline-none mx-auto"
          aria-label={item.label}
        >
          <svg
            viewBox="0 0 400 180"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 50 0 L 300 0 L 370 90 L 300 180 L 50 180 Q 20 180 20 150 L 20 30 Q 20 0 50 0 Z"
              className={`fill-[${item.color}] transition-all duration-200 group-hover:brightness-110 group-active:brightness-90`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-start pl-[25%]">
            {item.icon}
            <span className="text-4xl font-bold text-white tracking-wide">
              {item.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
