import React from 'react';

const AddPersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) =>  {

    const onNameChange = (event) => {
        setNewName(event.target.value);
      }
    
      const onNumberChange = (event) => {
        setNewNumber(event.target.value);
      }

    return ( 
        <div>
            <h3>Lisää henkilö</h3>  
            <form onSubmit={addPerson}>
            <div>
                Nimi: 
                <input 
                    value={newName}
                    onChange={onNameChange}
                />
            </div>
            <div>
                Numero: 
                <input 
                    value={newNumber}
                    onChange={onNumberChange}
                />
            </div>
            <div>
                <button type="submit">Lisää</button>
            </div>
            </form>
        </div>
    );
}

export default AddPersonForm;