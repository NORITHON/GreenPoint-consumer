interface ILevel {
  id: number;
  name: string;
  img: string;
}

export interface IUser {
  id: number;
  kakaoToken: string;
  name: string;
  level: ILevel;
  contact: string;
  image: string;
  nickname: string;
  latitude: number;
  longitude: number;
  point: number;
  totalPoint: number;
}

export interface IStore {
  id: number;
  name: string;
  point: number;
  img: string;
}
