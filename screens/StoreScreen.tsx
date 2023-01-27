import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { getStores } from '../apis/store';
import SearchBar from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { userState } from '../store/recoil';
import { IStore } from '../store/types';

export default function StoreScreen() {
  const theme = useColorScheme();
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [stores, setStores] = useState<IStore[]>([]);
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      const data = await getStores(user.id);
      setStores(data);
    };
    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: Colors[theme].paper }}>
        <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList
          style={{ width: '100%', backgroundColor: 'inherit' }}
          data={stores.filter((item) => item.name.includes(searchPhrase.trim()))}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 17,
                paddingHorizontal: 19,
                backgroundColor: 'inherit',
              }}
            >
              <Image
                style={styles.storeLogo}
                source={{
                  uri: item.image,
                }}
              />
              <View style={{ marginLeft: 12, backgroundColor: 'inherit' }}>
                <Text style={{ marginBottom: 6, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: Colors[theme].textSecondary, fontWeight: '600' }}>
                  <FontAwesome5 name="bitcoin" size={15} color={Colors[theme].tint} />{' '}
                  {item.totalPoint}
                  포인트 적립 가능
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              <Pressable
                onPress={() => navigation.navigate('Map', { ...item })}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome5
                  name="chevron-right"
                  size={24}
                  color={Colors[theme].tabIconDefault}
                  style={{ marginRight: 4 }}
                />
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id + ''}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 52,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: '88%',
  },
  storeLogo: {
    width: 54,
    height: 54,
    borderRadius: 50,
    marginBottom: 8,
  },
});
