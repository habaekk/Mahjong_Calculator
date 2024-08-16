import { useRecoilState, useRecoilValue } from 'recoil';
import { playersState } from './recoil/playerState';
import { gameStateAtom } from './recoil/gameState';
import tsumo_oya from './score_data/tsumo_oya';
import tsumo_ja_oya from './score_data/tsumo_ja_oya'
import tsumo_ja_ja from './score_data/tsumo_ja_ja';
import { reachCountState } from './recoil/reachCountState';


const useCalculateTsu = () => {
  const [players, setPlayers] = useRecoilState(playersState);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const reachCount = useRecoilValue(reachCountState);


  const calculateTsu = ({ fan, fu, winnerId, oya }) => {
    let tsu_score_oya;
    let tsu_score_ja_oya;
    let tsu_score_ja_ja;

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


    if (fu === 20) {
      fu = 1;
    } else {
      fu = Math.floor(fu / 10);
    }

    // 오야 여부에 따른 점수 결정
    if (winnerId == oya) {
        tsu_score_oya = tsumo_oya[fan][fu];
      
    } else {
        tsu_score_ja_oya = tsumo_ja_oya[fan][fu];
        tsu_score_ja_ja = tsumo_ja_ja[fan][fu];
        
    }  
    console.log(tsu_score_ja_oya)

    // 점수 반영: 승자는 점수를 얻고, 패자는 점수를 잃음
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (winnerId == oya) {
            if (player.id === winnerId) {
                return { ...player, score: player.score + tsu_score_oya * 3 + gameState.wins * 300 + reachCount * 1000};
            } else {
                return { ...player, score: player.score - tsu_score_oya - gameState.wins * 100 };
            }
        } else {
            if (player.id === winnerId) {
                return { ...player, score: player.score + tsu_score_ja_oya + tsu_score_ja_ja*2 + reachCount * 1000 }
            } else if (player.id == oya) {
                return { ...player, score: player.score - tsu_score_ja_oya}
            } else {
                return { ...player, score: player.score - tsu_score_ja_ja}
            }
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

  return calculateTsu;
};

export default useCalculateTsu;
