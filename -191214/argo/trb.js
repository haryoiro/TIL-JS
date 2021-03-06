'use_strict'

const memo = new Map()
memo.set(0, 0)
memo.set(1, 0)
memo.set(2, 1)

const trib = n => {
  if(memo.has(n)) {return memo.get(n)}
  let value = trib(n -1) + trib(n - 2) + trib(n - 3)
  memo.set(n, value)
  return value
}

const len = 500
for (let i = 0; i <= len; i += 1) {
  console.log(trib(i))
}