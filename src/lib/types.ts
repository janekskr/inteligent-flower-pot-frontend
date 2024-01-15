export type Flower = "Kaktus" | "Kawa"

export type PlantInfo = {
    plant_name: string,
    plant_specie: Flower
}

export type UserData = PlantInfo & {
    ground_humidity: number // %
    air_humidity: number // %
    water_level: boolean
    temperature: number // C
    last_watering: Date
}