import { StyleSheet } from 'react-native';

import { Text, View } from 'components';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} weight='black'>Modal</Text>
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
