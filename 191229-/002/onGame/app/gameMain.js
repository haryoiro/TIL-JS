'use strict'
import io from 'socket.io-client'

const mainDoc = document.getElementById('main')

const gameObj = {
  raderCanvasWidth: 500,
  raderCanvasHeight: 500,
  scoreCanvasWidth: 300,
  scoreCanvasHeight: 500,
  deg: 0,
  myDisplayName: mainDoc.getAttribute('data-displayname'),
  myThumbUrl: mainDoc.getAttribute('data-thumburl')
}

// socket通信を開始した人のアカウント名とサムネイルURLをサーバーに送る
const socketParameter = `displayName=${gameObj.myDisplayName}&thumbUrl=${gameObj.myThumbUrl}`;
const socket = io(mainDoc.getAttribute('data-ipAddress') + '?' + socketParameter)

function init() {
  // create rader canvas
  const rCanvas = document.getElementById('rCanvas')
  gameObj.rCanvas= rCanvas.getContext('2d')
  rCanvas.width = gameObj.raderCanvasWidth
  rCanvas.height = gameObj.raderCanvasHeight

  // create score canvas
  const sCanvas = document.getElementById('sCanvas')
  gameObj.sCanvas = sCanvas.getContext('2d')
  sCanvas.width = gameObj.scoreCanvasWidth
  sCanvas.height = gameObj.scoreCanvasHeight

  // Player Image
  const pImage = new Image()
  // pImage.src = './public/images/player.png'
  pImage.src = '/images/player.png'
  gameObj.pImage = pImage
}

function ticker() {
  gameObj.rCanvas.clearRect(0, 0, gameObj.raderCanvasWidth, gameObj.raderCanvasHeight)
  drawRader(gameObj.rCanvas)
  drawPalyer(gameObj.rCanvas)
}

setInterval(ticker, 33)

function drawRader(rCanvas) {
  const x = gameObj.raderCanvasWidth / 2
  const y = gameObj.raderCanvasHeight / 2
  const r = gameObj.raderCanvasWidth * 1.5 / 2

  rCanvas.save()

  rCanvas.beginPath()
  rCanvas.translate(x, y)
  rCanvas.rotate(getRadian(gameObj.deg))

  rCanvas.fillStyle = 'rgba(0 ,100, 100, 0.5)'
  
  rCanvas.arc(0, 0, r, getRadian(0), getRadian(-30), true)
  rCanvas.lineTo(0, 0)

  rCanvas.fill()

  rCanvas.restore()

  gameObj.deg = (gameObj.deg + 5) % 360
}

function drawPalyer(rCanvas) {
  rCanvas.save()
  rCanvas.translate(gameObj.raderCanvasWidth /2, gameObj.raderCanvasHeight / 2)

  rCanvas.drawImage(gameObj.pImage, -(gameObj.pImage.width / 2), -(gameObj.pImage.height / 2))
  rCanvas.restore()
}

socket.on('start data', startObj => {
  console.log('start data came')
})

socket.on('map data', compressed => {
  console.log('map data came')
})

function getRadian (angle) {
  return angle * Math.PI / 180
}


init()