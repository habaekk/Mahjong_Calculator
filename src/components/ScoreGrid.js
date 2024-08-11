import React, { useState } from 'react';
import './GridComponent.css';

const GridComponent = () => {
  const rows = 12;
  const columns = 14;
  const initialGridState = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(false));

  const [grid, setGrid] = useState(initialGridState);

  const handleCellToggle = (rowIndex, colIndex) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`grid-cell ${cell ? 'toggled' : ''}`}
              onClick={() => handleCellToggle(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
