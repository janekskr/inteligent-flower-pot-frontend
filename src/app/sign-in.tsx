import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Pressable, Alert, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from 'hooks/useSession';
import { PlantImage, Text, View, Input } from "components"
import { UserData } from 'lib/types';
import { AntDesign } from '@expo/vector-icons';

export default function SignIn() {
  const [credentials, setCredentials] = useState<UserData>({
    flowerType: "normal",
    username: "",
    plantName: ""
  })
  const { signIn } = useSession();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.headerText} weight="semibold">Dodaj doniczkę</Text>
        <Input
          label='Imię'
          placeholder='Jan'
          name="username"
          value={credentials.username}
          setValue={setCredentials}
        />
        {/* <Input
          label='Nazwa doniczki (opcjonalne)'
          placeholder='moja doniczka'
          name="plantName"
          value={credentials.plantName}
          setValue={setCredentials}
        /> */}

        <View>
          <Text weight='medium'>Rodzaj rośliny</Text>
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
          <Text weight='semibold' style={styles.buttonText}>Kontynuuj </Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: "white"
  },
  headerText: {
    fontSize: 30,
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
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  flowerContainer: {
    alignItems: "center",
    gap: 40,
    borderColor: '#EDEDED',
    borderWidth: 1,
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#F4F5F7"
  }
})