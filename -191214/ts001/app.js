"use strict";
var sayHello = function (name) {
    console.log("GOOD BYE " + name + "!");
};
sayHello('HARYOIRO');
var addTax = function (price, tax) {
    if (tax === void 0) { tax = 10; }
    return Math.floor(price * (1 + tax / 100));
};
console.log(addTax(534530, 8));
console.log(addTax(534530, 10));
console.log(addTax(534530));
