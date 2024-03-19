import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import './App.css'

import personService from './services/persons'





const Footer = () => {
  const footerStyle = {
    color: '#c0fae6',
    fontStyle: 'italic'
  }
  return (
    <div style={footerStyle}>
      <br />
      <h1>This is a Mongo based Phonebook</h1>
      <p><em>*to change a number add a new contact with the same name and new number</em></p>
    </div>
  )
}


const App = () => {

  const [personServer, setPersonServer] = useState([])
   
  const container ={
      borderRadius: 50,
      border: '#c1e37d',
      borderStyle: 'solid',
      padding: 40
  }
  

    useEffect(() => {
          personService.getAll()
            .then(response => {
               console.log('promise fulfilled')
                setPersonServer(response)
            })    
    },[personServer.length])

    console.log('render', personServer.length, 'element')


  return (
    <>
    <div style={container}>
      <h2>Phonebook</h2>
      <Filter person={personServer} /> 
      <h3>Add a new </h3>
      <PersonForm persons={personServer} setPersons={setPersonServer} />
      <h3>Numbers</h3>
      <Persons persons={personServer} personServer={setPersonServer} />
    </div>
    <Footer/>
    </>
  )
}

export default App