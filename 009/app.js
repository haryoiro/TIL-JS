const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


const app = express()
const port = 3000


app.use(morgan("tiny"))
app.use(bodyParser.json())

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))