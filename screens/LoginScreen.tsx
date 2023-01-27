import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
      <Text style={styles.title}>
        그린포인트에 오신 것을 환영해요{'\n'}카카오톡을 통해 로그인해주세요
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KakaoLogin')}
        activeOpacity={0.7}
      >
        <Image style={styles.symbol} source={require('../assets/images/kakao_symbol.png')} />
        <Text style={styles.text}>카카오톡으로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 170,
  },
  avatar: {
    height: 320,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#FEE500',
    width: '88%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
  },
  symbol: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },
});
