const request = require('request')

request("http://swapi.co/api/people/1", (err, res, body) => {
  if(!err && res.statusCode == 200) {
    console.log(JSON.parse(body))
  }
})

//request('API URL', callback(err, res, body))