import Postcode from '@actbase/react-daum-postcode';
import { REST_API_KEY } from '@env';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { getUser, register } from '../apis/auth';
import { Text, View } from '../components/Themed';
import Colors, { theme } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userState } from '../store/recoil';

export interface IRegisterData {
  nickname: string;
  latitude: number;
  longitude: number;
  contact: string;
  id: number;
}

interface IBackBtn {
  decreaseStep: () => void;
}

const BackBtn = ({ decreaseStep }: IBackBtn) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity style={styles.backBtn} onPress={decreaseStep} activeOpacity={0.5}>
      <FontAwesome5 name="chevron-left" size={24} color={Colors[theme].tabIconDefault} />
    </TouchableOpacity>
  );
};

export default function RegisterScreen() {
  const { params } = useRoute();
  const { nickname, kakaoId } = params as { nickname: string; kakaoId: number };
  const setUser = useSetRecoilState(userState);
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<string>();
  const { watch, control, handleSubmit, setValue } = useForm<IRegisterData>({
    defaultValues: { nickname, id: kakaoId },
  });
  const increaseStep = () => {
    Keyboard.dismiss();
    setStep((old) => {
      if (old == 0 && watch('latitude')) return 2;
      return old + 1;
    });
  };
  const decreaseStep = () => setStep((old) => old - 1);
  const onSubmit = async (data: IRegisterData) => {
    const responseData = await register(data);
    if (!responseData) alert('오류발생');
    const userData = await getUser(data.id);
    if (!userData) alert('오류발생');
    setUser(userData);
    increaseStep();
  };
  const getAddressData = (data: any) => {
    const defaultAddress = data.buildingName === 'N' ? data.apartment : data.buildingName;
    const config = { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } };
    const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + data.address;
    axios.get(url, config).then(function (result) {
      if (result.data !== undefined || result.data !== null) {
        if (result.data.documents[0].x && result.data.documents[0].y) {
          setValue('latitude', result.data.documents[0].y);
          setValue('longitude', result.data.documents[0].x);
          setLocation(defaultAddress);
        }
      }
    });
  };
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      setValue('latitude', latitude);
      setValue('longitude', longitude);
    })();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ ...styles.container, display: step === 0 ? 'flex' : 'none' }}>
          <Text style={styles.title}>그린포인트에서 사용할{'\n'}닉네임을 알려주세요</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="닉네임을 입력해주세요"
                placeholderTextColor={'#8B95A1'}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="nickname"
          />
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={watch('nickname') ? styles.activeBtn : styles.button}
            disabled={watch('nickname') ? false : true}
            onPress={increaseStep}
            activeOpacity={0.7}
          >
            <Text style={watch('nickname') ? styles.activeText : styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.container, display: step === 1 ? 'flex' : 'none' }}>
          <BackBtn decreaseStep={decreaseStep} />
          <Text style={styles.title}>
            {watch('nickname')}님의 현재 위치를{'\n'}입력해주세요{'\n'}
            {location && (
              <Text lightColor={theme.primary.main} darkColor={theme.primary.main}>
                {location && `${location} 선택됨`}
              </Text>
            )}
          </Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Postcode
            style={{ flex: 1, width: '100%', marginBottom: 20 }}
            jsOptions={{ animation: true }}
            onSelected={(data) => getAddressData(data)}
            onError={function (error: unknown): void {
              throw new Error('Function not implemented.');
            }}
          />
          <TouchableOpacity
            style={watch('latitude') ? styles.activeBtn : styles.button}
            disabled={watch('latitude') ? false : true}
            onPress={increaseStep}
            activeOpacity={0.7}
          >
            <Text style={watch('latitude') ? styles.activeText : styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.container, display: step === 2 ? 'flex' : 'none' }}>
          <BackBtn decreaseStep={decreaseStep} />
          <Text style={styles.title}>
            {watch('nickname')}님의 전화번호를{'\n'}입력해주세요
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="전화번호를 입력해주세요"
                placeholderTextColor={'#8B95A1'}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="contact"
          />
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={watch('contact') ? styles.activeBtn : styles.button}
            disabled={watch('contact') ? false : true}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.7}
          >
            <Text style={watch('contact') ? styles.activeText : styles.text}>완료</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.container2, display: step === 3 ? 'flex' : 'none' }}>
          <BackBtn decreaseStep={decreaseStep} />
          <Text style={styles.title2}>
            {watch('nickname')}님{'\n'}반가워요
          </Text>
          <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.activeBtn} onPress={increaseStep} activeOpacity={0.7}>
            <Text style={styles.activeText}>다음으로</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.container2, display: step === 4 ? 'flex' : 'none' }}>
          <BackBtn decreaseStep={decreaseStep} />
          <Text style={styles.title2}>그린 포인트를 모으면서{'\n'}환경을 지켜주세요!</Text>
          <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.activeBtn}
            onPress={() => navigation.reset({ routes: [{ name: 'Root' }] })}
            activeOpacity={0.7}
          >
            <Text style={styles.activeText}>포인트 모으러 가기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 104,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '88%',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
  },
  title2: {
    position: 'absolute',
    top: 100,
    width: '88%',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  separator: {
    marginTop: 8,
    height: 1,
    width: '100%',
  },
  avatar: {
    height: 320,
    resizeMode: 'contain',
    marginBottom: 24,
    position: 'absolute',
  },
  input: {
    height: 40,
    width: '88%',
    borderRadius: 10,
    backgroundColor: '#EFEFEF',
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#EFEFEF',
    width: '88%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
  },
  activeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: theme.primary.main,
    width: '88%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#8B95A1',
  },
  activeText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: theme.primary.contrastText,
  },
  backBtn: {
    position: 'absolute',
    top: 54,
    left: 20,
  },
});
