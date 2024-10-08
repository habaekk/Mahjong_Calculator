// src/components/Player.js
import React, { useState, useEffect } from 'react';
import './Player.css';

function Player({ position, score, isDealer, isReach, updateScore, editMode }) {
  const [newScore, setNewScore] = useState(score);

  useEffect(() => {
    setNewScore(score);
  }, [score, editMode]);

  const handleScoreChange = (e) => {
    setNewScore(e.target.value);
  };

  const handleScoreSubmit = () => {
    updateScore(position, parseInt(newScore, 10));
  };

  return (
    <div className={`player ${position}`}>
      <div className="empty-space"> {/* 빈칸 추가 */}
        &nbsp;
      </div>
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
          <span>{score}</span>
        )}
      </div>
      <div className="reach">
        {isReach ? '리치!' : '\u00A0'} {/* 리치가 없을 때 빈칸 표시 */}
      </div>
    </div>
  );
}

export default Player;
