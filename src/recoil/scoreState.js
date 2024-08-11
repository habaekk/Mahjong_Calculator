import { atom } from 'recoil';

export const scoreState = atom({
  key: 'scoreState', // unique ID (with respect to other atoms/selectors)
  default: { east: 25000, south: 25000, west: 25000, north: 25000 }, // default value (aka initial value)
});
