export type Flower = "Kaktus" | "Kawa"

export type PlantInfo = {
    plant_name: string,
    plant_specie: Flower
}

export type UserData = {
    temperature: number,
    air_humidity: number, 
    water_level: number
} & PlantInfo