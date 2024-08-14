import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';
import ron_oya from './score_data/ron_oya';
import ron_ja from './score_data/ron_ja';

const useCalculateRon = () => {
  const [players, setPlayers] = useRecoilState(playersState);

  const calculateRon = ({ fan, fu, winnerId, loserId, oya }) => {
    let ron_score;

    if (fu === 20) {
      fu = 1;
    } else {
      fu = Math.floor(fu / 10);
    }

    // 오야 여부에 따른 점수 결정
    if (oya) {
      ron_score = ron_oya[fan][fu];
      
    } else {
      ron_score = ron_ja[fan][fu];
    }  

    // 점수 반영: 승자는 점수를 얻고, 패자는 점수를 잃음
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === winnerId) {
          return { ...player, score: player.score + ron_score };
        } else if (player.id === loserId) {
          return { ...player, score: player.score - ron_score };
        } else {
          return player;
        }
      })
    );
  };

  return calculateRon;
};

export default useCalculateRon;
