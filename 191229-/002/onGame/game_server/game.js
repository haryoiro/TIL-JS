'use strict'
const crypto = require('crypto')

const gameObj = {
  playersMap: new Map(),  // プレイヤー情報を入れておく連想配列
  itemsMap: new Map(),    // ミサイルのアイテム情報を入れておく連想配列
  airMap: new Map(),      // 酸素のアイテム情報を入れておく連想配列
  fieldWidth: 1000,       // ゲームの横幅
  fieldHeight: 1000,      // ゲームの縦幅
  itemTotal: 15,          // ミサイルのアイテム数
  airTotal: 10            // 酸素のアイテム数
}

function init() {
  for (let i = 0; i < gameObj.itemTotal; i=i+1) {
    addItem()
  }
  for (let a = 0; a < gameObj.airTotal; a=a+1) {
    addAir()
  }
}


function newConnection(socketId, displayName, thumbUrl) {

  // プレイヤーの初期位置を乱数にて決定
  const playerX = Math.floor(Math.random() * gameObj.fieldWidth)
  const playerY = Math.floor(Math.random() * gameObj.fieldHeight)
  
  // playerIdをsocketIdからハッシュ値を計算し作成
  const playerId = crypto.createHash('sha1').update(socketId).digest('hex')

  // 生成したプレイヤー情報をオブジェクトにまとめる
  const playerObj = {
    x: playerX,
    y: playerY,
    playerId: playerId,
    displayName: displayName,
    thumbUrl: thumbUrl,
    isAlive: true,
    direction: 'right',
    score: 0
  }
  // 作成した情報をplayersMap 連想配列に追加
  gameObj.playersMap.set(socketId, playerId)

  // 設定した値をオブジェクトにまとめて返す
  const startObj = {
    playerObj: playerObj,
    fieldWidth: gameObj.fieldWidth,
    fieldHeight: gameObj.fieldHeight
  }
  return startObj
}

function gameMapData() {
  const playersArray = []
  const itemsArray = []
  const airArray = []

  for (let [socketId, player] of gameObj.playersMap) {
    const playerDataForSend = []

    playerDataForSend.push(player.x)
    playerDataForSend.push(player.y)
    playerDataForSend.push(player.playerId)
    playerDataForSend.push(player.displayName)
    playerDataForSend.push(player.score)
    playerDataForSend.push(player.isAlive)
    playerDataForSend.push(player.direction)

    playersArray.push(playerDataForSend)
  }
  for (let [id, item] of gameObj.itemsMap) {
    const itemDataForSend = []

    itemDataForSend.push(item.x)
    itemDataForSend.push(item.y)

    itemsArray.push(itemDataForSend)
  }

  for (let [id, air] of gameObj.airMap) {
    const airDataForSend = []

    airDataForSend.push(air.x)
    airDataForSend.push(air.y)

    airArray.push(airDataForSend)
  }

  return [playersArray, itemsArray, airArray]
}

function disconnect(socket) {
  gameObj.playersMap.delete(SocketId)
}

function addItem() {
  const itemX = Math.floor(Math.random() * gameObj.fieldWidth)
  const itemY = Math.floor(Math.random() * gameObj.fieldHeight)
  const itemKey = `${itemX},${itemY}`

  // アイテムの位置がかぶった場合作り直し
  if(gameObj.itemsMap.has(itemKey)) { 
    return addItem()
  }

  const itemObj = {
    x: itemX,
    y: itemY
  }

  gameObj.itemsMap.set(itemKey, itemObj)
}

init()