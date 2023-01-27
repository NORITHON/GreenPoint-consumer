import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import { theme } from '../constants/Colors';

export default function ModalScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: '로그아웃', onPress: () => navigation.reset({ routes: [{ name: 'Login' }] }) },
          { key: '회원탈퇴', onPress: () => navigation.reset({ routes: [{ name: 'Login' }] }) },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={item.onPress}>
            <Text style={styles.item}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 18,
    height: 48,
    color: theme.secondary.main,
  },
});
