const speech = new webkitSpeechRecognition()
speech.lang = 'ja-JP'

const btn = document.getElementById('speechBtn')
const content = document.getElementById('content')

btn.addEventListener('click', () => {speech.start()})
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

speech.onend = () => speech.start()