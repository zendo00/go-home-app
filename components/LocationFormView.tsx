'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface LocationFormViewProps {
  locale: Locale;
  onSubmit: (label: string, address: string) => void;
  onCancel: () => void;
  editingLocation?: Location;
  isAddMode?: boolean;
  isEditMode?: boolean;
}

export default function LocationFormView({
  locale,
  onSubmit,
  onCancel,
  editingLocation,
  isAddMode = false,
  isEditMode = false,
}: LocationFormViewProps) {
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
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-5">
        {isEditMode ? t('menu.editLocations', locale) : t('menu.addNewLocation', locale)}
      </h3>

      {/* Label Input */}
      <div className="mb-4">
        <label className="block text-base font-bold text-gray-900 mb-2">
          {t('menu.locationName', locale)}
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={t('menu.locationNamePlaceholder', locale)}
          className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Address Input */}
      <div className="mb-4">
        <label className="block text-base font-bold text-gray-900 mb-2">
          {t('menu.locationAddress', locale)}
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t('menu.locationAddressPlaceholder', locale)}
          className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 placeholder:text-gray-400 resize-none"
          rows={3}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!label.trim() || !address.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
        >
          {buttonLabel}
        </button>
        {isEditMode && (
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
          >
            {t('common.cancel', locale)}
          </button>
        )}
      </div>
    </div>
  );
}
