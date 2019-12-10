const sayHello = (name: string): void => {
  console.log(`GOOD BYE ${name}!`)
}
sayHello('HARYOIRO')

const addTax = (price: number, tax: number=10):number => {
  return Math.floor(price * (1 + tax / 100))
}

console.log(addTax(534530, 8))
console.log(addTax(534530, 10))
console.log(addTax(534530))