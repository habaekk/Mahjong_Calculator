import { selector } from 'recoil';
import { playersState } from './playersState'; // playersState가 정의된 파일 경로

export const tenpaiCountState = selector({
  key: 'tenpaiCountState', // 고유한 key
  get: ({ get }) => {
    const players = get(playersState); // playersState 상태를 가져옴
    // tenpai 상태가 true인 플레이어의 수를 계산
    return players.filter(player => player.tenpai).length;
  },
});
