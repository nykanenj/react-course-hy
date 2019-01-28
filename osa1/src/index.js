import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      { 
        id: '1',
        part: 'Reactin perusteet',
        exercises: 10,
      },
      { 
        id: '2',
        part : 'Tiedonvälitys propseilla',
        exercises: 7,
      },
      { 
        id: '3',
        part : 'Komponenttien tila',
        exercises: 14,
      }
    ]
  };

  let sum = 0;
  course.parts.forEach(e => sum += e.exercises);
  course.total = sum;

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.total} />
    </div>
  );
}

const Header = props => <h1> {props.name} </h1>;

const Content = (props) => {
  return (
    <>
      {props.parts.map(element => <Part {...element} key={element.id} />)}
    </>
  );
}

const Part = props => <p> {props.part} {props.exercises} </p>

const Total = props => <p>yhteensä {props.total} tehtävää </p>;



ReactDOM.render(<App />, document.getElementById('root'));
