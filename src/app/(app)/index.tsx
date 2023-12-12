import { useState } from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Entypo } from '@expo/vector-icons';

import { View, Text, Modal, MeasurementsItem } from "components"
import blurhash from "constant/blurhash";

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title="Informacje o nawadnianiu kaktusa"
        description="Kaktus to roślina nawadniana rzadziej niż zwykłe rośliny"
        extraInfo="1 raz na 2 tygodnie"
      />

      <View style={styles.imageContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header} weight="bold">Kaktus</Text>
        </View>
        <Image
          style={styles.image}
          source={require("assets/images/categories/cactus.png")}
          contentFit="contain"
          placeholder={blurhash.cactusBlurhash}
          transition={1000}
        />

        <Pressable style={styles.infoButton} onPress={() => setIsVisible(prev => !prev)}>
          <Entypo name="info" size={17} color="black" />
        </Pressable>
        
      </View>
      <View style={styles.measurementsContainer}>
        <MeasurementsItem
          name="humidity"
          label="Wilgotność gleby"
          measurement="40 %"
        />

        <MeasurementsItem
          name="temperature"
          label="Temperatura"
          measurement="40°C"
        />

        <MeasurementsItem
          name="water"
          label="Ilość wody w doniczce"
          measurement="300ml"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 140,
    gap: 30,
    backgroundColor: "white"
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    aspectRatio: 5 / 3,
  },
  image: {
    position: "absolute",
    width: "50%",
    height: "93%",
    right: 0,
    bottom: 20,
  },
  textContainer: {
    backgroundColor: "#27AE60",
    width: "100%",
    height: "85%",
    borderRadius: 28,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  header: {
    color: "white",
    fontSize: 30
  },
  infoButton: {
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "lightgray",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  measurementsContainer: {
    borderWidth: 2,
    borderColor: "rgb(226 232 240)",
    width: "100%",
    borderRadius: 28,
    padding: 30,
    gap: 30
  },
});
