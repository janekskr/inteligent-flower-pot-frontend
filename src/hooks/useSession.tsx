import { useState, createContext , useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface AuthContextProps {
    user: UserData |  null
    setUser: (data: UserData) => void
    signIn: (data: UserData) => void
    signOut: () => void
}

type Flower = "cactus" | "normal"

type UserData = {
    username: string,
    flowerType: Flower
}

export const AuthContext = createContext({} as AuthContextProps)

export function SessionProvider({children}: React.PropsWithChildren) {
  const [user, setUser] = useState<UserData | null>({
    flowerType: "normal",
    username: ""
  })

    const signIn = async(data: UserData) => {
        if(data) {
            await SecureStore.setItemAsync("auth", JSON.stringify(data))
        }
    }

    const signOut = async() => await SecureStore.deleteItemAsync("auth")

    useEffect(()  => {
        const getData = async() => {
            const data = await SecureStore.getItemAsync("auth")
            if (data) {
                setUser(JSON.parse(data))
                router.replace("/")
            }
        }
        getData()
    })


  return (
    <AuthContext.Provider
      value={{user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useSession = () => useContext(AuthContext);
