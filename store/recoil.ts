import { atom } from 'recoil';
import { IUser } from './types';

export const userState = atom<IUser | null>({
  key: 'user',
  default: null,
});
