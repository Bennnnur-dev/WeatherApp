import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { convertUnits } from '../utils/convertUnits.js';
import { units } from '../interface.js';

export function loadStats(response, pointer){
    pointer === undefined ? pointer = dayjs().hour() : null;

     const stats = [
        {
            statName: "Apparent temperature",
            statSVG: "M520-520v-80h200v80H520Zm0-160v-80h320v80H520ZM320-120q-83 0-141.5-58.5T120-320q0-48 21-89.5t59-70.5v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q38 29 59 70.5t21 89.5q0 83-58.5 141.5T320-120ZM200-320h240q0-29-12.5-54T392-416l-32-24v-280q0-17-11.5-28.5T320-760q-17 0-28.5 11.5T280-720v280l-32 24q-23 17-35.5 42T200-320Z",
            statData: convertUnits(response.current.apparent_temperature, units.tempUnit),
            statUnit: units.tempUnit,
            isChecked: false
        },
        {
            statName: "Elevation (sea level)",
            statSVG: "m82-120 258-360h202l298-348v708H82Zm70-233-64-46 172-241h202l188-219 60 52-212 247H300L152-353Zm86 153h522v-412L578-400H380L238-200Zm522 0Z",
            statData: convertUnits(response.elevation, units.elevationUnit),
            statUnit: units.elevationUnit,
            isChecked: false

        },
        {
            statName: "Wind speed",
            statSVG: "M400-40q0-33 23.5-56.5T480-120v-208q-12-5-22.5-11.5T438-354l-88 56q-14 8-30.5 10.5T286-290l-180-51q-29-8-47.5-32.5T40-429q0-38 26.5-64.5T131-520h301q10-11 22-19t26-13v-137q0-17 6.5-32t18.5-26l137-128q23-22 53.5-25t56.5 13q32 20 41.5 56.5T783-762L624-499q7 12 10.5 26t4.5 29l108 26q16 4 29 14t21 24l91 164q15 27 11 57t-26 52q-27 27-64.5 27T744-107L560-291v171q33 0 56.5 23.5T640-40H400ZM160-760v-80h240v80H160Zm400 71v137q1 0 1.5.5t1.5.5l152-253q2-4 1-8.5t-5-6.5q-3-2-7.5-1t-6.5 3L560-689ZM40-600v-80h200v80H40Zm480 200q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400Zm-211 34 93-56q-1-5-1-9v-9H131q-5 0-8 3t-3 8q0 4 2 7t6 4l181 52Zm419 25-114-26q-2 2-4 5t-4 5l195 194q3 3 8 3t8-3q3-3 3.5-6.5T819-177l-91-164ZM120-120v-80h200v80H120Zm400-320Zm43-111ZM401-440Zm205 83Z",
            statData: convertUnits(response.hourly.wind_speed_10m[pointer], units.speedUnit),
            statUnit: units.speedUnit,
            isChecked: false

        },
        {
            statName: "Wind gusts",
            statSVG: "M750-614q-27 27-62 41t-70 14q-35 0-69-13.5T488-614l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-689l-75 75-57-57 75-75q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-746l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-671l75-75 57 57-75 75Zm0 200q-27 27-61.5 40.5T619-360q-35 0-69.5-13.5T488-414l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-489l-75 75-57-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-546l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-471l75-75 57 57-75 75Zm-1 200q-27 27-61 40.5T619-160q-35 0-69.5-13.5T488-214l-76-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T266-289l-75 75-56-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-346l75 75q16 16 35.5 23.5T619-240q20 0 39-7.5t35-23.5l75-75 56 57-75 75Z",
            statData: convertUnits(response.hourly.wind_gusts_10m[pointer], units.speedUnit),
            statUnit: units.speedUnit,
            isChecked: false
        },
        {
            statName: "Wind direction",
            statSVG: "M480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM661-80q18-56 27-100t14-70q-43 42-100 66t-122 24q-136 0-238.5-18.5T80-214v-85q56 18 100 27t70 14q-42-43-66-100t-24-122q0-137 18.5-239T214-880h85q-18 56-27.5 100T258-710q43-42 100-66t122-24q137 0 239 18.5T880-746v85q-56-18-100-27.5T710-702q42 43 66 100t24 122q0 137-18.5 239T746-80h-85ZM480-240q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Z",
            statData: response.hourly.wind_direction_10m[pointer],
            statUnit: '°',
            isChecked: false
        },
        {
            statName: "Humidity",
            statSVG: "M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100ZM240-416h480q0-47-18-89.5T650-580L480-748 310-580q-34 32-52 74.5T240-416Z",
            statData: 100 - response.hourly.relative_humidity_2m[pointer],
            statUnit: '%',
            isChecked: false
        },
        {
            statName: "Precipitation",
            statSVG: "M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z",
            statData: convertUnits(response.hourly.precipitation[pointer], units.precipitationUnit),
            statUnit: units.precipitationUnit,
            isChecked: false
        },
        {
            statName: "Cloud cover",
            statSVG: "M260-160q-92 0-156-64T40-380q0-78 48.5-137.5T210-594q25-90 99-148t171-58q119 0 199.5 82.5T760-520q75 8 117.5 62T920-341q0 75-52.5 128T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-63 0-112 34.5T296-597q78 13 131 73.5T480-380h-80q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z",
            statData: response.hourly.cloud_cover[pointer],
            statUnit: '%',
            isChecked: false
        },
    ]

    return stats
}