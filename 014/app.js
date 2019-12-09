const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const socket = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')

app.use('/public', express.static(__dirname + '/public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


const serer = app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`)

const io = socket(serer)

app.get('/', (req, res, next) => {
  res.render('index')
})

app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  return res.json({
    message: err.message,
    error: app.get("env") === "development"?err:{}
  })
})

const connection = socket => {
  console.log(socket.id)
  socket.on('onMsg', data => {
    console.log(data.msg)
  })
}
  
io.sockets.on('connection', connection)



