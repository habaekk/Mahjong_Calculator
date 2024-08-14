import React, { useState } from 'react';
import './Modal.css';
import GridComponent from './ScoreGrid'; // Import the 12x14 grid component
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../recoil/gameState'; // 게임 상태 atom을 import

const Modal = ({ show, onClose }) => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameState, setGameState] = useRecoilState(gameStateAtom); // Recoil 상태 사용

  if (!show) {
    return null;
  }

  const handleNextClick = () => {
    if (selectedCell) {
      console.log(`선택된 셀: ${selectedCell.fan}판 / ${selectedCell.fu}부`);
      
      // Recoil 상태 업데이트
      setGameState((prevState) => ({
        ...prevState,
        fan: selectedCell.fan,
        fu: selectedCell.fu,
      }));

      // 모달 닫기
      onClose();
    } else {
      console.log("선택된 셀이 없습니다.");
    }
  };

  const handleClose = () => {
    setSelectedCell({ fan: 0, fu: 0 }); // 판과 부를 0으로 초기화
    onClose(); // onClose 콜백 호출
  };

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <GridComponent onCellSelect={setSelectedCell} />
        <button className="next-button" onClick={handleNextClick}>
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default Modal;
