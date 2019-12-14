const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/user/:id', (req, res, next) => { 
  res.render('index')
  // console.log("request URL", req.originalUrl)
  // res.send("request url:" + __dirname + req.originalUrl)
  next()
}, (req, res, next) => {
  console.log("request Type: ", req.method)
  next()
})


module.exports = router