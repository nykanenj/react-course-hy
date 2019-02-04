import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => { 

  const [countries, setCountries] = useState([]);
  const [expression, setExpression] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data));
  }, []);
  
  console.log('countries', countries);

  const onExprChange = (event) => setExpression(event.target.value);


  const regExpr = new RegExp(expression, 'i');
  const filteredCountries = countries.filter(country => regExpr.test(country.name));
  const display =  filteredCountries.length === 1 ? <Country data={filteredCountries[0]} /> : 
    (filteredCountries.length > 10 ? 'Too many results' : <Suggestions data={filteredCountries} />);


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

const Country = ({data}) => {
  
  return(
    <div>
      <h2> {data.name}</h2>
      <div> Capital: {data.capital} </div>
      <div> Population: {data.population} </div>
      <h3> Languages </h3>
      {data.languages.map(language => <div key={language.name}> {language.name} </div>)}
      <h3> Flag </h3>
      <img src={data.flag} width={300} class='border'/>
    </div>
  );
}

const Suggestions = ({data}) => data.map(country => <div key={country.name}> {country.name} </div>)

export default App;