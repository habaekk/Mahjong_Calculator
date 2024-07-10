// src/components/Player.js
import React, { useState } from 'react';
import './Player.css';

function Player({ position, score, isDealer, isReach, updateScore }) {
  const [editMode, setEditMode] = useState(false);
  const [newScore, setNewScore] = useState(score);

  const handleScoreChange = (e) => {
    setNewScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    updateScore(position, parseInt(newScore, 10));
    setEditMode(false);
  };

  return (
    <div className={`player ${position}`}>
      <div className={`position ${isDealer ? 'dealer' : ''}`}>
        {position} {isDealer && '東'}
      </div>
      <div className="score">
        {editMode ? (
          <input
            type="number"
            value={newScore}
            onChange={handleScoreChange}
            onBlur={handleScoreSubmit}
          />
        ) : (
          <span onClick={() => setEditMode(true)}>{score}</span>
        )}
      </div>
      {isReach && <div className="reach">리치!</div>}
    </div>
  );
}

export default Player;
