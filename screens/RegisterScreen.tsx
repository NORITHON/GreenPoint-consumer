import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { theme } from '../constants/Colors';

interface IFormData {
  nickname: string;
  name: string;
  latitude: number;
  longitude: number;
  contact: string;
  image: string;
  kakaoToken: string;
}

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const increaseStep = () => setStep((old) => old + 1);
  const decreaseStep = () => setStep((old) => old - 1);
  const { watch, control, handleSubmit } = useForm<IFormData>();
  const onSubmit = (data: IFormData) => {
    console.log(data);
    increaseStep();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={step < 3 ? styles.container : styles.container2}>
        {step === 0 && (
          <>
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
            <TouchableOpacity
              style={watch('nickname') ? styles.activeBtn : styles.button}
              disabled={watch('nickname') ? false : true}
              onPress={increaseStep}
              activeOpacity={0.7}
            >
              <Text style={watch('nickname') ? styles.activeText : styles.text}>다음</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 1 && (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={decreaseStep} activeOpacity={0.5}>
              <FontAwesome5 name="chevron-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {watch('nickname')}님의 현재 위치를{'\n'}입력해주세요
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="지번, 도로명, 건물명으로 검색"
                  placeholderTextColor={'#8B95A1'}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value + ''}
                />
              )}
              name="latitude"
            />
            <TouchableOpacity
              style={watch('latitude') ? styles.activeBtn : styles.button}
              disabled={watch('latitude') ? false : true}
              onPress={increaseStep}
              activeOpacity={0.7}
            >
              <Text style={watch('latitude') ? styles.activeText : styles.text}>다음</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 2 && (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={decreaseStep} activeOpacity={0.5}>
              <FontAwesome5 name="chevron-left" size={24} />
            </TouchableOpacity>
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
                />
              )}
              name="contact"
            />
            <TouchableOpacity
              style={watch('contact') ? styles.activeBtn : styles.button}
              disabled={watch('contact') ? false : true}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.7}
            >
              <Text style={watch('contact') ? styles.activeText : styles.text}>완료</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 3 && (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={decreaseStep} activeOpacity={0.5}>
              <FontAwesome5 name="chevron-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.title2}>
              {watch('nickname')}님{'\n'}반가워요
            </Text>
            <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
            <TouchableOpacity style={styles.activeBtn} onPress={increaseStep} activeOpacity={0.7}>
              <Text style={styles.activeText}>다음으로</Text>
            </TouchableOpacity>
          </>
        )}
        {step === 4 && (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={decreaseStep} activeOpacity={0.5}>
              <FontAwesome5 name="chevron-left" size={24} />
            </TouchableOpacity>
            <Text style={styles.title2}>그린 포인트를 모으면서{'\n'}환경을 지켜주세요!</Text>
            <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
            <TouchableOpacity
              style={styles.activeBtn}
              onPress={() => navigation.reset({ routes: [{ name: 'Root' }] })}
              activeOpacity={0.7}
            >
              <Text style={styles.activeText}>포인트 모으러 가기</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'center',
  },
  title2: {
    position: 'absolute',
    top: 100,
    left: 24,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  avatar: {
    width: 300,
    height: 225,
    // borderRadius: 200,
    marginBottom: 44,
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
    position: 'absolute',
    bottom: 48,
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
  },
  activeBtn: {
    position: 'absolute',
    bottom: 48,
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
