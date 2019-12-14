const fs = require('fs')
const request = require('request')
const prompt = require('prompt')
const colors = require('colors/safe')


prompt.start()

let wordStack = ""
let wordURL= ""

let getWord = () => {
  console.clear()
  prompt.message = console.log(colors.rainbow('Search Word please!'))
  prompt.get(['keyword'], (err, result) => {
    //console.log('生の値：' + 'https://icanhazdadjoke.com/search?term=' + result)
    wordStack = JSON.stringify(result)
    //console.log('JSON.stringify：' + wordStack + ' , 型：' + typeof wordStack)
    wordPlus = JSON.parse(wordStack)
    //console.log('変換後：' + 'https://icanhazdadjoke.com/search?term=' + wordPlus.url)
    wordURL = 'https://icanhazdadjoke.com/search?term=' + wordPlus.keyword
    //console.log('wordURL：' + wordURL)

    let headers = {
      'Accept':'application/json'
    }

    request({url:wordURL, headers:headers, JSON: true}, (err, res, body) => {
      if(!err && res.statusCode == 200) {
        console.log(colors.green(`\nrequested URL: ${wordURL}\n\n\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`))
        let jokesBody = JSON.parse(body)
        let jokesText = jokesBody.results
        for (const i in jokesText) {
          if (jokesText.hasOwnProperty(i)) {
            console.log(colors.red.bold('ID:') + jokesText[i].id + '\n' + jokesText[i].joke + '\n\n')
          }
        }
        console.log(colors.green('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'))
        fs.writeFileSync('jokes.txt',jokesText, (err) => {
          if(err) {
            throw err
          }
        })

      } else {
      console.log("This joke not found")
      }
    })
    

    return wordURL
  })
}

getWord()









