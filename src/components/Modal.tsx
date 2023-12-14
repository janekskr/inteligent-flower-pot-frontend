import { Alert, Modal as DefaultModal, StyleSheet, Pressable, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

import { View, Text } from "./Themed"
import blurhash from "constant/blurhash";

interface ModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isVisible: boolean,
  style?: ViewStyle,
  title: string,
  description: string,
  extraInfo: string
}

export default function Modal({ setIsVisible, isVisible, style, title, description, extraInfo }: ModalProps) {
  return (
    <DefaultModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsVisible(!isVisible);
      }}>
      <View style={[styles.container, { backgroundColor: "transparent" }, style]}> 
        <View style={styles.modalView}>
          <Text style={styles.title} weight="bold">{title}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.description}>
              {description}
            </Text>
            <View style={styles.extraInfoContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("assets/images/icons/watering.png")}
                  placeholder={blurhash.wateringBlurhash}
                  contentFit="contain"
                  transition={1000}
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.extraInfo} weight="medium">{extraInfo}</Text>
            </View>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => setIsVisible(!isVisible)}>
            <Text style={styles.buttonText} weight="semibold">Schowaj okno</Text>
          </Pressable>
        </View>
      </View>
    </DefaultModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 140,
  },
  modalView: {
    margin: 14,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 35,
    gap: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    width: "100%"
  },
  infoContainer: {
    gap: 25
  },
  description: {
    textAlign: "center"
  },
  extraInfoContainer: { 
    width: "100%", 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 30, justifyContent: 
    "center" 
  },    
  extraInfo: {
    fontSize: 18,
    flex: 1
  },
  iconContainer: {
    aspectRatio: 1 / 1,
    width: 80,
    borderRadius: 15,
    backgroundColor: "rgba(39, 174, 96, .3)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: "70%",
    height: "70%"
  },
  button: {
    backgroundColor: "#27AE60",
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  }
});