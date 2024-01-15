import { StyleSheet } from 'react-native'
import { Image } from "expo-image"

import { View, Text } from './Themed'
import {blurhash} from 'constant'

interface MeasurementsItemProps {
    label: string,
    measurement: string | undefined
    name: Name
}

type Name = "temperature" | "waterHumidity" | "groundHumidity" | "waterLevel" | "lastWatering"

export default function MeasurementsItem({ label, measurement, name }: MeasurementsItemProps) {
    const images: { name: Name, source: any }[] = [
        {
            name: "temperature",
            source: require("assets/images/icons/temperature.png")
        },
        {
            name: "waterHumidity",
            source: require("assets/images/icons/water-humidity.png")
        },
        {
            name: "groundHumidity",
            source: require("assets/images/icons/ground-humidity.png")
        },
        {
            name: "waterLevel",
            source: require("assets/images/icons/water.png")
        },
        {
            name: "lastWatering",
            source: require("assets/images/icons/watering.png")
        }
    ]

    const source = images.find(e => e.name === name)?.source

    return (
        <View style={styles.measurementsItem}>
            <View style={styles.iconContainer}>
                <Image
                    source={source}
                    contentFit="contain"
                    placeholder={blurhash[`${name}Blurhash`]}
                    transition={1000}
                    style={{ width: "70%", height: "70%" }}
                />
            </View>
            <View>
                <Text style={styles.measurement} weight="bold">{measurement ?? "Brak danych!"}</Text>
                <Text>{label}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    measurementsItem: {
        flexDirection: "row",
        width: "100%",
        gap: 20,
    },
    iconContainer: {
        aspectRatio: 1 / 1,
        borderRadius: 15,
        backgroundColor: "rgba(39, 174, 96, .3)",
        alignItems: "center",
        justifyContent: "center",
    },
    measurement: {
        fontSize: 25
    }
})