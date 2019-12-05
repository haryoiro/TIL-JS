const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const socket = require('socket.io')

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static('public'))

const io = socket(server)

const connection = socket => {
  console.log(`new connection: ${socket.id}`)
  socket.on('mousePoint', data => {
    socket.broadcast.emit('mousePoint', data)
  })
  socket.on('mouseDown', data => {
    socket.broadcast.emit('mouseDown', data)
  })
  socket.on('mouseUp', data => {
    socket.broadcast.emit('mouseUp', data)
  })
}

io.sockets.on('connection', connection)

