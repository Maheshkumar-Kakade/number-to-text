/* eslint-env mocha */
const numberToText = require('../index')
require('../converters/de')
require('should')
describe('number conversion for de', function () {
  it('should convert 0 to null', function (done) {
    numberToText.convertToText('0', { language: 'de' }).should.equal('null')
    numberToText.convertToText(0, { language: 'de' }).should.equal('null')
    done()
  })

  it('should convert 1 to eins', function (done) {
    numberToText.convertToText(1, { language: 'de' }).should.equal('eins')
    done()
  })

  it('should convert 11 to elf', function (done) {
    numberToText.convertToText(11, { language: 'de' }).should.equal('elf')
    done()
  })

  it('should convert 14 to vierzehn', function (done) {
    numberToText.convertToText('14', { language: 'de' }).should.equal('vierzehn')
    numberToText.convertToText(14, { language: 'de' }).should.equal('vierzehn')
    done()
  })

  it('should convert 23 to dreiundzwanzig', function (done) {
    numberToText.convertToText('23', { language: 'de' }).should.equal('dreiundzwanzig')
    numberToText.convertToText(23, { language: 'de' }).should.equal('dreiundzwanzig')
    done()
  })

  it('should convert 50 to fünfzig', function (done) {
    numberToText.convertToText('50', { language: 'de' }).should.equal('fünfzig')
    numberToText.convertToText(50, { language: 'de' }).should.equal('fünfzig')
    done()
  })

  it('should convert 100 to einhundert', function (done) {
    numberToText.convertToText('100', { language: 'de' }).should.equal('einhundert')
    numberToText.convertToText(100, { language: 'de' }).should.equal('einhundert')
    done()
  })

  it('should convert 101 to einhunderteins', function (done) {
    numberToText.convertToText('101', { language: 'de' }).should.equal('einhunderteins')
    numberToText.convertToText(101, { language: 'de' }).should.equal('einhunderteins')
    done()
  })

  it('should convert 117 to einhundertsiebzehn', function (done) {
    numberToText.convertToText('117', { language: 'de' }).should.equal('einhundertsiebzehn')
    numberToText.convertToText(117, { language: 'de' }).should.equal('einhundertsiebzehn')
    done()
  })

  it('should convert 151 to einhunderteinundfünfzig', function (done) {
    numberToText.convertToText('151', { language: 'de' }).should.equal('einhunderteinundfünfzig')
    numberToText.convertToText(151, { language: 'de' }).should.equal('einhunderteinundfünfzig')
    done()
  })

  it('should convert 757 to siebenhundertsiebenundfünfzig', function (done) {
    numberToText.convertToText('757', { language: 'de' }).should.equal('siebenhundertsiebenundfünfzig')
    numberToText.convertToText(757, { language: 'de' }).should.equal('siebenhundertsiebenundfünfzig')
    done()
  })

  it('should convert 1000 to eintausend', function (done) {
    numberToText.convertToText('1000', { language: 'de' }).should.equal('eintausend')
    numberToText.convertToText(1000, { language: 'de' }).should.equal('eintausend')
    done()
  })

  it('should convert 1001 to eintausendeins', function (done) {
    numberToText.convertToText('1001', { language: 'de' }).should.equal('eintausendeins')
    numberToText.convertToText(1001, { language: 'de' }).should.equal('eintausendeins')
    done()
  })

  it('should convert 1020 to eintausendzwanzig', function (done) {
    numberToText.convertToText('1020', { language: 'de' }).should.equal('eintausendzwanzig')
    numberToText.convertToText(1020, { language: 'de' }).should.equal('eintausendzwanzig')
    done()
  })

  it('should convert 1100 to eintausendeinhundert', function (done) {
    numberToText.convertToText('1100', { language: 'de' }).should.equal('eintausendeinhundert')
    numberToText.convertToText(1100, { language: 'de' }).should.equal('eintausendeinhundert')
    done()
  })

  it('should convert 1101 to eintausendeinhunderteins', function (done) {
    numberToText.convertToText('1101', { language: 'de' }).should.equal('eintausendeinhunderteins')
    numberToText.convertToText(1101, { language: 'de' }).should.equal('eintausendeinhunderteins')
    done()
  })

  it('should convert 1289 to eintausendzweihundertneunundachtzig', function (done) {
    numberToText.convertToText('1289', { language: 'de' }).should.equal('eintausendzweihundertneunundachtzig')
    numberToText.convertToText(1289, { language: 'de' }).should.equal('eintausendzweihundertneunundachtzig')
    done()
  })

  it('should convert 6952 to sechstausendneunhundertzweiundfünfzig', function (done) {
    numberToText.convertToText('6952', { language: 'de' }).should.equal('sechstausendneunhundertzweiundfünfzig')
    numberToText.convertToText(6952, { language: 'de' }).should.equal('sechstausendneunhundertzweiundfünfzig')
    done()
  })

  it('should convert 100952 to einhunderttausendneunhundertzweiundfünfzig', function (done) {
    numberToText.convertToText('100952', { language: 'de' }).should.equal('einhunderttausendneunhundertzweiundfünfzig')
    numberToText.convertToText(100952, { language: 'de' }).should.equal('einhunderttausendneunhundertzweiundfünfzig')
    done()
  })

  it('should convert 999990 to neunhundertneunundneunzigtausendneunhundertneunzig', function (done) {
    numberToText.convertToText('999990', { language: 'de' }).should.equal('neunhundertneunundneunzigtausendneunhundertneunzig')
    numberToText.convertToText(999990, { language: 'de' }).should.equal('neunhundertneunundneunzigtausendneunhundertneunzig')
    done()
  })

  it('should convert 1000000 to eine Million', function (done) {
    numberToText.convertToText('1000000', { language: 'de' }).should.equal('eine Million')
    numberToText.convertToText(1000000, { language: 'de' }).should.equal('eine Million')
    done()
  })

  it('should convert 10000000 to zehn Millionen', function (done) {
    numberToText.convertToText('10000000', { language: 'de' }).should.equal('zehn Millionen')
    numberToText.convertToText(10000000, { language: 'de' }).should.equal('zehn Millionen')
    done()
  })

  it('should convert 200000000 to zweihundert Millionen', function (done) {
    numberToText.convertToText('200000000', { language: 'de' }).should.equal('zweihundert Millionen')
    numberToText.convertToText(200000000, { language: 'de' }).should.equal('zweihundert Millionen')
    done()
  })

  it('should convert 223578211 to zweihundertdreiundzwanzig Millionen fünfhundertachtundsiebzigtausendzweihundertelf', function (done) {
    numberToText.convertToText('223578211', { language: 'de' }).should.equal('zweihundertdreiundzwanzig Millionen fünfhundertachtundsiebzigtausendzweihundertelf')
    numberToText.convertToText(223578211, { language: 'de' }).should.equal('zweihundertdreiundzwanzig Millionen fünfhundertachtundsiebzigtausendzweihundertelf')
    done()
  })

  it('should convert 1000000000 to eine Milliarde', function (done) {
    numberToText.convertToText('1000000000', { language: 'de' }).should.equal('eine Milliarde')
    numberToText.convertToText(1000000000, { language: 'de' }).should.equal('eine Milliarde')
    done()
  })

  it('should convert 5000000000 to fünf Milliarden', function (done) {
    numberToText.convertToText('5000000000', { language: 'de' }).should.equal('fünf Milliarden')
    numberToText.convertToText(5000000000, { language: 'de' }).should.equal('fünf Milliarden')
    done()
  })

  it('should convert 51234567891 to einundfünfzig Milliarden zweihundertvierunddreißig Millionen fünfhundertsiebenundsechzigtausendachthunderteinundneunzig', function (done) {
    numberToText.convertToText('51234567891', { language: 'de' }).should.equal('einundfünfzig Milliarden zweihundertvierunddreißig Millionen fünfhundertsiebenundsechzigtausendachthunderteinundneunzig')
    numberToText.convertToText(51234567891, { language: 'de' }).should.equal('einundfünfzig Milliarden zweihundertvierunddreißig Millionen fünfhundertsiebenundsechzigtausendachthunderteinundneunzig')
    done()
  })

  it('should convert 1000000000000 to eine Billion', function (done) {
    numberToText.convertToText('1000000000000', { language: 'de' }).should.equal('eine Billion')
    numberToText.convertToText(1000000000000, { language: 'de' }).should.equal('eine Billion')
    done()
  })

  it('should convert 1000000000001 to eine Billion eins', function (done) {
    numberToText.convertToText('1000000000001', { language: 'de' }).should.equal('eine Billion eins')
    numberToText.convertToText(1000000000001, { language: 'de' }).should.equal('eine Billion eins')
    done()
  })

  it('should convert 712217897881901 to siebenhundertzwölf Billionen zweihundertsiebzehn Milliarden achthundertsiebenundneunzig Millionen achthunderteinundachtzigtausendneunhunderteins', function (done) {
    numberToText.convertToText('712217897881901', { language: 'de' }).should.equal('siebenhundertzwölf Billionen zweihundertsiebzehn Milliarden achthundertsiebenundneunzig Millionen achthunderteinundachtzigtausendneunhunderteins')
    numberToText.convertToText(712217897881901, { language: 'de' }).should.equal('siebenhundertzwölf Billionen zweihundertsiebzehn Milliarden achthundertsiebenundneunzig Millionen achthunderteinundachtzigtausendneunhunderteins')
    done()
  })

  it('should convert 1000000000000000 to eine Billiarde', function (done) {
    numberToText.convertToText('1000000000000000', { language: 'de' }).should.equal('eine Billiarde')
    numberToText.convertToText(1000000000000000, { language: 'de' }).should.equal('eine Billiarde')
    done()
  })

  it('should convert 719765432112345645 to siebenhundertneunzehn Billiarden siebenhundertfünfundsechzig Billionen vierhundertzweiunddreißig Milliarden einhundertzwölf Millionen dreihundertfünfundvierzigtausendsechshundertfünfundvierzig', function (done) {
    numberToText.convertToText('719765432112345645', { language: 'de' }).should.equal('siebenhundertneunzehn Billiarden siebenhundertfünfundsechzig Billionen vierhundertzweiunddreißig Milliarden einhundertzwölf Millionen dreihundertfünfundvierzigtausendsechshundertfünfundvierzig')
    // numberToText.convertToText(719765432112345645, { language: "de" }).should.equal("siebenhundertneunzehn Billiarden siebenhundertfünfundsechzig Billionen vierhundertzweiunddreißig Milliarden einhundertzwölf Millionen dreihundertfünfundvierzigtausendsechshundertfünfundvierzig")
    done()
  })

  it('should convert 1000000000000000000 to eine Trillion', function (done) {
    numberToText.convertToText('1000000000000000000', { language: 'de' }).should.equal('eine Trillion')
    numberToText.convertToText(1000000000000000000, { language: 'de' }).should.equal('eine Trillion')
    done()
  })

  it('should convert 8569765432112345645 to acht Trillionen fünfhundertneunundsechzig Billiarden siebenhundertfünfundsechzig Billionen vierhundertzweiunddreißig Milliarden einhundertzwölf Millionen dreihundertfünfundvierzigtausendsechshundertfünfundvierzig', function (done) {
    numberToText.convertToText('8569765432112345645', { language: 'de' }).should.equal('acht Trillionen fünfhundertneunundsechzig Billiarden siebenhundertfünfundsechzig Billionen vierhundertzweiunddreißig Milliarden einhundertzwölf Millionen dreihundertfünfundvierzigtausendsechshundertfünfundvierzig')
    done()
  })
})
