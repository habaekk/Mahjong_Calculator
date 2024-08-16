import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import { useRecoilState, useRecoilValue  } from 'recoil';
import { playersState } from './recoil/playerState';
import { gameStateAtom } from './recoil/gameState';
import { tenpaiCountState } from './recoil/tenpaiCountState ';

function App() {
  const [players, setPlayers] = useRecoilState(playersState);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const tenpaiCount = useRecoilValue(tenpaiCountState);

  const [toggled, setToggled] = useState({
    north: false,
    east: false,
    south: false,
    west: false,
  });

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDraw = () => {
    console.log("유국 처리");
    // 여기에 유국 처리 로직을 추가하세요.
    let tenpaiScore_get
    let tenpaiScore_lose
    if (tenpaiCount === 1 ) {
      tenpaiScore_get = 3000
      tenpaiScore_lose = 1000
    } else if (tenpaiCount === 2 ) {
      tenpaiScore_get = 1500
      tenpaiScore_lose = 1500
    } else if (tenpaiCount === 3) {
      tenpaiScore_get = 1000
      tenpaiScore_lose = 3000
    } else {
      tenpaiScore_get = 0
      tenpaiScore_lose = 0
    }

    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.tenpai) {
          return { ...player, score: player.score + tenpaiScore_get, tenpai: false };
        } else {
          return { ...player, score: player.score - tenpaiScore_lose};
        }
      })
    );


  };
  

  const handleToggle = (position) => {
    const isAlreadyToggled = toggled[position];
    const newToggled = { ...toggled, [position]: !toggled[position] };

    if (isAlreadyToggled) {
      console.log(`Block ${position} was toggled off`);
      setTsumoPlayerID(position)
      setRonState(false)

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
          setRonPlayerID(firstBlock, secondBlock)
          setRonState(true)

          setToggled({
            north: false,
            east: false,
            south: false,
            west: false,
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

  const setTsumoPlayerID = (id) => {
    setGameState((prevState) => ({
      ...prevState,
      winnerID: id,
    }))
  }

  const setRonPlayerID = (winner, loser) => {
    setGameState((prevState) => ({
      ...prevState,
      winnerID: winner,
      loserID: loser,
    }))
  }

  const setRonState = (ron) => {
    setGameState((prevState) => ({
      ...prevState,
      isRon: ron,
    }))
  }

  const toggleTenpai = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, tenpai: !player.tenpai } : player
      ))
  }

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
      prevPlayers.map((player) => {
        if (player.id === id) {
          // 리치를 켜는 경우 1000점 차감, 끄는 경우 1000점 추가
          const newReachState = !player.reach;
          const newScore = newReachState ? player.score - 1000 : player.score + 1000;
          return { ...player, reach: newReachState, score: newScore };
        }
        return player; // id가 일치하지 않으면 기존 player 반환
      })
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
            <div className="player-status">
              <div>{player.id.charAt(0).toUpperCase() + player.id.slice(1)}: {player.score}</div>
              {player.oya && <div className="status oya">오야</div>}
              {player.reach && <div className="status reach">리치!</div>}
              {player.tenpai && <div className="status tenpai">텐파이</div>}
            </div>
          </div>
        ))}
        <div className={`grid-item extension-count`}></div>
        <div className="grid-item empty">
          <div className="wins-count">
            연승 수: {gameState.wins}
          </div>    
        </div> {/* empty1 */}
        <div className="grid-item empty"></div> {/* empty2 */}
        <div className="grid-item empty">
          {/* <button onClick={handleDrawGame} className="large-button">유국</button> */}
          <div className="player-buttons">
            {players.map((player) => (
                <div key={player.id}>
                  <button
                    className={player.tenpai ? 'active' : ''}
                    onClick={() => toggleTenpai(player.id)}
                  >
                    {player.id.charAt(0).toUpperCase() + player.id.slice(1)} 텐파이
                  </button>
                
                </div>
              ))}
          </div>
          <div>
            <button className='draw-button' onClick={() => handleDraw()}>유국 실행</button>
          </div>
          
        </div> {/* empty3 */}


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

// 유국 시 연승 로직
// 동 자동 김