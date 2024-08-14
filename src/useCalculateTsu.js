import { useRecoilState } from 'recoil';
import { playersState } from './recoil/playerState';
import tsumo_oya from './score_data/tsumo_oya';
import tsumo_ja_oya from './score_data/tsumo_ja_oya'
import tsumo_ja_ja from './score_data/tsumo_ja_ja';

const useCalculateTsu = () => {
  const [players, setPlayers] = useRecoilState(playersState);

  const calculateTsu = ({ fan, fu, winnerId, oya }) => {
    let tsu_score_oya;
    let tsu_score_ja_oya;
    let tsu_score_ja_ja;


    if (fu === 20) {
      fu = 1;
    } else {
      fu = Math.floor(fu / 10);
    }

    // 오야 여부에 따른 점수 결정
    if (oya) {
        tsu_score_oya = tsumo_oya[fan][fu];
      
    } else {
        tsu_score_ja_oya = tsumo_ja_oya[fan][fu];
        tsu_score_ja_ja = tsumo_ja_ja[fan][fu];
    }  

    // 점수 반영: 승자는 점수를 얻고, 패자는 점수를 잃음
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (oya) {
            if (player.id === winnerId) {
                return { ...player, score: player.score + tsu_score_oya * 3};
            } else {
                return { ...player, score: player.score - tsu_score_oya };
            }
        } else {
            if (player.id === winnerId) {
                return { ...player, score: player.score + tsu_score_ja_oya + tsu_score_ja_ja*2 }
            } else if (player.oya === true) {
                return { ...player, score: player.score - tsu_score_ja_oya}
            } else {
                return { ...player, score: player.score - tsu_score_ja_ja}
            }
        }
      })
    );
  };

  return calculateTsu;
};

export default useCalculateTsu;
