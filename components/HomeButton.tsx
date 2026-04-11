export default function HomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-[85%] max-w-[340px] h-[110px] bg-homeGreen text-white flex items-center justify-start pl-6 overflow-hidden shadow-lg active:scale-95 transition-transform"
      style={{
        clipPath: "polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%)",
        borderRadius: "12px 0 0 12px",
      }}
    >
      {/* Home Icon (SVG) */}
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white ml-2 flex-shrink-0"
      >
        <path 
          d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M9 22V12H15V22" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-3xl font-bold ml-4">HOME</span>
    </button>
  );
}
