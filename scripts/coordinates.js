let toggle = false

export function toggleUI(){
    if (toggle === false){
        document.querySelector(".js-coord-section")
        .style.display = "flex";
        document.body.style.overflowY = "hidden";
        toggle = true
    } else {
        document.querySelector(".js-coord-section")
        .style.display = "none";
        document.body.style.overflowY = "auto"
        toggle = false
    }
}

const button = document.querySelector(".js-apply-button");
button.addEventListener("click", () => {
    getInput()
})

const values = {
    textValue: "",
    latitude: 0,
    longitude: 0
}

export function getInput(){
    new Promise((resolve) => {
        const lat = Number(document.querySelector(".js-lat").value);
        const long = Number(document.querySelector(".js-long").value);
        const place = document.querySelector(".js-text-input").value;
        values.textValue = place;
        values.latitude = lat;
        values.longitude = long;
        resolve(values.textValue)
    }).then((textValue) => {
        checkTextValues(textValue)
    }).finally(() => {
        localStorage.setItem("coords", JSON.stringify(values))
        location.reload()
    })
}

function checkTextValues(textValue){ //some template text coords
    if (textValue === "Pontorson"){
        values.latitude = 48.549999;
        values.longitude = -1.51667;
    } else if (textValue === "Avranches"){
        values.latitude = 48.683331;
        values.longitude = -1.36667;
    } else if (textValue === "Marseille"){
        values.latitude = 43.3026;
        values.longitude = 5.3691;
    } else if (textValue === "Paris"){
        values.latitude = 48.8575;
        values.longitude = 2.3514;
    } else if (textValue === "Audierne"){
        values.latitude = 48.01667;
        values.longitude = -4.53333;
    }  else if (textValue === "Nice"){
        values.latitude = 43.7102;
        values.longitude = 7.2620;
    } else if (textValue === "Rome"){
        values.latitude = 41.902784;
        values.longitude = 12.496366;
    } else if (textValue === "Londres"){
        values.latitude = 51.5073509;
        values.longitude = -0.1277583;
    } else if (textValue === "Brasilia"){
        values.latitude = -14.235004;
        values.longitude = -51.925280;
    } else if (textValue === "Le Caire"){
        values.latitude = 30.044420;
        values.longitude = 31.235712;
    } else if (textValue === "Riyad"){
        values.latitude = 23.8862915;
        values.longitude = 45.0811385;
    } else if (textValue === "Los Angeles"){
        values.latitude = 34.003342;
        values.longitude = -118.485832;
    } else if (textValue === "Moscou"){
        values.latitude = 55.757425;
        values.longitude = 37.619183;
    } 
}