'use client';

import { useState, useEffect } from 'react';
import { IconPlus } from './ui/Icons';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (label: string, address: string) => void;
  editingId?: string | null;
  initialLabel?: string;
  initialAddress?: string;
}

export default function AddLocationModal({ isOpen, onClose, onSave, editingId, initialLabel, initialAddress }: AddLocationModalProps) {
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmedLabel = label.trim();
    const trimmedAddress = address.trim();

    if (!trimmedLabel || !trimmedAddress) {
      setError('請填寫所有欄位');
      return;
    }

    onSave(trimmedLabel, trimmedAddress);
    setLabel('');
    setAddress('');
    setError(null);
  };

  const handleCancel = () => {
    setLabel('');
    setAddress('');
    setError(null);
    onClose();
  };

  // Update form when initial data changes while modal is open
  useEffect(() => {
    if (isOpen) {
      if (editingId && initialLabel && initialAddress) {
        setLabel(initialLabel);
        setAddress(initialAddress);
      } else {
        setLabel('');
        setAddress('');
      }
      setError(null);
    }
  }, [isOpen, editingId, initialLabel, initialAddress]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{editingId ? '編輯地點' : '新增地點'}</h3>

        <div className="mb-4">
          <label className="block text-base font-bold text-gray-900 mb-2">地點名稱</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="例如：家、辦公室"
            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-base font-bold text-gray-900 mb-2">地址</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="輸入完整地址"
            className="w-full p-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 resize-none"
            rows={3}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
          >
            {editingId ? '保存變更' : '保存'}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold py-4 transition-all duration-200 active:scale-95"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
