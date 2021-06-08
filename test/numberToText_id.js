/* eslint-env mocha */
const numberToText = require('../index')
require('../converters/id')
require('should')
describe('number conversion for id', function () {
  it('should convert 1945 to Seribu Sembilan Ratus Empat Puluh Lima', function (done) {
    numberToText.convertToText('1945', { language: 'id' }).should.equal('Seribu Sembilan Ratus Empat Puluh Lima')
    done()
  })

  it('should convert 100000 to Seratus Ribu', function (done) {
    numberToText.convertToText('100000', { language: 'id' }).should.equal('Seratus Ribu')
    done()
  })
})
