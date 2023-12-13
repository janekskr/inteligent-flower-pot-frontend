import { ScrollView, StyleSheet } from "react-native";

import { View, MeasurementsItem, PlantImage } from "components"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PlantImage />
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
    backgroundColor: "white",
    alignItems: "center"
  },
  measurementsContainer: {
    borderWidth: 2,
    borderColor: "#EDEDED",
    width: "100%",
    borderRadius: 28,
    padding: 30,
    gap: 30
  },
});
