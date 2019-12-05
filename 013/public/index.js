window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  const socket = io.connect('http://localhost:3000')
  
  socket.on('mousePoint', data => {
  if(dragging) {
    ctx.lineTo(data.x, data.y)
    ctx.stroke();
    ctx.beginPath()
    ctx.arc(data.x, data.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(data.x, data.y)
  }
  })

  socket.on('mouseUp', data => {
    dragging = false
    ctx.beginPath()
  })

  socket.on('mouseDown', data => {
    dragging = true
  })


  let radius = 10,
    dragging = false
    w = canvas.width = 1920 / 4
    h = canvas.height = 1080 / 4
    ctx.lineWidth = radius * 2

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
      let data = {
        x: x,
        y: y
      }
      socket.emit('mousePoint', data)
    }
  }

  const disengage = (e) => {
    dragging = false
    ctx.beginPath()
    socket.emit('mouseUp')
  }

  const engage = () => {
    dragging = true
    socket.emit('mouseDown')
  }

  canvas.addEventListener('mousedown', engage)
  canvas.addEventListener('mousemove', drawPoint)
  canvas.addEventListener('mouseup', disengage)
})

