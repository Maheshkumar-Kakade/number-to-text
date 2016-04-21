var numberToText = require('../index')
var util = require('util')

var thousands = ['', 'tausend', 'Million', 'Milliarde', 'Billion', 'Billiarde', 'Trillion']
var thousandsPural = ['', 'tausend', 'Millionen', 'Milliarden', 'Billionen', 'Billiarden', 'Trillionen']
var ones = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
var tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig']
var cases = ['titleCase', 'lowerCase', 'upperCase', 'toString']
var caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase, String.prototype.toString]

function DeConverter () {
  numberToText.addConverter('de', this)
}

util.inherits(DeConverter, numberToText.Converter)

DeConverter.prototype.convertToText = function (num, options) {
  options = options || {}
  if (options.separator !== '') options.separator = options.separator || ''
  if (cases.indexOf(options.case) === -1) {
    options.case = cases[3]
  }
  var caseFunction = caseFunctions[cases.indexOf(options.case)]

  var valueArray = []
  if (typeof num === 'number' || num instanceof Number) {
    num = num.toString()
  }
  if (num === '0') {
    return caseFunction.call('null')
  }
  var hasThousand = false
  var splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
  for (var index = 0; index < splittedNumbers.length; ++index) {
    var splitValues = []
    var splitNum = splittedNumbers[index]
    if (splitNum.length > 3) {
      splitValues.push(module.exports.convertToText(splitNum))
    } else {
      var hnum = ''
      if (splitNum.length === 3 && ones[splitNum.charAt(0)]) {
        hnum += ones[splitNum.charAt(0)] + 'hundert'
      } if (splitNum.length >= 2) {
        if (splitNum.substr(-2, 1) === '1') {
          hnum += ones[splitNum.substr(-2, 2)]
        } else {
          if (ones[splitNum.substr(-1, 1)]) {
            hnum += ones[splitNum.substr(-1, 1)]
          }
          if (tens[splitNum.substr(-2, 1)]) {
            hnum += ones[splitNum.substr(-1, 1)] ? 'und' : ''
            hnum += tens[splitNum.substr(-2, 1)]
          } /* else {
                        hnum += ones[splitNum.substr(-1, 1)] == ones[1] ? "s" : ""
                    }*/
        }
      } else {
        hnum += ones[splitNum.charAt(0)] /* == ones[1] ? ones[1] + "s" : ones[splitNum.charAt(0)] */
      }
      if (hnum) {
        if (new RegExp(ones[1] + '$').test(hnum)) hnum += 's'
        splitValues.push(hnum)
      }
    }
    if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
      var val
      if ((splittedNumbers.length - 1 - index) === 1) {
        val = splitValues.pop()
        if (val === (ones[1] + 's')) val = ones[1]
        val += thousands[splittedNumbers.length - 1 - index]
        splitValues.push(val)
        hasThousand = true
      } else {
        val = splitValues.pop()
        if (val === (ones[1] + 's')) val = ones[1] + 'e'
        splitValues.push(val)
        if (val === ones[1] + 'e') {
          splitValues.push(thousands[splittedNumbers.length - 1 - index])
        } else {
          splitValues.push(thousandsPural[splittedNumbers.length - 1 - index])
        }
      }
    }
    if (splitValues.length > 0) {
      if (hasThousand && valueArray.length > 0 && (splittedNumbers.length - 1 - index) !== 1) {
        valueArray.push(valueArray.pop() + splitValues.join(' '))
      } else {
        valueArray.push(splitValues.join(' '))
      }
    }
  }
  return caseFunction.call((valueArray.join(options.separator + ' ')))
}

module.exports = new DeConverter()
