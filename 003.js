const fs = require('fs')

fs.readFile('data.text', (err, data) => {
  console.log(data.toString())
})

// readFile('FILE', CALLBACK FUNCTION)