import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { IStore } from '../store/types';

const storeList = [
  {
    id: 1,
    name: '스타벅스',
    point: 50,
    img: 'https://t1.daumcdn.net/cfile/tistory/99857F4F5E738F472F',
  },
  {
    id: 2,
    name: '드롭탑',
    point: 24,
    img: 'http://cafedroptop.com/n/kr/images/company/new_droptop_ci_img2_2.png',
  },
  {
    id: 3,
    name: '투썸플레이스',
    point: 19,
    img: 'data:image/png;base64,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',
  },
] as IStore[];

export default function StoreScreen() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: Colors[theme].paper }}>
        <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList
          style={{ width: '100%', backgroundColor: 'inherit' }}
          data={storeList}
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
                  uri: item.img,
                }}
              />
              <View style={{ marginLeft: 12, backgroundColor: 'inherit' }}>
                <Text style={{ marginBottom: 6, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: Colors[theme].textSecondary, fontWeight: '600' }}>
                  <FontAwesome5 name="bitcoin" size={15} color={Colors[theme].tint} /> {item.point}
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
