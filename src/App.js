import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';
import useCalculateRon from './useCalculateRon'; // 사용자가 정의한 훅을 import
import useCalculateTsu from './useCalculateTsu';

function App() {
  const [players, setPlayers] = useRecoilState(playersState); // Recoil 상태 사용
  const [extensionCount, setExtensionCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const calculateRon = useCalculateRon(); // 훅을 통해 점수 계산 함수를 가져옴
  const calculateTsu = useCalculateTsu();


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

  const handleRon = () => {
    // 예시로 East가 South를 이긴 상황을 가정
    calculateRon({
      fan: 3,
      fu: 30,
      winnerId: 'east',
      loserId: 'south',
      oya: true,
    });
  };

  const handleTsu = () => {
    calculateTsu({
      fan: 3,
      fu: 30,
      winnerId: 'east',
      oya: false,
    });
  }

  return (
    <div className="App">
      <div className="grid-container">
        {players.map((player) => (
          <div
            key={player.id}
            className={`grid-item player ${player.id} ${toggled[player.id] ? 'toggled' : ''}`}
            onClick={() => handleToggle(player.id)}
          >
            <div className="player-status">
              <div>{player.id.charAt(0).toUpperCase() + player.id.slice(1)}: {player.score}</div>
              {player.oya && <div className="status oya">오야</div>}
              {player.reach && <div className="status reach">리치!</div>}
            </div>
          </div>
        ))}
        <div
          className={`grid-item extension-count ${toggled.extension ? 'toggled' : ''}`}
          onClick={() => handleToggle('extension')}
        >
          Extensions: {extensionCount}
        </div>
        <div className="grid-item empty">
          <button onClick={handleRon}>론 실행</button>
          <button onClick={handleTsu}>쯔모 실행</button>
        </div> {/* empty1 */}
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
