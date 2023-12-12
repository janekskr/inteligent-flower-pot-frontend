import IoIcons from '@expo/vector-icons/Ionicons';
import { Stack, Link, Redirect } from 'expo-router';

import { Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Text, View } from "components"
import { useThemeColor, useSession } from 'hooks';

export default function AppLayout() {
  const theme = useThemeColor()
  const { user } = useSession()
  if (!user) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <>
      <StatusBar style={useColorScheme() ?? "dark"} />
      <Stack>
        <Stack.Screen name="index" options={{
          headerTransparent: true,
          headerTitle: () => <Text style={{ fontSize: 25, paddingVertical: 25, marginLeft: 15 }} weight="bold">Witaj {user.username} 👋</Text>,
          headerShadowVisible: false,
          headerRight: () => <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <View style={{ backgroundColor: "transparent", marginRight: 15, borderRadius: 999, borderWidth: 1, borderColor: "lightgray", width: 40, height: 40, alignItems: "center", justifyContent: "center", opacity: pressed ? .5 : 1 }}>
                  <IoIcons
                    name="settings-sharp"
                    size={25}
                    color={theme.tint}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
