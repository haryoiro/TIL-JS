const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.render('index', {
    title: 'MY TEMPLATE ENGINE PUG'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
