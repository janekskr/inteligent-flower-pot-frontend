import IoIcons from '@expo/vector-icons/Ionicons';
import { Stack, Link, Redirect } from 'expo-router';
import {StatusBar} from 'expo-status-bar';

import { Pressable } from 'react-native';

import { Text, View } from "components"
import { useThemeColor, useSession } from 'hooks';
import { useEffect } from 'react';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const theme = useThemeColor()

  useEffect(() => {
  }, [session, isLoading]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (session === null) {
    return <Redirect href="/sign-in" />;
  }



  return (    
      <>
        <StatusBar style='dark' />
        <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTransparent: true,
            headerTitle: () => (
              <Text style={{ fontSize: 25, paddingVertical: 25, marginLeft: 15 }} weight="bold">
                Witaj 👋
              </Text>
            ),
            headerShadowVisible: false,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <View
                      style={{
                        backgroundColor: "transparent",
                        marginRight: 15,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: pressed ? 0.5 : 1,
                      }}
                    >
                      <IoIcons name="settings-sharp" size={25} color={theme.tint} />
                    </View>
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="modal"  options={{ presentation: 'modal', title: "Opcje" }} />
      </Stack>
      </>
  );
}
