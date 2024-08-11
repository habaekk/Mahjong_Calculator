import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';

function ron(han, fu, winnerId, loserId) {
  const [players, setPlayers] = useRecoilState(playersState);

  // 점수 계산 로직
  const basePoints = fu * (2 ** (han + 2));
  let winnerPoints;
  let loserPoints;

  if (han >= 5) { // 역만 처리
    winnerPoints = basePoints * 4; // 기본 역만 계산
  } else {
    winnerPoints = basePoints;
  }

  loserPoints = winnerPoints;

  // 오야가 승리한 경우
  const winnerIsOya = players.find(player => player.id === winnerId).oya;

  if (winnerIsOya) {
    winnerPoints *= 1.5; // 오야는 점수를 1.5배로 가져감
  }

  // 패배한 플레이어 점수에서 감점
  setPlayers(prevPlayers => 
    prevPlayers.map(player => {
      if (player.id === winnerId) {
        return { ...player, score: player.score + Math.ceil(winnerPoints) };
      } else if (player.id === loserId) {
        return { ...player, score: player.score - Math.ceil(loserPoints) };
      } else {
        return player;
      }
    })
  );
}

export default ron;
