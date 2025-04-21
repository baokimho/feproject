import React, { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';
import { GameContext } from '../contexts/GameContext';
import './Summary.css';

export const Summary = () => {
    const { appState, setAppState } = useContext(AppStateContext);
    const { state, dispatch, reset } = useContext(GameContext);

    const newGame = () => {
        // Reset the game state
        reset();
        setAppState('initial state')
    }

    const playAgain = () => {
        // Reset the game state, but leave players and game settings
        dispatch({ type: 'SET_CURRENT_LEG', payload: 1 })
        dispatch({ type: 'SET_FIRST_PLAYER', payload: state.players[0] })
        dispatch({ type: 'SET_WINNER', payload: '' })
        state.Legs = [];
        state.players[0].wonLegs = 0;
        state.players[1].wonLegs = 0;
        setAppState('game')
    }
    return (
        <>
            {appState === 'summary' && (

                <div>
                    <h2>Congratulations!</h2>
                    <p>Winner of this game is {state.winner}!</p>
                    <p>Summary of the game:</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {state.Legs.map((leg, index) => {
                            const scores = leg.scores.player1.length > leg.scores.player2.length ? leg.scores.player1 : leg.scores.player2;
                            return (
                                <div key={index} style={{ padding: 10 }}>
                                    <p>Leg {index + 1}</p>
                                    <p>Winner of the leg: {leg.winner}</p>
                                    <table className='ScoreTable'>
                                        <thead>
                                            <tr>
                                                <th>{state.players[0].name}</th>
                                                <th>{state.players[1].name}</th>
                                            </tr>
                                        </thead>
                                        {scores.map((score, index) => (
                                            <tr key={index}>
                                                <td>{leg.scores.player1[index]}</td>
                                                <td>{leg.scores.player2[index]}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={() => playAgain()}>Play again</button>
                    <button onClick={() => newGame()}>Set a new game</button>
                </div>
            )}
        </>
    )
}
