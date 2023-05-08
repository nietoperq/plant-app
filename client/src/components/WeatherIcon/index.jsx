import React from "react";

import * as wi from "react-icons/wi";

function WeatherIcon(props) {
    const { weatherCode, isDay } = props;
    let icon;
    switch (weatherCode) {
        case 1000: //sunny/clear
            if (isDay) icon = <wi.WiDaySunny />;
            else icon = <wi.WiNightClear />;
            break;
        case 1003: //partly cloudy
            if (isDay) icon = <wi.WiDayCloudy />;
            else icon = <wi.WiNightAltCloudy />;
            break;
        case 1006: //cloudy
        case 1009: //overcast
            icon = <wi.WiCloudy />;
            break;
        case 1030: //mist
        case 1135: //fog
        case 1147: //freezing fog
            icon = <wi.WiFog />;
            break;
        case 1063: //patchy rain possible
        case 1180: //patchy light rain
        case 1183: //light rain
        case 1186: //moderate rain at times
        case 1189: //moderate rain
        case 1198: //light freezing rain
        case 1201: //moderate or heavy freezing rain
            if (isDay) icon = <wi.WiDayShowers />;
            else icon = <wi.WiNightShowers />;
            break;
        case 1066: //patchy snow possible
        case 1210: //patchy light snow
        case 1213: //light snow
        case 1216: //patchy moderate snow
        case 1219: //moderate snow
        case 1255: //light snow showers
        case 1258: //moderate or heavy snow showers
            if (isDay) icon = <wi.WiDaySnow />;
            else icon = <wi.WiNightAltSnow />;
            break;
        case 1222: //patchy heavy snow
        case 1225: //heavy snow
        case 1237: //ice pellets
        case 1261: //light showers of ice pellets
        case 1264: //moderate or heavy showers of light pellets
            icon = <wi.WiSnow />;
            break;
        case 1069: //patchy sleet possible
        case 1204: //light sleet
        case 1207: //moderate or heavy sleet
        case 1249: //light sleet showers
        case 1252: //moderate or heavy sleet showers
            if (isDay) icon = <wi.WiDaySleet />;
            else icon = <wi.WiNightAltSleet />;
            break;
        case 1072: //patchy freezing drizzle possible
        case 1150: //patchy light drizzle
        case 1153: //light drizzle
        case 1163: //freezing drizzle
        case 1171: //heavy freezing drizzle
            icon = <wi.WiRainWind />;
            break;
        case 1087: //thundery outbreaks possible
            if (isDay) icon = <wi.WiDayLightning />;
            else icon = <wi.WiNightAltLightning />;
            break;
        case 1114: //blowing snow
        case 1117: //blizzard
            icon = <wi.WiSnowWind />;
            break;
        case 1192: //heavy rain at times
        case 1195: //heavy rain
            icon = <wi.WiRain />;
            break;
        case 1240: //light rain shower
        case 1243: //moderate or heavy rain shower
        case 1246: //torrential rain shower
            if (isDay) icon = <wi.WiDaySprinkle />;
            else icon = <wi.WiNightAltSprinkle />;
            break;
        case 1273: //patchy light rain with thunder
        case 1276: //moderate or heavy rain with thunder
            if (isDay) icon = <wi.WiDayThunderstorm />;
            else icon = <wi.WiNightAltThunderstorm />;
            break;
        case 1279: //patchy light snow with thunder
        case 1282: //moderate or heavy snow with thunder
            if (isDay) icon = <wi.WiDaySnowThunderstorm />;
            else icon = <wi.WiNightAltSnowThunderstorm />;
            break;
        default:
            icon = <wi.WiNa />;
    }

    return icon;
}

export default WeatherIcon;
