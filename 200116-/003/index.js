const gC = {
  HEIGHT:     512,
  WIDTH:      1000,
  FONT:       "10px monospace",	// フォント
  FONTSTYLE:  "#000",
  SCROLL:     16,
  SMOOTH:     0,
  TILESIZE:   4,
  FRAMETIME:  33
}

const gL = {  
  px: 10,
  py: 10,
  mx: undefined,
  my: undefined,
  rect: undefined,
  gScreen: undefined,
  gWidth: undefined,
  gHeight: undefined,
  gRadius: 2,
  color: 'black',
  paratteRect: [],
  dragging: false,
  touch: false,
  redoStack: [],
  redoStacker: [],
  redoMap: new Map(),
  pType: undefined
}

function mWindow() {
  const c = document.getElementById('canvas')
  c.width = innerWidth
  c.height = innerHeight

  // ドットにスムーズをかけるかかけないかを設定
	const g = c.getContext('2d')
	isImageSmoothingEnabled(g, false)


  // 実画面サイズを計測
	// ドットのアスペクト比を維持したままでの最大サイズを計測する
	gL.gWidth = c.width 
  gL.gHeight = c.height
  if( gL.gWidth / gC.WIDTH < gL.gHeight / gC.HEIGHT) {
		gL.gHeight = gL.gWidth * gC.HEIGHT / gC.WIDTH
	} else {
		gL.gWidth = gL.gHeight * gC.WIDTH / gC.HEIGHT
  }  

}



function gPaint(){
  const g = gL.gScreen.getContext('2d')
  g.fillStyle = '#fff'
  g.fillRect(0, 0, g.width, g.height)

  // // クロスヘア
	// g.fillStyle = "#99ee00"
	// g.fillRect(0, gC.HEIGHT / 2 - 1, gC.WIDTH, 1)
  // g.fillRect(gC.WIDTH / 2 - 1 ,0 ,1 ,gC.HEIGHT)

  // ボーダーライン
	g.fillStyle = "#3334"
  g.fillRect(0, 0, gC.WIDTH - 4, 4 )
  g.fillRect(0, 0, 4, gC.HEIGHT -4)
  g.fillRect(0, 504, gC.WIDTH - 4, 4)
  g.fillRect(996, 0, 4, gC.HEIGHT - 4)
}

// メインキャンバス描画
function wTimer(){
  
  gPaint()

  const c = document.getElementById('canvas')
  const g = c.getContext('2d')
  
  g.fillStyle = '#fff'
  g.fillRect(0, 0, c.width, c.height)

  g.drawImage(gL.gScreen, 0, 0, gL.gScreen.width, gL.gScreen.height, 0, 0, gL.gWidth, gL.gHeight)

    //  左上のポチ
  g.fillStyle = '#333'/*"#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);*/
  g.fillRect(gL.px, gL.py, 10, 10)

  // 実画面の色設定
  g.fillStyle = gL.color

  // 実画面のフォント設定
  g.font = gC.FONT
  g.fontStyle = gC.FONTSTYLE

  // マウスカーソル
  // カーソル座標
  g.fillText(`x: ${gL.mx} y: ${gL.my}`, gL.mx + 5, gL.my + 2)

  // カーソルアイコン
  g.beginPath()
  g.arc(gL.mx + 5, gL.my + 5, gL.gRadius, 0,  Math.PI * 2)
  g.fill()
}


// ツール関連
function put(){
  const g = gL.gScreen.getContext('2d')
  g.beginPath()
  gL.dragging = true
}

function over(){
  gL.dragging = false
  
  // gL.redoMap.forEach((key, value) => {
  //   console.log(value)
  // })
}

function thisPoint(e){
  gL.rect = e.target.getBoundingClientRect();
  gL.mx = (e.clientX - Math.floor(gL.rect.left))
  gL.my = (e.clientY - Math.floor(gL.rect.top))
}

function paint(e){
  const g = gL.gScreen.getContext('2d')

  e.preventDefault()
  thisPoint(e)
  if(gL.dragging){
    let x = (e.clientX / (gL.gWidth / gC.WIDTH))
    let y = (e.clientY / (gL.gHeight / gC.HEIGHT))
    g.fillStyle = gL.color
    g.lineTo(x, y)
    g.stroke()
    g.beginPath()
    // g.arc(x, y, gL.gRadius, 0, Math.PI * 2)
    g.fill()
    g.beginPath()
    g.moveTo(x, y)
    
    // TODO: 配列を間引く
    gL.redoMap.set([gL.mx, gL.my])
  }
}
function handledown(e){
  const g = gL.gScreen.getContext('2d')
  g.beginPath()
  gL.dragging = true
  gL.pType = e.pointerType
}
function handleup(){
  gL.dragging = false
}

function handlemove(e){
  switch (gL.pType){
    case 'mouse':
      gL.pType = 'mouse'
      paint(e)
      break
    case 'touch':
      gL.pType = 'touch'
      break
    case 'pen':
      gL.pType = 'pen'
      break
  }
}
  

// ----- 外観設定系関数 -----
function isImageSmoothingEnabled(context, bool){
  if(!bool){bool = true}
  context.mozImageSmoothingEnabled = bool;
  context.webkitImageSmoothingEnabled = bool;
  context.msImageSmoothingEnabled = bool
  context.imageSmoothingEnabled = bool
}

function glog(c){
  console.log(c)
}

function hideMenu(){
  document.body.style.overflow = 'hidden'
  document.addEventListener('contextmenu', e => {
    e.preventDefault()
  })
  document.addEventListener('MSHoldVisal', e => {
    e.preventDefault()
  })
}

(() => {
  const c = document.getElementById('canvas')
  gL.gScreen = document.createElement('canvas')
  glog(gL.gScreen)
  gL.gScreen.width = gC.WIDTH
  gL.gScreen.height = gC.HEIGHT

  mWindow()
  hideMenu()
  window.addEventListener('resize', mWindow)
  window.addEventListener('keydown', e => {
    e.preventDefault()
      switch(e.keyCode){
        case 0:
          break;
        // WASD
        case 65:							// 左
          gL.px -= gC.SCROLL
          break;
        case 87:							// 下
          gL.py -= gC.SCROLL
        break;
        case 68:							// 右
          gL.px += gC.SCROLL
          break;
        case 83:							// 上
          gL.py += gC.SCROLL
          break;
        // やじるし
        case 37:							// 左
          gL.px -= gC.SCROLL
          break;
        case 38:							// 上
          gL.py -= gC.SCROLL
          break;
        case 39:							// 右
          gL.px += gC.SCROLL
          break;
        case 40:							// 下
          gL.py += gC.SCROLL
          break;
        default:
          break;
    }
    
    if      (gL.px >= 1024 * 2)  gL.px = 0
    else if (gL.px <= 0  )  gL.px = 1024 * 2
    else if (gL.py >= 512 * 2)  gL.py = 0
    else if (gL.py <= 0  )  gL.py = 512 * 2
  })

  if (window.PointerEvent) {
    document.addEventListener('pointerdown', handledown)
    document.addEventListener('pointerup', handleup)
    document.addEventListener('pointermove', handlemove)
  } else {
    document.addEventListener('mousedown', put) 
    document.addEventListener('mousemove', paint)
    document.addEventListener('mouseup', over)
  }
  setInterval(()=>{wTimer()}, gL.FRAMETIME)
})()