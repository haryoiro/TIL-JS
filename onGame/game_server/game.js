"use strict";
const crypto = require("crypto");

const gameObj = {
  playersMap: new Map(), // プレイヤー情報を入れておく連想配列
  itemsMap: new Map(), // ミサイルのアイテム情報を入れておく連想配列
  airMap: new Map(), // 酸素のアイテム情報を入れておく連想配列
  fieldWidth: 1000, // ゲームの横幅
  fieldHeight: 1000, // ゲームの縦幅
  itemTotal: 15, // ミサイルのアイテム数
  airTotal: 10 // 酸素のアイテム数
};

function init() {
  for (let i = 0; i < gameObj.itemTotal; i++) {
    addItem();
  }
  for (let a = 0; a < gameObj.airTotal; a++) {
    addAir();
  }
}
init();

const gameTicker = setInterval(() => {
  movePlayers(gameObj.playersMap); // 潜水艦の移動
}, 33);

// プレイヤーの操作
function movePlayers(playersMap) {
  for (let [playerId, player] of playersMap) {
    if (player.isAlive === false) {
      continue;
    }

    switch (player.direction) {
      case "left":
        player.x -= 2;
        break;
      case "up":
        player.y -= 2;
        break;
      case "down":
        player.y += 2;
        break;
      case "right":
        player.x += 2;
        break;
    }

    if (player.x > gameObj.fieldWidth) player.x -= gameObj.fieldWidth;
    if (player.x < 0) player.x += gameObj.fieldWidth;
    if (player.y < 0) player.y += gameObj.fieldHeight;
    if (player.y > gameObj.fieldHeight) player.y -= gameObj.fieldHeight;
  }
}

function newConnection(socketId, displayName, thumbUrl) {
  // プレイヤーの初期位置を乱数にて決定
  const playerX = Math.floor(Math.random() * gameObj.fieldWidth);
  const playerY = Math.floor(Math.random() * gameObj.fieldHeight);

  // playerIdをsocketIdからハッシュ値を計算し作成
  const playerId = crypto
    .createHash("sha1")
    .update(socketId)
    .digest("hex");

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
  };
  // 作成した情報をplayersMap 連想配列に追加
  gameObj.playersMap.set(socketId, playerObj);

  // 設定した値をオブジェクトにまとめて返す
  const startObj = {
    playerObj: playerObj,
    fieldWidth: gameObj.fieldWidth,
    fieldHeight: gameObj.fieldHeight
  };
  return startObj;
}

function getMapData() {
  const playersArray = [];
  const itemsArray = [];
  const airArray = [];

  for (let [socketId, player] of gameObj.playersMap) {
    const playerDataForSend = [];

    playerDataForSend.push(player.x);
    playerDataForSend.push(player.y);
    playerDataForSend.push(player.playerId);
    playerDataForSend.push(player.displayName);
    playerDataForSend.push(player.score);
    playerDataForSend.push(player.isAlive);
    playerDataForSend.push(player.direction);

    playersArray.push(playerDataForSend);
  }
  for (let [id, item] of gameObj.itemsMap) {
    const itemDataForSend = [];

    itemDataForSend.push(item.x);
    itemDataForSend.push(item.y);

    itemsArray.push(itemDataForSend);
  }

  for (let [id, air] of gameObj.airMap) {
    const airDataForSend = [];

    airDataForSend.push(air.x);
    airDataForSend.push(air.y);

    airArray.push(airDataForSend);
  }

  return [playersArray, itemsArray, airArray];
}

function updatePlayerDirection(socketId, direction) {
  const playerObj = gameObj.playersMap.get(socketId)
  playerObj.direction = direction
}

function disconnect(socketId) {
  gameObj.playersMap.delete(socketId);
}

function addItem() {
  const itemX = Math.floor(Math.random() * gameObj.fieldWidth);
  const itemY = Math.floor(Math.random() * gameObj.fieldHeight);
  const itemKey = `${itemX},${itemY}`;

  // アイテムの位置がかぶった場合作り直し
  if (gameObj.itemsMap.has(itemKey)) {
    return addItem();
  }

  // アイテムをオブジェクトにまとめる
  const itemObj = {
    x: itemX,
    y: itemY
  };
  // マップに追加
  gameObj.itemsMap.set(itemKey, itemObj);
}

function addAir() {
  const airX = Math.floor(Math.random() * gameObj.fieldWidth);
  const airY = Math.floor(Math.random() * gameObj.fieldHeight);
  const airKey = `${airX},${airY}`;

  // アイテムの位置がかぶった場合作り直し
  if (gameObj.airMap.has(airKey)) {
    return addAir();
  }

  const airObj = {
    x: airX,
    y: airY
  };
  gameObj.airMap.set(airKey, airObj);
}

// PlayerとObjectの座標の距離を計算
function calculationBetweenTwoPoints(pX, pY, oX, oY, gameWidth, gameHeight) {
  let distanceX = 99999999,
      distanceY = 99999999

  if(pX <= oX) {
    // 右から
    distanceX = oX - pX
    // 左から
    let tmpDistance = pX + gameWidth - oX
    if (distanceX > tmpDistance) {
      distanceX = tmpDistance
    }
  } else {
    // 右から
    distanceX = pX - oX
    // 左から
    let tmpDistance = oX + gameWidth - pX
    if (distanceX > tmpDistance) {
      distanceX = tmpDistance
    }
  }

  if(pY <= oY) {
    // 下から
    distanceY = oY - pY
    // 上から
    let tmpDistance = pY + gameHeight - oY
    if (distanceY > tmpDistance) {
      distanceY = tmpDistance
    }
  } else {
    // 上から
    distanceY = pY - oY
    let tmpDistance = oY + gameHeight - pY
    if (distanceY > tmpDistance) {
      distanceY = tmpDistance
    }
  }
  return {
    distanceX,
    distanceY
  }
}

module.exports = {
  newConnection,
  getMapData,
  updatePlayerDirection,
  disconnect
};
