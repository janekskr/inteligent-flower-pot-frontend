import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { SessionProvider } from 'hooks/useSession';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'sign-in',
};

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

    return (
        <SessionProvider>
            <StatusBar style="dark" />
            <Slot />
        </SessionProvider>
    );
}
