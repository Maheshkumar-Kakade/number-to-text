(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.numberToText = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const numberToText = require('../index')

const thousands = ['', 'tausend', 'Million', 'Milliarde', 'Billion', 'Billiarde', 'Trillion']
const thousandsPural = ['', 'tausend', 'Millionen', 'Milliarden', 'Billionen', 'Billiarden', 'Trillionen']
const ones = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
const tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig']
const cases = ['titleCase', 'lowerCase', 'upperCase', 'toString']
const caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase, String.prototype.toString]

class DeConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('de', this)
  }

  convertToText (num, options) {
    options = options || {}
    if (options.separator !== '') options.separator = options.separator || ''
    if (cases.indexOf(options.case) === -1) {
      options.case = cases[3]
    }
    const caseFunction = caseFunctions[cases.indexOf(options.case)]

    const valueArray = []
    if (typeof num === 'number' || num instanceof Number) {
      num = num.toString()
    }
    if (num === '0') {
      return caseFunction.call('null')
    }
    let hasThousand = false
    const splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
    for (let index = 0; index < splittedNumbers.length; ++index) {
      const splitValues = []
      const splitNum = splittedNumbers[index]
      if (splitNum.length > 3) {
        splitValues.push(module.exports.convertToText(splitNum))
      } else {
        let hnum = ''
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
            }
          }
        } else {
          hnum += ones[splitNum.charAt(0)]
        }
        if (hnum) {
          if (new RegExp(ones[1] + '$').test(hnum)) hnum += 's'
          splitValues.push(hnum)
        }
      }
      if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
        let val
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
}
module.exports = new DeConverter()

},{"../index":5}],2:[function(require,module,exports){
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

},{"../index":5}],3:[function(require,module,exports){
const numberToText = require('../index')

const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion']
const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFunctions = [String.prototype.toString, String.prototype.toLowerCase, String.prototype.toUpperCase]

class EnUsConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('en-us', this)
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
      return caseFunction.call('Zero')
    }
    const splittedNumbers = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
    for (let index = 0; index < splittedNumbers.length; ++index) {
      const splitValues = []
      const splitNum = splittedNumbers[index]
      if (splitNum.length > 3) {
        splitValues.push(module.exports.convertToText(splitNum))
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
      if (thousands[splittedNumbers.length - 1 - index] && splitValues.length > 0) {
        splitValues.push(thousands[splittedNumbers.length - 1 - index])
      }
      if (splitValues.length > 0) {
        valueArray.push(splitValues.join(' '))
      }
    }
    return caseFunction.call((valueArray.join(options.separator + ' ')))
  }
}

module.exports = new EnUsConverter()

},{"../index":5}],4:[function(require,module,exports){
const numberToText = require('../index')

const thousands = ['', 'Bin', 'Milyon', 'Milyon', 'Trilyon', 'Katrilyon', 'Kentilyon']
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
    return caseFunction.call((valueArray.join(options.separator + ' ')))
  }
}

module.exports = new TrConverter()

},{"../index":5}],5:[function(require,module,exports){
const Converter = require('./lib/Converter')
const container = {}
class NumberToText {
  /**
  *  convert number to text
  *  @param {string or number} num
  *  @param {object } options { language : "en-us" ,separator :"," ,case : "titleCase" } current support languages en-us, en-in annd de and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
  */
  constructor () {
    this.Converter = Converter
  }
  convertToText (num, options) {
    options = options || {}
    const language = (options.language || 'en-us').toLowerCase()
    if (container.hasOwnProperty(language)) {
      return container[language].convertToText(num, options)
    } else {
      throw new Error('converter for language "' + language + '" not found.')
    }
  }

  addConverter (language, langConverter) {
    if (!container.hasOwnProperty(language)) {
      if (langConverter instanceof Converter) {
        container[language] = langConverter
      } else {
        throw new Error('language converter is not instance of converter')
      }
    } else {
      return false
    }
  }
}

module.exports = new NumberToText()

},{"./lib/Converter":6}],6:[function(require,module,exports){
class Converter {
  convertToText (options) {
    throw new Error('convertToText is not implemented by ' + this.constructor.name + ' .')
  }
}
module.exports = Converter

},{}]},{},[5,3,2,1,4])(5)
});
