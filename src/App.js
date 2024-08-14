import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';
import { gameStateAtom } from './recoil/gameState';
import useCalculateRon from './useCalculateRon';
import useCalculateTsu from './useCalculateTsu';

function App() {
  const [players, setPlayers] = useRecoilState(playersState);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const [extensionCount, setExtensionCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const calculateRon = useCalculateRon();
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

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (position) => {
    const isAlreadyToggled = toggled[position];
    const newToggled = { ...toggled, [position]: !toggled[position] };

    if (isAlreadyToggled) {
      console.log(`Block ${position} was toggled off`);
      const newSelectedOrder = selectedOrder.filter((item) => item !== position);
      setIsModalOpen(true);
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);
    } else {
      const newSelectedOrder = [...selectedOrder, position];
      setToggled(newToggled);
      setSelectedOrder(newSelectedOrder);

      if (newSelectedOrder.length === 2) {
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

          setSelectedOrder([]);
          setIsModalOpen(true);
        }, 100);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleOya = (id) => {
    // 먼저 Recoil 상태 업데이트
    setGameState((prevState) => ({
      ...prevState,
      oya: id, // 새로운 오야로 설정
    }));

    // 이후 Players 상태 업데이트
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        oya: player.id === id, // 선택된 플레이어만 오야로 설정
      }))
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
    calculateRon({
      fan: 3,
      fu: 30,
      winnerId: 'east',
      loserId: 'south',
      oya: gameState.oya === 'east',
    });
  };

  const handleTsu = () => {
    calculateTsu({
      fan: 3,
      fu: 30,
      winnerId: 'east',
      oya: gameState.oya === 'east',
    });
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
