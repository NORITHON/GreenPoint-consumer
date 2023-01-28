import HeatMap from 'react-native-heatmap-chart';

export const GreenCalendar = ({ dailyPoint }) => {
  const now = new Date();
  return (
    <HeatMap
      values={[...Array(100).fill(0), ...dailyPoint].slice(-78 - now.getDay())}
      blocksSize={20}
    />
  );
};
