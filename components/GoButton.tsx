export default function GoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-[85%] max-w-[340px] h-[110px] bg-goBlue text-white flex items-center justify-start pl-6 overflow-hidden shadow-lg active:scale-95 transition-transform"
      style={{
        clipPath: "polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%)",
        borderRadius: "12px 0 0 12px",
      }}
    >
      {/* Arrow Icon (SVG) */}
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white ml-2 flex-shrink-0"
      >
        <path 
          d="M5 12H19M19 12L12 5M19 12L12 19" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-3xl font-bold ml-4">GO</span>
    </button>
  );
}
