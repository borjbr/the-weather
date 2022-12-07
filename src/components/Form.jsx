import React from 'react';
import { useEffect, useState } from "react";


import { getCountries } from "../services/countries";
import { getCities } from "../services/cities";
import { getCityWeather } from "../services/weather";

const App = () => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      setCountries(await getCountries());
    })();
    
  },[]);

  const countryHandler = async e => e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
  const cityHandler= async e => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value))

  const today = new Date();
  const day = today.getDay();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date =  day + '/' + month + '/' + year;



  return (
    <>
    <main className='container'>
      <form>
      <div className='form-group'>
        <label>Elige un pais</label>
        <select className='form-control' onChange={countryHandler} name="pais">
          <option value="">Selecciona</option>
          {countries.map((country) =><option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
        </select>
      </div>
      {cities.length > 0 && (
        <div>
          <label>Elige una ciudad</label>
          <select className='form-control' onChange={cityHandler} name="ciudad">
          <option value="">Selecciona</option>
            {cities.map((city) =><option key={city.id}>{city.name}</option>)}
          </select>
        </div>
      )}
      </form>
      {weather && (
      <><>
      <div className='row no-gutters c-results'>
        <div className='col-12 col-md-6 col-lg-4 c-results-card p-4'>
          <h2 className='c-results-card__temp'>{(weather.main.temp).toFixed(1)}ºC</h2>
          <p className='c-results-card__date'>{date}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
        </div>
        <div className='col-12 col-md-6 col-lg-8 c-results-info p-4'>
          <p>Temperatura máxima:</p><h3>{(weather.main.temp_max).toFixed(1)}ºC</h3> 
          <p>Temperatura mínima:</p><h3>{(weather.main.temp_min).toFixed(1)}ºC</h3>
          <p>Sensación térmica:</p><h3>{(weather.main.feels_like).toFixed(1)}ºC</h3>
          <p>Humedad:</p><h3>{weather.main.humidity}%</h3>
          <p>Velocidad del viento:</p><h3>{weather.wind.speed}m/s</h3>
        </div>
      </div>
      </></>
    )}


    </main>
    </>
  )
}

export default App;