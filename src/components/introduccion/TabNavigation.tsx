// src/components/introduccion/TabNavigation.tsx
import { Book, Video } from 'lucide-react';
import React from 'react';
import { useNavigation } from '../NavigationContext';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  { id: 'theory', label: 'Teoría', icon: <Book size={20} /> },
  { id: 'videos', label: 'Videos', icon: <Video size={20} /> },
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs = defaultTabs
}) => {
  const { state, setActiveTab } = useNavigation();

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-2 mb-8 shadow-lg">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg
              font-semibold transition-all duration-300
              ${state.activeTab === tab.id
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200/50'
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
