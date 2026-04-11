import Header from '@/components/Header';
import GoButton from '@/components/GoButton';
import HomeButton from '@/components/HomeButton';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <GoButton onClick={() => alert('GO 按鈕點擊 - 功能開發中')} />
        <HomeButton onClick={() => alert('HOME 按鈕點擊 - 功能開發中')} />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
