/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import KaKaoLoginScreen from '../screens/KaKaoLoginScreen';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import MapScreen from '../screens/MapScreen';
import { useRecoilState } from 'recoil';
import { userState } from '../store/recoil';
import MyScreen from '../screens/MyScreen';
import PointScreen from '../screens/PointScreen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../apis/auth';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const reponseData = await login(token);
        if (reponseData.registered) {
          setUser(reponseData);
        }
      }
    }
    init();
  }, []);

  return (
    <Stack.Navigator initialRouteName={user ? 'Root' : 'Login'}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="KakaoLogin"
        component={KaKaoLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={({ route }) => ({
            title: route.params?.name,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerTransparent: true,
          title: '홈',
          headerTitle: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerTransparent: true,
          title: '가맹점',
          headerTitle: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Point"
        component={PointScreen}
        options={{
          headerTransparent: true,
          title: '포인트',
          headerTitle: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="coins" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="My"
        component={MyScreen}
        options={({ navigation }: RootTabScreenProps<'My'>) => ({
          headerTransparent: true,
          title: '마이',
          headerTitle: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5
                name="cog"
                size={24}
                color={Colors[colorScheme].tabIconDefault}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}
