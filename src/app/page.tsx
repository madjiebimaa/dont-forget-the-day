import Navbar from '@/components/internal/Navbar';
import Overlay from '@/components/internal/Overlay';
import Sidebar from '@/components/internal/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen h-screen max-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col p-2 bg-slate-200">
        <Navbar />

        <Overlay />
      </main>
    </div>
  );
}
