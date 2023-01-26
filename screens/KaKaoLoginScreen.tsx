import { REST_API_KEY, REDIRECT_URI } from '@env';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QueryString from 'qs';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { View } from '../components/Themed';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KaKaoLoginScreen() {
  const navigation = useNavigation();

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
      const ACCESS_TOKEN = tokenResponse.data.access_token;

      // console.log(ACCESS_TOKEN);
      navigation.reset({ routes: [{ name: 'Register' }] });
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
