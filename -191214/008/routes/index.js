const express = require('express')
const router  = express.Router()

const users = [];
var id = 1;

router
  .route("/")
  .get((req, res) => {
    return res.json(users)
  })
  .post((req, res) => {
    users.push({
      name: req.body.name,
      id: id++
    })
    return res.json({ message: "Created"})
  })

router
  .route("/:id")
  .get((req, res) => {
    const user = users.find(val => val.id === Number(req.param.id))
    return res.json(user)
  })
  .patch((req, res) => {
    const user = users.find(val => val.id === Number(req.params.id))
    user.name = req.body.name
    return res.json({ message: "Updated"})
  })
  .delete((req, res) => {
    const userIndex = users.findIndex(val => val.id === Number(req.params.id))
    users.splice(userIndex, 1)
    return res.json({ message: "Deleted"})
  })

  module.exports = router

