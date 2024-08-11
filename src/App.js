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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const handleToggle = (position) => {
    const isAlreadyToggled = toggled[position];
    const newToggled = { ...toggled, [position]: !toggled[position] };

    if (isAlreadyToggled) {
      console.log(`Block ${position} was toggled off`);
      const newSelectedOrder = selectedOrder.filter((item) => item !== position); // Remove the block from the selection order
      setIsModalOpen(true); // Open the modal
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);
    } else {
      const newSelectedOrder = [...selectedOrder, position]; // Add the block to the selection order
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);

      if (newSelectedOrder.length === 2) {
        // If two blocks are toggled, delay the reset by 0.1 seconds
        setTimeout(() => {
          const [firstBlock, secondBlock] = newSelectedOrder;
          console.log('First selected block:', firstBlock);
          console.log('Second selected block:', secondBlock);

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
          setIsModalOpen(true); // Open the modal
        }, 100);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
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

      <Modal show={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
