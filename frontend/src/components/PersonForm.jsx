import { useState } from 'react'
import personService from '../services/persons'
import '../App.css'

const Notification = ({ message }) => {

  const error={
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

  if (message === null) {
    return null
  }

  return (
    <div style={error}>
      {message}
    </div>
  )
}


const PersonForm = ({persons,setPersons}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  

    const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
      
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }

      const addPerson = (event) =>{
        event.preventDefault()
        const personObject ={
          name: newName,
          number: newNumber
        }
        
          if (personObject.name === ""||personObject.number===""){
            alert(`name or phone is empty `)
            setNewName('')
            setNewNumber('')
          }

          else if(persons.find(n =>{return  (n.name===personObject.name)})){
            const findId = persons.find(n => n.name===personObject.name).id
            setNewName('')
            if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one ?` )) {
            personService
            .update(findId, personObject).then(location.reload())
            window.open(location.reload(), "ok!");
            }
          }

          else if(persons.find(n =>{return  (n.number===personObject.number)})){
            alert(`${newNumber} is already added to phonebook`)
            setNewNumber('')
          }
         
          else{
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')

            personService
            .create(personObject).then(returnedPerson => {
               setPersons(persons.concat(returnedPerson))
            })
            setErrorMessage(
              `Added '${personObject.name}' `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)

          }

          
          
      };

    return (
        <form onSubmit={addPerson}>
          <Notification message={errorMessage} />
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }
export default PersonForm