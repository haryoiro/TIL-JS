const speech = new webkitSpeechRecognition()
speech.lang = 'ja-JP'

const startBtn = document.getElementById('startBtn')
const endBtn = document.getElementById('endBtn')
const content = document.getElementById('content')

let now = false

startBtn.addEventListener('click', () => {speech.start(); now = true})
endBtn.addEventListener('click', () => {speech.stop(); now = false})
speech.addEventListener('result', (e) => {console.log(e)})

speech.onresult = e => {
	speech.stop()
	if(e.results[0].isFinal){
		let autoText = e.results[0][0].transcript
		console.log(e)
		console.log(autoText)
		content.innerHTML += `<div>${autoText}</div>`
	}
}

speech.onend = () => {if(now) speech.start()}