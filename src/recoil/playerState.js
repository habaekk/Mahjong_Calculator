import { atom } from 'recoil';

export const playersState = atom({
  key: 'playersState', // unique ID (with respect to other atoms/selectors)
  default: [
    { id: 'east', score: 25000, oya: true, reach: false },
    { id: 'south', score: 25000, oya: false, reach: false },
    { id: 'west', score: 25000, oya: false, reach: false },
    { id: 'north', score: 25000, oya: false, reach: false },
  ], // default value (initial value)
});
