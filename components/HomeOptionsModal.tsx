'use client';

import { Locale, t } from '@/locales';

interface HomeOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mode: string) => void;
  locale: Locale;
}

export default function HomeOptionsModal({ isOpen, onClose, onConfirm, locale }: HomeOptionsModalProps) {
  if (!isOpen) return null;

  const options = [
    { mode: 'driving', label: t('home.driving', locale), color: 'bg-blue-600' },
    { mode: 'transit', label: t('home.transit', locale), color: 'bg-green-600' },
    { mode: 'walking', label: t('home.walking', locale), color: 'bg-orange-500' },
  ];

  const getIcon = (mode: string) => {
    if (mode === 'driving') {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      );
    }
    if (mode === 'transit') {
      return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
          <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 20c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V8h5v2zm5.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-7h-5V8h5v2z"/>
        </svg>
      );
    }
    return (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
      </svg>
    );
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
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('home.homeTitle', locale)}
        </h2>

        <div className="flex flex-col gap-5">
          {options.map((opt) => (
            <button
              key={opt.mode}
              className={`w-full h-28 ${opt.color} hover:brightness-110 active:brightness-90 text-white rounded-2xl flex items-center justify-center gap-5 transition-all active:scale-[0.98]`}
              onClick={() => onConfirm(opt.mode)}
            >
              {getIcon(opt.mode)}
              <span className="text-4xl font-bold">{opt.label}</span>
            </button>
          ))}
        </div>

        <button
          className="w-full h-16 mt-6 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 text-3xl font-bold rounded-2xl transition-colors"
          onClick={onClose}
        >
          {t('home.cancel', locale)}
        </button>
      </div>
    </div>
  );
}
