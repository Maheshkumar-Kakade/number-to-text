/* eslint-env mocha */
const numberToText = require('../index')
require('../converters/tr')
require('should')
describe('number conversion for de', function () {
  it('should convert 0 to null', function (done) {
    numberToText.convertToText('0', { language: 'tr' }).should.equal('Sıfır')
    numberToText.convertToText(0, { language: 'tr' }).should.equal('Sıfır')
    done()
  })
})
