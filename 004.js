const http = require('http')

const serevr = http.createServer(function(req, res, next) {
  res.writeHead (200, {"Content-type":"text/html"})
  res.write('<h1>Hello World</h1>')

  return res.end()
})

serevr.listen(3000, () => {
  console.log("listening to port: 3000")
})