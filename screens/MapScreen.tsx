import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { View } from '../components/Themed';
import { theme } from '../constants/Colors';
import { userState } from '../store/recoil';
import { IStore } from '../store/types';

export default function MapScreen() {
  const route = useRoute();
  const { name, latitude, longitude } = route.params as IStore;
  const user = useRecoilValue(userState);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: user?.latitude ?? 36.103116,
            longitude: user?.longitude ?? 129.388368,
          }}
          title="내 위치"
        />
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={name}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 18,
    height: 48,
    color: theme.secondary.main,
  },
});
