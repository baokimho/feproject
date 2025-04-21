import { createContext, useState } from 'react';

export const AppStateContext = createContext('initial state');

export const AppStateProvider = ({ children }) => {
    const [appState, setAppState] = useState('initial state');
    return (
      <AppStateContext.Provider value={{ appState, setAppState }}>
        {children}
      </AppStateContext.Provider>
    );
  };