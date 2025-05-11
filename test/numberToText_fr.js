/* eslint-env mocha */
// ---------------------------------------------------------------------------
//  FR‑FR converter – extended test‑suite (integers + decimals)
// ---------------------------------------------------------------------------

const numberToText = require('../index')
require('../converters/fr') // make sure the converter is loaded
require('should')

// Helper: assert that a French rendering matches the expected literal
function expectFR (num, literal, opts = {}) {
  numberToText.convertToText(num, { language: 'fr', ...opts }).should.equal(literal)
}

describe('French number‑to‑text conversion (fr)', function () {
  // -----------------------------------------------------------------------
  //  BASIC VALUES
  // -----------------------------------------------------------------------
  it('converts 0 → "Zéro" (all cases)', function () {
    expectFR('0', 'Zéro')
    expectFR(0, 'Zéro')
    expectFR(0, 'ZÉRO', { case: 'upperCase' })
  })

  it('converts 1 → "Un"', () => expectFR(1, 'Un'))
  it('converts 14 → "Quatorze"', () => expectFR(14, 'Quatorze'))
  it('converts 23 → "Vingt Trois"', () => expectFR(23, 'Vingt Trois'))

  // -----------------------------------------------------------------------
  //  THOUSANDS – "Mille" special case
  // -----------------------------------------------------------------------
  it('converts 1000 → "Mille"', () => expectFR(1000, 'Mille'))
  it('converts 1004 → "Mille, Quatre"', () => expectFR(1004, 'Mille, Quatre'))
  it('converts 1020 → "Mille, Vingt"', () => expectFR(1020, 'Mille, Vingt'))
  it('converts 2000 → "Deux Mille"', () => expectFR(2000, 'Deux Mille'))

  // -----------------------------------------------------------------------
  //  DECIMALS – exhaustive coverage
  // -----------------------------------------------------------------------
  it('converts 3,14 → "Trois Virgule Quatorze"', () => expectFR('3,14', 'Trois Virgule Quatorze'))

  it('converts 3.14 (dot separator) identically', () => expectFR(3.14, 'Trois Virgule Quatorze'))

  it('converts 0,75 → "Zéro Virgule Soixante Quinze"', () =>
    expectFR('0,75', 'Zéro Virgule Soixante Quinze'))

  it('converts 12,5 → "Douze Virgule Cinq"', () => expectFR('12,5', 'Douze Virgule Cinq'))

  it('converts 12,50 → "Douze Virgule Cinquante"', () =>
    expectFR('12,50', 'Douze Virgule Cinquante'))

  it('converts 1,05 → "Un Virgule Cinq"', () => expectFR('1,05', 'Un Virgule Cinq'))

  it('converts 1000,08 → "Mille Virgule Huit"', () => expectFR('1000,08', 'Mille Virgule Huit'))

  it('converts 123 456,007 → "Cent Vingt Trois Mille, Quatre Cent Cinquante Six Virgule Sept"', () =>
    expectFR('123456,007', 'Cent Vingt Trois Mille Quatre Cent Cinquante Six Virgule Sept'))

  it('converts 1 234 567,89 with upperCase option', () =>
    expectFR(
      1234567.89,
      'UN MILLION DEUX CENT TRENTE QUATRE MILLE CINQ CENT SOIXANTE SEPT VIRGULE QUATRE VINGT NEUF',
      { case: 'upperCase' }
    ))

  it('converts 36341,44 → "Trente Six Mille Trois Cent Quarante Un Virgule Quarante Quatre"', () =>
    expectFR('36341,44', 'Trente Six Mille Trois Cent Quarante Un Virgule Quarante Quatre'))

  // -----------------------------------------------------------------------
  //  SIX‑DIGIT EXAMPLE WITH OPTIONS
  // -----------------------------------------------------------------------
  it('converts 123456 with multiple cases & separator=""', function () {
    const base = 'Cent Vingt Trois Mille Quatre Cent Cinquante Six'
    expectFR(123456, base)
    expectFR(123456, base.toLowerCase(), { case: 'lowerCase' })
    expectFR(123456, base.toUpperCase(), { case: 'upperCase' })
    expectFR(123456, base.replace(/, /g, ' '), { separator: '' })
  })

  // -----------------------------------------------------------------------
  //  MILLIONS, BILLIONS, LONG‑SCALE NAMES
  // -----------------------------------------------------------------------
  it('converts 1 234 567 → long form', () =>
    expectFR(1234567, 'Un Million Deux Cent Trente Quatre Mille Cinq Cent Soixante Sept'))

  it('converts 2 000 000 → "Deux Millions"', () => expectFR(2000000, 'Deux Millions'))

  it('converts 1 000 000 000 → "Un Milliard"', () => expectFR(1000000000, 'Un Milliard'))

  it('converts 1 000 000 000 000 → "Mille Milliards"', () =>
    expectFR('1000000000000', 'Mille Milliards'))

  it('converts 1 000 000 000 000 000 → "Un Billiard"', () =>
    expectFR('1000000000000000', 'Un Billiard'))

  // -----------------------------------------------------------------------
  //  COMPLEX 9‑DIGIT NUMBER
  // -----------------------------------------------------------------------
  it('converts 512 345 678 → verbose form', () =>
    expectFR(
      512345678,
      'Cinq Cent Douze Millions Trois Cent Quarante Cinq Mille Six Cent Soixante Dix Huit'
    ))

  // -----------------------------------------------------------------------
  //  MISC OPTIONS
  // -----------------------------------------------------------------------
  it('supports explicit UPPER / lower casing', () => {
    expectFR(25, 'VINGT CINQ', { case: 'upperCase' })
    expectFR(45, 'quarante cinq', { case: 'lowerCase' })
  })

  it('supports separator="" (no comma joins)', () =>
    expectFR(1234, 'Mille Deux Cent Trente Quatre', { separator: '' }))

  // -----------------------------------------------------------------------
  //  ERROR HANDLING
  // -----------------------------------------------------------------------
  it('throws when an unsupported language is requested', () => {
    ;(() => numberToText.convertToText(1, { language: 'xx' })).should.throw()
  })
})
