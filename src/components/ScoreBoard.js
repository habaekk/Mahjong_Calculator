// src/components/ScoreBoard.js
import React from 'react';
import Player from './Player';
import './ScoreBoard.css';

function ScoreBoard({ scores, dealer, reaches, updateScore }) {
  return (
    <div className="scoreboard">
      <div className="player north">
        <Player
          position="north"
          score={scores.north}
          isDealer={dealer === 'north'}
          isReach={reaches.north}
          updateScore={updateScore}
        />
      </div>
      <div className="player west">
        <Player
          position="west"
          score={scores.west}
          isDealer={dealer === 'west'}
          isReach={reaches.west}
          updateScore={updateScore}
        />
      </div>
      <div className="player east">
        <Player
          position="east"
          score={scores.east}
          isDealer={dealer === 'east'}
          isReach={reaches.east}
          updateScore={updateScore}
        />
      </div>
      <div className="player south">
        <Player
          position="south"
          score={scores.south}
          isDealer={dealer === 'south'}
          isReach={reaches.south}
          updateScore={updateScore}
        />
      </div>
    </div>
  );
}

export default ScoreBoard;
