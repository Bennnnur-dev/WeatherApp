import {renderOverview} from './interface.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { loadStats } from './data/stats.js';

export async function fetchApi(coords) {
    try{
        const weatherData = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=apparent_temperature&hourly=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&models=meteofrance_seamless`
          );
    
        const response = await weatherData.json();
        loadStats(response)
        renderOverview(response)
    }

    catch(err){
        console.error(`Unable to fetch API ${err}`)
    }
}