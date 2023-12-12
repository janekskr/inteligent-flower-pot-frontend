import { Alert, Modal as DefaultModal, StyleSheet, Pressable, ViewStyle } from "react-native";
import { Image } from "expo-image";

import {View, Text} from "./Themed"
import blurhash from "constant/blurhash";

interface ModalProps {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean,
    style?: ViewStyle,
    title: string,
    description: string,
    extraInfo?: string
}

export default function Modal({setIsVisible, isVisible, style, title, description, extraInfo}: ModalProps) {
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
            <Text style={{ fontSize: 18, textAlign: "center", width: "100%" }} weight="bold">{title}</Text>
            <View style={{gap: 25}}>
              <Text style={{ textAlign: "center" }}>
                {description}
              </Text>
              {extraInfo && <View style={{width: "100%", flexDirection: "row", alignItems:"center", gap: 30, justifyContent: "center"}}>
                <View style={styles.iconContainer}>
                  <Image 
                    source={require("assets/images/icons/watering.png")}
                    placeholder={blurhash.wateringBlulhash}
                    contentFit="contain"
                    transition={1000}
                    style={{ width: "70%", height: "70%" }}
                  />
                </View>
                <Text style={{fontSize: 18, flex:1}} weight="medium">{extraInfo}</Text>
              </View>}
            </View>
            <Pressable
              style={{ backgroundColor: "#27AE60", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 15 }}
              onPress={() => setIsVisible(!isVisible)}>
              <Text style={{ color: "white" }} weight="semibold">Schowaj okno</Text>
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
      gap: 30,
    },

    iconContainer: {
      aspectRatio: 1 / 1,
      width: 80,
      borderRadius: 15,
      backgroundColor: "rgba(39, 174, 96, .3)",
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
      margin: 20,
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
    }
  });