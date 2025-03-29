
import { useState } from "react";
import "./style.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '@fontsource/roboto/500.css';

export default function searchBox( { updateInfo } )
{
    const [city , setCity] = useState("");

    const [error , setError] = useState("");

    const apiKey = "16150b9ee8ba28f9a778d15eef1d15a2";
    let API_URL = "https://api.openweathermap.org/data/2.5/weather?";
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

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
        try {
            const fetchData = await fetch(`${API_URL}q=${city}&appid=${apiKey}&units=metric`);
            let rawData = await fetchData.json();

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
        catch(err){
            console.error(err);
            setError("No Such Places Found!");
        }
    }

    function hndlCity(event)
    {   
        setCity(event.target.value);
    }

    async function hndlSubmit(event)
    {
        try{
            event.preventDefault();
            setCity("");
            console.log(city);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <div className="searchBox">
            <h2 >Search for the weather</h2>

            <form action="#" onSubmit={hndlSubmit}>

                <TextField id="city-basic" label="City" 
                    variant="outlined" 
                    color="black" name="city"
                    value={city} required
                    onChange={hndlCity} 
                    placeholder="Bhopal" />

                <br />

                <Button variant="contained" sx={{marginTop : "1rem"}} type="submit">Search</Button>
                <p>{error}</p>
            </form>
        </div>
        
    );
}