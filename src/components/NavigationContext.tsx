// src/components/NavigationContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface NavigationState {
  activeTab: string;
  currentUnit: string | null;
  currentTopic: string | null;
}

interface NavigationContextType {
  state: NavigationState;
  setActiveTab: (tab: string) => void;
  setCurrentUnit: (unit: string | null) => void;
  setCurrentTopic: (topic: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NavigationState>({
    activeTab: 'theory',
    currentUnit: null,
    currentTopic: null,
  });

  const setActiveTab = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };

  const setCurrentUnit = (unit: string | null) => {
    setState(prev => ({ ...prev, currentUnit: unit }));
  };

  const setCurrentTopic = (topic: string | null) => {
    setState(prev => ({ ...prev, currentTopic: topic }));
  };

  return (
    <NavigationContext.Provider value={{
      state,
      setActiveTab,
      setCurrentUnit,
      setCurrentTopic,
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
