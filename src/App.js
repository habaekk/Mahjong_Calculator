import React, { useState } from 'react';
import './App.css';

function App() {
  const initialScores = { east: 25000, south: 25000, west: 25000, north: 25000 };
  const [scores, setScores] = useState(initialScores);
  const [dealer, setDealer] = useState('east');
  const [reaches, setReaches] = useState({ east: false, south: false, west: false, north: false });
  const [extensionCount, setExtensionCount] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const updateScore = (position, newScore) => {
    setScores({ ...scores, [position]: newScore });
  };

  const toggleDealer = (newDealer) => {
    setDealer(newDealer);
  };

  const toggleReach = (position) => {
    setReaches({ ...reaches, [position]: !reaches[position] });
  };

  const handleExtensionCount = () => {
    setExtensionCount(extensionCount + 1);
  };

  const handleDraw = () => {
    // Logic for handling a draw
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid-item player north">North: {scores.north}</div>
        <div className="grid-item extension-count">Extensions: {extensionCount}</div>
        <div className="grid-item player east">East: {scores.east}</div>
        <div className="grid-item player south">South: {scores.south}</div>
        <div className="grid-item player west">West: {scores.west}</div>
        <div className="grid-item empty"></div>
        <div className="grid-item empty"></div>
        <div className="grid-item empty"></div>
        <div className="grid-item empty"></div>

      </div>
    </div>
  );
}

export default App;
