const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000;

const data = fs.readFileSync('words.json')
const words = JSON.parse(data)
console.log(words)

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
  let datas = req.params,
      word = datas.word,
      score = Number(datas.score),
      replay
  if(!score){
    replay = {
      msg: "please input score"
    }
    res.send(replay.msg)
  }
  else {
    replay = {
      msg: "Thank you for your word and score.",
    }
    words[word] = score
    const finished = err => console.log('all set.')
    fs.writeFile("words.json", datas, finished)

    res.send(replay.msg)
  }
}

app.get('/add/:word/:score?', addWord)



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