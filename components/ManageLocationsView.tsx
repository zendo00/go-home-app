'use client';

import { useState, useEffect } from 'react';
import { Locale, t } from '@/locales';
import { IconArrowUp, IconArrowDown, IconEdit, IconDelete, IconPin, IconPlus } from './ui/Icons';

interface Location {
  id: string;
  label: string;
  address: string;
}

interface ManageLocationsViewProps {
  locale: Locale;
  onBack: () => void;
}

// Accent color palette for left bars (Tailwind classes)
const ACCENT_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
];

// Helper function to get accent color class based on index
const getAccentColor = (index: number): string => {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
};

export default function ManageLocationsView({ locale, onBack }: ManageLocationsViewProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state for add/edit
  const [formLabel, setFormLabel] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleAddSubmit = () => {
    const trimmedLabel = formLabel.trim();
    const trimmedAddress = formAddress.trim();
    
    if (!trimmedLabel || !trimmedAddress) {
      setFormError('請填寫所有欄位');
      return;
    }
    
    const newLocation: Location = {
      id: generateId(),
      label: trimmedLabel,
      address: trimmedAddress,
    };
    const newLocations = [newLocation, ...locations];
    saveLocations(newLocations);
    
    // Reset form
    setFormLabel('');
    setFormAddress('');
    setFormError(null);
    setShowAddForm(false);
  };

  const handleEditSubmit = () => {
    const trimmedLabel = formLabel.trim();
    const trimmedAddress = formAddress.trim();
    
    if (!trimmedLabel || !trimmedAddress) {
      setFormError('請填寫所有欄位');
      return;
    }
    
    if (editingId) {
      const newLocations = locations.map((loc) =>
        loc.id === editingId ? { ...loc, label: trimmedLabel, address: trimmedAddress } : loc
      );
      saveLocations(newLocations);
      setEditingId(null);
      setFormLabel('');
      setFormAddress('');
      setFormError(null);
    }
  };
  
  const startEdit = (location: Location) => {
    setEditingId(location.id);
    setFormLabel(location.label);
    setFormAddress(location.address);
    setFormError(null);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('確定要刪除此地點嗎？');
    if (!confirmDelete) return;
    
    const newLocations = locations.filter((loc) => loc.id !== id);
    saveLocations(newLocations);
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
    setFormLabel('');
    setFormAddress('');
    setFormError(null);
    setEditingId(null);
    setShowAddForm(true);
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setFormLabel('');
    setFormAddress('');
    setFormError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormLabel('');
    setFormAddress('');
    setFormError(null);
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

      {/* Add Form (Fixed at top, not in scroll area) */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200 sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">新增地點</h3>
          
          <div className="mb-4">
            <label className="block text-base font-bold text-gray-900 mb-2">地點名稱</label>
            <input
              type="text"
              value={formLabel}
              onChange={(e) => setFormLabel(e.target.value)}
              placeholder="例如：家、辦公室"
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base font-bold text-gray-900 mb-2">地址</label>
            <textarea
              value={formAddress}
              onChange={(e) => setFormAddress(e.target.value)}
              placeholder="輸入完整地址"
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 resize-none"
              rows={3}
            />
          </div>

          {formError && (
            <p className="text-red-600 text-sm mb-3">{formError}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
            >
              保存
            </button>
            <button
              onClick={cancelAdd}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Edit Form (Fixed at top, not in scroll area) */}
      {editingId !== null && (
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200 sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">編輯地點</h3>
          
          <div className="mb-4">
            <label className="block text-base font-bold text-gray-900 mb-2">地點名稱</label>
            <input
              type="text"
              value={formLabel}
              onChange={(e) => setFormLabel(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base font-bold text-gray-900 mb-2">地址</label>
            <textarea
              value={formAddress}
              onChange={(e) => setFormAddress(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 resize-none"
              rows={3}
            />
          </div>

          {formError && (
            <p className="text-red-600 text-sm mb-3">{formError}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleEditSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
            >
              保存變更
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* Add New Button (only when not showing form) */}
      {!showAddForm && editingId === null && (
        <button
          onClick={startAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-sm font-bold py-4 px-6 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <IconPlus className="w-6 h-6" />
          新增地點
        </button>
      )}

      {/* Scrollable Cards Container */}
      <div className="max-h-[60vh] overflow-y-auto space-y-3">
        {locations.length === 0 && !showAddForm && editingId === null ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-900">
            <IconPin className="w-16 h-16 text-gray-400 mb-4 opacity-50" />
            <p className="text-lg">暫無保存的地點</p>
            <p className="text-sm mt-2 text-gray-500">點擊上方按鈕新增地點</p>
          </div>
        ) : (
          locations.map((location, index) => {
            const accentColor = getAccentColor(index);
            return (
              <div
                key={location.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4">
                  {/* Left Accent Bar */}
                  <div className={`flex-shrink-0 w-2 h-full ${accentColor} rounded-l-xl`} />

                  {/* Left Side: Up/Down Arrows */}
                  <div className="flex-shrink-0 flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      aria-label="上移"
                    >
                      <IconArrowUp className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === locations.length - 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      aria-label="下移"
                    >
                      <IconArrowDown className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <IconPin className="w-6 h-6 text-gray-400" />
                  </div>

                  {/* Center: Name + Address */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {location.label}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {location.address}
                    </p>
                  </div>

                  {/* Right Side: Edit/Delete Buttons */}
                  <div className="flex-shrink-0 flex gap-1">
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
    </div>
  );
}
