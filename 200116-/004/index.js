const text = document.getElementById('text')
const chatWindow = document.querySelector('.chat')
const clicked = (e) => {
  if(!texts.value){
  
  }else{
    chatWindow.insertAdjacentHTML('afterbegin', `<p class='chat-text'>${texts.value}</p>`)
  }
  texts.value = ''
  texts.focus()
}
const onKeyPress = (e) => {
  if(e.key == "Enter"){
    clicked(e)
  }
}
const button = document.getElementById('submit')
button.addEventListener('click', clicked)
text.addEventListener('keydown', onKeyPress)



function getBtnElement(element){
  return document.querySelector(`${element}`)
}

let slideDown_timer
let slideUp_timer
let m = getBtnElement('.menu')
let stack = m.cloneNode(true)

m.parentNode.appendChild(stack)
stack.style.cssText = "display:grid; grid-template-colomuns: 1fr; height:auto; visibility:hidden;"
let stackH = stack.offsetHeight
m.parentNode.removeChild(stack)

getBtnElement('.icon').onclick = () => {
  let boxH = m.offsetHeight
  if(boxH < 1){
    m.style.display = "grid"
    slideDown(boxH)
  } else {
    slideUp(boxH)
  }
} 

function slideDown(boxH){
  if (boxH < stackH) {
    var boxH = boxH + 5;
    m.style.height = boxH + "px";
    slideDown_timer = setTimeout(() => {
      slideDown(boxH)}, 5)
  } else {
      clearTimeout(slideDown_timer);
      m.style.height = "100%"
      m.style.width = "100%"
  }
}

function slideUp(boxH){
    if (boxH >= 1) {
        var boxH = boxH - 5;
        m.style.height = boxH + "px";
        slideUp_timer = setTimeout(() => {slideUp(boxH)}, 5);
    } else {
        clearTimeout(slideUp_timer);
        m.style.height = 0;
        m.style.display = "none";
    }       
}