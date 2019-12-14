'use_strict'

const memo = new Map()
memo.set(0, 0)
memo.set(1, 1)

const fib = n => {
  if(memo.has(n)) {
    return memo.get(n)
  }
  let value = fib(n - 1) + fib(n - 2)
  memo.set(n, value)
  return value
}

const lengthFib = 1000;
for(let i = 0; i <= lengthFib;i=i+1) {
  console.log(i + ': ' + fib(i))
}