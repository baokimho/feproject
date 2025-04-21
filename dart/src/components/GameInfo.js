import { GameContext } from "../contexts/GameContext";
import { useContext } from "react";
import './GameInfo.css'; // Import CSS file for styling

export const GameInfo = () => {
    const { state } = useContext(GameContext);

    return (
        <div className="game-info-container">
            <div className="game-info-card">
                <div className="game-info-header">
                    <h3>Who is gonna win?</h3>
                </div>
                <div className="game-info-content">
                    <div className="info-item">
                        <span className="info-label">Game Type: </span>
                        <span className="info-value">{state.gameType}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Legs in this Set: </span>
                        <span className="info-value">{state.setSize}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Current Leg: </span>
                        <span className="info-value">{state.currentLeg}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Won Legs: </span>
                        <span className="info-value">{state.players[0].name}: {state.players[0].wonLegs} | {state.players[1].name}: {state.players[1].wonLegs}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
