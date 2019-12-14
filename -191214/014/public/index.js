(()=> {
  const socket = io.connect('http://localhost:3000')


  socket.on('userMsg', msg => {
    chatField.insertAdjacentHTML('afterend', `<p style="background-color: #ddd;grid-column: 1;gird-gap: 0; padding: 0em;margin: 0;">${msg.msg}</p><br>`)
  })

  const chatEmit = () => {
    chatField.insertAdjacentHTML('afterEnd', `<p style="background-color: #ccc;grid-column: 1;grid-gap: 0; padding: 0em;margin: 0;">${document.chatForm.chats.value}</p><br>`)
    socket.emit('onMsg', {msg: document.chatForm.chats.value})
    document.chatForm.chats.value = ''
    document.chatForm.chats.focus()
  }

  const sendBtn = document.querySelector('.submitBtn')
  const chatField = document.querySelector('.chatField')

  sendBtn.addEventListener('click', chatEmit)
})()