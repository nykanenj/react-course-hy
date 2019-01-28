import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  
  const App = (props) => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
  
    const handleClickGood = () => {
        setGood(good + 1);
    }
  
    const handleClickNeutral = () => {
        setNeutral(neutral + 1);
    }

    const handleClickBad = () => {
        setBad(bad + 1);
    }
 

    const Statistics = ({good, bad, neutral}) => {
        const yhteensa = good + neutral + bad;
        const keskiarvo = (good * 1 + bad * -1) / yhteensa;
        if (yhteensa === 0) return <h1> Statistiikkaa ei saatavilla, ei palautteita </h1>;

        return (
            <>
                <h1> Statistiikka </h1>
                <table>
                    <tbody>
                        <Statistic statName='Hyvä' value={good} />
                        <Statistic statName='Neutraali' value={neutral} />
                        <Statistic statName='Huono' value={bad} />
                        <Statistic statName='Yhteensä' value={yhteensa} />
                        <Statistic statName='Keskiarvo' value={keskiarvo} />
                    </tbody>
                </table>
            </>
        )
    }

    const Statistic = ({statName, value}) => {
        return (
            <tr> 
                <td>{statName}</td>  
                <td>{value}</td> 
            </tr>
        )
    }
  
    return (
        <>
            <h1> Anna palautetta </h1>
            <div>
            <Button handleClick={handleClickGood} text='Hyvä' />
            <Button handleClick={handleClickNeutral} text='Neutraali' />
            <Button handleClick={handleClickBad} text='Huono' />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));
