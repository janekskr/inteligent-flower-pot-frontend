import { StyleSheet } from 'react-native'
import { Image } from "expo-image"

import { View, Text } from 'components'
import blurhash from 'constant/blurhash'

interface MeasurementsItemProps {
    label: string,
    measurement: string
    name: "temperature" | "humidity" | "water"
}

export default function MeasurementsItem({ label, measurement, name }: MeasurementsItemProps) {
    const images = [
        {
            name: "temperature",
            source: require("assets/images/icons/temperature.png")
        },
        {
            name: "humidity",
            source: require("assets/images/icons/humidity.png")
        },
        {
            name: "water",
            source: require("assets/images/icons/water.png")
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
                <Text style={styles.measurement} weight="bold">{measurement}</Text>
                <Text>{label}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    measurementsItem: {
        flexDirection: "row",
        width: "100%",
        gap: 20
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