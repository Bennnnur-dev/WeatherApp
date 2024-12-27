import { loadStats } from "./data/stats.js";
import { renderSecondaryStats, APIStats } from "./interface.js";
import { onScroll } from "./utils/onScroll.js";

let statArray = JSON.parse(localStorage.getItem("stats")) || [];
let weatherStats;

export function loadFromStorage(){
    document.querySelectorAll("input").forEach((el) => {
            statArray.forEach((obj) => {
                if (obj.statName === el.dataset.statName){
                    if (obj.isChecked === true){
                        el.setAttribute("checked", true)
                        updateDataFromStorage(obj)
                    }
                }
            })
        })
    }

function updateDataFromStorage(obj){
    weatherStats = loadStats(APIStats)
    weatherStats.forEach((stat) => {
        if (obj.statName === stat.statName){
            obj.statData = stat.statData;
        }
    })
    renderSecondaryStats(statArray)
}

document.querySelector(".settings-sidebar").addEventListener("scroll", () => {
    onScroll('.js-title')
})

let isSettingsOpened = false;

export function toggleSideBar(){
    weatherStats = loadStats(APIStats);
    if (isSettingsOpened === false){
        document.querySelector(".settings-sidebar")
        .style.display = "flex";
        document.body.style.overflowY = "hidden";
        isSettingsOpened = true
    } else {
        document.querySelector(".settings-sidebar")
        .style.display = "none";
        document.body.style.overflowY = "auto"
        isSettingsOpened = false
    }
}

document.querySelectorAll("input").forEach(el => {
    el.addEventListener("click", () => {
        const id = el.dataset.id;
        getCheckInput(id);
    })
});

function getCheckInput(id){
    document.querySelectorAll("input").forEach((el, index) => {
        if (index+1 === Number(id)){
            const {statName} = el.dataset;
            getStat(statName, el)
        }
        })
}

function getStat(statName, el){
    weatherStats.forEach((stat) => {
        if (statName === stat.statName){
            SaveSecondaryStats(stat, el, renderSecondaryStats)
        }
    });
}

function SaveSecondaryStats(statInfo, el, callback){
    const newArray = []

    class Stats{
        statName;
        statSVG;
        statData;
        statUnit;
        isChecked;

        constructor(statInfo){
            this.statName = statInfo.statName;
            this.statSVG = statInfo.statSVG;
            this.statData = statInfo.statData;
            this.statUnit = statInfo.statUnit;
            this.isChecked = statInfo.isChecked;
        }
    }

    statInfo.isChecked = true;
    const stat = new Stats(statInfo);

    if (!el.checked){
        for (let i = 0; i < statArray.length; i++){
            const object = statArray[i]
            if (object.statName === statInfo.statName){
                object.isChecked = false
                continue;
            } else {
                newArray.push(object)
            };
        }
        statArray = newArray
    } else {
        statArray.push(stat);
    }

    localStorage.setItem("stats", JSON.stringify(statArray))

    callback(statArray)
}