import axios from 'axios'

//SERVER PERSONS
const baseUrl = 'http://localhost:3001/persons'
    //SERVER MONGO
const baseApiUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseApiUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseApiUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseApiUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseApiUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, del }