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


  return (
    <>
    <main className='container'>
      <form>
      <div className='form-group'>
        <label>Elige un pais</label>
        <select className='form-control' onChange={countryHandler} name="">
          <option value="">Selecciona</option>
          {countries.map((country) =><option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
        </select>
      </div>
      {cities.length > 0 && (
        <div>
          <label>Elige una ciudad</label>
          <select className='form-control' onChange={cityHandler}>
          <option value="">Selecciona</option>
            {cities.map((city) =><option key={city.id}>{city.name}</option>)}
          </select>
        </div>
      )}
      </form>
      <div className='c-results'>
      {weather && (
      <div>
          <h2>Temperatura actual: {weather.main.temp}º</h2>
          <p>Min: {weather.main.temp_min.toFixed()}°</p>
          <p>Max: {weather.main.temp_max.toFixed()}°</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
      </div>
    )}
      </div>

    </main>
    </>
  )
}

export default App;