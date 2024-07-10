// src/App.js
import React, { useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  const initialScores = { east: 25000, south: 25000, west: 25000, north: 25000 };
  const [scores, setScores] = useState(initialScores);
  const [dealer, setDealer] = useState('east');
  const [reaches, setReaches] = useState({ east: false, south: false, west: false, north: false });
  const [extensionCount, setExtensionCount] = useState(0);

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

  return (
    <div className="App">
      <ScoreBoard scores={scores} dealer={dealer} reaches={reaches} updateScore={updateScore} />
      <ControlPanel
        dealer={dealer}
        toggleDealer={toggleDealer}
        toggleReach={toggleReach}
        extensionCount={extensionCount}
        handleExtensionCount={handleExtensionCount}
        handleDraw={handleDraw}
      />
    </div>
  );
}

export default App;
