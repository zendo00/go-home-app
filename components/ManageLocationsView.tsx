'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale, t } from '@/locales';
import LocationFormView from './LocationFormView';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface ManageLocationsViewProps {
  locale: Locale;
  onBack: () => void;
}

export default function ManageLocationsView({ locale, onBack }: ManageLocationsViewProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItemRef = useRef<HTMLDivElement[]>([]);

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

  // Drag and drop handling
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    const rect = dragItemRef.current[index]?.getBoundingClientRect();
    if (rect) {
      const spacer = document.createElement('div');
      spacer.style.width = `${rect.width}px`;
      spacer.style.height = `${rect.height}px`;
      spacer.style.position = 'absolute';
      spacer.style.visibility = 'hidden';
      document.body.appendChild(spacer);
      e.dataTransfer.setDragImage(spacer, 0, 0);
      setTimeout(() => document.body.removeChild(spacer), 0);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newLocations = [...locations];
    const [draggedItem] = newLocations.splice(draggedIndex, 1);
    newLocations.splice(dropIndex, 0, draggedItem);
    saveLocations(newLocations);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-full flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors mb-2 py-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xl font-bold">{t('common.back', locale)}</span>
      </button>

      {/* Add Form */}
      {editingId === null && (
        <LocationFormView
          locale={locale}
          onSubmit={handleAdd}
          onCancel={() => {}}
          isAddMode={true}
        />
      )}

      {/* Edit Form */}
      {editingId !== null && (
        <LocationFormView
          locale={locale}
          onSubmit={(label, address) => handleUpdate(editingId, label, address)}
          onCancel={handleCancelEdit}
          editingLocation={locations.find((l) => l.id === editingId)}
          isEditMode={true}
        />
      )}

      {/* Separator */}
      {editingId === null && locations.length > 0 && (
        <div className="border-t border-gray-200 my-4" />
      )}

      {/* Locations List */}
      <div className="space-y-3">
        {locations.length === 0 && editingId === null ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-900">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="1.5" className="mb-4 opacity-50">
              <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
            <p className="text-lg">{t('menu.noLocationsToManage', locale)}</p>
          </div>
        ) : (
          locations.map((location, index) => (
          <div
            key={location.id}
            ref={(el) => {
              dragItemRef.current[index] = el!;
            }}
            draggable={editingId === null}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`bg-gray-50 border rounded-xl p-4 transition-all duration-200 ${
              draggedIndex === index
                ? 'opacity-50 border-dashed border-blue-400'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Confirm Delete State */}
            {showConfirmDelete === location.id ? (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-red-600 font-bold mb-3">
                    {t('menu.confirmDelete', locale)}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-bold transition-colors"
                    >
                      {t('common.delete', locale)}
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl py-3 font-bold transition-colors"
                    >
                      {t('common.cancel', locale)}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                {/* Drag Handle */}
                {editingId === null && (
                  <div className="flex-shrink-0 mt-2 cursor-grab active:cursor-grabbing text-gray-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="8" cy="6" r="2" />
                      <circle cx="16" cy="6" r="2" />
                      <circle cx="8" cy="12" r="2" />
                      <circle cx="16" cy="12" r="2" />
                      <circle cx="8" cy="18" r="2" />
                      <circle cx="16" cy="18" r="2" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {location.label}
                  </h4>
                  <p className="text-base text-gray-600 line-clamp-2">
                    {location.address}
                  </p>
                </div>

                {/* Action Buttons */}
                {editingId === null && (
                  <div className="flex-shrink-0 flex gap-2">
                      <button
                        onClick={() => handleEditClick(location)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                        aria-label="編輯"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowConfirmDelete(location.id)}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                        aria-label="刪除"
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
        )))}
      </div>

      {/* Drag Hint */}
      {editingId === null && locations.length > 1 && (
        <p className="text-sm text-gray-500 text-center mt-4">
          {t('menu.dragToReorder', locale)}
        </p>
      )}
    </div>
  );
}
