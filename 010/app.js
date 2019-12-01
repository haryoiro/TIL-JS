const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {
    title: 'MY TEMPLATE ENGINE PUG'
  })
})

const addWord = (req, res) => {
  let data = req.params,
      word = data.word,
      score = Number(data.score),
      replay
  if(!score){
    replay = {
      msg: "Didn't type your score. Please score"
    }
  }
  else {
    replay = {
      msg: "Thank you for your word and score."
    }
  }
  words[word] = score
  res.send(replay.msg)
}

app.get('/add/:word/:score?', addWord)

const stacks = {
  "rainbow" : 63,
  "red" : 3,
  "gleen" : -15
}

app.get('/all', (req, res) => {res.send(words)})



const searchWord = (req, res) => {
  let word = req.params.word,
      replay = {};
  if(!stacks[word]){
      replay = {
      status: "not found",
      word: word
    }
  }
  else {
    replay = {
      status: "found",
      word: word,
      score: stacks[word]
    }
  }

  res.send(replay)
}

app.get('/search/:word', searchWord)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
