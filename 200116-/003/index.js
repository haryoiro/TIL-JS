const gC = {
  HEIGHT:     512,
  WIDTH:      1024,
  FONT:       "10px monospace",	// フォント
  FONTSTYLE:  "#000",
  MAP_WIDTH:  512,
  MAP_HEIGHT: 1024,
  SCROLL:     4,
  SMOOTH:     0,
  TILESIZE:   4,
  FRAMETIME:  66
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
  touch: false

}

function mWindow() {
  const c = document.getElementById('canvas')
  c.width = innerWidth
  c.height = innerHeight

  // // ドットにスムーズをかけるかかけないかを設定
	// const g = c.getContext('2d')
	// g.imageSmoothingEnabled = g.msImageSmoothingEnabled = gC.SMOOTH	// 補完処理


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

  g.fillStyle = '#2200ee'/*"#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);*/
  g.fillRect(gL.px, gL.py, 10, 10)



  // クロスヘア
	g.fillStyle = "#eee"
	g.fillRect(0, gC.HEIGHT / 2 - 1, gC.WIDTH, 1)
  g.fillRect(gC.WIDTH / 2 - 1 ,0 ,1 ,gC.HEIGHT)
}

function fC(num){
  Math.floor(num)
}
function wTimer(){

  gPaint()

  const c = document.getElementById('canvas')
  const g = c.getContext('2d')
  
  g.fillStyle = '#fff'
  g.fillRect(0, 0, c.width, c.height)

  g.drawImage(gL.gScreen, 0, 0, gL.gScreen.width, gL.gScreen.height, 0, 0, gL.gWidth, gL.gHeight)

  g.fillStyle = gL.color

  g.font = gC.FONT
  g.fontStyle = gC.FONTSTYLE

  // カーソル
  // g.fillRect(gL.mx - 10, gL.my - 5, 10, 10)
  g.fillText(`x: ${gL.mx} y: ${gL.my}`, gL.mx + 5, gL.my + 2)

  g.beginPath()
  g.arc(gL.mx, gL.my, gL.gRadius, 0,  Math.PI * 2)
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
}
function tPut(e){
  e.preventDefault()
  touch = true
}
function paint(e){
  const g = gL.gScreen.getContext('2d')

  e.preventDefault()
  gL.rect = e.target.getBoundingClientRect();
  gL.mx = (e.clientX - Math.floor(gL.rect.left))
  gL.my = (e.clientY - Math.floor(gL.rect.top))
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
  }
}


function glog(c){
  console.log(c)
}

(() => {
  const c = document.getElementById('canvas')
  gL.gScreen = document.createElement('canvas')
  glog(gL.gScreen)
  gL.gScreen.width = gC.WIDTH
  gL.gScreen.height = gC.HEIGHT

  mWindow()
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
    
    if      (gL.px >= 512)  gL.px = 0
    else if (gL.px <= 0  )  gL.px = 512
    else if (gL.py >= 256)  gL.py = 0
    else if (gL.py <= 0  )  gL.py = 256
  })
  
  // if (window.PointerEvent) {

  // } else {
    document.addEventListener('mousedown', put) 
    document.addEventListener('mousemove', paint)
    document.addEventListener('mouseup', over)
  // }
  setInterval(()=>{wTimer()}, gL.FRAMETIME)
})()