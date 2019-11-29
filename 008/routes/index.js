const express = require('express')
const router  = express.Router

const users = []
var id = 1

router
  .route("/users")
  .get(() => {
    return res.json(users)
  })
  .post(() => {
    users.push({
      name: req.body.name,
      id: ++id
    })
    return res.json({ message: "Created"})
  })

router
  .route("/users/:id")
  .get((req, res) => {
    const user = users.find(val => val.id === Number(req.param.id))
    return res.json(user)
  })

