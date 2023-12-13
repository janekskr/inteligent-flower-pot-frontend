import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Pressable, Alert, StatusBar } from 'react-native';

import { useSession } from 'hooks/useSession';
import { PlantImage, Text, View, Input } from "components"
import { Flower, UserData } from 'lib/types';

export default function SignIn() {
  const [credentials, setCredentials] = useState<UserData>({
    flowerType: "normal",
    username: ""
  })
  const { signIn } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText} weight="semibold">Witaj 👋</Text>
      <Input
        label='nazwa użytkownika'
        placeholder='Jan'
        value={credentials.username}
        setValue={setCredentials}
      />

      <View>
        <Text weight='medium'>rodzaj rośliny</Text>
        <View style={styles.flowerContainer}>
          <Pressable onPress={() => setCredentials(prev => ({ ...prev, flowerType: "normal" }))}>
            <PlantImage
              type='normal'
              style={{
                imageContainerStyle: styles.imageContainerStyle,
                titleStyle: styles.titleStyle,
                textContainerStyle: {
                  paddingHorizontal: 25,
                  borderWidth: 4,
                  borderRadius: 20,
                  borderColor: credentials.flowerType === "normal" ? "rgb(22 101 52)" : "transparent"
                }
              }}
            />
          </Pressable>
          <Pressable onPress={() => setCredentials(prev => ({ ...prev, flowerType: "cactus" }))}>
            <PlantImage
              type="cactus"
              style={{
                imageContainerStyle: styles.imageContainerStyle,
                titleStyle: styles.titleStyle,
                textContainerStyle: {
                  paddingHorizontal: 25,
                  borderWidth: 4,
                  borderRadius: 20,
                  borderColor: credentials.flowerType === "cactus" ? "rgb(22 101 52)" : "transparent"
                }
              }}
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          if (credentials.flowerType && credentials.username !== "") {
            signIn(credentials as UserData);
            router.replace('/');
          } else {
            Alert.alert("Błąd", "Proszę wypełnić wszystkie pola")
          }
        }}>
        <Text weight='semibold' style={styles.buttonText}>Zaloguj się</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
    backgroundColor: "white"
  },
  headerText: {
    fontSize: 30
  },
  imageContainerStyle: {
    backgroundColor: "transparent"
  },
  titleStyle: {
    fontSize: 20
  },
  button: {
    backgroundColor: "rgb(22 163 74)",
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  flowerContainer: {
    alignItems: "center",
    gap: 40,
    width: "90%",
    borderColor: '#EDEDED',
    borderWidth: 1,
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#F4F5F7"
  }
})