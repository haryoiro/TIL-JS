console.log('%c [JavaScript] スプレッド構文を使いこなそう', 'color:red;font-size:1.5em;')

function sum (x, y, z){ 
	return x + y + z
}

sum(1, 2, 3)
// 6
const numbers = [1, 2, 3]
// undefined
numbers
// (3) [1, 2, 3]
sum(...numbers)
// 6
