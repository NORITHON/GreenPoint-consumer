export const theme = {
  primary: {
    main: '#7BD88A',
    contrastText: '#fff',
  },
  disabled: '#EFEFEF',
};
const tintColorLight = '#7BD88A';
const tintColorDark = '#7BD88A';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
