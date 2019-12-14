let powCalc = (b) => {
  return function(a) {
    let result = 1
    for(let i = 0; i < b;i++){
      result *= a
    }
    
    return result
  }
}

// aをb回累乗する
// bをforループさせる
const threePow = powCalc(3)
module.exports = {
  threePow
}