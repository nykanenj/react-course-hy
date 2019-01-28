import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    
    const [selected, setSelected] = useState(0);
    console.log('length', props.anecdotes.length);
    
    const handleRandomAnecdote = () => {
        
        let rand = Math.floor(Math.random() * props.anecdotes.length);
        console.log('rand', rand);
        setSelected(rand);
    }

    return (
        <>
            <div>
                {props.anecdotes[selected]}
            </div>
            <div>
                <Button text='Generoi anekdootti' handleClick={handleRandomAnecdote} />
            </div>
        </>
    )
}
    
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
    
ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

