const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const socket = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


const serer = app.listen(port, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  console.log(`Server running at http://127.0.0.1:${port}/`)
})

app.get('/', (req, res, next) => {
  return res.json('Hello World!')
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

const io = socket(serer)



