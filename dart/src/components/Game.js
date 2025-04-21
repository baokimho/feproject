import React, { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';
import { ScoreTable } from './ScoreTable';
import { GameInfo } from './GameInfo';

export const Game = () => {
    const { appState } = useContext(AppStateContext);
    return (
        <div>
            {appState === 'game' && (
                <div className='Game'>
                    <GameInfo />
                    <ScoreTable />
                </div>
            )}
        </div>
    );
}