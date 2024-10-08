import { atom } from 'recoil';

export const playersState = atom({
  key: 'playersState', // unique ID (with respect to other atoms/selectors)
  default: [
    { id: 'east', score: 25000, oya: true, reach: false, tenpai: false, },
    { id: 'south', score: 25000, oya: false, reach: false, tenpai: false, },
    { id: 'west', score: 25000, oya: false, reach: false, tenpai: false, },
    { id: 'north', score: 25000, oya: false, reach: false, tenpai: false, },
  ], // default value (initial value)
});
