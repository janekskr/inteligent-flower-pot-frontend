import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from 'components';
import { useSession } from 'hooks';

export default function ModalScreen() {
  const { signOut } = useSession()
  return (
    <View style={styles.container}>
      <Pressable onPress={signOut}>
        <Text style={styles.title} weight='black'>Wyloguj się</Text>
      </Pressable>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
