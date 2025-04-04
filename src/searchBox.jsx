
import { useState } from "react";
import "./style.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';
import axios from "axios";

export default function searchBox( { updateInfo } )
{
    const [city , setCity] = useState("");

    const [error , setError] = useState(false);

    const apiKey = "16150b9ee8ba28f9a778d15eef1d15a2";
    let API_URL = "https://api.openweathermap.org/data/2.5/weather?";

    function convertTimestamptoTime(unixTimestamp) {
    
        // Convert to milliseconds and
        // then create a new Date object
        let dateObj = new Date(unixTimestamp * 1000);
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
    
        let time = `${hour.toString().padStart(2,"0")} : ${minute.toString().padStart(2,"0")}`;
    
        return time;
    }
    

    let getWeatherInfo = async () => {
        const fetchData = await axios.get(`${API_URL}q=${city}&appid=${apiKey}&units=metric`)
        .catch( (err) => {
            console.log("The Area is not available " + err);
            setError(true);
        });
        let rawData = fetchData.data;

        let result = {
            city : rawData.name,
            temp : rawData.main.temp,
            humidity : rawData.main.humidity,
            feels_like : rawData.main.feels_like,
            wind : Math.round(rawData.wind.speed * 18/5),
            descript : rawData.weather[0].description,
            weather : rawData.weather[0].main,
            country : rawData.sys.country,
            sunrise : convertTimestamptoTime(rawData.sys.sunrise),
            sunset : convertTimestamptoTime(rawData.sys.sunset),
            time : convertTimestamptoTime(rawData.dt),
        };
        console.log(result);
        return result;

    }

    function hndlCity(event)
    {   
        setCity(event.target.value);
    }

    async function hndlSubmit(event)
    {
        event.preventDefault();
        setCity("");
        setError(false);
        console.log(city);
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    }

    return(
        <div className="searchBox">
            <h2 className="title-name">Search for the weather</h2>
            <h2 className="app-name">WEATHER</h2>

            <form action="#" onSubmit={hndlSubmit}>

                <TextField id="city-basic" label="City" 
                    variant="outlined" 
                    color="black" name="city"
                    value={city} required
                    onChange={hndlCity} />
                <br />

                <Button variant="contained" sx={{marginTop : "1rem"}} type="submit">Search</Button>
                <p style={{color:"#902e2e"}} className="font-medium">{error === true ? "The Area is not available" : " "}</p>
            </form>
        </div>
        
    );
}