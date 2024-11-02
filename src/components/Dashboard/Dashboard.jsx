import './Dashboard.css'
import PropTypes from 'prop-types'
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { HiMiniArrowDownCircle, HiMiniArrowUpCircle } from "react-icons/hi2";
import { FaWind } from "react-icons/fa6";
import { useEffect } from 'react';
import { useReducer } from 'react';

const API_KEY = import.meta.env.VITE_OMW;

const convertUnixToIST = (unixTime) => {
    const date = new Date(unixTime * 1000); // Convert seconds to milliseconds
    // Convert to IST using toLocaleString
    const options = { timeZone: 'Asia/Kolkata', week12: false, week: '2-digit', minute: '2-digit' };
    const timeInIST = date.toLocaleString('en-IN', options);
    return timeInIST;
};

let weeklyForecast = [];

const Dashboard = ({ weatherData }) => {

    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        console.log('Dashboard component mounted');
        return () => {
            console.log('Dashboard component unmounted');
        };
    }, [reducerValue]);

    if (weatherData === null) {
        return null;
    }
    console.log(weatherData);

    async function fetchWeatherForecast() {
        if (weeklyForecast.length == 5) {
            return;
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log('API CALL: Fetching 5-day forecast');


            // push data to weeklyForecast (the data is for every 3 hours, so we need to get the data for 5 days) so we get every 2nd element for the day
            weeklyForecast = [];
            // get data for first 5 days only
            for (let i = 0; i < 40; i += 8) {
                const date = new Date(data.list[i].dt * 1000);
                const day = date.toLocaleString('en-IN', { weekday: 'short' });
                const icon = data.list[i].weather[0].icon;
                const temp = (data.list[i].main.temp - 273).toFixed(1);
                weeklyForecast.push({ date: day, icon: <img src={`http://openweathermap.org/img/wn/${icon.slice(0, -1)}d.png`} alt="weather icon" />, temp });


            }

            console.log(weeklyForecast);
            forceUpdate();

        } catch (error) {
            console.error("Error fetching weather forecast:", error);
        }
    }

    fetchWeatherForecast();

    return (
        <div id='dashboard'>
            <div className="weather-widget">

                <div className="city-name">{weatherData.name}</div>

                <div className="today-forecast">
                    <div className="today-info">
                        <div className="today-temp">{(weatherData.main.temp - 273).toFixed(1)}°C</div>
                        <div className="today-desc">Feels like {(weatherData.main.feels_like - 273).toFixed(1)}°C</div>
                        <div className="today-desc">{weatherData.weather[0].main}</div>
                    </div>
                    <div className="today-icon">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon.slice(0, -1)}d.png`} alt="weather icon" />
                    </div>
                </div>

                {/* Sun information */}
                <div className="sun-info">
                    <div className='info-item'>
                        <div className="sun-section">
                            <div className="sun-label">Sunrise</div>
                            <div className="sun-value">
                                {convertUnixToIST(weatherData.sys.sunrise)}
                                <FiSunrise className='margin-left' />
                            </div>
                        </div>
                        <div className="sun-section">
                            <div className="sun-label">Min Temp</div>
                            <div className="sun-value">
                                {(weatherData.main.temp_min - 273).toFixed(1)}°C
                                <HiMiniArrowDownCircle className='margin-left' />
                            </div>
                        </div>
                    </div>

                    <div className='info-item'>
                        <div className="sun-section">
                            <div className="sun-label">Sunset</div>
                            <div className="sun-value">
                                {convertUnixToIST(weatherData.sys.sunset)}
                                <FiSunset className='margin-left' />
                                {/* <span className="sun-value-unit">PM</span> */}
                            </div>
                        </div>
                        <div className="sun-section">
                            <div className="sun-label">Max Temp</div>
                            <div className="sun-value">
                                {(weatherData.main.temp_max - 273).toFixed(1)}°C
                                <HiMiniArrowUpCircle className='margin-left' />
                            </div>
                        </div>
                    </div>

                    <div className='info-item'>
                        <div className="sun-section">
                            <div className="sun-label">Humidity</div>
                            <div className="sun-value">{weatherData.main.humidity}% <WiHumidity /></div>
                        </div>
                        <div className="sun-section">
                            <div className="sun-label">Wind Speed</div>
                            <div className="sun-value">{weatherData.wind.speed} m/s <FaWind className='margin-left' /></div>

                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="weather-header">
                    <h2 className="section-title">Week</h2>
                    <div className="weekly-forecast">
                        {weeklyForecast.map((week) => (
                            <div key={week.date} className="week-card">
                                <div className="week-date">{week.date}</div>
                                <div className="week-icon">{week.icon}</div>
                                <div className="week-temp">{week.temp}°</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.propTypes = {
    weatherData: PropTypes.shape({
        name: PropTypes.string,
        main: {
            temp: PropTypes.number,
            feels_like: PropTypes.number,
        },
        weather: [{
            main: PropTypes.string
        }],
        sys: {
            sunrise: PropTypes.time,
            sunset: PropTypes.time
        },
        wind: {
            speed: PropTypes.number
        },
        coord: {
            lat: PropTypes.number,
            lon: PropTypes.number
        }
    }),
};

export default Dashboard