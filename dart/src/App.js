import './App.css';
import { AppStateProvider } from './contexts/AppStateContext.js';
import { React } from 'react';
import { GameProvider } from './contexts/GameContext.js';
import { GameSetup } from './components/GameSetup.js';
import { Game } from './components/Game.js';
import { Summary } from './components/Summary.js';

function App() {

  return (
    <div className="App">
      <AppStateProvider>
        <GameProvider>
          <GameSetup />
          <Game />
          <Summary />
        </GameProvider>
      </AppStateProvider>
    </div >
  );
}

export default App;
