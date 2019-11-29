const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const userRoutes = require('./routes/index')

app.use(bodyParser.json())
app.use("/users", userRoutes)
app.use(userRoutes)


app.get('/', (req, res) => res.json('Start with /users'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})