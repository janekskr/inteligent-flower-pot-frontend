import { router } from 'expo-router';

import { useSession } from 'hooks';
import { Text, View } from 'components';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn({
            username: "Jan",
            flowerType: "cactus"
          });
          router.replace('/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
