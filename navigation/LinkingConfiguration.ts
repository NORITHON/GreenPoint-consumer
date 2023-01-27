/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Store: {
            screens: {
              StoreScreen: 'store',
            },
          },
          Point: {
            screens: {
              PointScreen: 'point',
            },
          },
          My: {
            screens: {
              MyScreen: 'my',
            },
          },
        },
      },
      Login: 'login',
      KakaoLogin: 'kakaoLogin',
      Register: 'register',
      Modal: 'modal',
      Map: 'map',
      NotFound: '*',
    },
  },
};

export default linking;
