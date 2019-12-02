const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {
    title: 'MY TEMPLATE ENGINE PUG'
  })
})


// let wordStack = {
//   "orange": 90,
//   "apple": 40,
//   "watermeron": 20
// }

let wordJSON = fs.readFileSync('words.json')
let wordStack = JSON.parse(wordJSON)
console.log(wordStack)

const addWord = (req, res) => {
  let words = req.params.word,
      score = Number(req.params.score),
      replay = {}

  if (score) {
      replay = {
        msg:"Thank you for your score and word"
      }
    wordStack[words] = score
    wordStack = JSON.stringify(wordStack)
    res.send(replay.msg)
    console.log(wordStack)
    fs.writeFile('words.json', wordStack, writedWords)
    function writedWords(err){
        console.log('all set.')
    }
  }

  else {
    replay = {
      msg: "Please type your word and score"
    }
  res.send(replay.msg)
  wordStack = JSON.stringify(wordStack)
  console.log(wordStack)
  }
}

app.get('/add/:word/:score?', addWord)



app.get('/all', (req, res) => {res.send(wordStack)})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))