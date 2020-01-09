'use strict'
import io from 'socket.io-client'

const mainDoc = document.getElementById('main')

const gameObj = {
  radarCanvasWidth: 500,
  radarCanvasHeight: 500,
  scoreCanvasWidth: 300,
  scoreCanvasHeight: 500,
  itemRadius: 4,
  airRadius: 5,
  deg: 0,
  rotationDegreeByDirection: {
    'left': 0,
    'up': 270,
    'down': 90,
    'right': 0
  },
  myDisplayName: mainDoc.getAttribute('data-displayname'),
  myThumbUrl: mainDoc.getAttribute('data-thumburl'),
  fieldWidth: null,
  fieldHeight: null,
  itemsMap: new Map(),
  airMap: new Map()
}

// socket通信を開始した人のアカウント名とサムネイルURLをサーバーに送る
const socketParameter = `displayName=${gameObj.myDisplayName}&thumbUrl=${gameObj.myThumbUrl}`;
const socket = io(mainDoc.getAttribute('data-ipAddress') + '?' + socketParameter)

function init() {
  // create radar canvas
  const rCanvas = document.getElementById('rCanvas')
  gameObj.rCanvas= rCanvas.getContext('2d')
  rCanvas.width = gameObj.radarCanvasWidth
  rCanvas.height = gameObj.radarCanvasHeight

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
  // サーバからデータを受け取っていない場合はマップを描画しない
if (!gameObj.myPlayerObj || !gameObj.playersMap) return
  gameObj.rCanvas.clearRect(0, 0, gameObj.radarCanvasWidth, gameObj.radarCanvasHeight) // 全体をクリア
  drawRadar(gameObj.rCanvas)
  drawMap(gameObj)
  drawPalyer(gameObj.rCanvas, gameObj.myPlayerObj)
}
setInterval(ticker, 33) // 33ms毎秒マップの描画範囲を更新

function drawRadar(rCanvas) {
  const x = gameObj.radarCanvasWidth / 2
  const y = gameObj.radarCanvasHeight / 2
  const r = gameObj.radarCanvasWidth * 1.5 / 2

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

function drawPalyer(rCanvas, myPlayerObj) {
  const rotationDegree = gameObj.rotationDegreeByDirection[myPlayerObj.direction]
  
  rCanvas.save()
  rCanvas.translate(gameObj.radarCanvasWidth / 2, gameObj.radarCanvasHeight / 2)
  rCanvas.rotate(getRadian(rotationDegree))
  if (myPlayerObj.direction === 'left') {
    rCanvas.scale(-1, 1)
  }

  rCanvas.drawImage(gameObj.pImage, -(gameObj.pImage.width / 2), -(gameObj.pImage.height / 2))
  rCanvas.restore()
}

function drawMap(gameObj) {
  
  for (let [index, item] of gameObj.itemsMap) {
    
    const distanceObj = calculationBetweenTwoPoints(
      gameObj.myPlayerObj.x, gameObj.myPlayerObj.y,
      item.x, item.y,
      gameObj.fieldWidth, gameObj.fieldHeight,
      gameObj.radarCanvasWidth, gameObj.radarCanvasHeight
    )

    if(distanceObj.distanceX <= (gameObj.radarCanvasWidth / 2) && distanceObj.distanceY <= (gameObj.radarCanvasHeight / 2)) {
      const degreeDiff = calcDegreeDiffFromRadar(gameObj.deg, distanceObj.degree)
      const rgbOpacity = calcOpacity(degreeDiff)

      // gameObj.rCanvas.fillStyle = `rgba(255, 165, 0, ${rgbOpacity})`
      gameObj.rCanvas.fillStyle = `rgba(255, 165, 0, 0.5)`
      gameObj.rCanvas.beginPath()
      gameObj.rCanvas.arc(distanceObj.drawX, distanceObj.drawY, gameObj.itemRadius, 0, Math.PI * 2, true)
      gameObj.rCanvas.fill()
    }
  }

  for (const [airKey, airObj] of gameObj.airMap) {
    
    const distanceObj = calculationBetweenTwoPoints(
      gameObj.myPlayerObj.x, gameObj.myPlayerObj.y,
      airObj.x, airObj.y,
      gameObj.fieldWidth, gameObj.fieldHeight,
      gameObj.radarCanvasWidth, gameObj.radarCanvasHeight
    )

    if(distanceObj.distanceX <= (gameObj.radarCanvasWidth / 2) && distanceObj.distanceY <= (gameObj.radarCanvasHeight / 2)) {

      const degreeDiff = calcDegreeDiffFromRadar(gameObj.deg, distanceObj.degree)
      const rgbOpacity= calcOpacity(degreeDiff)
      // gameObj.rCanvas.fillStyle = `rgba(0, 220, 255, ${rgbOpacity})`
      gameObj.rCanvas.fillStyle = `rgba(0, 220, 255, 0.5)`
      gameObj.rCanvas.beginPath()
      gameObj.rCanvas.arc(distanceObj.drawX, distanceObj.drawY, gameObj.airRadius, 0, Math.PI * 2, true)
      gameObj.rCanvas.fill()
    }
  }
}


// 二座標間の角度を求める
function calcTowPointsDegree(x1, y1, x2, y2) {
  const radian = Math.atan2(y2 - y1, x2 - x1)
  const degree = radian * 180 / Math.PI + 180
  return degree
}

// アイテムトレーダーとの角度の差を計算する
function calcDegreeDiffFromRadar(degRadar, degItem) {
  let diff = degRadar - degItem
  if (diff < 0) {
    diff += 360
  }

  return diff
}

// レーダーとの距離からアイテム描画時の透明度を計算
function calcOpacity(degreeDiff) {
  const deleteDeg = 270
  degreeDiff = degreeDiff > deleteDeg ? deleteDeg : degreeDiff;
  return (1 - degreeDiff / deleteDeg).toFixed(2)
}


socket.on('start data', startObj => {
  gameObj.fieldWidth = startObj.fieldWidth
  gameObj.fieldHeight = startObj.fieldHeight
  gameObj.myPlayerObj = startObj.playerObj
})

socket.on('map data', compressed => {
  
  const playersArray = compressed[0]
  const itemsArray = compressed[1]  
  const airArray = compressed[2]

  gameObj.playersMap = new Map()
  for (let compressedPlayerData of playersArray) {

    const player = {}
    player.x = compressedPlayerData[0]
    player.y = compressedPlayerData[1]
    player.playerId = compressedPlayerData[2]
    player.displayName = compressedPlayerData[3]
    player.score = compressedPlayerData[4]
    player.isAlive = compressedPlayerData[5]
    player.direction = compressedPlayerData[6]

    gameObj.playersMap.set(player.playerId, player)

    // 自分の情報も更新
    if (player.playerId === gameObj.myPlayerObj.playerId) {
      gameObj.myPlayerObj.x = compressedPlayerData[0]
      gameObj.myPlayerObj.y = compressedPlayerData[1]
      gameObj.myPlayerObj.displayName = compressedPlayerData[3]
      gameObj.myPlayerObj.score = compressedPlayerData[4]
      gameObj.myPlayerObj.isAlive = compressedPlayerData[5]
    }
  }

  gameObj.itemsMap = new Map()
  itemsArray.forEach((compressedItemData, index) => {
    gameObj.itemsMap.set(index, { x: compressedItemData[0], y: compressedItemData[1]})
  });

  gameObj.airMap = new Map()
  airArray.forEach((compressedAirData, index) => {
    gameObj.airMap.set(index, {x: compressedAirData[0], y: compressedAirData[1]})
  })
})

function getRadian (angle) {
  return angle * Math.PI / 180
}

window.addEventListener('keydown', gameKeyDown)

function gameKeyDown(e){
  if(!gameObj.myPlayerObj || gameObj.myPlayerObj.isAlive === false) return

  debugText(gameObj.sCanvas, e.key,20, 20, 20)
  
  switch (e.key) {
    case 'ArrowLeft':
        if (gameObj.myPlayerObj.direction === 'left') break; // 変わってない
        gameObj.myPlayerObj.direction = 'left';
        drawPalyer(gameObj.rCanvas, gameObj.myPlayerObj);
        sendChangeDirection(socket, 'left');
        
        break;
    case 'ArrowUp':
        if (gameObj.myPlayerObj.direction === 'up') break; // 変わってない
        gameObj.myPlayerObj.direction = 'up';
        drawPalyer(gameObj.rCanvas, gameObj.myPlayerObj);
        sendChangeDirection(socket, 'up');
        break;
    case 'ArrowDown':
        if (gameObj.myPlayerObj.direction === 'down') break; // 変わってない
        gameObj.myPlayerObj.direction = 'down';
        drawPalyer(gameObj.rCanvas, gameObj.myPlayerObj);
        sendChangeDirection(socket, 'down');
        
        break;
    case 'ArrowRight':
        if (gameObj.myPlayerObj.direction === 'right') break; // 変わってない
        gameObj.myPlayerObj.direction = 'right';
        drawPalyer(gameObj.rCanvas, gameObj.myPlayerObj);
        sendChangeDirection(socket, 'right');
        break;
  }
}

function sendChangeDirection(socket, direction) {
  socket.emit('change direction', direction)
}

// PlayerとObjectの座標の距離を計算
function calculationBetweenTwoPoints(pX, pY, oX, oY, gameWidth, gameHeight, radarCanvasWidth, radarCanvasHeight) {
  let distanceX = 99999999,
      distanceY = 99999999,
      drawX = null,
      drawY = null

  if(pX <= oX) {
    // 右から
    distanceX = oX - pX
    drawX = (radarCanvasWidth / 2) + distanceX
    // 左から
    let tmpDistance = pX + gameWidth - oX
    if (distanceX > tmpDistance) {
      distanceX = tmpDistance
      drawX = (radarCanvasWidth / 2) - distanceX
    }
  } else {
    // 右から
    distanceX = pX - oX
    drawX = (radarCanvasWidth / 2) - distanceX
    // 左から
    let tmpDistance = oX + gameWidth - pX
    if (distanceX > tmpDistance) {
      distanceX = tmpDistance
      drawX = (radarCanvasWidth / 2) + distanceX
    }
  }

  if(pY <= oY) {
    // 下から
    distanceY = oY - pY
    drawY = (radarCanvasHeight / 2) + distanceY
    // 上から
    let tmpDistance = pY + gameHeight - oY
    if (distanceY > tmpDistance) {
      distanceY = tmpDistance
      drawY = (radarCanvasHeight / 2) - distanceY
    }
  } else {
    // 上から
    distanceY = pY - oY
    drawY = (radarCanvasHeight / 2) - distanceY
    // 下から
    let tmpDistance = oY + gameHeight - pY
    if (distanceY > tmpDistance) {
      distanceY = tmpDistance
      drawY = (radarCanvasHeight / 2) + distanceY
    }
  }

  const degree = calcTowPointsDegree(drawX, drawY, radarCanvasWidth / 2, radarCanvasHeight / 2)

  return {
    distanceX,
    distanceY,
    drawX,
    drawY,
    degree
  }
}

const textObj = {
  time: 0,
  key: 'none'
}

function timer(){
  setInterval(() => {
    textObj.time += 1
    debugText(gameObj.rCanvas, textObj.time, 20, 20, 20)
  }, 1000)
}
window.addEventListener('load', timer)

function debugText(canvas, text, size, x, y){
  let count;
  let counter = () => count++
  counter()
  canvas.clearRect(0, 0, 1000, 1000)
  canvas.fillStyle = 'black'
  canvas.font = `bold ${size}px "Arial"`
  canvas.textAlign = 'left'
  canvas.textBaseline = 'middle'
  canvas.fillText(`${text}`, x, y)
}



init()


module.exports = {
  getRadian,
  calcOpacity,
  calcDegreeDiffFromRadar,
  calcTowPointsDegree,
  calculationBetweenTwoPoints
}