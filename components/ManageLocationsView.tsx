'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import { IconArrowUp, IconArrowDown, IconEdit, IconDelete, IconPin, IconPlus } from './ui/Icons';
import AddLocationModal from './AddLocationModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Location {
  id: string;
  label: string;
  address: string;
  colorIndex?: number;
}

interface ManageLocationsViewProps {
  locale: Locale;
  onBack: () => void;
}

// Accent color palette for top borders (Hex codes for inline styles)
const ACCENT_COLORS = [
  '#2563EB', // Blue
  '#16A34A', // Green
  '#EA580C', // Orange
  '#7C3AED', // Purple
  '#DC2626', // Red
  '#0891B2', // Cyan
  '#059669', // Emerald
  '#D97706', // Amber
];

// Helper function to get accent color hex code based on index
const getAccentColor = (index: number): string => {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
};



export default function ManageLocationsView({ locale, onBack }: ManageLocationsViewProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLocationData, setEditLocationData] = useState<Location | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('savedLocations');
      if (saved) {
        try {
          let parsed = JSON.parse(saved) as Location[];
          // Backward compatibility: assign RANDOM colorIndex to locations that don't have it
          const needsUpdate = parsed.some(loc => loc.colorIndex === undefined);
          if (needsUpdate) {
            parsed = parsed.map(loc => {
              if (loc.colorIndex === undefined) {
                return { ...loc, colorIndex: Math.floor(Math.random() * ACCENT_COLORS.length) };
              }
              return loc;
            });
            localStorage.setItem('savedLocations', JSON.stringify(parsed));
          }
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

  const handleAddSubmit = (label: string, address: string) => {
    const newLocation: Location = {
      id: generateId(),
      label: label,
      address: address,
      colorIndex: Math.floor(Math.random() * ACCENT_COLORS.length),
    };
    const newLocations = [newLocation, ...locations];
    saveLocations(newLocations);
    
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (label: string, address: string) => {
    if (editLocationData) {
      const newLocations = locations.map((loc) =>
        loc.id === editLocationData.id ? { ...loc, label, address } : loc
      );
      saveLocations(newLocations);
      setIsEditModalOpen(false);
      setEditLocationData(null);
    }
  };
  
  const startEdit = (location: Location) => {
    setEditLocationData(location);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setLocationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (locationToDelete) {
      const newLocations = locations.filter((loc) => loc.id !== locationToDelete);
      saveLocations(newLocations);
    }
    setIsDeleteModalOpen(false);
    setLocationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setLocationToDelete(null);
  };

  // Move up function - swap with previous element
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLocations = [...locations];
    [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
    saveLocations(newLocations);
  };

  // Move down function - swap with next element
  const moveDown = (index: number) => {
    if (index === locations.length - 1) return;
    const newLocations = [...locations];
    [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
    saveLocations(newLocations);
  };

  const startAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditLocationData(null);
  };

  const handleBack = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditLocationData(null);
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

      {/* Add New Button */}
      <button
        onClick={startAdd}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-sm font-bold py-4 px-6 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <IconPlus className="w-6 h-6" />
        新增地點
      </button>

      {/* Scrollable Cards Container */}
      <div className="max-h-[60vh] overflow-y-auto space-y-3">
        {locations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-900">
            <IconPin className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
            <p className="text-lg">暫無保存的地點</p>
            <p className="text-sm mt-2 text-gray-500">點擊上方按鈕新增地點</p>
          </div>
        ) : (
          locations.map((location, index) => {
            const colorIndex = location.colorIndex!;
            const accentColor = getAccentColor(colorIndex);
            return (
              <div
                key={location.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-3"
                style={{ borderTop: `4px solid ${accentColor}` }}
              >
                <div className="p-4 flex items-center justify-between">
                  {/* Left: Arrows + Icon + Name + Address */}
                  <div className="flex items-center flex-1">
                    {/* Up/Down Arrows on far left */}
                    <div className="flex-shrink-0 flex flex-col gap-1 mr-2">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        aria-label="上移"
                      >
                        <IconArrowUp className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === locations.length - 1}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        aria-label="下移"
                      >
                        <IconArrowDown className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Name + Address */}
                    <div className="min-w-0 flex-1">
                      {/* Name: Own Line */}
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {location.label}
                      </h4>
                      {/* Address Line: Icon + Text */}
                      <div className="flex items-center">
                        <IconPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-500 truncate">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Edit/Delete Buttons */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => startEdit(location)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="編輯"
                    >
                      <IconEdit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="刪除"
                    >
                      <IconDelete className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Add Location Modal */}
      <AddLocationModal
        isOpen={isAddModalOpen}
        onClose={handleAddCancel}
        onSave={handleAddSubmit}
      />

      {/* Edit Location Modal */}
      <AddLocationModal
        isOpen={isEditModalOpen}
        onClose={handleEditCancel}
        onSave={handleEditSubmit}
        editingId={editLocationData?.id || null}
        initialLabel={editLocationData?.label}
        initialAddress={editLocationData?.address}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        locationLabel={locationToDelete ? locations.find(loc => loc.id === locationToDelete)?.label : undefined}
      />
    </div>
  );
}
