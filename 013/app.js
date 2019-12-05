const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const socket = require('socket.io')

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static('public'))

const io = socket(server)

const connection = socket => {
  console.log(socket)
}

io.sockets.on('connection', connection)

