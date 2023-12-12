import { useState, createContext , useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

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
  const [user, setUser] = useState<UserData | null>(null)

    const signIn = async(data: UserData) => {
        if(data) {
            if(Platform.OS === "web") {
              localStorage.setItem("auth", JSON.stringify(data))
            } else {
              await SecureStore.setItemAsync("auth", JSON.stringify(data))
            }
        }
    }

    const signOut = async() => {
      setUser(null)
      if(Platform.OS === "web") {
        localStorage.removeItem("auth")
      } else {
        await SecureStore.deleteItemAsync("auth")
      }
    }

    useEffect(()  => {
        const getData = async() => {
            let data
            if (Platform.OS === "web") {
              data = localStorage.getItem("auth")
            } else {
              data = await SecureStore.getItemAsync("auth")
            }
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
