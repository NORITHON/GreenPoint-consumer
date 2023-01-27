import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { theme } from '../constants/Colors';

interface ISearchBar {
  searchPhrase: string;
  setSearchPhrase: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchPhrase, setSearchPhrase }: ISearchBar) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} style={{ marginLeft: 1 }} />
        <TextInput
          style={styles.input}
          placeholder="식당 이름 검색"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          placeholderTextColor={'#8B95A1'}
        />
        <Entypo
          name="cross"
          size={20}
          style={{ display: searchPhrase ? 'flex' : 'none' }}
          onPress={() => {
            setSearchPhrase('');
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '88%',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: theme.disabled,
    borderRadius: 15,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});
