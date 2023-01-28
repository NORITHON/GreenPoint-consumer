interface ILevel {
  id: number;
  name: string;
  img: string;
}

export interface IUser {
  id: number;
  kakaoId: number;
  level: ILevel;
  contact: string;
  image: string;
  nickname: string;
  latitude: number;
  longitude: number;
  point: number;
  totalPoint: number;
}

interface IStoreLevel {
  grade: number;
  id: number;
  image: string;
  name: string;
}

export interface IStore {
  category: string;
  id: number;
  image: string;
  latitude: number;
  loginID: string;
  longitude: number;
  name: string;
  password: string;
  storeLevel: IStoreLevel;
  totalPoint: number;
  maximumPoint: number;
}
