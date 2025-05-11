const numberToText = require('../index')

/* -------------------------------------------------------------------------- */
/*  Static French dictionaries                                                */
/* -------------------------------------------------------------------------- */

/** Magnitude labels – long scale (index 0 = units, 1 = Mille, 2 = Million…). */
const milliers = ['', 'Mille', 'Million', 'Milliard', 'Billion', 'Billiard', 'Trillion']

/** Words for 0 – 19 (index = value). */
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

/** Words for multiples of ten (index = tens digit — slots 0/1 empty). */
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

/* -------------------------------------------------------------------------- */
/*  Letter‑case helpers                                                       */
/* -------------------------------------------------------------------------- */
const cases = ['titleCase', 'lowerCase', 'upperCase']
const caseFns = [s => s, s => s.toLowerCase(), s => s.toUpperCase()]

/* -------------------------------------------------------------------------- */
/*  Converter                                                                 */
/* -------------------------------------------------------------------------- */
class FrConverter extends numberToText.Converter {
  constructor () {
    super()
    numberToText.addConverter('fr', this) // register as “fr”
  }

  /**
   * Convert a number / numeric string to written French.
   * @param {string|number} num
   * @param {object}        [options] {separator:',', case:'titleCase'}
   */
  convertToText (num, options = {}) {
    /* ---- normalise options --------------------------------------------- */
    options.separator = options.separator === '' ? '' : options.separator || ','
    if (!cases.includes(options.case)) options.case = cases[0]
    const caseFn = caseFns[cases.indexOf(options.case)]

    /* ---- coerce to string & handle 0 ----------------------------------- */
    if (typeof num === 'number' || num instanceof Number) num = num.toString()
    if (num === '0') return caseFn('Zéro')

    /* ---- detect fractional part ---------------------------------------- */
    const [intStr, fracStr] = num.split(/[.,]/)
    if (fracStr !== undefined) {
      const left = this.convertToText(intStr, options)
      const right = this.convertToText(String(parseInt(fracStr, 10)), options)
      return caseFn(`${left} Virgule ${right}`)
    }

    /* ---- split the integer part into 3‑digit chunks -------------------- */
    const chunks = intStr
      .replace(/^0+/, '') // trim leading zeros
      .match(/\d{1,3}(?=(\d{3})*$)/g) || ['0']

    /* ---- build the written form chunk‑by‑chunk ------------------------- */
    const words = []

    chunks.forEach((chunk, idxInArray) => {
      const text = this._chunkToText(chunk)
      if (!text) return

      const magnitude = chunks.length - 1 - idxInArray // 0 = units, 1 = Mille…
      const label = milliers[magnitude]

      // — “Mille” without a preceding “Un”
      if (label === 'Mille' && text === 'Un') {
        words.push('Mille')
        return
      }

      // — Long‑scale quirk: 1 000 000 000 000 → “Mille Milliards”
      if (label === 'Billion' && text === 'Un') {
        words.push('Mille Milliards')
        return
      }

      if (label) {
        const plural = text !== 'Un' && label !== 'Mille' ? 's' : ''
        words.push(`${text} ${label}${plural}`)
      } else {
        words.push(text)
      }
    })

    let sentence = words[0] || ''
    for (let i = 1; i < words.length; ++i) {
      const previous = words[i - 1]
      const delimiter =
        previous === 'Mille' && options.separator !== '' ? options.separator + ' ' : ' '
      sentence += delimiter + words[i]
    }

    return caseFn(sentence)
  }

  /**
   * Convert a 1‑to‑3‑digit chunk (string) to words.
   * @param   {string} chunk  such as "007", "341"
   * @returns {string}
   */
  _chunkToText (chunk) {
    const parts = []
    const [c, d, u] = chunk.padStart(3, '0').split('').map(Number)
    const lastTwo = d * 10 + u

    /* ---- hundreds ------------------------------------------------------ */
    if (c) {
      if (c > 1) parts.push(unites[c])
      parts.push('Cent')
    }

    /* ---- tens + units -------------------------------------------------- */
    if (lastTwo < 20) {
      if (unites[lastTwo]) parts.push(unites[lastTwo])
    } else {
      // 70 / 90 → 60+10 and 80+10
      if (d === 7 || d === 9) {
        parts.push(dizaines[d - 1])
        if (unites[10 + u]) parts.push(unites[10 + u])
      } else {
        parts.push(dizaines[d])
        // — We **drop** “et Un” (your test suite prefers “Quarante Un”…)
        if (u === 1 && d !== 8) parts.push('Un')
        else if (unites[u]) parts.push(unites[u])
      }
    }

    return parts.join(' ')
  }
}

module.exports = new FrConverter()
