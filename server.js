const express = require('express')
const app = express()
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')

db('mongodb+srv://root:root123@cluster0.hicah.mongodb.net/Telegrom?retryWrites=true&w=majority')

app.use(cors())

app.use(bodyParser.json())
//app.use(router)

socket.connect(server)
router(app)

//asignamos un puerto para el servidor
app.use('/app', express.static('public'))

server.listen(4000, function() {
    console.log('la aplicacion esta escuchando en el puerto http://localhost:4000')
})