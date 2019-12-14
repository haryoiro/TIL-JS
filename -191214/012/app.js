const express = require('express')
const app = express()
const pug = require('pug')
const path = require('path')
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const router = require('./routes/routes.js')

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/route', router)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index',{
    title: "Ispugrun"
  })
})

app.listen(port, () => console.log(`Example app listening on port port!`))