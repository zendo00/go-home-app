'use client';

export default function GoButton() {
  return (
    <button
      onClick={() => alert('GO 功能：請在階段 2 開發')}
      className="relative w-[90%] max-w-[320px] h-[100px] bg-[#3F51B5] rounded-2xl flex items-center justify-center mx-auto my-4 hover:opacity-90 active:scale-95 transition-all shadow-lg"
      style={{
        clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)',
      }}
    >
      {/* 白色箭頭圖示 */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-4"
      >
        <path d="M8 5V9L16.5 12L8 15V19L20 12L8 5Z" />
      </svg>
      {/* GO 文字 */}
      <span className="text-4xl font-bold text-white ml-4">GO</span>
    </button>
  );
}
