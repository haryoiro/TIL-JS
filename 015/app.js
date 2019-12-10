class Canvas {
  constructor(){
    this.canvas = document.querySelector('#canvas')
    this.ctx     = canvas.getContext('2d')

    this.me = 1
    this.them = 5

    this.strokeList = []

    this.canvas.width = 1000
    this.canvas.height = 1000

    this.dragging = false
  }


  mousePoints(e){
    let rect = e.target.getBoundingClientRect()
    let points = {
      x: e.clientX - Math.floor(rect.left),
      y: e.clientY - Math.floor(rect.top)
    }
    this.strokeList.unshift(points)
  }

  putPoint(e) {

    if(this.dragging) {
      this.mousePoints(e)
      let x = this.strokeList[0].x,
          y = this.strokeList[0].y
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(x, y, 10, 10)
    }
  }

  engage(e) {
    this.dragging = true
  }

  disengage(e) {
    this.dragging = false
  }
}

(() => {
  const canvas = new Canvas()
  const c = canvas.ctx

  const engage = e => canvas.engage(e)
  const disengage = e => canvas.disengage(e)
  const putPoint = e => canvas.putPoint(e)

  c.canvas.addEventListener('mousemove', putPoint)
  c.canvas.addEventListener('mousedown', engage)
  c.canvas.addEventListener('mouseup', disengage)
})()