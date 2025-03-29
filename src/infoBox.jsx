
import "./style.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function CityInformation( { info } )
{
    let INIT_IMG = "https://t4.ftcdn.net/jpg/05/38/39/11/360_F_538391124_m2etBmoq0zlYP9pq4F7kvZ3ja8IfatFM.jpg";
    let sunny_IMG = "original-406d074122aa4f875cd3c6182a6c5171.gif";
    let rainy_IMG = "rainy season.gif";
    let cold_IMG = "giphy.gif";
    let find_IMG = "https://cdn.dribbble.com/userupload/19560739/file/original-592811860e1de671ab2ea15f4311db48.gif";

    return(
        <div className="info-box">

            <Card sx={{ maxWidth: 355 , borderRadius: "1rem"}}>
                <CardMedia
                    sx={{ height: 170 }}
                    image={info.humidity > 80 ? rainy_IMG : (info.temp === null ? find_IMG : (info.temp > 15 ? sunny_IMG : cold_IMG))}
                    title="green iguana"
                />
                <CardContent className="bg-blue-200 text-purple-800">
                    <Typography gutterBottom variant="h5" component="div">
                            {info.city} &nbsp;
                            <p className="text-base capitalize text-purple-800" style={{display:"inline-block"}}><b>{info.descript}</b></p>
                    </Typography>

                    <Typography variant="body2" color='text.secondary' component={"span"} className="each-info">
                            
                            <p><b>Temp &nbsp; :</b> {info.temp}&deg;C</p>

                            <p><b>Humidity &nbsp; :</b> {info.humidity} %</p>

                            <p><b>Wind Speed &nbsp; :</b> {info.wind} km/h</p>

                            <p><b>Sunrise &nbsp; :</b> {info.sunrise}</p>

                            <p><b>Sunset &nbsp; :</b> {info.sunset}</p>

                            <p className="capitalize"><b> The Weather can be described as {info.weather} and feels like {info.feels_like}&deg;C. </b></p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}