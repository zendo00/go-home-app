'use client';

import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const saved = localStorage.getItem('home_address') || '';
      setAddress(saved);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('home_address', address.trim());
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-3xl p-8 w-[90%] max-w-[480px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          設置
        </h2>

        <label className="block text-3xl font-bold text-gray-800 mb-4 text-center">
          住家地址
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="例如：中環國際金融中心"
          className="w-full h-20 text-3xl px-6 border-2 border-gray-400 rounded-2xl mb-8 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            }
          }}
        />

        <div className="flex gap-4">
          <button
            className="flex-1 h-20 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 text-3xl font-bold rounded-2xl transition-colors"
            onClick={handleCancel}
          >
            取消
          </button>
          <button
            className="flex-1 h-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-3xl font-bold rounded-2xl transition-colors"
            onClick={handleSave}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
}
