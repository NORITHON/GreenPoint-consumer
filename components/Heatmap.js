import HeatMap from 'react-native-heatmap-chart';

export const GreenCalendar = () => {
  const now = new Date();
  return (
    <HeatMap
      values={[
        ...Array(100).fill(0),
        0,
        4,
        6,
        1,
        7,
        3,
        0,
        8,
        6,
        2,
        0,
        10,
        20,
        12,
        0,
        0,
        10,
        0,
        17,
        8,
        0,
        6,
        0,
        6,
        10,
        23,
      ].slice(-78 - now.getDay())}
      blocksSize={20}
    />
  );
};
