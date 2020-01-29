'use strict'
// 素数判定アルゴリズム
const isPrime = num => {
	if		(num < 2) 		return false
	else if	(num == 2) 		return false
	else if	(num % 2 == 0) 	return false

	let sqrtNum = Math.sqrt(num)
	for(let i = 3;i <= sqrtNum; i += 2){
		if	(num % i == 0) 	return false
	}
	return true
}

// 与えられた数から素数のみを抽出
const listPrimes = (limit) => {
	let listArr = []
	for(let i = 2; i < limit;i+=1){
		if(isPrime(i)) listArr.push(i)
	}
	return listArr
}


// ユークリッド互除法
const gcd = (a, b) => {
	let r = a % b
	while(r !== 0){
		a = b
		b = r
		r = a % b
	}
	return b
}

// 角度をラジアンに変換
const degToRad = (deg) => {
	return deg * Math.PI / 180
}
