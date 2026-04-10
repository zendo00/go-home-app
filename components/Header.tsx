'use client';

export default function Header() {
  return (
    <header className="flex items-center gap-3 px-5 pt-4 pb-3 bg-white">
      {/* 綠色定位標記圖示 - 調整大小以匹配設計圖 */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
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
      {/* GO HOME 文字 - 字體大小和間距調整 */}
      <h1 className="text-[22px] font-bold text-[#4CAF50] tracking-tight leading-none">
        GO HOME
      </h1>
    </header>
  );
}
