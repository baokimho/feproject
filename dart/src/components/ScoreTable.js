import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import { AppStateContext } from '../contexts/AppStateContext';

const ScoreTable = () => {
  const [buttonValue, setButtonValue] = useState('Start next leg');
  const { setAppState } = useContext(AppStateContext);
  const { state, dispatch } = useContext(GameContext);
  const [legEnd, setLegEnd] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(state.firstPlayer);
  const player1 = state.players[0];
  const player2 = state.players[1];
  const [p1Scores, setP1Scores] = useState([state.gameType]);
  const [p2Scores, setP2Scores] = useState([state.gameType]);
  let pScores = p1Scores.length >= p2Scores.length ? p1Scores : p2Scores;
  let score = currentPlayer.name === player1.name ? p1Scores[p1Scores.length - 1] : p2Scores[p2Scores.length - 1];

  const inputListener = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('addButton').click();
    }
  }

  const legOver = () => {
    let nextFirstPlayer = state.firstPlayer.name === player1.name ? player2 : player1;
    dispatch({ type: 'SET_FIRST_PLAYER', payload: nextFirstPlayer });
    dispatch({ type: 'SET_WON_LEGS', payload: currentPlayer.name });
    dispatch({
      type: 'SET_LEGS', payload: {
        leg: state.currentLeg,
        winner: currentPlayer.name,
        scores: { player1: p1Scores, player2: p2Scores }
      }
    });
    if (currentPlayer.wonLegs + 1 > (state.setSize / 2)) {
      dispatch({ type: 'SET_WINNER', payload: currentPlayer.name });
      setButtonValue('To Summary');
    }
    setLegEnd(true);
    window.alert(`Leg won by ${currentPlayer.name}`);
  }

  const startNewLeg = () => {
    let newWonLegs = currentPlayer.wonLegs + 1;
    score = state.gameType;
    setP1Scores([state.gameType]);
    setP2Scores([state.gameType]);

    if (newWonLegs < (state.setSize / 2)) {
      dispatch({ type: 'SET_CURRENT_LEG', payload: state.currentLeg + 1 })
    } else {
      setAppState('summary');
    }
    setLegEnd(false);
    setCurrentPlayer(state.firstPlayer.name === player1.name ? player1 : player2);
  }

  const addPoints = () => {
    let points = document.getElementById('points').value;
    if (points < 0 || points > 180) {
      alert('point can not be negative or greater than 180');
      return;
    } 
    score = currentPlayer.name === player1.name ? p1Scores[p1Scores.length - 1] : p2Scores[p2Scores.length - 1];
    let nextPoints = score - points;

    if (nextPoints < 2 && nextPoints !== 0) {
      nextPoints = score;
    }

    if (currentPlayer.name === player1.name) {
      p1Scores.push(nextPoints);
    } else {
      p2Scores.push(nextPoints);
    }

    if (nextPoints === 0) {
      legOver();
    } else {
      setCurrentPlayer(currentPlayer.name === player1.name ? player2 : player1);
    }
    document.getElementById('points').value = '';
  };

  const removePoints = () => {
    // Determine the current player for removing
    let currentPlayerScores = currentPlayer.name === player1.name ? p2Scores : p1Scores;

    // Remove the last score from the scores array
    if (currentPlayerScores.length > 1) {
      currentPlayerScores.pop();

      // Update the state with the modified scores
      if (currentPlayer.name === player1.name) {
        setP2Scores([...currentPlayerScores]);
      } else {
        setP1Scores([...currentPlayerScores]);
      }
      
      setCurrentPlayer(currentPlayer.name === player1.name ? player2 : player1);
    }
    
  };

  return (
    <>
      <div style={{ margin: 10 }}>
        {!legEnd && (
          <>
            <label htmlFor='points'>Enter points for player: {currentPlayer.name}</label>
            <div style={{ padding: 20 }}>

              <input type="number" id='points' placeholder="Enter points" onKeyUp={inputListener} min="0" max="180" />
              <button id='addButton' onClick={() => addPoints()}>Add Points</button>
              <button onClick={() => removePoints()}>Remove Last Point</button>

            </div>
          </>
        )}
        {legEnd && (
          <div style={{ padding: 20 }}>
            <button id='newLeg' onClick={() => startNewLeg()}>{buttonValue}</button>
          </div>
        )}
      </div>
      <div>
        <table className='ScoreTable'>
          <thead>
            <tr>
              <th></th>
              <th>{player1.name}</th>
              <th>{player2.name}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pScores.map((points, index) => (
              <tr key={index}>
                <td className='Points'>{p1Scores[index - 1] - p1Scores[index] || 0}</td>
                <td style={{ fontSize: 18 }}>{p1Scores[index]}</td>
                <td style={{ fontSize: 18 }}>{p2Scores[index]}</td>
                <td className='Points'>{p2Scores[index - 1] - p2Scores[index] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export { ScoreTable };
