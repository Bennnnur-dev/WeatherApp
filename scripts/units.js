const unitsData = {
    tempUnit: "",
    speedUnit: "",
    precipitationUnit: "",
    elevationUnit: "",
}

const temp = document.getElementById("temp-unit")
const speed = document.getElementById("speed-unit")
const precipitation = document.getElementById("precipitation-unit")
const elevation = document.getElementById("elevation-unit")


export function getUnits(){
    unitsData.tempUnit = temp.value;
    unitsData.speedUnit = speed.value;
    unitsData.precipitationUnit = precipitation.value;
    unitsData.elevationUnit = elevation.value;

    localStorage.setItem("units", JSON.stringify(unitsData))

    location.reload()
}

export function updateSelectedAttr(units){
    for (let i = 0; i < temp.length; i++){
        const childElement = temp[i]
        const data = childElement.dataset.value
        if (data === units.tempUnit){
            childElement.setAttribute("selected", true)
        }
    }
    for (let i = 0; i < speed.length; i++){
        const childElement = speed[i]
        const data = childElement.dataset.value
        if (data === units.speedUnit){
            childElement.setAttribute("selected", true)
        }
    }
    for (let i = 0; i < precipitation.length; i++){
        const childElement = precipitation[i]
        const data = childElement.dataset.value
        if (data === units.precipitationUnit){
            childElement.setAttribute("selected", true)
        }
    }
    for (let i = 0; i < elevation.length; i++){
        const childElement = elevation[i]
        const data = childElement.dataset.value
        if (data === units.elevationUnit){
            childElement.setAttribute("selected", true)
        }
    }
}