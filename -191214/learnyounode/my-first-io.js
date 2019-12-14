const fs = require('fs')

let buf = fs.readFileSync('MY FIRST I/O!')
let str = buf.toString()
let lengsth = str.split('\n').length
console.log(lengsth)