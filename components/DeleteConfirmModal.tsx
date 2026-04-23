'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  locationLabel?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  locationLabel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {locationLabel ? `確定刪除此地點「${locationLabel}」？` : '確定刪除此地點？'}
        </h3>
        <p className="text-gray-600 mb-6">此操作無法撤銷。</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-bold py-3 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold py-3 transition-colors"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
}
