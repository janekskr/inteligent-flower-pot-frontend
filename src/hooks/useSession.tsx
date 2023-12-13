import { createContext , useContext } from 'react';
import { useStorageState } from './useStorageState';
import { UserData } from "lib/types";

interface AuthContextProps {
    isLoading: boolean
    session: UserData | null
    signIn: (data: UserData) => void
    signOut: () => void
}
export const AuthContext = createContext({} as AuthContextProps)

export function SessionProvider({children}: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('auth');
  
    const signIn = (data: UserData) => {
        setSession(data)
    }

    const signOut = () => {
      setSession(null)
    }

    return (
      <AuthContext.Provider
        value={{isLoading, session, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    );
}

export const useSession = () => useContext(AuthContext);
