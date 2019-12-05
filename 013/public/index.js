window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  const socket = io.connect('http://localhost:3000')

  let radius = 10,
    dragging = false
    w = canvas.width = 1920;
    h = canvas.height = 1080;
    ctx.lineWidth = radius * 2;

  const drawPoint = (e) => {
    if(dragging) {
      let rect = e.target.getBoundingClientRect()
          x = e.clientX - Math.floor(rect.left),
          y = e.clientY - Math.floor(rect.top)
          ctx.lineTo(x, y)
          ctx.stroke();
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(x, y)
    }
  }

  const disengage = (e) => {
    dragging = false
    ctx.beginPath()
  }

  const engage = () => {
    dragging = true
  }

  canvas.addEventListener('mousedown', engage)
  canvas.addEventListener('mousemove', drawPoint)
  canvas.addEventListener('mouseup', disengage)
})