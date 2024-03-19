import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

/*
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

promise.then(response => {
  console.log(response)
})
const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

promise2.then(response => {
  console.log(response)
})

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
*/
//A Promise is an object representing the eventual completion or failure of an asynchronous operation.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
