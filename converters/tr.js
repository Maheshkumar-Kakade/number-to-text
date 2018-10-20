const numberToText = require('../index')

const thousands = ['', 'Bin', 'Milyon', 'Milyar', 'Trilyon', 'Katrilyon', 'Kentilyon']
const ones = ['', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz', 'On', 'On Bir', 'On İki', 'On Üç', 'On Dört', 'On Beş', 'On Altı', 'On Yedi', 'On Sekiz', 'On Dokuz']
const tens = ['', '', 'Yirmi', 'Otuz', 'Kırk', 'Elli', 'Altmış', 'Yetmiş', 'Seksen', 'Doksan']
const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFunctions = [function () { return this.toLocaleString('TR') }, function () { return this.toLocaleLowerCase('TR') }, function () { return this.toLocaleUpperCase('TR') }]

class TrConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('tr', this)
  }

  convertToText (num, options) {
    options = options || {}
    if (options.separator !== '') options.separator = options.separator || ','
    if (cases.indexOf(options.case) === -1) {
      options.case = cases[0]
    }
    const caseFunction = caseFunctions[cases.indexOf(options.case)]

    const valueArray = []
    if (typeof num === 'number' || num instanceof Number) {
      num = num.toString()
    }
    if (num === '0') {
      return caseFunction.call('Sıfır')
    }
    const splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
    for (let index = 0; index < splittedNumbers.length; ++index) {
      const splitValues = []
      const splitNum = splittedNumbers[index]
      const splitIndex = splittedNumbers.length - 1 - index
      if (splitNum.length > 3) {
        splitValues.push(module.exports.convertToText(splitNum))
      } else {
        if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
          const hundredNum = splitNum.charAt(0)
          if (hundredNum > 1) {
            splitValues.push(ones[hundredNum])
          }
          splitValues.push('Yüz')
        } if (splitNum.length >= 2) {
          if (splitNum.substr(-2, 1) === '1') {
            splitValues.push(ones[splitNum.substr(-2, 2)])
          } else {
            if (tens[splitNum.substr(-2, 1)]) {
              splitValues.push(tens[splitNum.substr(-2, 1)])
            }
            if (ones[splitNum.substr(-1, 1)]) {
              splitValues.push(ones[splitNum.substr(-1, 1)])
            }
          }
        } else {
          const oneNum = splitNum.charAt(0)
          if (splitIndex !== 1 || oneNum > 1) {
            splitValues.push(ones[oneNum])
          }
        }
      }
      if (thousands[splitIndex] && (splitIndex === 1 || splitValues.length > 0)) {
        splitValues.push(thousands[splitIndex])
      }
      if (splitValues.length > 0) {
        valueArray.push(splitValues.join(' '))
      }
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')))
  }
}

module.exports = new TrConverter()
