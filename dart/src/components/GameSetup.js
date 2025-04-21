import React, { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';
import { GameContext } from '../contexts/GameContext';
import './GameSetup.css'; // Import CSS file for styling

export const GameSetup = () => {
    const { appState, setAppState } = useContext(AppStateContext);
    const { state: gameState, dispatch } = useContext(GameContext);

    const handlePlayerNameChange = (index, newName) => {
        dispatch({ type: 'UPDATE_PLAYER_NAME', payload: { index, newName } });
        dispatch({ type: 'SET_FIRST_PLAYER', payload: gameState.players[0] });
    };

    const handleGameTypeChange = (event) => {
        dispatch({ type: 'SET_GAME_TYPE', payload: parseInt(event.target.value) });
    };

    const handleSetSizeChange = (event) => {
        dispatch({ type: 'SET_SET_SIZE', payload: parseInt(event.target.value) });
    };

    const handleContextButtonClick = () => {
        setAppState('game');
    };

    return (
        <>
        { appState === 'initial state' && (
            <div className="game-setup-container">
                <h2 className="setup-title">Game Setup</h2>
                <div className="form-container">
                    {/* Player name inputs */}
                    <div className="player-inputs-container">
                        {gameState.players.map((player, index) => (
                            <div key={index} className="player-input">
                                <label htmlFor={`playerName${index + 1}`}>Player {index + 1}:</label>
                                <input
                                    id={`playerName${index + 1}`}
                                    className="player-name-input"
                                    value={player.name}
                                    onChange={(event) => handlePlayerNameChange(index, event.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Game options */}
                    <div className="game-options-container">
                        <div className="game-option">
                            <label htmlFor="gameType">Select Game Type:</label>
                            <select id="gameType" className="game-type-select" value={gameState.gameType} onChange={handleGameTypeChange}>
                                <option value="301">301</option>
                                <option value="501">501</option>
                            </select>
                        </div>

                        <div className="game-option">
                            <label htmlFor="setSize">Select Set Size:</label>
                            <select id="setSize" className="set-size-select" value={gameState.setSize} onChange={handleSetSizeChange}>
                                <option value="5">5</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Start Game Button */}
                <button className="start-game-button" onClick={handleContextButtonClick}>Start Game</button>
            </div>
        )}
        </> 
    );
};
