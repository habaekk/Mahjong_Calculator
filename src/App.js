import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

function App() {
  const initialScores = { east: 25000, south: 25000, west: 25000, north: 25000 };
  const [scores, setScores] = useState(initialScores);
  const [dealer, setDealer] = useState('east');
  const [reaches, setReaches] = useState({ east: false, south: false, west: false, north: false });
  const [extensionCount, setExtensionCount] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [toggled, setToggled] = useState({
    north: false,
    east: false,
    south: false,
    west: false,
    extension: false,
    empty1: false,
    empty2: false,
    empty3: false,
    empty4: false
  });

  const [selectedOrder, setSelectedOrder] = useState([]); // Array to track the order of selections

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
    console.log('Draw triggered');
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleToggle = (position) => {
    const isAlreadyToggled = toggled[position];
    const newToggled = { ...toggled, [position]: !toggled[position] };

    if (isAlreadyToggled) {
      // Handle the case where the same block is clicked twice (to toggle off)
      console.log(`Block ${position} was toggled off`);
      const newSelectedOrder = selectedOrder.filter((item) => item !== position); // Remove the block from the selection order
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);
    } else {
      // Handle the case where a new block is toggled on
      const newSelectedOrder = [...selectedOrder, position]; // Add the block to the selection order
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);

      if (newSelectedOrder.length === 2) {
        // If two blocks are toggled, delay the reset by 1 second
        setTimeout(() => {
          const [firstBlock, secondBlock] = newSelectedOrder; // Get the first and second selected blocks
          console.log('First selected block:', firstBlock); // Log the first selected block
          console.log('Second selected block:', secondBlock); // Log the second selected block

          setToggled({
            north: false,
            east: false,
            south: false,
            west: false,
            extension: false,
            empty1: false,
            empty2: false,
            empty3: false,
            empty4: false
          });

          setSelectedOrder([]); // Reset the selection order
          handleDraw(); // Trigger the specific function after the delay
        }, 1000);
      }
    }
  };

  return (
    <div className="App">
      <div className="grid-container">
        <div
          className={`grid-item player north ${toggled.north ? 'toggled' : ''}`}
          onClick={() => handleToggle('north')}
        >
          North: {scores.north}
        </div>
        <div
          className={`grid-item extension-count ${toggled.extension ? 'toggled' : ''}`}
          onClick={() => handleToggle('extension')}
        >
          Extensions: {extensionCount}
        </div>
        <div
          className={`grid-item player east ${toggled.east ? 'toggled' : ''}`}
          onClick={() => handleToggle('east')}
        >
          East: {scores.east}
        </div>
        <div
          className={`grid-item player south ${toggled.south ? 'toggled' : ''}`}
          onClick={() => handleToggle('south')}
        >
          South: {scores.south}
        </div>
        <div
          className={`grid-item player west ${toggled.west ? 'toggled' : ''}`}
          onClick={() => handleToggle('west')}
        >
          West: {scores.west}
        </div>
        <div
          className={`grid-item empty ${toggled.empty1 ? 'toggled' : ''}`}
          onClick={() => handleToggle('empty1')}
        ></div>
        <div
          className={`grid-item empty ${toggled.empty2 ? 'toggled' : ''}`}
          onClick={() => handleToggle('empty2')}
        ></div>
        <div
          className={`grid-item empty ${toggled.empty3 ? 'toggled' : ''}`}
          onClick={() => handleToggle('empty3')}
        ></div>
        <div
          className={`grid-item empty ${toggled.empty4 ? 'toggled' : ''}`}
          onClick={() => handleToggle('empty4')}
        ></div>
      </div>
    </div>
  );
}

export default App;
