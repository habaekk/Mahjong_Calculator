// src/components/ControlPanel.js
import React from 'react';
import './ControlPanel.css';

function ControlPanel({ dealer, toggleDealer, toggleReach, extensionCount, handleExtensionCount, handleDraw, editMode, toggleEditMode }) {
  return (
    <div className="control-panel">
      <div className="extension-count">
        연장 횟수: {extensionCount}
        <button onClick={handleExtensionCount}>연장</button>
      </div>
      <div className="draw-button">
        <button onClick={handleDraw}>유국</button>
      </div>
      <div className="dealer-buttons">
        {['east', 'south', 'west', 'north'].map((pos) => (
          <button key={pos} onClick={() => toggleDealer(pos)}>
            {pos === dealer ? '동' : pos}
          </button>
        ))}
      </div>
      <div className="reach-buttons">
        {['east', 'south', 'west', 'north'].map((pos) => (
          <button key={pos} onClick={() => toggleReach(pos)}>
            리치 {pos}
          </button>
        ))}
      </div>
      <div className="edit-button">
        <button onClick={toggleEditMode}>
          {editMode ? '편집 모드 종료' : '편집 모드 시작'}
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
