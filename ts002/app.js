"use strict";
var Address = /** @class */ (function () {
    function Address(_zip) {
        this._zip = _zip;
        this._zip = _zip;
        this.addresses = {
            '079-1100': {
                'prefecture': '北海道',
                'city': '赤平市'
            },
            '038-0000': {
                'prefecture': '青森県',
                'city': '青森市'
            }
        };
    }
    Object.defineProperty(Address.prototype, "zip", {
        // public getZip(): string {
        //   return this.zip
        // }  ⬇sugarSyntax
        get: function () {
            return this._zip;
        },
        set: function (value) {
            this._zip = value;
        },
        enumerable: true,
        configurable: true
    });
    Address.prototype.getAddress = function () {
        var here = this.addresses[this.zip];
        return here.prefecture + ", " + here.city;
    };
    return Address;
}());
var myAddress1 = new Address('038-0000');
myAddress1.zip = '079-1100';
console.log(myAddress1.getAddress());
var myAddress2 = new Address('038-0000');
console.log(myAddress2.zip);
