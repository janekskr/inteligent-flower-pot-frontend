import { createContext , useContext, useEffect, useState } from 'react';
import axios from 'axios';

import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import BASE_URL from 'lib/BASE_URL';
import { PlantInfo, UserData } from "lib/types";
import { schedulePushNotification } from "lib/handleNotification"
// import { useStore, atom, useAtom } from 'jotai';

interface AuthContextProps {
    isLoading: boolean
    session: UserData | null
    signIn: (data: PlantInfo) => void
    editPlant: (data: PlantInfo) => void
}

const BACKGROUND_FETCH_TASK = "background-fetch"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async() => {
  try {
    const {data} = await axios.get<UserData | null>(BASE_URL + "/plants/get_info/")
    console.log("background" + JSON.stringify(data))
    if(data?.water_level) {
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

export const AuthContext = createContext({} as AuthContextProps)

export function SessionProvider({children}: React.PropsWithChildren) {
  // const [session, setSession] = useAtom(sessionAtom)
  const [session, setSession] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signIn = async (data: PlantInfo) => {
        await axios.post<PlantInfo>(BASE_URL + "/plants/create_plant/", data)
        getInfo()
    }

    const editPlant = async(data: PlantInfo) => {
      await axios.put<PlantInfo>(BASE_URL + "/plants/edit_plant/", data)
        getInfo()
    }

    const getInfo = async() => {
      try {
        setIsLoading(true)
        const response = await axios.get<UserData | null>(BASE_URL + "/plants/get_info/")
        console.log(response.data)
        return response.data
      } catch(err: unknown) {
        alert(err)
        return null
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      const init = async() => {
        const session = await getInfo()
        setSession(session)
      }
      init()
      registerBackgroundFetchAsync()      
    }, [])

    return (
      <AuthContext.Provider
        value={{isLoading, session, signIn, editPlant}}>
        {children}
      </AuthContext.Provider>
    );
}

export const useSession = () => useContext(AuthContext);
