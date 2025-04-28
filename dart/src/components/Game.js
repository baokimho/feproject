import React, { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';
import { ScoreTable } from './ScoreTable';
import { GameInfo } from './GameInfo';

export const Game = () => {
    const { appState, setAppState } = useContext(AppStateContext);
    const handleMenuClick = () => {
        setAppState('initial state');
    };

    return (
        <div>
            {appState === 'game' && (
                <div className='Game'>
                    <GameInfo />
                    <ScoreTable />
                    <button onClick={handleMenuClick} className="menu-button">
                        Menu
                    </button>
                </div>
            )}
        </div>
    );
}