'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex items-center px-5 pt-6 pb-2">
      {/* Logo: Go Home App Official Logo */}
      <Image
        src="/logo.png"
        alt="Go Home App Logo"
        width={40}
        height={40}
        className="mr-3"
      />
      <span className="text-2xl font-bold text-[#4CAF50] tracking-wide">GO HOME</span>
    </div>
  );
}
