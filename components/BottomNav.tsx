'use client';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 shadow-lg">
      {/* Home 按鈕 */}
      <button
        onClick={() => alert('主頁')}
        className="flex flex-col items-center justify-center flex-1 py-2"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
        </svg>
        <span className="text-sm text-black mt-1">Home</span>
      </button>

      {/* Settings 按鈕 */}
      <button
        onClick={() => alert('設置頁：請在階段 2 開發')}
        className="flex flex-col items-center justify-center flex-1 py-2"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.14 12.94C19.16 12.78 19.17 12.61 19.17 12.45C19.17 12.29 19.16 12.12 19.14 11.96L21.16 10.38C21.34 10.24 21.39 10 21.28 9.79L19.36 6.46C19.24 6.25 19 6.17 18.79 6.25L16.4 7.21C15.91 6.79 15.36 6.44 14.77 6.17L14.4 3.63C14.36 3.4 14.17 3.25 13.94 3.25H10.11C9.88 3.25 9.69 3.4 9.65 3.63L9.28 6.17C8.69 6.44 8.14 6.79 7.65 7.21L5.26 6.25C5.05 6.17 4.81 6.25 4.69 6.46L2.77 9.79C2.66 10 2.71 10.24 2.89 10.38L4.91 11.96C4.89 12.12 4.88 12.29 4.88 12.45C4.88 12.61 4.89 12.78 4.91 12.94L2.89 14.52C2.71 14.66 2.66 14.9 2.77 15.11L4.69 18.44C4.81 18.65 5.05 18.73 5.26 18.65L7.65 17.69C8.14 18.11 8.69 18.46 9.28 18.73L9.65 21.27C9.69 21.5 9.88 21.65 10.11 21.65H13.94C14.17 21.65 14.36 21.5 14.4 21.27L14.77 18.73C15.36 18.46 15.91 18.11 16.4 17.69L18.79 18.65C19 18.73 19.24 18.65 19.36 18.44L21.28 15.11C21.39 14.9 21.34 14.66 21.16 14.52L19.14 12.94ZM12.06 15.5C10.38 15.5 9.02 14.14 9.02 12.45C9.02 10.76 10.38 9.4 12.06 9.4C13.75 9.4 15.11 10.76 15.11 12.45C15.11 14.14 13.75 15.5 12.06 15.5Z"
            fill="black"
          />
        </svg>
        <span className="text-sm text-black mt-1">Settings</span>
      </button>
    </nav>
  );
}
