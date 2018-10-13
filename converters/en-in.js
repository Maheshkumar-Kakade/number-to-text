const numberToText = require('../index')

const hundreds = ['', 'Thousand', 'Lakh', 'Crore']
const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase]

class EnInConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('en-in', this)
  }

  convertToText (num, options) {
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
      return caseFunction.call('Zero')
    }
    const splittedNumbers = num.match(/.{1,}(?=(..){2}(...)$)|.{1,2}(?=(..){0,1}(...)$)|.{1,3}$/g)
    for (let index = 0; index < splittedNumbers.length; ++index) {
      const splitValues = []
      const splitNum = splittedNumbers[index]
      if (splittedNumbers.length === 4 && index === 0 && splitNum.length > 2) {
        splitValues.push(this.convertToText(splitNum, options))
      } else {
        if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
          splitValues.push(ones[splitNum.charAt(0)])
          splitValues.push('Hundred')
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
          splitValues.push(ones[splitNum.charAt(0)])
        }
      }
      if (hundreds[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
        splitValues.push(hundreds[splittedNumbers.length - 1 - index])
      }
      if (splitValues.length > 0) {
        valueArray.push(splitValues.join(' '))
      }
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')))
  }
}
module.exports = new EnInConverter()
