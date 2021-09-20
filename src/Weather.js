import React, { useEffect, useState } from "react";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Weather = () => {

    const [search, setSearch] = useState("");
    const [city, setCity] = useState({});
    const [winds, setWinds] = useState({});
    const [syss, setSyss] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=571bba764148eef045353da37546241a`
            const response = await fetch(url).then(response => {
                if (response.ok) {
                    response.json().then(resJson => {
                        // console.log(json);
                        setCity(resJson.main);
                        setWinds(resJson.wind);
                        setSyss(resJson.sys);
                    });
                }
                else {
                    setCity({});
                    setWinds({});
                }
            });
        };
        fetchApi();
    }, [search])

    return (
        <div className="parent_div">
            <div className="child_div">
                <input
                    type="search" className="inputfield" onChange={(event) => { setSearch(event.target.value) }} />

                {!city ? (
                    <p> No Found</p>
                ) : (
                    <div className="data mt-3">
                        <div className="data_search">
                            <h1><LocationOnIcon/> {search}</h1>
                        </div>
                        <div className="data_temp">
                            <h1>{city.temp}°C</h1>
                        </div>   
                        <p>
                            Low : {city.temp_min} °C || High : {city.temp_max}°C
                        </p>
                        <p>
                            Pressure : {city.pressure}<br />
                            Humidity : {city.humidity}<br />
                            Speed : {winds.speed}<br />
                            Degree : {winds.deg}<br />
                            Country : {syss.country}
                        </p>
                    </div>
                )
                }
            </div>
        </div>
    );
};
export default Weather;