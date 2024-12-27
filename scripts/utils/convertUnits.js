export function convertUnits(value, unit){
    if (unit === "Km/h"){
        return value;
    } else if (unit === "Mph"){
        return (value / 1.609).toFixed(1)
    } else if (unit === "m/s"){
        return (value / 3.6).toFixed(1)
    } else if (unit === "knots"){
        return (value / 1.852).toFixed(1)
    } else if (unit === "m"){
        return value;
    } else if (unit === "ft"){
        return (value * 3.281).toFixed(1)
    } else if (unit === "mm"){
        return value;
    } else if (unit === "inch"){
        return value === 0 ? value.toFixed(1) : (value / 25.4).toFixed(3); 
    } else if (unit === "°C"){
        return value;
    } else if (unit === "°F"){
        return ((value * 9/5) + 32).toFixed(1)
    }
}