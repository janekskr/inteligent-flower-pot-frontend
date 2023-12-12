import { Slot } from 'expo-router';
import { SessionProvider } from 'hooks/useSession';

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'signIn',
};

export default function Root() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}
