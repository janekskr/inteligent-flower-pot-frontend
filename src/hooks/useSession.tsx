import { createContext , useContext, useEffect, useState } from 'react';
import axios from 'axios';

import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { useNotification } from "hooks/useNotification";
import BASE_URL from 'lib/BASE_URL';
import { PlantInfo, UserData } from "lib/types";
import { schedulePushNotification } from "lib/handleNotification"

interface AuthContextProps {
    isLoading: boolean
    session: UserData | null
    signIn: (data: PlantInfo) => void
    signOut: () => void
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const BACKGROUND_FETCH_TASK = "background-fetch"

const sessionRef: {current: UserData | null} = { current: null };

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async() => {
  try {
    const {data} = await axios.get<UserData | null>(BASE_URL + "/plants/get_info/")
    sessionRef.current = data
    if(!data?.water_level) {
      await schedulePushNotification()
    }
    return data ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 2, // 2 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export const AuthContext = createContext({} as AuthContextProps)

export function SessionProvider({children}: React.PropsWithChildren) {
  const [session, setSession] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
    const signIn = async (data: PlantInfo) => {
        await axios.post<PlantInfo>(BASE_URL + "/plants/create_plant/", data)
        getInfo()
    }

    const signOut = async() => {
      await unregisterBackgroundFetchAsync()
      setSession(null)
    }

    const getInfo = async() => {
      try {
        setIsLoading(true)
        const response = await axios.get<UserData | null>(BASE_URL + "/plants/get_info/")
        return response.data
      } catch(err: unknown) {
        alert(err)
        return null
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      // const init = async() => {
      //   const session = await getInfo()
      //   setSession(session)
      //   if(session) {
      //     await schedulePushNotification()
      //   }
      // }
      registerBackgroundFetchAsync()
      useNotification()
      
    }, [])

    useEffect(() => {
      setSession(sessionRef.current);
    }, [sessionRef.current]);

    return (
      <AuthContext.Provider
        value={{isLoading, session, signIn, signOut}}>
        {children}
      </AuthContext.Provider>
    );
}

export const useSession = () => useContext(AuthContext);
