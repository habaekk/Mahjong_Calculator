// src/components/ScoreBoard.js
import React from 'react';
import Player from './Player';
import './ScoreBoard.css';

function ScoreBoard({ scores, dealer, reaches, updateScore, editMode }) {
  return (
    <div className="scoreboard">
      {Object.keys(scores).map((position) => (
        <Player
          key={position}
          position={position}
          score={scores[position]}
          isDealer={dealer === position}
          isReach={reaches[position]}
          updateScore={updateScore}
          editMode={editMode}
        />
      ))}
    </div>
  );
}

export default ScoreBoard;
