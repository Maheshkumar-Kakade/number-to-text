/* eslint-env mocha */
// ---------------------------------------------------------------------------
//  FR‑FR converter – complete test coverage
//  These specs extend the original French suite to cover edge‑cases such as
//  pluralisation, long‑scale names, alternative casings and separator options.
// ---------------------------------------------------------------------------

const numberToText = require('../index')
require('../converters/fr') // ensure the French converter is loaded
require('should')

describe('French number‑to‑text conversion (fr)', function () {
  // -------------------------------------------------------------------------
  //  BASIC VALUES
  // -------------------------------------------------------------------------
  it('converts 0 → “Zéro” (all cases)', function () {
    numberToText.convertToText('0', { language: 'fr' }).should.equal('Zéro')
    numberToText.convertToText(0, { language: 'fr' }).should.equal('Zéro')
    numberToText.convertToText(0, { language: 'fr', case: 'upperCase' }).should.equal('ZÉRO')
  })

  it('converts 1 → “Un”', function () {
    numberToText.convertToText('1', { language: 'fr' }).should.equal('Un')
    numberToText.convertToText(1, { language: 'fr' }).should.equal('Un')
  })

  it('converts 14 → “Quatorze”', function () {
    numberToText.convertToText('14', { language: 'fr' }).should.equal('Quatorze')
    numberToText.convertToText(14, { language: 'fr' }).should.equal('Quatorze')
  })

  it('converts 23 → “Vingt Trois”', function () {
    numberToText.convertToText('23', { language: 'fr' }).should.equal('Vingt Trois')
    numberToText.convertToText(23, { language: 'fr' }).should.equal('Vingt Trois')
  })

  // -------------------------------------------------------------------------
  //  THOUSANDS – “Mille” special‑case (never “Un Mille”)
  // -------------------------------------------------------------------------
  it('converts 1000 → “Mille”', function () {
    numberToText.convertToText(1000, { language: 'fr' }).should.equal('Mille')
  })

  it('converts 1004 → “Mille, Quatre”', function () {
    numberToText.convertToText('1004', { language: 'fr' }).should.equal('Mille, Quatre')
    numberToText.convertToText(1004, { language: 'fr' }).should.equal('Mille, Quatre')
  })

  it('converts 1020 → “Mille, Vingt”', function () {
    numberToText.convertToText('1020', { language: 'fr' }).should.equal('Mille, Vingt')
    numberToText.convertToText(1020, { language: 'fr' }).should.equal('Mille, Vingt')
  })

  it('converts 2000 → “Deux Mille”', function () {
    numberToText.convertToText(2000, { language: 'fr' }).should.equal('Deux Mille')
  })

  // -------------------------------------------------------------------------
  //  SIX‑DIGIT EXAMPLE WITH DIFFERENT CASES & SEPARATORS
  // -------------------------------------------------------------------------
  it('converts 123456 with multiple options', function () {
    const base = 'Cent Vingt Trois Mille, Quatre Cent Cinquante Six'
    numberToText.convertToText(123456, { language: 'fr' }).should.equal(base)
    numberToText
      .convertToText(123456, { language: 'fr', case: 'lowerCase' })
      .should.equal(base.toLowerCase())
    numberToText
      .convertToText(123456, { language: 'fr', case: 'upperCase' })
      .should.equal(base.toUpperCase())
    numberToText
      .convertToText(123456, { language: 'fr', separator: '' })
      .should.equal(base.replace(/, /g, ' '))
  })

  // -------------------------------------------------------------------------
  //  MILLIONS
  // -------------------------------------------------------------------------
  it('converts 1 234 567 → exact long string', function () {
    numberToText
      .convertToText(1234567, { language: 'fr' })
      .should.equal('Un Million, Deux Cent Trente Quatre Mille, Cinq Cent Soixante Sept')
  })

  it('converts 2 000 000 → pluralisation "Deux Millions"', function () {
    numberToText.convertToText(2000000, { language: 'fr' }).should.equal('Deux Millions')
  })

  // -------------------------------------------------------------------------
  //  BILLIONS & ABOVE – LONG‑SCALE NAMES
  // -------------------------------------------------------------------------
  it('converts 1 000 000 000 → “Un Milliard”', function () {
    numberToText.convertToText(1000000000, { language: 'fr' }).should.equal('Un Milliard')
  })

  it('converts 1 000 000 000 000 → “Mille Milliards”', function () {
    numberToText.convertToText('1000000000000', { language: 'fr' }).should.equal('Mille Milliards')
  })

  it('converts 1 000 000 000 000 000 → “Un Billiard”', function () {
    numberToText.convertToText('1000000000000000', { language: 'fr' }).should.equal('Un Billiard')
  })

  // -------------------------------------------------------------------------
  //  COMPLEX 9‑DIGIT NUMBER
  // -------------------------------------------------------------------------
  it('converts 512 345 678 → long descriptive string', function () {
    const expected =
      'Cinq Cent Douze Millions, Trois Cent Quarante Cinq Mille, Six Cent Soixante Dix Huit'
    numberToText.convertToText(512345678, { language: 'fr' }).should.equal(expected)
  })

  // -------------------------------------------------------------------------
  //  MISCELLANEOUS OPTIONS
  // -------------------------------------------------------------------------
  it('supports UPPER / lower casing', function () {
    numberToText.convertToText(25, { language: 'fr', case: 'upperCase' }).should.equal('VINGT CINQ')
    numberToText
      .convertToText(45, { language: 'fr', case: 'lowerCase' })
      .should.equal('quarante cinq')
  })

  it('joins without separator when separator=""', function () {
    numberToText
      .convertToText(1234, { language: 'fr', separator: '' })
      .should.equal('Mille Deux Cent Trente Quatre')
  })

  // -------------------------------------------------------------------------
  //  ERROR HANDLING
  // -------------------------------------------------------------------------
  it('throws when an unsupported language is requested', function () {
    ;(() => numberToText.convertToText(1, { language: 'xx' })).should.throw()
  })
})
