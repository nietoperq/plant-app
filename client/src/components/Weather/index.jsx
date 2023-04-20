import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://api.weatherapi.com/v1/current.json?key=a85b96a5f2f44568ba8171324231604&q=${latitude},${longitude}&aqi=no`;

            axios.get(url).then((response) => {
                setData(response.data);
                setLocation(response.data.location.name);
            });
        });
    }, []);

    console.log(data);

    return (
        <div>
            <img src={data.current?.condition.icon} />
            <p>
                Location: {data.location?.name}, {data.location?.country}
            </p>
            <p>{data.current?.condition.text}</p>
            <p>{data.current?.temp_c}°C</p>
            <p>Humidity: {data.current?.humidity}%</p>
            <p>Cloud cover: {data.current?.cloud}%</p>
            <p>Precipitation amount: {data.current?.precip_mm}mm</p>
        </div>
    );
}

export default Weather;
