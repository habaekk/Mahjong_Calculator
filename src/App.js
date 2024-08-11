import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';

function App() {
  const [players, setPlayers] = useRecoilState(playersState); // Recoil 상태 사용
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
    empty4: false,
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
            empty4: false,
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

  const toggleOya = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.id === id) {
          // Toggle the Oya state for the clicked player
          return { ...player, oya: !player.oya };
        } else {
          // Ensure all other players have Oya turned off
          return { ...player, oya: false };
        }
      })
    );
  };

  const toggleReach = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, reach: !player.reach } : player
      )
    );
  };

  return (
    <div className="App">
      <div className="grid-container">
        {players.map((player) => (
          <div
            key={player.id}
            className={`grid-item player ${player.id} ${toggled[player.id] ? 'toggled' : ''}`}
            onClick={() => handleToggle(player.id)}
          >
            {player.id.charAt(0).toUpperCase() + player.id.slice(1)}: {player.score}
          </div>
        ))}
        <div
          className={`grid-item extension-count ${toggled.extension ? 'toggled' : ''}`}
        >
          Extensions: {extensionCount}
        </div>
        <div className="grid-item empty"></div> {/* empty1 */}
        <div className="grid-item empty"></div> {/* empty2 */}
        <div className="grid-item empty"></div> {/* empty3 */}
        <div className="grid-item empty">
          <div className="player-buttons">
            {players.map((player) => (
              <div key={player.id}>
                <button
                  className={player.oya ? 'active' : ''}
                  onClick={() => toggleOya(player.id)}
                >
                  {player.id.charAt(0).toUpperCase() + player.id.slice(1)} 오야
                </button>
                <button
                  className={player.reach ? 'active' : ''}
                  onClick={() => toggleReach(player.id)}
                >
                  {player.id.charAt(0).toUpperCase() + player.id.slice(1)} 리치
                </button>
              </div>
            ))}
          </div>
        </div> {/* empty4 */}
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
