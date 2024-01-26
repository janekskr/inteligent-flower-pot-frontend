import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';

import { Input, PlantImage, Text, View } from 'components';
import { useSession } from 'hooks';
import { useState } from 'react';
import { Flower, PlantInfo } from 'lib/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ModalScreen() {
  const { editPlant, session } = useSession()
  const [credentials, setCredentials] = useState<PlantInfo>({
    plant_specie: session?.plant_specie as Flower,
    plant_name: session?.plant_name as string
  })

  console.log(credentials)
  return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            label='Nazwa doniczki'
            placeholder='moja doniczka'
            name="plant_name"
            value={credentials.plant_name}
            setValue={setCredentials}
          />

          <View>
            <Text weight='medium'>Rodzaj rośliny</Text>
            <View style={styles.flowerContainer}>
              <Pressable onPress={() => setCredentials(prev => ({ ...prev, plant_specie: "kawa" }))}>
                <PlantImage
                  type='kawa'
                  style={{
                    imageContainerStyle: styles.imageContainerStyle,
                    titleStyle: styles.titleStyle,
                    textContainerStyle: {
                      paddingHorizontal: 25,
                      borderWidth: 4,
                      borderRadius: 20,
                      borderColor: credentials.plant_specie === "kawa" ? "rgb(22 101 52)" : "transparent"
                    }
                  }}
                />
              </Pressable>
              <Pressable onPress={() => setCredentials(prev => ({ ...prev, plant_specie: "Kaktus" }))}>
                <PlantImage
                  type="Kaktus"
                  style={{
                    imageContainerStyle: styles.imageContainerStyle,
                    titleStyle: styles.titleStyle,
                    textContainerStyle: {
                      paddingHorizontal: 25,
                      borderWidth: 4,
                      borderRadius: 20,
                      borderColor: credentials.plant_specie === "Kaktus" ? "rgb(22 101 52)" : "transparent"
                    }
                  }}
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
                editPlant(credentials as PlantInfo);
                router.push('/');
            }}>
            <Text weight='semibold' style={styles.buttonText}>Kontynuuj </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Pressable>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: "white",
    flex:1
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
