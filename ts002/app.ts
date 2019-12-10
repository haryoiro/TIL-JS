class Address {
  private addresses: any

  public constructor(private _zip: string) {
    this._zip = _zip
    this.addresses = {
      '079-1100': {
        'prefecture': '北海道',
        'city': '赤平市'
      },
      '038-0000': {
        'prefecture': '青森県',
        'city': '青森市'
      }
    }
  }
  
  // public getZip(): string {
  //   return this.zip
  // }  ⬇sugarSyntax

  get zip(): string {
    return this._zip
  }

  set zip(value: string) {
    this._zip = value
  }

  public getAddress(): string {
    let here = this.addresses[this.zip]
    return `${here.prefecture}, ${here.city}`
  }
}

const myAddress1 = new Address('038-0000')
myAddress1.zip = '079-1100'
console.log(myAddress1.getAddress())

const myAddress2 = new Address('038-0000')
console.log(myAddress2.zip)