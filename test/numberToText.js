/* eslint-env mocha */
const numberToText = require('../index')
require('../converters/en-us')
require('../converters/en-in')
require('should')
describe('number conversion', function () {
  it('should convert 123456 to One Hundred Twenty Three Thousand, Four Hundred Fifty Six', function (done) {
    numberToText.convertToText('123456').should.equal('One Hundred And Twenty Three Thousand, Four Hundred And Fifty Six')
    numberToText.convertToText(123456).should.equal('One Hundred And Twenty Three Thousand, Four Hundred And Fifty Six')
    numberToText.convertToText(123456, { case: 'lowerCase' }).should.equal('one hundred and twenty three thousand, four hundred and fifty six')
    numberToText.convertToText(123456, { case: 'upperCase' }).should.equal('ONE HUNDRED AND TWENTY THREE THOUSAND, FOUR HUNDRED AND FIFTY SIX')
    numberToText.convertToText(123456, { separator: '', case: 'upperCase' }).should.equal('ONE HUNDRED AND TWENTY THREE THOUSAND FOUR HUNDRED AND FIFTY SIX')
    done()
  })

  it('should convert 1234567 to One Million, Two Hundred Thirty Four Thousand, Five Hundred Sixty Seven', function (done) {
    numberToText.convertToText('1234567').should.equal('One Million, Two Hundred And Thirty Four Thousand, Five Hundred And Sixty Seven')
    numberToText.convertToText(1234567).should.equal('One Million, Two Hundred And Thirty Four Thousand, Five Hundred And Sixty Seven')
    done()
  })

  it('should convert 0 to zero', function (done) {
    numberToText.convertToText('0').should.equal('Zero')
    numberToText.convertToText(0).should.equal('Zero')
    numberToText.convertToText(0, { case: 'upperCase' }).should.equal('ZERO')
    numberToText.convertToText('0', { language: 'en-in' }).should.equal('Zero')
    done()
  })

  it('should convert 23 to Twenty Three', function (done) {
    numberToText.convertToText('23').should.equal('Twenty Three')
    numberToText.convertToText(23).should.equal('Twenty Three')
    numberToText.convertToText('23', { language: 'en-in' }).should.equal('Twenty Three')
    done()
  })

  it('should convert 1004 to One Thousand, Four', function (done) {
    numberToText.convertToText('1004').should.equal('One Thousand, Four')
    numberToText.convertToText(1004).should.equal('One Thousand, Four')
    numberToText.convertToText(1004, { language: 'en-in' }).should.equal('One Thousand, Four')
    done()
  })

  it('should convert 14 to Fourteen', function (done) {
    numberToText.convertToText('14').should.equal('Fourteen')
    numberToText.convertToText(14).should.equal('Fourteen')
    numberToText.convertToText(14, { language: 'en-in' }).should.equal('Fourteen')
    done()
  })

  it('should convert 1000000 to One Million', function (done) {
    numberToText.convertToText('1000000').should.equal('One Million')
    numberToText.convertToText(1000000).should.equal('One Million')
    numberToText.convertToText(1000000, { language: 'en-in' }).should.equal('Ten Lakh')
    done()
  })

  it('should convert 1000000000 to One Billion', function (done) {
    numberToText.convertToText('1000000000').should.equal('One Billion')
    numberToText.convertToText(1000000000).should.equal('One Billion')
    numberToText.convertToText(1000000000, { language: 'en-in' }).should.equal('One Hundred Crore')
    done()
  })

  it('should convert 1000000000 to One Hundred Crore for en-in language', function (done) {
    numberToText.convertToText(1000000000, { language: 'en-in' }).should.equal('One Hundred Crore')
    done()
  })

  it('should convert 1000000000000 to One Trillion', function (done) {
    numberToText.convertToText('1000000000000').should.equal('One Trillion')
    numberToText.convertToText(1000000000000).should.equal('One Trillion')
    done()
  })

  it('should convert 1000000000000 to One Lakh Crore for en-in language', function (done) {
    numberToText.convertToText('1000000000000', { language: 'en-in' }).should.equal('One Lakh Crore')
    numberToText.convertToText(1000000000000, { language: 'en-in' }).should.equal('One Lakh Crore')
    done()
  })

  it('should convert 1 to One', function (done) {
    numberToText.convertToText('1').should.equal('One')
    numberToText.convertToText(1).should.equal('One')
    numberToText.convertToText(1, { language: 'en-in' }).should.equal('One')
    done()
  })

  it('should convert 50005 to Fifty Thousand, Five', function (done) {
    numberToText.convertToText('50005').should.equal('Fifty Thousand, Five')
    numberToText.convertToText(50005).should.equal('Fifty Thousand, Five')
    numberToText.convertToText(50005, { language: 'en-in' }).should.equal('Fifty Thousand, Five')
    done()
  })

  it('should convert 512345678 to Five Hundered And Twelve Million, Three Hundred And Forty Five Thousand, Six Hundred And Seventy Eight', function (done) {
    numberToText.convertToText('512345678').should.equal('Five Hundred And Twelve Million, Three Hundred And Forty Five Thousand, Six Hundred And Seventy Eight')
    numberToText.convertToText(512345678).should.equal('Five Hundred And Twelve Million, Three Hundred And Forty Five Thousand, Six Hundred And Seventy Eight')
    done()
  })

  it('should convert 512345678 to Fifty One Crore, Twenty Three Lakh, Forty Five Thousand, Six Hundred Seventy Eight for en-in language', function (done) {
    numberToText.convertToText('512345678', { language: 'en-in' }).should.equal('Fifty One Crore, Twenty Three Lakh, Forty Five Thousand, Six Hundred Seventy Eight')
    numberToText.convertToText(512345678, { language: 'en-in' }).should.equal('Fifty One Crore, Twenty Three Lakh, Forty Five Thousand, Six Hundred Seventy Eight')
    done()
  })
})
