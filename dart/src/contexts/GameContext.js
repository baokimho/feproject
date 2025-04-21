import React, { useReducer, createContext } from 'react';

// Define the initial state
const initialState = {
  players: [{name: '', wonLegs: 0}, 
            {name: '', wonLegs: 0}],
  gameType: 301,
  setSize: 5,
  currentLeg: 1,
  firstPlayer: '',
  Legs: [],
  winner: ''
};

// Define the context
export const GameContext = createContext(initialState);

// Define the reducer
const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_PLAYER':
        return { ...state, players: [...state.players, action.payload] };
      case 'SET_WON_LEGS':
        return { 
          ...state, players: state.players.map((player) => {
            if (player.name === action.payload) {
              return { ...player, wonLegs: player.wonLegs + 1 };
            }
            return player;
          }) 
        };
      case 'SET_GAME_TYPE':
        return { ...state, gameType: action.payload };
      case 'SET_SET_SIZE':
        return { ...state, setSize: action.payload };
      case 'SET_CURRENT_LEG':
        return { ...state, currentLeg: action.payload };
      case 'SET_FIRST_PLAYER':
        return { ...state, firstPlayer: action.payload };
      case 'SET_LEGS':
        return { ...state, Legs: [...state.Legs, action.payload] };
      case 'SET_WINNER':
        return { ...state, winner: action.payload };
      case 'RESET_STATE':
        return initialState;
      case 'UPDATE_PLAYER_NAME':
      return {
        ...state,
        players: state.players.map((player, index) => {
          if (index === action.payload.index) {
            return { ...player, name: action.payload.newName };
          }
          return player;
        })
      };
      default:
        return state;
    }
  };

// Define the context provider
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const reset = () => dispatch({ type: 'RESET_STATE' });
  
    return (
      <GameContext.Provider value={{ state, dispatch, reset }}>
        {children}
      </GameContext.Provider>
    );
  };