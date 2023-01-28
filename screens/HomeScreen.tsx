import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getDailyPoint, getRecentStores } from '../apis/store';
import { GreenCalendar } from '../components/GreenCalendar';
import { Text, View } from '../components/Themed';
import Colors, { theme } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userState } from '../store/recoil';
import { RootTabScreenProps } from '../types';

interface IRecentStore {
  currentPoint: number;
  savedPoint: number;
  storeName: string;
  usedPoint: number;
  image: string;
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useRecoilValue(userState);
  const theme = useColorScheme();
  const [recentStores, setRecentStores] = useState<IRecentStore[]>([]);
  const [dailyPoint, setDailyPoint] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      const data = await getRecentStores(user.id);
      const dailyPoint = await getDailyPoint(user.id);
      setRecentStores(data);
      setDailyPoint(dailyPoint);
    };
    loadData();
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            {user?.nickname}님{'\n'}안녕하세요!
          </Text>
          <View style={{ ...styles.card, backgroundColor: Colors[theme].paper }}>
            <Text style={styles.cardEmoji}>💸</Text>
            <Text style={styles.cardTitle}>야금야금 모았더니{'\n'}벌써 이만큼</Text>
            <Text style={{ ...styles.cardSubTitle, marginTop: 19 }}>
              내 포인트 |&nbsp;&nbsp;
              <FontAwesome5 name="bitcoin" size={16} /> {user?.point}원
            </Text>
          </View>
          <View
            style={{
              ...styles.card,
              backgroundColor: Colors[theme].paper,
            }}
          >
            <Text style={styles.cardTitle2}>최근 적립</Text>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                backgroundColor: 'inherit',
                marginVertical: 30,
              }}
            >
              {recentStores.length ? (
                recentStores.map((item, index) => (
                  <View key={index} style={{ backgroundColor: 'inherit', alignItems: 'center' }}>
                    <Image
                      style={styles.storeLogo}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <Text
                      style={{
                        color: Colors[theme].textSecondary,
                        fontWeight: '500',
                        marginBottom: 4,
                      }}
                    >
                      {item.storeName}
                    </Text>
                    <Text style={{ fontWeight: '500' }}>
                      <FontAwesome5 name="bitcoin" size={16} /> {item.savedPoint}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontWeight: '500', lineHeight: 20 }}>
                  최근 적립이 없습니다.{'\n'}포인트를 쌓아보세요!
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              ...styles.card,
              backgroundColor: Colors[theme].paper,
              marginBottom: 48,
            }}
          >
            <Text style={styles.cardTitle2}>그린 캘린더</Text>
            <View
              style={{
                backgroundColor: 'inherit',
                marginVertical: 20,
              }}
            >
              <GreenCalendar dailyPoint={dailyPoint} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 96,
  },
  scrollView: {
    width: '100%',
  },
  title: {
    width: '88%',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 40,
  },
  card: {
    marginTop: 24,
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
  cardEmoji: {
    fontSize: 42,
    fontWeight: '600',
    lineHeight: 50,
    textAlign: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
  },
  cardTitle2: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 24,
  },
  cardSubTitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginBottom: 8,
  },
});
