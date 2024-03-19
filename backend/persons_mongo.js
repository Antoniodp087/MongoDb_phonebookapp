const mongoose = require('../frontend/node_modules/mongoose')

const { request, response } = require('../frontend/node_modules/express')
const express = require('../frontend/node_modules/express')
const app = express()

const bodyParser = require('../frontend/node_modules/body-parser');

//CORS
const cors = require('../frontend/node_modules/cors')
app.use(cors())

//PERI I POST
app.use(express.json())
app.use(bodyParser.json());


const nameDB = 'phonebookApp'

const url =
    `mongodb://127.0.0.1:27017/${nameDB}`

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => { console.log('connected to MongoDB') })
    .catch(error => { console.log('error connecting to MongoDB:', error.message) })



//definizione Schema e modello
const personSchema = new mongoose.Schema({
    name: {
        type: String
    },
    number: String,
})

//modifica del toJSON
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//modifica del toObject
personSchema.set('toObject', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



//GET
app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })

})

//POST
app.post('/api/persons', (request, response) => {

    const body = request.body
    if (!body) {
        return response.status(400).json({ error: 'name missing' })
    }
    const person = new Person({
        name: body.name,
        number: body.number,

    })

    person.save().then(result => {
        console.log('person saved!')
        console.log('info:\n', result)
            //mongoose.connection.close()
    })

})

//DELETE
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(request.params.id, "dleted");
            response.status(204).end()
        })
        .catch(error => next(error))
})

//UPDATE
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            console.log(person.name, "changed number")
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

//GET ID
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(p => {
        response.json(p)
    })

})