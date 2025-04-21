import React, {useContext} from 'react';
import {AppStateContext} from '../contexts/AppStateContext';

export const ContextButton = () => {
    const {appState, setAppState} = useContext(AppStateContext);
    return (
        <button onClick={()=>{
            if (appState === 'game') setAppState('summary')
            else if (appState === 'summary') setAppState('initial state')
            else
            setAppState('game')
            console.log(appState)
          }}>
            Click to change context</button>
    )
}