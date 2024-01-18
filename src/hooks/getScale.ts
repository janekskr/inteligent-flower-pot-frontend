export default function getScale(data: number) {
    if(data <= 200 ) {
        return "Bardzo sucha"
    } else if (data > 200 && data <= 500) {
        return "Sucha"
    } else if(data > 500 && data <= 1500) {
        return "Wilgotna"
    } else if(data > 1500) {
        return "Bardzo Wilgotna"
    }
}