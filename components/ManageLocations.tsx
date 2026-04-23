'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale, t } from '@/locales';
import LocationForm from './LocationForm';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface ManageLocationsProps {
  locale: Locale;
  onBack: () => void;
}

export default function ManageLocations({ locale, onBack }: ManageLocationsProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedLocations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Location[];
          setLocations(parsed);
        } catch (e) {
          console.error('Failed to parse saved locations:', e);
          setLocations([]);
        }
      } else {
        setLocations([]);
      }
    }
  };

  const saveLocations = (newLocations: Location[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedLocations', JSON.stringify(newLocations));
      setLocations(newLocations);
    }
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAdd = (label: string, address: string) => {
    const newLocation: Location = {
      id: generateId(),
      label,
      address,
    };
    const newLocations = [...locations, newLocation];
    saveLocations(newLocations);
  };

  const handleUpdate = (id: string, label: string, address: string) => {
    const newLocations = locations.map((loc) =>
      loc.id === id ? { ...loc, label, address } : loc
    );
    saveLocations(newLocations);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const newLocations = locations.filter((loc) => loc.id !== id);
    saveLocations(newLocations);
    setShowConfirmDelete(null);
  };



  const handleEditClick = (location: Location) => {
    setEditingId(location.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleBack = () => {
    setEditingId(null);
    loadLocations();
    onBack();
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLocations = [...locations];
    [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
    saveLocations(newLocations);
  };

  const moveDown = (index: number) => {
    if (index === locations.length - 1) return;
    const newLocations = [...locations];
    [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
    saveLocations(newLocations);
  };

  if (locations.length === 0 && editingId === null) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 opacity-50">
          <path d="M12 20v-6M6 20V10M18 20V4" />
        </svg>
        <p className="text-lg">{t('menu.noLocationsToManage', locale)}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
          style={{ minHeight: '50px' }}
        >
          {t('common.back', locale)}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 返回按鈕 */}
      <button
        onClick={handleBack}
        className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-2"
        style={{ minHeight: '40px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-lg font-medium">{t('common.back', locale)}</span>
      </button>

      {/* 新增表單 */}
      {editingId === null && (
        <LocationForm
          locale={locale}
          onSubmit={handleAdd}
          onCancel={() => {}}
          isAddMode={true}
        />
      )}

      {/* 編輯表單 */}
      {editingId !== null && (
        <LocationForm
          locale={locale}
          onSubmit={(label, address) => handleUpdate(editingId, label, address)}
          onCancel={handleCancelEdit}
          editingLocation={locations.find((l) => l.id === editingId)}
          isEditMode={true}
        />
      )}

      {/* 分隔線 */}
      {editingId === null && locations.length > 0 && (
        <div className="border-t border-gray-200 my-4" />
      )}

      {/* 地址列表 */}
      <div className="space-y-3">
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg p-4 transition-all duration-200"
            style={{ minHeight: '80px' }}
          >
            {/* 確認刪除狀態 */}
            {showConfirmDelete === location.id ? (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-red-600 font-medium mb-2">
                    {t('menu.confirmDelete', locale)}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-3 font-medium transition-colors"
                      style={{ minHeight: '50px' }}
                    >
                      {t('common.delete', locale)}
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg py-3 font-medium transition-colors"
                      style={{ minHeight: '50px' }}
                    >
                      {t('common.cancel', locale)}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Up/Down Arrows (left side) */}
                {editingId === null && (
                  <div className="flex-shrink-0 flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      aria-label="上移"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === locations.length - 1}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      aria-label="下移"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {location.label}
                  </h4>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {location.address}
                  </p>
                </div>

                {/* Edit/Delete Buttons (right side) */}
                {editingId === null && (
                  <div className="flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => handleEditClick(location)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      aria-label="編輯"
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(location.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      aria-label="刪除"
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
