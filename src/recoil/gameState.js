import { atom } from 'recoil';

// 게임 상태를 관리하는 atom 생성
export const gameStateAtom = atom({
  key: 'gameState', // 고유한 key (Recoil 상태를 식별하기 위한 ID)
  default: {
    fan: 0,
    fu: 0,
    oya: null,
    winnerID: null,
    loserID: null,
    isRon: null,
  },
});
