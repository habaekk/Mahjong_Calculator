import React, { useState } from 'react';
import './ScoreGrid.css';

const ScoreGrid = () => {
  const gridContent = [
    ["/", "20부", "25부", "30부", "40부", "50부", "60부", "70부", "80부", "90부", "100부", "110부", "120부", "130부"],
    ["1판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["2판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["3판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["4판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["5판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["6판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["7판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["8판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["9판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["10판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["11판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["12판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["13판", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ];

  const [grid, setGrid] = useState(
    Array(gridContent.length)
      .fill(null)
      .map(() => Array(gridContent[0].length).fill(false))
  );

  const handleCellToggle = (rowIndex, colIndex) => {
    const newGrid = grid.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="score-grid-container">
      {gridContent.map((row, rowIndex) => (
        <div key={rowIndex} className="score-grid-row">
          {row.map((content, colIndex) =>
            content === " " ? (
              <div
                key={colIndex}
                className={`score-grid-cell hoverable ${grid[rowIndex][colIndex] ? 'score-grid-toggled' : ''}`}
                onClick={() => handleCellToggle(rowIndex, colIndex)}
              >
                {content}
              </div>
            ) : (
              <div key={colIndex} className="score-grid-cell">
                {content}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreGrid;
