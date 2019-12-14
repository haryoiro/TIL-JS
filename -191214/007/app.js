const express = require('express')
const app = express()

app.get('/', function(req, res) {
  return  res.send('Hello Express')
})

app.get('/instructor/:firstName', (req, res) => {
  return res.send(`This instructor\'s firstName is ${req.params.firstName}`)
})

app.listen(3000, function() {
  console.log("The server has started on port 3000. Head to localhost:3000 in the browser and see what's there!")
})
