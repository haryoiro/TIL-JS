'use strict'
const request = require('request')
request('http://www.google.com', (err, res, body) => {
  console.log(body)
})