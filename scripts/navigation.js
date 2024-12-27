import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { renderMainStats, renderSecondaryStats, units, APIStats } from "./interface.js";
import { loadStats } from "./data/stats.js";
import { convertUnits } from "./utils/convertUnits.js";

export function generateStat(pointer){
    pointer === undefined ? pointer = dayjs().hour() : null;

    class MainStats{
        latitude;
        longitude;
        backgroundImg;
        weatherImg;
        date;
        temp;
        tempUnit;
        tempSummary;
        cloudCover;
        precipitation;
        index;

        constructor(statDetails){
            this.latitude = statDetails.latitude;
            this.longitude = statDetails.longitude;
            this.backgroundImg = statDetails.backgroundImg;
            this.weatherImg = statDetails.backgroundImg;
            this.date = statDetails.date;
            this.temp = statDetails.temp;
            this.tempUnit = statDetails.tempUnit;
            this.tempSummary = statDetails.tempSummary;
            this.cloudCover = statDetails.cloudCover;
            this.precipitation = statDetails.precipitation;
            this.index = statDetails.index
        }

        checkTemp(){
            let factor = 1;
            units.tempUnit === "°F" ? factor = (9/5) + 32 : null;

            if (this.temp < 5){
                this.tempSummary = "Cold"
            } else if (this.temp < 15 * factor){
                this.tempSummary = "Cool"
            } else if (this.temp < 25 * factor){
                this.tempSummary = "Warm"
            } else if (this.temp > 25 * factor){
                this.tempSummary = "Hot"
            }
            return this.tempSummary
        }

        saveBackgroundImg(){
            if (this.cloudCover < 30 && this.precipitation === 0){
                this.backgroundImg = './images/thumbnails/clear-sky.jpg';
            } else if(this.cloudCover > 30 && this.cloudCover < 60 && this.precipitation === 0){
                this.backgroundImg = './images/thumbnails/cloudy-sky.jpg';
            } else if(this.cloudCover >= 60 && this.precipitation === 0){
                this.backgroundImg = './images/thumbnails/overcast-sky.jpg';
            } else if (this.precipitation > 0 && this.precipitation <= 0.4){
                this.backgroundImg = 'https://png.pngtree.com/background/20230614/original/pngtree-twilight-shot-of-a-rain-drops-covered-street-picture-image_3460396.jpg';
            } else if (this.precipitation > 0.4){
            this.backgroundImg = 'https://mrwallpaper.com/images/file/beautiful-rain-hitting-the-ground-ury9v2f5i5cxpczm.jpg';
            } else if (this.precipitation > 0 && this.temp < 0){
                this.backgroundImg = './images/thumbnails/snow-bg.jpg'
            }
            return this.backgroundImg;
        }

        saveWeatherImg(){
            if (this.cloudCover < 30 && this.precipitation === 0){
                this.weatherImg = './images/icons/sun.png';
            } else if(this.cloudCover > 30 && this.cloudCover < 60 && this.precipitation === 0){
                this.weatherImg = './images/icons/sun-cloud-icon.png';
            } else if(this.cloudCover >= 60 && this.precipitation === 0 ){
                this.weatherImg = './images/icons/cloud-icon.png';
            } else if (this.precipitation > 0 && this.precipitation <= 0.4){
                this.weatherImg = './images/icons/rain-cloud-sunny.png';
            } else if (this.precipitation > 0.4){
                this.weatherImg = './images/icons/rain-heavy.png';
            } else if (this.precipitation > 0 && this.temp < 0){
                this.weatherImg = './images/icons/snow-icon.png'
            }
            return this.weatherImg;
        }

        formatDate(){
            this.date = dayjs().add(pointer - dayjs().hour(), "hour").format(`ddd, MMM D, H:00`);
            return this.date
        }
    }

    const statsArray = [];

    for (let i = 0; i <= 96; i++){
        const mainStats = new MainStats(
            {
                latitude: APIStats.latitude,
                longitude: APIStats.longitude,
                backgroundImg: "",
                weatherImg: "",
                date: "",
                temp: convertUnits(APIStats.hourly.temperature_2m[i], units.tempUnit),
                tempUnit: units.tempUnit,
                tempSummary: "",
                cloudCover: APIStats.hourly.cloud_cover[i],
                precipitation: APIStats.hourly.precipitation[i],
                index: i
            }
        )
        mainStats.date = mainStats.formatDate()
        mainStats.tempSummary = mainStats.checkTemp()
        mainStats.backgroundImg = mainStats.saveBackgroundImg()
        mainStats.weatherImg = mainStats.saveWeatherImg()

        statsArray.push(mainStats)
    }

    renderMainStats(statsArray[pointer]);

    const renderedArray = []

    JSON.parse(localStorage.getItem("stats")).forEach((obj) => {
        if (obj.isChecked === true){
            loadStats(APIStats, pointer).forEach((stat) => {
                if (stat.statName === obj.statName){
                        obj.statData = stat.statData;
                        obj.statUnit = stat.statUnit;
                        renderedArray.push(obj);
                    }
            })
        }
    })

    renderSecondaryStats(renderedArray);
    
    pointer === 0 ? document.querySelector(".left-chevron").style.display = "none" : null;
    pointer === 96 ? document.querySelector(".right-chevron").style.display = "none" : null;
}