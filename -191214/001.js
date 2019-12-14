const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))

// .get(a, b) a:URL, b:function(req, res)
app.get('/', (req, res) => {
  res.send(`
  <form action="/answer" method="POST">
    <p> What color is sky on a clear and sunny day</p>
    <input name="skyColor" autocomplete="off">
    <button>Submit Answer</button>
  </form>
  <p id="myPosts>posts</p>
  `)
})

// name="skyColor"に渡された値がblueならtrue、違う値ならfalse
app.post('/answer', function(req, res) {
  res.send(`
  <p>${req.body.skyColor}</p>
  `)
  // if(req.body.skyColor == "blue"){
  //   // href="/"によって、ホームへ戻る
  //   res.send(`
  //   <p>Congrats, that is the correct amswer!</p>
  //   <a href="/">Back to homepage</a>
  //   `)
  // } else {
  //   res.send(`
  //   <p>Sorry, that is incorrect.</p>
  //   <a href="/">Back to homepage</a>
  //   `)
  // }
})

// 検索ボックスで/answerへ移動した場合、文字列をsendする
app.get('/answer', function(req, res) {
  res.send("Are you lost? There is nothing to see here")
})

app.listen(3000)