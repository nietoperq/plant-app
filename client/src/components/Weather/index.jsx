import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import WeatherIcon from "../WeatherIcon";
import { WiStrongWind, WiCloudy, WiRaindrop, WiSprinkle } from "react-icons/wi";

import * as Styled from "./styles";

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

    console.log(data.current);

    return (
        <>
            <h2>Weather</h2>

            {data.current ? (
                <Styled.Weather>
                    <span>
                        {data.location.name}, {data.location.country}
                    </span>
                    <Styled.FlexRow>
                        <div>
                            <p id="temp">{data.current.temp_c}°C</p>
                            <span>{data.current.condition.text}</span>
                        </div>
                        <WeatherIcon
                            weatherCode={data.current.condition.code}
                            isDay={data.current.is_day}
                        />
                    </Styled.FlexRow>
                    <Styled.FlexRow>
                        <Styled.WeatherDetails>
                            <WiStrongWind />
                            <p>
                                {Math.round(data.current.wind_kph)}
                                <sup>km/h</sup>
                            </p>
                        </Styled.WeatherDetails>
                        <Styled.WeatherDetails>
                            <WiCloudy />
                            <p>
                                {data.current.cloud}
                                <sup>%</sup>
                            </p>
                        </Styled.WeatherDetails>
                        <Styled.WeatherDetails>
                            <WiRaindrop />
                            <p>
                                {data.current.humidity}
                                <sup>%</sup>
                            </p>
                        </Styled.WeatherDetails>
                        <Styled.WeatherDetails>
                            <WiSprinkle />
                            <p>
                                {data.current.precip_mm}
                                <sup>mm</sup>
                            </p>
                        </Styled.WeatherDetails>
                    </Styled.FlexRow>
                </Styled.Weather>
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
        </>
    );
}

export default Weather;
