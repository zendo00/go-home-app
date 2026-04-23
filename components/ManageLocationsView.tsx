'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale, t } from '@/locales';

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showMenuForId, setShowMenuForId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItemRef = useRef<HTMLDivElement[]>([]);
  
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
    setShowMenuForId(null);
  };

  const handleDelete = (id: string) => {
    const newLocations = locations.filter((loc) => loc.id !== id);
    saveLocations(newLocations);
    setShowMenuForId(null);
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

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLocations = [...locations];
    [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
    saveLocations(newLocations);
    setShowMenuForId(null);
  };

  const moveDown = (index: number) => {
    if (index === locations.length - 1) return;
    const newLocations = [...locations];
    [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
    saveLocations(newLocations);
    setShowMenuForId(null);
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
    setShowMenuForId(null);
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

      {/* Add Form (Expandable) */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
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

      {/* Edit Form (Expandable) */}
      {editingId !== null && (
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md font-bold py-4 px-6 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
          新增地點
        </button>
      )}

      {/* Stacked Cards List */}
      <div className="space-y-3">
        {locations.length === 0 && !showAddForm && editingId === null ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-900">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="1.5" className="mb-4 opacity-50">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="text-lg">暫無保存的地點</p>
            <p className="text-sm mt-2 opacity-75">點擊上方按鈕新增地點</p>
          </div>
        ) : (
          locations.map((location, index) => (
          <div
            key={location.id}
            ref={(el) => {
              dragItemRef.current[index] = el!;
            }}
            draggable={editingId === null && showMenuForId === null}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`bg-white rounded-2xl shadow-md p-5 border border-gray-100 transition-all duration-200 ${
              draggedIndex === index
                ? 'opacity-50 border-dashed border-blue-400 shadow-lg'
                : 'hover:shadow-lg hover:border-gray-200'
            }`}
          >
            {/* Card Content */}
            <div className="flex items-start gap-4">
              {/* Drag Handle (only when not editing/menu open) */}
              {editingId === null && showMenuForId === null && (
                <div className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400">
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

              {/* Location Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {location.label}
                </h4>
                <p className="text-base text-gray-600 line-clamp-2">
                  {location.address}
                </p>
              </div>

              {/* Manage Button (only when not editing) */}
              {editingId === null && (
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setShowMenuForId(showMenuForId === location.id ? null : location.id)}
                    className={`px-5 py-3 rounded-xl font-bold transition-all duration-200 ${
                      showMenuForId === location.id
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    管理
                  </button>
                </div>
              )}
            </div>

            {/* Manage Menu (expanded options) */}
            {showMenuForId === location.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => startEdit(location)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-bold transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    編輯
                  </button>
                  
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    刪除
                  </button>
                  
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-xl font-bold transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    上移
                  </button>
                  
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === locations.length - 1}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-xl font-bold transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    下移
                  </button>
                </div>
              </div>
            )}
          </div>
        )))}
      </div>

      {/* Drag Hint */}
      {editingId === null && showMenuForId === null && locations.length > 1 && (
        <p className="text-sm text-gray-500 text-center mt-4">
          拖曳卡片以重新排序
        </p>
      )}
    </div>
  );
}
