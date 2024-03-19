import { useState, useEffect } from 'react'
import personService from '../services/persons'



const Person = ({ person,setPersonServer }) => {
  

  const delPerson = (id)=>{
//aggiustare
    if (window.confirm(`Delete ${person.name} ?` )) {
      personService
      .del(id).then(response => {
        console.log('Risposta dal server:', response.data);
      })
      .catch(error => {
        alert(`the person '${person.name}' was already deleted from server`)
      });
      window.open(location.reload(), "ok!");
    }
    
  }

    return (
      <span>
        <h3>{person.name} {person.number}   <button onClick={() => delPerson(person.id)}>Delete</button></h3>
      </span>
    )
  }
export default Person