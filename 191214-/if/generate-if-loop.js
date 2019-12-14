console.log('if(n === 0){console.log(\'this number is 0\')}')
let n = 99
for(let i = 1; i <= n;i = (i+1)|0){
  console.log(`else if(n === ${i}){console.log('this number is ${i}')}`)
}
console.log('if(n === 100){console.log(\'this number is 100\')}')