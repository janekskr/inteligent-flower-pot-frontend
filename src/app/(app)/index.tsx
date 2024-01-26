import { ScrollView, StyleSheet } from "react-native";

import { View, MeasurementsItem, PlantImage } from "components"
import { useNotification, useSession } from "hooks";
import getScale from "hooks/getScale";

export default function HomeScreen() {
  useNotification()
  const { session } = useSession()
  
  return (
    <View style={styles.container}>
      <PlantImage />
      <ScrollView style={{width: "100%"}}>
        <View style={styles.measurementsContainer}>
          <MeasurementsItem
            name="waterHumidity"
            label="Wilgotność powietrza"
            measurement={session?.air_humidity + "%"}
          />

          <MeasurementsItem
            name="groundHumidity"
            label="Wilgotność gleby"
            measurement={getScale(session?.ground_humidity as number)}
          />

          <MeasurementsItem
            name="temperature"
            label="Temperatura powietrza"
            measurement={`${session?.temperature}°C`}
          />

          <MeasurementsItem
            name="lastWatering"
            label="Ostatnie podlewanie"
            measurement={`${session?.last_watering && new Date(session.last_watering).toLocaleDateString(undefined)}`}
          />

          <MeasurementsItem
            name="waterLevel"
            label="Niski poziom wody"
            measurement={`${session?.water_level? "Nie": "Tak"}`}
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
