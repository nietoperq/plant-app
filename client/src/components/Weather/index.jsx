import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Weather() {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const location = localStorage.getItem("location");

        const getLocationFromGeolocationApi = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://api.weatherapi.com/v1/current.json?key=a85b96a5f2f44568ba8171324231604&q=${latitude},${longitude}&aqi=no`;
                    axios.get(url).then((response) => {
                        setData(response.data);
                    });
                },
                (error) => {
                    setError(error);
                }
            );
        };

        if (!location) {
            getLocationFromGeolocationApi();
        } else {
            const url = `https://api.weatherapi.com/v1/current.json?key=a85b96a5f2f44568ba8171324231604&q=${location}&aqi=no`;
            axios.get(url).then((response) => {
                setData(response.data);
            });
        }
    }, []);

    return (
        <div>
            <h2>Weather</h2>
            {data.current ? (
                <>
                    <img src={data.current.condition.icon} />
                    <p>
                        Location: {data.location.name}, {data.location.country}
                    </p>
                    <p>{data.current.condition.text}</p>
                    <p>{data.current.temp_c}°C</p>
                    <p>Humidity: {data.current.humidity}%</p>
                    <p>Cloud cover: {data.current.cloud}%</p>
                    <p>Precipitation amount: {data.current.precip_mm}mm</p>
                </>
            ) : (
                <>
                    {error ? (
                        <p>{error.message}</p>
                    ) : (
                        <p>
                            Location{" "}
                            <span>{localStorage.getItem("location")}</span> not
                            found
                        </p>
                    )}
                    <p>
                        Allow the browser to share your location or set it
                        manually in <Link to="/settings">settings</Link>
                    </p>
                </>
            )}
        </div>
    );
}

export default Weather;
