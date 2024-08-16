import { useRecoilState, useRecoilValue } from 'recoil';
import { playersState } from './recoil/playerState';
import { gameStateAtom } from './recoil/gameState';
import ron_oya from './score_data/ron_oya';
import ron_ja from './score_data/ron_ja';
import { reachCountState } from './recoil/reachCountState';


const useCalculateRon = () => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const reachCount = useRecoilValue(reachCountState);


  const calculateRon = ({ fan, fu, winnerId, loserId, oya }) => {
    let ron_score;

    if (fu === 20) {
      fu = 1;
    } else {
      fu = Math.floor(fu / 10);
    }
    console.log("Winner ID:", winnerId);
    console.log("Loser ID:", loserId);
    console.log("Oya:", oya);
    console.log("Score:", oya);

    // 연승 관리
    if (winnerId == oya) {
      setGameState((prevState) => ({
        ...prevState,
        wins: gameState.wins + 1,
      }))
    } else {
      setGameState((prevState) => ({
        ...prevState,
        wins: 0,
      }))
    }


    // 오야 여부에 따른 점수 결정
    if (winnerId == oya || loserId == oya) {
      ron_score = ron_oya[fan][fu];
    } else {
      ron_score = ron_ja[fan][fu];
    }  

    // 점수 반영: 승자는 점수를 얻고, 패자는 점수를 잃음
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === winnerId) {
          return { ...player, score: player.score + ron_score + gameState.wins * 300 + reachCount * 1000 };
        } else if (player.id === loserId) {
          return { ...player, score: player.score - ron_score - gameState.wins * 300 };
        } else {
          return player;
        }
      })
    );

    // reset reach bong
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        reach: false,
      }))
    );
  };

  return calculateRon;
};

export default useCalculateRon;
