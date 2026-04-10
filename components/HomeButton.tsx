'use client';

export default function HomeButton() {
  return (
    <button
      onClick={() => alert('HOME 功能：請在階段 2 開發')}
      className="relative w-[85%] max-w-[340px] h-[110px] bg-[#4CAF50] flex items-center justify-center mx-auto my-6 hover:opacity-90 active:scale-95 transition-all shadow-lg"
      style={{
        clipPath: 'polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%)',
      }}
    >
      {/* 白色房屋圖示 - TODO: Replace with user-provided Logo/Icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-6 flex-shrink-0"
      >
        <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
      </svg>
      {/* HOME 文字 - 字體大小調整為 36px，符合長者需求 */}
      <span className="text-[36px] font-bold text-white ml-4 tracking-wide">
        HOME
      </span>
    </button>
  );
}
