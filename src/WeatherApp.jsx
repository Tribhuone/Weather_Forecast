
import { useState } from "react";
import "./style.css";
import Citysearch from "./searchBox";
import Cityinfo from "./infoBox";

export default function Weather()
{

    const [weatherInfo , setWeatherInfo] = useState({
        city : "",
        country : "",
        descript : "",
        sunrise : "00 : 00",
        sunset : "00 : 00",
        feels_like : "0",
        temp : null,
        humidity : "0",
        wind : "0",
        weather : "0",
        time : "00 : 00",
    });

    let updateInfo = ( newInfo ) => {
        setWeatherInfo( newInfo );
    }

    let source;
    if(weatherInfo.time > "06 : 00" && weatherInfo.time < "18 : 00")
    {
        source = "sunLight.gif";
    }
    else{
        source = "night Time.png";
    }

    let IMG = "cc7f50841bb97e10d159394030cc44c4.jpg";

    return(
        <div className="backGround">
            <div>
                <h1 className="head-name text-6xl font-medium">Weather App</h1>
                <img src={source} alt="" className="myImg"/>
            </div>

            <div className="main-mera">
                <Citysearch updateInfo={updateInfo}></Citysearch>
                <Cityinfo info={weatherInfo} ></Cityinfo>
            </div>
        </div>
    );
}