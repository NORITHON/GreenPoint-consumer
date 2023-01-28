import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Text, View } from '../components/Themed';
import Colors, { theme } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userState } from '../store/recoil';

export default function MyScreen() {
  const user = useRecoilValue(userState);
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={{ ...styles.card, backgroundColor: Colors[theme].paper }}>
        <View
          style={{
            justifyContent: 'space-between',
            backgroundColor: 'inherit',
            flexDirection: 'row',
          }}
        >
          <View style={{ backgroundColor: 'inherit', marginBottom: 32 }}>
            <Text
              style={{ fontWeight: '600', fontSize: 28, marginBottom: 8, alignItems: 'center' }}
            >
              {user?.nickname}{' '}
              <Image
                style={{ ...styles.levelImage, display: user?.level?.id === 1 ? 'flex' : 'none' }}
                source={require('../assets/images/level1.png')}
              />
              <Image
                style={{ ...styles.levelImage, display: user?.level?.id === 2 ? 'flex' : 'none' }}
                source={require('../assets/images/level2.png')}
              />
              <Image
                style={{ ...styles.levelImage, display: user?.level?.id === 3 ? 'flex' : 'none' }}
                source={require('../assets/images/level3.png')}
              />
            </Text>
            <Text style={{ fontWeight: '600', color: Colors[theme].textSecondary }}>
              {user?.contact}
            </Text>
          </View>
          <View style={{ backgroundColor: 'inherit' }}>
            <Image
              style={styles.profileImage}
              source={{
                uri: user?.image,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('준비중인 기능입니다.')}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>프로필 편집</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 106,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    alignSelf: 'center',
    marginTop: 20,
    width: '88%',
    paddingHorizontal: 24,
    paddingVertical: 32,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#EFEFEF',
    width: '100%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#8B95A1',
  },
  levelImage: {
    width: 18,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 4,
    marginBottom: 6,
  },
  profileImage: {
    width: 62,
    height: 62,
    borderRadius: 62,
  },
});
