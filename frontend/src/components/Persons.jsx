import Person from "./Person"

const Persons = ({persons}) => {
    return (
      <>
      {persons.map((p,id) => <Person key={id} person={p} />)}
      </>
    )
  }
export default Persons