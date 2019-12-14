console.log('%c [JavaScript] クロージャーの使い方', 'color:red;font-size:1.5em;')

/**
 * Closureの定義
 * 
 * クロージャは、関数とその関数が宣言された
 * 静的スコープの組み合わせ
 */

/**
 * Bad Pattern
 * counterがグローバルで定義されているので、counterが予期せぬ変更を受ける可能性がある。
 */

let counter = 0|0
increment()
increment()
increment()

function increment() {
	counter = counter + 1
	console.log(counter)
}

/**
 * Good Pattern
 * counterはローカルで定義されているので関数内のみでの変更しか受け付けない
 * JavaScriptではLexical Scopeを持っている関数をクロージャーと定義している
 */

const increment1 = (() => {

	let counter = 0|0	// Lexical Scope

	return () => {
		counter = counter + 1 
		return console.log(counter)
	}
})();

increment1()
increment1()
increment1()
// increment1().counter = 10	// undefined 
// increment1内のcounterを参照できるように見えるが、内部的に別の場所を指しているので
// 編集できない。


function addStringFactory(tail) {
	return function(str) {
		return str + tail
	}
}

let addAs = addStringFactory('AAAAA')
let addBs = addStringFactory('BBBBB')

let str = 'TOM'
	str = addAs('TOM')
console.log(str)