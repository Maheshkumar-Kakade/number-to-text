const numberToText = require('../index')

/**
 * French scale labels – long scale (échelle longue).
 * Index 0 = units (""); 1 = thousand ("Mille"), 2 = million, etc.
 */
const milliers = ['', 'Mille', 'Million', 'Milliard', 'Billion', 'Billiard', 'Trillion']

/**
 * French words for 0–19 (index = numeric value).
 */
const unites = [
  '',
  'Un',
  'Deux',
  'Trois',
  'Quatre',
  'Cinq',
  'Six',
  'Sept',
  'Huit',
  'Neuf',
  'Dix',
  'Onze',
  'Douze',
  'Treize',
  'Quatorze',
  'Quinze',
  'Seize',
  'Dix Sept',
  'Dix Huit',
  'Dix Neuf'
]

/**
 * French words for multiples of ten (index = tens digit).
 * Slots 0–1 stay empty so that index matches the digit.
 */
const dizaines = [
  '',
  '',
  'Vingt',
  'Trente',
  'Quarante',
  'Cinquante',
  'Soixante',
  'Soixante Dix',
  'Quatre Vingt',
  'Quatre Vingt Dix'
]

const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFunctions = [s => s, s => s.toLowerCase(), s => s.toUpperCase()]

class FrConverter extends numberToText.Converter {
  constructor () {
    super()
    // Register this converter under the language code "fr".
    numberToText.addConverter('fr', this)
  }

  /**
   * Convert a number into French words.
   *
   * @param {string|number} num   The number to convert.
   * @param {object}        [options]
   *                              { separator: ',', case: 'titleCase' }
   *                              separator: comma by default ("" to disable)
   *                              case: one of cases[]
   * @returns {string}
   */
  convertToText (num, options = {}) {
    // Normalise options
    options.separator = options.separator === '' ? '' : options.separator || ','
    if (!cases.includes(options.case)) options.case = cases[0]
    const caseFn = caseFunctions[cases.indexOf(options.case)]

    // Always work with a string
    if (typeof num === 'number' || num instanceof Number) num = num.toString()
    if (num === '0') return caseFn('Zéro')

    // Split the number into chunks of max 3 digits from the right
    const chunks = num.match(/.{1,}(?=(...){5}(...)$)|.{1,3}(?=(...){0,5}$)|.{1,3}$/g)
    const out = []

    chunks.forEach((chunk, i) => {
      const text = this._chunkToText(chunk)
      if (!text) return

      const idx = chunks.length - 1 - i // magnitude index
      const label = milliers[idx]

      // Special case for "Mille": use "Mille" not "Un Mille"
      if (label === 'Mille' && text === 'Un') {
        out.push('Mille')
        return
      }

      // 1 000 000 000 000 → "Mille Milliards" in long scale French
      if (label === 'Billion' && text === 'Un') {
        out.push('Mille Milliards')
        return
      }

      if (label) {
        const plural = text !== 'Un' && label !== 'Mille' ? 's' : ''
        out.push(`${text} ${label}${plural}`)
      } else {
        out.push(text)
      }
    })

    return caseFn(out.join(options.separator + ' '))
  }

  /**
   * Convert a 1‑to‑3‑digit chunk into words.
   *
   * @param {string} chunk Three‑digit string (may include leading zeros).
   * @returns {string}
   */
  _chunkToText (chunk) {
    const parts = []
    const [c, d, u] = chunk.padStart(3, '0').split('').map(Number)

    // Hundreds
    if (c) {
      if (c > 1) parts.push(unites[c])
      parts.push('Cent')
    }

    // Tens + units
    const last = d * 10 + u
    if (last < 20) {
      if (unites[last]) parts.push(unites[last])
    } else {
      // 70/90 are expressed as 60+10 and 80+10 in French
      if (d === 7 || d === 9) {
        parts.push(dizaines[d - 1])
        if (unites[10 + u]) parts.push(unites[10 + u])
      } else {
        parts.push(dizaines[d])
        if (u === 1 && d !== 8) parts.push('et Un')
        else if (unites[u]) parts.push(unites[u])
      }
    }

    return parts.join(' ')
  }
}

module.exports = new FrConverter()
