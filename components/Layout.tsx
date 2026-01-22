
import React from 'react';
import { Home, Compass, MessageSquare, User } from 'lucide-react';
import { TabType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50 shadow-xl relative">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
          W
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 overflow-y-auto hide-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 safe-area-bottom z-50">
        <div className="flex justify-around items-center py-2 px-1">
          <NavItem 
            icon={<Home size={22} />} 
            label="广场" 
            isActive={activeTab === TabType.HOME} 
            onClick={() => setActiveTab(TabType.HOME)} 
          />
          <NavItem 
            icon={<Compass size={22} />} 
            label="发现" 
            isActive={activeTab === TabType.EXPLORE} 
            onClick={() => setActiveTab(TabType.EXPLORE)} 
          />
          <NavItem 
            icon={<div className="relative"><MessageSquare size={22} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span></div>} 
            label="AI助手" 
            isActive={activeTab === TabType.AI} 
            onClick={() => setActiveTab(TabType.AI)} 
          />
          <NavItem 
            icon={<User size={22} />} 
            label="我的" 
            isActive={activeTab === TabType.ME} 
            onClick={() => setActiveTab(TabType.ME)} 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-teal-600 scale-110' : 'text-gray-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default Layout;
