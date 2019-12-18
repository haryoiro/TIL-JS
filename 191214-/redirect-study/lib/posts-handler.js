'use strict'
const handle = (req, res) => {
  switch (req.method) {
    case 'GET':
      res.end('HELLOOOOOOOOO!!!!!!!!!!!!!!')
      break
    case 'POST':
      // TODO: POSTの処理
      break
    default:
      break
  }
}

module.exports = {
  handle
}