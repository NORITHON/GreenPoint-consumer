import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getHistories } from '../apis/store';
import { Text, View } from '../components/Themed';
import Colors, { theme } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userState } from '../store/recoil';

interface IHistory {
  storeName: string;
  savedPoint: number;
  usedPoint: number;
  currentPoint: number;
  image: string;
}

export default function PointScreen() {
  const themeMode = useColorScheme();
  const user = useRecoilValue(userState);
  const [history, setHistories] = useState<IHistory[]>([]);
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      const data = await getHistories(user.id);
      setHistories(data);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.paper, backgroundColor: Colors[themeMode].paper }}>
        <Text style={{ color: Colors[themeMode].textSecondary, fontWeight: '500' }}>
          내 그린포인트
        </Text>
        <Text style={{ fontWeight: '500' }}>{user?.point}원</Text>
      </View>
      <Text style={{ fontWeight: '600', width: '88%', marginVertical: 30 }}>포인트 전체 내역</Text>
      <FlatList
        style={{ width: '100%' }}
        data={history}
        renderItem={({ item, index }) => (
          <View
            style={{
              ...styles.card,
              backgroundColor: Colors[themeMode].paper,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 17,
              paddingHorizontal: 19,
              marginBottom: index === history.length - 1 ? 48 : 0,
            }}
          >
            <Image
              style={styles.storeLogo}
              source={{
                uri: item.image,
              }}
            />
            <View style={{ marginLeft: 12, backgroundColor: 'inherit' }}>
              <Text style={{ marginBottom: 6, fontWeight: '600' }}>{item.storeName}</Text>
              <Text style={{ color: Colors[themeMode].textSecondary, fontWeight: '600' }}>
                {item.currentPoint}원
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ backgroundColor: 'inherit' }}>
              <Text
                style={{
                  marginBottom: 4,
                  fontWeight: '600',
                  textAlign: 'right',
                  color: theme.primary.main,
                }}
              >
                {item.savedPoint}원
              </Text>
              <Text
                style={{
                  marginBottom: 4,
                  fontWeight: '600',
                  textAlign: 'right',
                  color: theme.secondary.main,
                }}
              >
                -{item.usedPoint}원
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  textAlign: 'right',
                  color: Colors[themeMode].textSecondary,
                }}
              >
                {item.currentPoint}원
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index + ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 74,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paper: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '6%',
  },
  storeLogo: {
    width: 54,
    height: 54,
    borderRadius: 50,
    marginBottom: 8,
  },
  card: {
    alignSelf: 'center',
    marginTop: 20,
    width: '88%',
    padding: 18,
    paddingTop: 25,
    paddingBottom: 20,
    borderRadius: 24,
    shadowColor: theme.primary.main,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 1,
  },
});
