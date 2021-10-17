const numberToText = require('../index')

const thousands = ['', 'Ribu', 'Juta', 'Milyar', 'Triliun']
const ones = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas', 'Dua belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas']
const tens = ['', '', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh']
const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase]

class IdConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('id', this)
  }

  convertToText (num, options) {
    options = options || {}
    if (options.separator !== '') options.separator = options.separator || ''
    if (cases.indexOf(options.case) === -1) {
      options.case = cases[0]
    }
    const caseFunction = caseFunctions[cases.indexOf(options.case)]

    const valueArray = []
    if (typeof num === 'number' || num instanceof Number) {
      num = num.toString()
    }
    if (num === '0') {
      return caseFunction.call('nol')
    }
    if (num === '100') return caseFunction.call('Seratus')
    if (num === '1000') return caseFunction.call('Seribu')
    const splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
    for (let index = 0; index < splittedNumbers.length; ++index) {
      const splitValues = []
      const splitNum = splittedNumbers[index]
      if (splitNum.length > 3) {
        splitValues.push(module.exports.convertToText(splitNum))
      } else {
        if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
          splitValues.push(ones[splitNum.charAt(0)])
          splitValues.push('Ratus')
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
      if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
        splitValues.push(thousands[splittedNumbers.length - 1 - index])
      }
      if (splitValues.length > 0) {
        valueArray.push(splitValues.join(' '))
      }
    }
    const result = caseFunction.call((valueArray.join(options.separator + ' ')))
    if (result.includes('Satu Ratus') || result.includes('satu ratus') || result.includes('SATU RATUS')) {
      return result.replace(/Satu Ratus/i, 'Seratus')
    }
    if (result.includes('Satu Ribu') || result.includes('satu ribu') || result.includes('SATU RIBU')) {
      return result.replace(/Satu Ribu/i, 'Seribu')
    }
    return result
  }
}

module.exports = new IdConverter()
