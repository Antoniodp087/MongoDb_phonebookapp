const { request, response } = require('../frontend/node_modules/express')
const express = require('../frontend/node_modules/express')
const app = express()

//morgan middleware
const morgan = require('../frontend/node_modules/morgan');
app.use(morgan('dev'));

//new token for formatting
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
));
//

//CORS
const cors = require('../frontend/node_modules/cors')
app.use(cors())

//backend dist
//app.use(express.static('dist'))

let persons = [{
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if (person) {
        console.log(person)
        response.json(person)
    } else {
        response.status(404).end()
    }
})


const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(n => n.id)) :
        0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    console.log(person);
    response.json(person)
})