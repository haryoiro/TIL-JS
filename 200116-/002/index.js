const	CHRWIDTH		= 8			// キャラはば
const	CHRHEIGHT		= 9			// キャラ高さ
const	START_X			= 11
const	START_Y			= 11
const	FONT 				= "10px monospace"	// フォント
const	FONTSTYLE		= "#fff"
const	HEIGHT 			= 120		// 仮想画面縦
const	WIDTH 			= 128		// 仮想画面横
const	MAP_WIDTH		= 64		// マップ幅
const	MAP_HEIGHT	= 31		// マップ高さ
const SCR_WIDTH		= 8			// 画面タイルサイズの半分の高さ
const SCR_HEIGHT	= 8			// 画面タイルサイズの半分の幅
const	SMOOTH			= 0			// 補完処理
const INTERVAL		= 33		// フレーム感覚
const SCROLL			= 4
const	TILESIZE		= 8			// タイルサイズ	
const	TILECOLUMN	= 4			// 一タイルごとの高さ
const	TILEROW			= 4			// 一タイルごとの横幅
const	WINDOWSTYLE = "rgba( 0, 0, 0, 0.75)"	// デバッグウィンドウの色

const gKey = new Uint8Array( 0x100 )				// キー入力バッファ
let c = 0

let		gAngle = 0
let 	gFrame = 0				// 内部カウンタ
let		gImgMap						// マップ画像
let		gImgPl						// キャラ画像
let		gMoveX		= 0			// 移動判定
let		gMoveY		= 0			// 移動判定 
let		gPlayerX 	= START_X * TILESIZE + TILESIZE / 2				// 初期座標	
let		gPlayerY 	= START_Y * TILESIZE	+ TILESIZE / 2			// 初期座標
let		gScreen						// 仮想画面
let 	gWidth						// 実画面横
let 	gHeight						// 実画面縦

let gMessage = ''				// 表示メッセージ


const	gMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
]


function wSize(){
	// メインキャンバスの取得
	const ca 	= document.getElementById('canvas')
	// メインキャンバスの上下幅をウィンドウサイズに合わせる
	ca.width 	= innerWidth
	ca.height = innerHeight

	// ドットにスムーズをかけるかかけないかを設定
	const g = ca.getContext('2d')
	g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH	// 補完処理

	// 実画面サイズを計測
	// ドットのアスペクト比を維持したままでの最大サイズを計測する
	gWidth 	= ca.width 
	gHeight = ca.height
	if( gWidth / WIDTH < gHeight / HEIGHT) {
		gHeight = gWidth * HEIGHT / WIDTH
	} else {
		gWidth = gHeight * WIDTH / HEIGHT
	}
}

function loadImage(){
	gImgMap = new Image(),	gImgMap.src = 'img/map.png'
	gImgPl	= new Image(),	gImgPl.src	= 'img/player.png'
}

// ゲームメイングラフィック
function gGraphic(){

	const g =  gScreen.getContext('2d')

	let mx 	= Math.floor(gPlayerX / TILESIZE)
	let my 	= Math.floor(gPlayerY / TILESIZE)

	// Mapの展開
	for(let dy = -SCR_HEIGHT; dy < SCR_HEIGHT; dy++){
		let ty = my + dy
		let py = (my + dy + MAP_HEIGHT)% MAP_HEIGHT
		for(let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++){
			let tx = mx + dx
			let	px = (mx + dx + MAP_WIDTH) % MAP_WIDTH
			drawTile(g, 
				tx * TILESIZE + WIDTH / 2 - gPlayerX,
				ty * TILESIZE + HEIGHT / 2 - gPlayerY,
				gMap[ py * MAP_WIDTH + px])
		}
	}
	
	// // クロスヘア
	// g.fillStyle = "#ff2200"
	// g.fillRect(0, HEIGHT / 2 - 1, WIDTH, 2)
	// g.fillRect(WIDTH / 2 - 1 ,0 ,2 ,HEIGHT)

	gFrame += 1

	// プレイヤー
	// 位置を / 2 - キャラ横幅 / 2で座標中央に画像を表示
	// (image: CanvasImageSource, 
	//	sx: number, sy: number, sw: number, sh: number, 
	//	dx: number, dy: number, dw: number, dh: number): void
	g.drawImage(gImgPl, 
				(gFrame >> 3 & 1 ) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH , CHRHEIGHT, 
				WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT)
	
	// フィールド進行処理
	tickField()

	g.fillStyle = WINDOWSTYLE
	g.fillRect( 20, 5, 120, 15)

	g.font = FONT
	g.fillStyle = FONTSTYLE
	g.fillText(`x:${gPlayerX} y:${gPlayerY} m:${gMap[ my * MAP_WIDTH + mx]} k:${c}`, 25, 16)

	drawMessage(g)
}

function drawMessage(g){

	// デバッグウィンドウ設定
	g.fillStyle = WINDOWSTYLE
	g.fillRect( 4, 84, 130, 30)
	
	g.font = FONT
	g.fillStyle = FONTSTYLE
	g.fillText(`${gMessage}`,6, 97)
	
}

function drawTile(g, x, y, index) {
	const ix = (index % TILECOLUMN) * TILESIZE 
	const iy = Math.floor(index / TILECOLUMN) * TILESIZE
	g.drawImage(gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE)
		
}

function wTimer(){

	gGraphic()
	const ca = document.getElementById('canvas')
	const g =  ca.getContext('2d')

	// 仮想画面のイメージを実画面に転送
	g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight)
}

// フィールド進行処理
function tickField(){
	if(gMoveX != 0 || gMoveY != 0){c = 0}
	switch(gKey[c]){
		case gKey[0]:
			break;
		// WASD
		case gKey[65]:							// 左
			{gMoveX =- TILESIZE, gAngle = 1}
			break;
		case gKey[87]:							// 下
			{gMoveY =- TILESIZE, gAngle = 3}
			break;
		case gKey[68]:							// 右
			{gMoveX = TILESIZE, gAngle = 2}
			break;
		case gKey[83]:							// 下
			{gMoveY = TILESIZE, gAngle = 0}
			break;
		// やじるし
		case gKey[37]:							// 左
			{gMoveX = -TILESIZE, gAngle = 1}
			break;
		case gKey[38]:							// 上
			{gMoveY = -TILESIZE, gAngle = 3}
			break;
		case gKey[39]:							// 右
			{gMoveX = TILESIZE, gAngle = 2}
			break;
		case gKey[40]:							// 下
			{gMoveY = TILESIZE, gAngle = 0}
			break;
		default:
			break;
	}

	let mx = Math.floor((gPlayerX + gMoveX) / TILESIZE)	// 移動後のタイル番号
	let my = Math.floor((gPlayerY + gMoveY) / TILESIZE) // 移動後のタイル番号
	mx += MAP_WIDTH
	mx %= MAP_WIDTH
	my += MAP_HEIGHT
	my %= MAP_HEIGHT
	let m = gMap[ my * MAP_WIDTH + mx ]	// タイル番号

	if(m < 3) {												// 進入不可の地形の場合
		gMoveX = 0
		gMoveY = 0
	}
	if(m == 8 || m == 9){
		gMessage = "まおうをたおして"
	}
	if(m == 10 || m == 11){
		gMessage = "西の果てには街がある"
	}

	gPlayerX += Math.sign(gMoveX)	 	* SCROLL	// プレイヤー座標移動X
	gPlayerY += Math.sign(gMoveY)	 	* SCROLL// プレイヤー座標移動Y
	gMoverX -= Math.sign(gMoveX)			* SCROLL// 移動量消費X
	gMoveY -= Math.sign(gMoveY)			*	SCROLL// 移動量消費Y


	// マップループ処理
	gPlayerX += ( MAP_WIDTH  * TILESIZE ) 
	gPlayerX %= ( MAP_WIDTH  * TILESIZE ) 
	gPlayerY += ( MAP_HEIGHT * TILESIZE )  
	gPlayerY %= ( MAP_HEIGHT * TILESIZE )  
}

(() => {
	gScreen = document.createElement('canvas')	// 仮想画面の設定
	gScreen.width = WIDTH						// 仮想画面の幅を設定	
	gScreen.height = HEIGHT

	loadImage()

	wSize()	// 画面サイズ初期化
	window.addEventListener('resize', wSize)

	// keyboardイベント
	window.addEventListener('keydown',e => {
		e.preventDefault()
		c = e.keyCode
		gKey[c] = 1
	})

	window.addEventListener('keyup', e => {
		gKey[e.keyCode] = 0
		// gKey[c] = 0
	})

	// フレームレートを設定
	setInterval(() => {wTimer()}, INTERVAL)

})()
