import { REST_API_KEY, REDIRECT_URI } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QueryString from 'qs';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useSetRecoilState } from 'recoil';
import { getUser, login } from '../apis/auth';
import { View } from '../components/Themed';
import { userState } from '../store/recoil';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KaKaoLoginScreen() {
  const navigation = useNavigation();
  const setUser = useSetRecoilState(userState);

  const requestToken = async (code: string) => {
    const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

    const options = QueryString.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    try {
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const reponseData = await login(tokenResponse.data.access_token);
      if (reponseData.registered) {
        const userData = await getUser(reponseData.kakaoId);
        if (!userData) alert('오류발생');
        setUser(userData);
        navigation.reset({ routes: [{ name: 'Root' }] });
      } else {
        navigation.reset({ routes: [{ name: 'Register', params: reponseData }] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
