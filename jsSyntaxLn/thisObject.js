console.log('%c [javascript] thisについてまなぼう', 'color:red; font-size: 1.5em')

let myObj = {
  id:2,
  printId(){  //printId function() {}   のシンタックスシュガー
    console.log(this.id)
  }
}
myObj.printId()

// アロー関数を使用しない関数リテラル
const sayFoo = function(){
  console.log(this['foo'])
}
// アロー関数を使用した関数リテラル
const sayFoo2 = () => {
  console.log(this['foo'])
}

// Global Scope
// BrowserでみたときのGlobal Objectは windowオブジェクト
foo = 'foo'


const mySecondObj = {
  foo: "I'm in the obj",
  sayFoo,
  sayFoo2
}

sayFoo()
mySecondObj.sayFoo()
mySecondObj.sayFoo2()

// コンストラクタを定義した場合、thisはインスタンス化されたオブジェクトを指す
function MyObj(id){
  this.id = id
}
MyObj.prototype.printId = function(id) {
  console.log(this.id)
}

const newInstance = new MyObj(5)

console.log(newInstance.id)

// Class構文でも同じで、thisはインsタンス化されたオブジェクトを参照する
class MyClass {
  constructor(id) {
    this.id = id
  }

  printId(id) {
    console.log(this.id)
  }
}

let newInstance2 = new MyClass(10)
newInstance2.printId()



const outer = {
  // func1のthisはouterというオブジェクトを参照している
  func1: function(){
    console.log(this);
    // func2のthisはwindowオブジェクトを参照している
    const func2 = function() {
      console.log(this)
      // func3も同様にthisはwindowオブジェクトを参照している
      const func3 = function(){
        console.log(this)
      }()
    }()
  }
}
outer.func1()

/** DevConsole
 * {func1: ƒ}
 * Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
 * Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
 */


// ⬇
// 入れ子になった関数でもグローバルオブジェクトではなく(ここでは)outerオブジェクトを参照したいばあいは
// thisを一度他の変数に格納しておくことで、入れ子になった関数内でもthisをouterオブジェクトを参照した状態で
// 使用することができる。

const outer2 = {

  func1_2: function(){
    console.log(this)
    let _that = this

    const func2_2 = function() {
      console.log(_that)

      const func3_2 = function(){
        console.log(_that)
      }()
    }()
  }
}
outer2.func1_2()

/** DevConsole
 * {func1_2: ƒ}
 * {func1_2: ƒ}
 * {func1_2: ƒ}
 */