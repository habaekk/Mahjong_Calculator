/*
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
*/

function Ron(han, fu, winner, loser) {
  // 기본 점수 계산
  const basePoints = fu * Math.pow(2, han + 2);

  let winnerPoints = basePoints;
  let loserPoints = basePoints;

  // 판의 경우를 처리
  if (han >= 5) { // 역만 이상의 경우
    winnerPoints = 8000 * Math.floor(han / 5); // 5판마다 역만으로 계산
  }

  // 오야와 비오야 계산
  if (1) {
    winnerPoints = winnerPoints * 6; // 오야가 이기면 6배 점수를 받음
  } else {
    loserPoints = loserPoints * 4; // 비오야가 오야를 이기면 4배를 받음
  }

  // 패배한 플레이어 점수에서 감점
  loser -= loserPoints;
  winner += winnerPoints;

  // 결과 반환
  return { winner, loser };
}

export default Ron;

