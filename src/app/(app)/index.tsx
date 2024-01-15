import { ScrollView, StyleSheet } from "react-native";

import { View, MeasurementsItem, PlantImage } from "components"
import { days } from "constant"
import { useSession } from "hooks";

export default function HomeScreen() {
  const { session } = useSession()
  return (
    <View style={styles.container}>
      <PlantImage />
      <ScrollView style={{width: "100%"}}>
        <View style={styles.measurementsContainer}>
          <MeasurementsItem
            name="waterHumidity"
            label="Wilgotność powietrza"
            measurement={`${session?.ground_humidity}%`}
          />

          <MeasurementsItem
            name="groundHumidity"
            label="Wilgotność gleby"
            measurement={`${session?.ground_humidity}%`}
          />

          <MeasurementsItem
            name="temperature"
            label="Temperatura powietrza"
            measurement={`${session?.temperature}°C`}
          />

          <MeasurementsItem
            name="temperature"
            label="Ostatnie podlewanie"
            measurement={`${session?.last_watering && days[session?.last_watering.getDay()]}`}
          />

          <MeasurementsItem
            name="waterLevel"
            label="Niski poziom wody"
            measurement={`${session?.water_level}`}
          />
        </View>
      </ScrollView>
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
    gap: 30,
    marginBottom: 20,
  },
});
