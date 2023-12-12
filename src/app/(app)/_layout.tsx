import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, Link } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 

import { Text, View } from "components"
import useThemeColor from 'hooks/useThemeColor';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    poppins_regular: require('assets/fonts/Poppins-Regular.ttf'),
    poppins_medium: require('assets/fonts/Poppins-Medium.ttf'),
    poppins_bold: require('assets/fonts/Poppins-Bold.ttf'),
    poppins_semibold: require('assets/fonts/Poppins-SemiBold.ttf'),
    poppins_light: require('assets/fonts/Poppins-Light.ttf'),
    poppins_extrabold: require('assets/fonts/Poppins-ExtraBold.ttf'),
    poppins_black: require('assets/fonts/Poppins-Black.ttf'),
    poppins_italic: require('assets/fonts/Poppins-Italic.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const theme = useThemeColor()

  return (
    <>
        <StatusBar style={useColorScheme() ?? "dark"} />
        <Stack>
        <Stack.Screen name="index" options={{ 
          headerTransparent: true,
          headerTitle: () => <Text style={{fontSize: 25, paddingVertical: 25, marginLeft: 15}} weight="bold">Witaj jan 👋</Text>,
          headerShadowVisible: false,
          headerRight: () => <Link href="/modal" asChild>
          <Pressable>
            {({ pressed }) => (
              <View style={{backgroundColor: "transparent", marginRight: 15, borderRadius: 999, borderWidth: 1, borderColor: "lightgray", width: 40, height: 40, alignItems: "center", justifyContent: "center", opacity: pressed? .5 : 1}}>
                <AntDesign
                name="plus"
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
