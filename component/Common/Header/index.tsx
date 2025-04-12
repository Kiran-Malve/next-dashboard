'use client';

import Button from '@/component/Button';
import { useRouter } from 'next/navigation';
import { LogOut, Menu } from 'lucide-react'; 

interface HeaderProps {
  height: number;
  onHeightChange: (height: number) => void;
  onToggleSidebar: () => void;
}

export default function Header({ height, onToggleSidebar }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  return (
    <header 
      className="sticky top-0 z-10 border-b bg-white shadow-sm transition-all"
      style={{ height: `${height}px` }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Sidebar toggle and title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h6 className="text-lg font-semibold">KK Brother & Corporation</h6>
        </div>
        <div className="flex items-center gap-4">        
          <Button 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}