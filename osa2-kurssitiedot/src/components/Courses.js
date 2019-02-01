import React from 'react';

const Courses = ({courses}) => courses.map(course => <Course {...course} key={course.id} />);

const Course = ({name, parts}) => {
    const total = parts.map(element => element.exercises).reduce((a, b) => a + b);
    
    return (
        <div>
          <Header name={name} />
          <Content parts={parts} />
          <Total total={total} />
        </div>
    );
}

const Header = ({ name }) => <h1> {name} </h1>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(element => <Part {...element} key={element.id} />)}
    </>
  );
}

const Part = ({name, exercises}) => <p> {name} {exercises} </p>

const Total = ({total}) => <p>yhteensä {total} tehtävää </p>;

export default Courses;
