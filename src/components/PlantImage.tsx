import { useState } from 'react'
import { StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native'
import { Image } from "expo-image";
import Entypo from '@expo/vector-icons/Entypo'


import { useSession } from 'hooks'
import { Flower } from 'lib/types';
import blurhash from 'constant/blurhash';
import { Text, View } from "./Themed"
import Modal from './Modal';

interface PlantImageProps {
  type?: Flower
  style?: {
    imageContainerStyle?: ViewStyle
    textContainerStyle?: ViewStyle
    titleStyle?: TextStyle
  }
}

export default function PlantImage({ type, style }: PlantImageProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { session } = useSession()

  const flowerType = type ?? session?.flowerType

  return (
    <>
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={`Informacje o nawadnianiu ${flowerType === "cactus" ? "kaktusa" : "kwiatków"}`}
        description={flowerType === "cactus" ? "Kaktus to roślina nawadniana rzadziej niż zwykłe rośliny" : "Zwykłe rośliny są nawadniane częściej niż kaktusy"}
        extraInfo={flowerType === "cactus" ? "1 raz na 2-3 tygodnie" : "1-4 razy tygodniowo"}
      />

      <View style={[styles.imageContainer, style?.imageContainerStyle]}>
        <View style={[styles.textContainer, style?.textContainerStyle]}>
          <Text style={[styles.title, style?.titleStyle]} weight="bold">{flowerType === "cactus" ? "Kaktus" : "Zwykła roślina"}</Text>
        </View>
        <Image
          style={styles.image}
          source={flowerType === "cactus" ? require("assets/images/categories/cactus.png") : require("assets/images/categories/flower.png")}
          contentFit="contain"
          placeholder={blurhash[`${flowerType === "cactus" ? "cactus" : "flower"}Blurhash`]}
          transition={1000}
        />

        <Pressable style={styles.infoButton} onPress={() => setIsVisible(prev => !prev)}>
          <Entypo name="info" size={17} color="black" />
        </Pressable>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    position: "relative",
    aspectRatio: 5 / 3,
  },
  image: {
    position: "absolute",
    width: "50%",
    height: "93%",
    right: 10,
    bottom: 20,
  },
  textContainer: {
    backgroundColor: "#27AE60",
    width: "100%",
    height: "83%",
    borderRadius: 28,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 35,
    paddingVertical: 20,
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    maxWidth: "60%",
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
})