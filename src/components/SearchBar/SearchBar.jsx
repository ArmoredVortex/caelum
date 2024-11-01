import { useState } from 'react'

import { FaSearch } from 'react-icons/fa'
import './SearchBar.css'
import Dashboard from '../Dashboard/Dashboard'
import SearchResult from '../SearchResult/SearchResult'
import Greeter from '../Greeter/Greeter'

const API_KEY = import.meta.env.VITE_OMW;

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [enabled, setEnabled] = useState(true);

    const fetchCity = async (value) => {
        setSearchResult('Searching...');
        //get lat and lon from geocoder
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${API_KEY}`).then(response => response.json()).then(data => {
            if (data.length == 0) {
                setWeatherData(null); // Remove dashboard
                setSearchResult('City not found :(');
                return;
            }
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_KEY}`).then(response => response.json()).then(data => {
                setEnabled(false);
                setWeatherData(data);
                setSearchResult(null);
            })

        }).catch(error => {
            console.log(error);
        }
        )
    };


    return (
        <>
            <Greeter enabled={enabled} />
            <div className='input-wrapper'>
                <FaSearch id='search-icon' />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            console.log('enter pressed');
                            fetchCity(input);
                        }
                    }}
                />
            </div>
            <SearchResult searchResult={searchResult} />
            <Dashboard weatherData={weatherData} />
        </>
    )
}

export default SearchBar