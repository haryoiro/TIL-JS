console.log('%c [javaScript]call, apply, bindのつかいかた', 'color:red;font-size:1.5em;')

function greet(){
  let hi = `Hi, ${this.name}`
  console.log(hi)
}

let obj = {name: "Tom"}

// callメソッドは、関数のthisにわたすオブジェクトをあとから決定させることができるメソッド
// 第一引数にオブジェクト、第二引数、第三引数は関数自身の引数を設定することができる
greet.call(obj, 1, 2, 3)


function argumentsLog() {
  console.log(arguments) // 引数はargumentsに格納される
  let slicedArray = [].slice.call(arguments) 
  console.log(slicedArray)
}

let obj1 = {name: "Tom"}

argumentsLog.call(obj1, 1, 2, 3, 4, 5)


function hello() {
  let slicedArray = [].slice.call(arguments)
  console.log("this is " + slicedArray)
}

hello.call(1, 2, 3, 4)

function sliceTest() {
  let sliceText = 'HARYOIRO'.slice(0, 7)
  console.log(sliceText)
}
sliceTest()

// applyは配列で管理している場合に使う
function greet2(id1, id2, id3){
  let hi = `Hi, ${this.name}`
  console.log(hi)
}

let obj3 = {name: "Tom"}

greet.apply(obj3, [1, 2, 3])

const arry = [1, 2, 3, 4]
console.log(Math.min(...arry))




// use bind
let myObj = {
  id: 42,
  print(){
    console.log(this)

    setTimeout(function(){

      console.log(this)

    }.bind(this), 1000)
  }
}
myObj.print()

// didnt bind
let myObj1 = {
  id: 42,
  print(){
    console.log(this)
    setTimeout(function(){
      console.log(this)
    }, 1000)
  }
}
myObj1.print()

// use arrowSyntax
let myObj2 = {
  id: 42,
  print(){
    console.log(this)
    setTimeout(() => {
      console.log(this)
    }, 1000)
  }
}
myObj2.print()