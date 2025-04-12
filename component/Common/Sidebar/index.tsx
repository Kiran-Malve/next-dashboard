'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package , Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  width: number;
}

export default function Sidebar({ collapsed, onToggle, width }: SidebarProps) {
  const pathname = usePathname();
  
  const navLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      active: pathname === '/dashboard',
    },
    {
      name: 'Products',
      href: '/products',
      icon: <Package className="h-5 w-5" />,
      active: pathname.startsWith('/products'),
    }
  ];

  return (
    <div 
      className="h-full border-r bg-gray-100/40 dark:bg-gray-800/40 fixed transition-all duration-300 overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            {!collapsed && <span>Acme Inc</span>}
          </Link>
          <button 
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
                    {navLinks?.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all no-underline  link-underline ${
                link.active
                  ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              }`}
            >
              {link.icon}
              {!collapsed && link.name}
            </Link>
          ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              pathname.startsWith('/settings')
                ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            }`}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && 'Settings'}
          </Link>
        </div>
      </div>
    </div>
  );
}