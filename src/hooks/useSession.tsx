import { createContext , useContext, useEffect, useState } from 'react';
import { PlantInfo, UserData } from "lib/types";
import BASE_URL from 'lib/BASE_URL';
import axios from 'axios';

interface AuthContextProps {
    isLoading: boolean
    session: UserData | null
    signIn: (data: PlantInfo) => void
    signOut: () => void
}
export const AuthContext = createContext({} as AuthContextProps)

export function SessionProvider({children}: React.PropsWithChildren) {
  const [session, setSession] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const signIn = async (data: PlantInfo) => {
        await axios.post<PlantInfo>(BASE_URL + "/plants/create_plant/", data)
        getInfo()
    }

    const signOut = () => {
      setSession(null)
    }

    const getInfo = async() => {
      try {
        setIsLoading(true)
        const response = await axios.get<UserData | null>(BASE_URL + "/plants/get_info/")
        setSession(response.data)
      } catch(err: unknown) {
        alert(err)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      getInfo()
    }, [])

    return (
      <AuthContext.Provider
        value={{isLoading, session, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    );
}

export const useSession = () => useContext(AuthContext);
