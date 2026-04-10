'use client';

export default function Header() {
  return (
    <header className="flex items-center gap-2 px-4 py-4 bg-white">
      {/* 綠色定位標記圖示 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
          fill="#4CAF50"
        />
        <circle
          cx="12"
          cy="9"
          r="3"
          fill="white"
        />
      </svg>
      {/* GO HOME 文字 */}
      <h1 className="text-2xl font-bold text-[#4CAF50]">GO HOME</h1>
    </header>
  );
}
