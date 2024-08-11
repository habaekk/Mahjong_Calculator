import React, { useState } from 'react';
import './ScoreGrid.css';

const ScoreGrid = () => {
  const gridContent = [
    ["/", "20부", "25부", "30부", "40부", "50부", "60부", "70부", "80부", "90부", "100부", "110부", "120부", "130부"],
    ["1판", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "J2", "K2", "L2", "M2", "N2"],
    ["2판", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "J3", "K3", "L3", "M3", "N3"],
    ["3판", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4", "K4", "L4", "M4", "N4"],
    ["4판", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5", "K5", "L5", "M5", "N5"],
    ["5판", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "J6", "K6", "L6", "M6", "N6"],
    ["6판", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "J7", "K7", "L7", "M7", "N7"],
    ["7판", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "J8", "K8", "L8", "M8", "N8"],
    ["8판", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "J9", "K9", "L9", "M9", "N9"],
    ["9판", "B10", "C10", "D10", "E10", "F10", "G10", "H10", "I10", "J10", "K10", "L10", "M10", "N10"],
    ["10판", "B11", "C11", "D11", "E11", "F11", "G11", "H11", "I11", "J11", "K11", "L11", "M11", "N11"],
    ["11판", "B12", "C12", "D12", "E12", "F12", "G12", "H12", "I12", "J12", "K12", "L12", "M12", "N12"],
    ["12판", "B13", "C13", "D13", "E13", "F13", "G13", "H13", "I13", "J13", "K13", "L13", "M13", "N13"],
    ["13판", "B13", "C13", "D13", "E13", "F13", "G13", "H13", "I13", "J13", "K13", "L13", "M13", "N13"]

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
          {row.map((content, colIndex) => (
            <div
              key={colIndex}
              className={`score-grid-cell ${grid[rowIndex][colIndex] ? 'score-grid-toggled' : ''}`}
              onClick={() => handleCellToggle(rowIndex, colIndex)}
            >
              {content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScoreGrid;
