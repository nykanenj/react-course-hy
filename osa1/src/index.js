import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = 'Half Stack -sovelluskehitys';
  const part1 = 'Reactin perusteet';
  const exercises1 = 10;
  const part2 = 'Tiedonvälitys propseilla';
  const exercises2 = 7;
  const part3 = 'Komponenttien tila';
  const exercises3 = 14;

  const data = [
    { 
      id: '1',
      part: part1,
      exercises: exercises1,
    },
    { 
      id: '2',
      part : part2,
      exercises: exercises2,
    },
    { 
      id: '3',
      part : part3,
      exercises: exercises3,
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

const Header = (props) => <h1> {props.course} </h1>;

const Content = (props) => {
  return (
    <>
      {props.data.map(element => <Part {...element} key={element.id} />)}
    </>
  );
}

const Part = props => <p> {props.part} {props.exercises} </p>

const Total = props => <p>yhteensä {props.total} tehtävää </p>;



ReactDOM.render(<App />, document.getElementById('root'));
