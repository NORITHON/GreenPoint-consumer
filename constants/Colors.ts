export const theme = {
  primary: {
    main: '#55DB82',
    contrastText: '#fff',
  },
  secondary: {
    main: '#EE7D79',
  },
  disabled: '#EFEFEF',
};
const tintColorLight = '#55DB82';
const tintColorDark = '#55DB82';

export default {
  light: {
    text: '#333',
    textSecondary: '#B0B8C1',
    background: '#FAFAFA',
    paper: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    textSecondary: '#919EAB',
    background: '#161817',
    paper: '#242625',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
