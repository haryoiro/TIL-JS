'use_strict'

const fib2 = n => {
  if(n === 0) {return 0}
  if(n === 1) {return 1}
  if(n === null) {return null}
  return fib2(n - 1) + fib2(n -2 )
}


let lengthNum = 40;
for (let i = 0; i <= lengthNum; i++){
  console.log(fib2(i))
}