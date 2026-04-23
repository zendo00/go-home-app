'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface LocationFormProps {
  locale: Locale;
  onSubmit: (label: string, address: string) => void;
  onCancel: () => void;
  editingLocation?: Location;
  isAddMode?: boolean;
  isEditMode?: boolean;
}

export default function LocationForm({
  locale,
  onSubmit,
  onCancel,
  editingLocation,
  isAddMode = false,
  isEditMode = false,
}: LocationFormProps) {
  const [label, setLabel] = useState(editingLocation?.label || '');
  const [address, setAddress] = useState(editingLocation?.address || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingLocation) {
      setLabel(editingLocation.label);
      setAddress(editingLocation.address);
    }
  }, [editingLocation]);

  const handleSubmit = () => {
    const trimmedLabel = label.trim();
    const trimmedAddress = address.trim();

    if (!trimmedLabel || !trimmedAddress) {
      setError(t('menu.fillAllFields', locale));
      return;
    }

    onSubmit(trimmedLabel, trimmedAddress);
    if (!isEditMode) {
      setLabel('');
      setAddress('');
    }
    setError(null);
  };

  const buttonLabel = isEditMode
    ? t('menu.saveChanges', locale)
    : t('menu.addLocation', locale);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isEditMode ? t('menu.editLocation', locale) : t('menu.addNewLocation', locale)}
      </h3>

      {/* 名稱輸入 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('menu.locationName', locale)}
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={t('menu.locationNamePlaceholder', locale)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          style={{ minHeight: '50px' }}
        />
      </div>

      {/* 地址輸入 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('menu.locationAddress', locale)}
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t('menu.locationAddressPlaceholder', locale)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-none"
          rows={3}
        />
      </div>

      {/* 錯誤提示 */}
      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}

      {/* 按鈕 */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          style={{ minHeight: '54px' }}
        >
          {buttonLabel}
        </button>
        {isEditMode && (
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
            style={{ minHeight: '54px' }}
          >
            {t('common.cancel', locale)}
          </button>
        )}
      </div>
    </div>
  );
}
