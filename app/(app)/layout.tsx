'use client';

import Header from "@/component/Common/Header";
import Sidebar from "@/component/Common/Sidebar";
import ReduxProvider from "@/redux/ReduxProvider";
import { useState } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64); // Default height in pixels

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ReduxProvider>
      <div className="flex h-screen">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          width={sidebarCollapsed ? 80 : 250} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            height={headerHeight}
            onHeightChange={setHeaderHeight}
            onToggleSidebar={toggleSidebar}
          />
          <main 
            className="flex-1 overflow-auto p-4 md:p-6"
            style={{ 
              marginLeft: `${sidebarCollapsed ? 80 : 250}px`,
              transition: 'margin 0.3s ease'
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </ReduxProvider>
  );
}