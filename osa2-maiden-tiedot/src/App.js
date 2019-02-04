import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => { 

  const [countries, setCountries] = useState([]);
  const [expression, setExpression] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data));
  }, []);

  const onExprChange = (event) => setExpression(event.target.value);


  const regExpr = new RegExp(expression, 'i');
  const filteredCountries = countries.filter(country => regExpr.test(country.name));
  const display =  filteredCountries.length === 1 ? <Country data={filteredCountries[0]} weather={weather} setWeather={setWeather} /> : 
    (filteredCountries.length > 10 ? 'Too many results' : <Suggestions data={filteredCountries} setExpression={setExpression} />);


  return (
    <div>
      <h1> Country info lookup </h1>
      Search a country: 
      <input 
        value={expression}
        onChange={onExprChange}
      />
      <h2> Results </h2>
      {display}
    </div>
  );
}

const Country = ({data, weather, setWeather}) => {

  useEffect(() => {  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=27a85b660aab6e9a184d32aad807b514`)
      .then(response => setWeather(response.data));
  }, {});

  return(
    <div>
      <h2> {data.name}</h2>
      <div> Capital: {data.capital} </div>
      <div> Population: {data.population} </div>
      <h3> Languages </h3>
      {data.languages.map(language => <div key={language.name}> {language.name} </div>)}
      <h3> Flag </h3>
      <img src={data.flag} width={300} className='border' alt='Country flag' />
      {weather && weather.main && weather.main.temp && weather.wind &&
        <div>
          <h3> Weather </h3>
          <div> Temperature:  {weather.main.temp} fahrenheit</div>
          <div> WindSpeed: {weather.wind.speed} </div>
          <div> WindDirection: {weather.wind.deg} </div>
        </div>
      }
    </div>
  );
}

const Suggestions = ({data, setExpression}) => data.map(country => {
  return (
  <div key={country.name}> 
    <span> {country.name} </span> 
    <button onClick={() => setExpression(country.name)}>
      Show
    </button>
  </div>);
});

export default App;
