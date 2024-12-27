import { fetchApi } from "./fetchWeather.js"
import { toggleSideBar } from "./secondaryStats.js";
import { onScroll } from "./utils/onScroll.js";
import { loadFromStorage} from "./secondaryStats.js";
import { toggleUI} from "./coordinates.js";
import { generateStat } from "./navigation.js";
import { loadStats } from "./data/stats.js";
import { getUnits, updateSelectedAttr } from "./units.js";

const coords = JSON.parse(localStorage.getItem("coords")) || {
    textValue: "",
    latitude: 0,
    longitude: 0
};

export const units = JSON.parse(localStorage.getItem("units")) || {
    tempUnit: "°C",
    speedUnit: "Km/h",
    precipitationUnit: "mm",
    elevationUnit: "m",
}

fetchApi(coords)

document.addEventListener("scroll", () => {
    onScroll('.js-coord')
})

export let APIStats;

export function renderOverview(response){
    APIStats = response;

    loadFromStorage()

    updateSelectedAttr(units)

    document.querySelector(".js-settings")
    .addEventListener("click", () => {
        toggleSideBar()
    });

    document.querySelector(".js-units-button").addEventListener("click", () => {
        getUnits()
    })

    document.querySelector(".js-coord-button")
    .addEventListener("click", () => {
        toggleUI()
    })

    console.log(response);

    loadStats(response);
    generateStat()

}

export function renderMainStats(mainStats){
    let html = "";

    html = `
    <div class="main-info-container js-container">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="right-chevron js-right">&#12297;</div>
        <div class="left-chevron js-left">&#12297;</div>
        <div class="coord js-coord">${mainStats.latitude} N; ${mainStats.longitude} E</div>
        <div class="weather-type-img">
            <img src="${mainStats.weatherImg}" alt="Weather type" />
        </div>
        <div class="stats-container">
            <div class="date">${mainStats.date}</div>
            <div class="temp-display">${mainStats.temp}<span>${mainStats.tempUnit}</span></div>
            <div class="temp-summary">${mainStats.tempSummary}</div>
        </div>
    </div>
    `
    document.body.style = `background-image: url('${mainStats.backgroundImg}');`;
    document.querySelector(".js-main-stats").innerHTML = html;
    const container = document.querySelector(".js-main-stats");
    const secContainer = document.querySelector(".js-sec-stats");

    document.querySelector(".js-right").addEventListener("click", () => {
        generateStat(mainStats.index + 1);

        container.classList.add("anim-left")
        secContainer.classList.add("anim-left")
        setTimeout(() => {
            container.classList.remove("anim-left")
            secContainer.classList.remove("anim-left")

            container.classList.add("anim-return")
            secContainer.classList.add("anim-return")

            setTimeout(() => {
                container.classList.remove("anim-return")
                secContainer.classList.remove("anim-return")
            }, 200)
        }, 200);
    })

    document.querySelector(".js-left").addEventListener("click", () => {
        generateStat(mainStats.index - 1)

        container.classList.add("anim-right")
        secContainer.classList.add("anim-right")
        setTimeout(() => {
            container.classList.remove("anim-right")
            secContainer.classList.remove("anim-right")

            container.classList.add("anim-return")
            secContainer.classList.add("anim-return")
            setTimeout(() => {
                container.classList.remove("anim-return")
                secContainer.classList.remove("anim-return")
            }, 200)
        }, 200);
    })
}

export function renderSecondaryStats(statArray){
    let html = "";
    statArray.forEach(object => {
        html += `
        <div class="more-info-container">
            <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="white"
            >
                <path
                d="${object.statSVG}"
                />
            </svg>
            </div>
            <div class="subcontainer">
            <div class="info-title">${object.statName}</div>
            <div class="data">${object.statData}<span>${object.statUnit}</span></div>
            </div>
      </div>
      `
    });

    document.querySelector(".secondary-stats").innerHTML = html;
}