import {useState} from "react";
import Person from "./Person";


const Filter= (props) => {
    const [newFilter, setNewFilter] = useState('')

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const filtered = props.person.filter(p=>p.name.toUpperCase().includes(newFilter.toUpperCase()))
    
const filter = (value) => {
  if(value!=='')
  return filtered.map((p,id) => <Person key={id} person={p} />)
}

    return (
      <div>
        <h2>filter shown with<input value={newFilter} onChange={handleFilterChange}   /></h2>
        {filter(newFilter)}
      </div>
    )
    
  }

  export default Filter