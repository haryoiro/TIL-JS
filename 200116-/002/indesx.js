const	CHRWIDTH	= 8				// キャラはば
const	CHRHEIGHT	= 9				// キャラ高さ
const	FONT 		= "12px Arial"	// フォント
const	FONTSTYLE	= "#fff"
const	HEIGHT 		= 120			// 仮想画面縦
const	WIDTH 		= 128			// 仮想画面横
const	MAP_WIDTH	= 32			// マップ幅
const	MAP_HEIGHT	= 32		// マップ高さ
const	SMOOTH		= 0				// 補完処理
const	TILESIZE	= 8				// タイルサイズ	
const	TILECOLUMN	= 4				// 一タイルごとの高さ
const	TILEROW		= 4				// 一タイルごとの横幅
const	WINDOWSTYLE = "rgba( 0, 0, 0, 0.75)"	// デバッグウィンドウの色

<<<<<<< HEAD:200116-/002/indesx.js
let 	gFrame = 0				// 内部カウンタ
let		gImgMap					// マップ画像
let		gImgPl				// キャラ画像
let		gPlayerX = 10			// 初期座標	
let		gPlayerY = 10			// 初期座標
=======
let 	gFrame = 0					// 内部カウンタ
let		gImgMap							// マップ画像
let		gImgPl							// キャラ画像
let		gPlayerX = 10				// プレイヤー初期座標X	
let		gPlayerY = 20				// プレイヤー初期座標Y
>>>>>>> 8be8d02e460792227d6b22c5eaa89a30e2509442:200116-/002/index.js
let		gScreen					// 仮想画面
let 	gWidth					// 実画面横
let 	gHeight					// 実画面縦

const	gMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
	0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
	0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
	0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
	7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
	7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
]


function wSize(){
	// メインキャンバスの取得
	const ca = document.getElementById('canvas')
	// メインキャンバスの上下幅をウィンドウサイズに合わせる
	ca.width = innerWidth
	ca.height = innerHeight

	// ドットにスムーズをかけるかかけないかを設定
	const g = ca.getContext('2d')
	g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH	// 補完処理

	// 実画面サイズを計測
	// ドットのアスペクト比を維持したままでの最大サイズを計測する
	gWidth = ca.width 
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

	let mx = Math.floor(gPlayerX / TILESIZE)
	let my = Math.floor(gPlayerY / TILESIZE)

	// Mapの展開
	for(let dy = -7; dy < 7; dy++){
		let ty = my + dy
		let py = (my + dy + MAP_HEIGHT)% MAP_HEIGHT
		for(let dx = -8; dx <= 8; dx++){
			let tx = mx + dx
			let	px = (mx + dx + MAP_WIDTH) % MAP_WIDTH
			drawTile(g, 
				tx * TILESIZE + WIDTH / 2 - gPlayerX,
				ty * TILESIZE + HEIGHT / 2 - gPlayerY,
				gMap[ py * MAP_WIDTH + px])
		}
	}
	

	g.fillStyle = "#ff2200"
	g.fillRect(0, HEIGHT / 2 - 1, WIDTH, 2)
	g.fillRect( WIDTH / 2 - 1 ,0 ,2 ,HEIGHT)

	// プレイヤー
	// 位置を / 2 - キャラ横幅 / 2で座標中央に画像を表示
	g.drawImage(gImgPl, 
				CHRWIDTH, 0, CHRWIDTH , CHRHEIGHT, 
				WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT)

	gFrame++
	if(gFrame >= 100)gFrame = 0


	g.fillStyle = WINDOWSTYLE//ウィンドウの色
	g.fillRect( 20, 103, 105, 15)
	
	g.font = FONT
	g.fillStyle = FONTSTYLE
	g.fillText(`x= ${gPlayerX} y= ${gPlayerY} m= ${gMap[ my * MAP_WIDTH + mx]}`, 25, 115)
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

(() => {

	gScreen = document.createElement('canvas')	// 仮想画面の設定
	gScreen.width = WIDTH						// 仮想画面の幅を設定	
	gScreen.height = HEIGHT

	loadImage()

	wSize()	// 画面サイズ初期化
	window.addEventListener('resize', wSize)

	// フレームレートを設定
	setInterval(() => {wTimer()}, 33)

	// keyboardイベント
	window.addEventListener('keydown', e => {
		e.preventDefault()
		switch(e.keyCode){
			case 37:
				gPlayerX -= 1
				break;
			case 38:
				gPlayerY -= 1
				break;
			case 39:
				gPlayerX += 1
				break;
			case 40:
				gPlayerY += 1
				break;
			default:
				break;
		}
			// マップループ処理
		gPlayerX += ( MAP_WIDTH  * TILESIZE ) 
 		gPlayerX %= ( MAP_WIDTH  * TILESIZE ) 
 		gPlayerY += ( MAP_HEIGHT * TILESIZE )  
		gPlayerY %= ( MAP_HEIGHT * TILESIZE )  
	})



})()