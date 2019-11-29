const express = require('express')
const router = express.Router

const users = []    //userのデータベース
var id = 1          //初期化

// app.getの代わりにrouter.get userを識別するために有用
router.get("/users", (req, res) => {
  return res.json(users)
})


router.get("/users/:id", (req, res) => {
  const user = users.find(val => val.id === Number(req.params.id))
  return res.json(user)
})

// app.postの代わりにrouter.post
router.post("/users", (req, res) => {
  users.push({
    name: req.body.name,
    id: ++id
  })
  return res.json({message: "Created"})
})


router.patch("/users/:id", (req, res) => {
  const user = users.find(val => val.id === Number(req.params.id))
  user.name = req.body.name
  return res.json({message: "Updated"})
})

//app.deleteの代わりにrouter.delete
router.delete("/users/:id", (req, res) => {
  const userIndex = sers.findIndex(val => val.id == Number(re.params.id))
  users.splice(userIndex, 1)
  return res.json({ message: "Deleted" })
})

module.exports = router
