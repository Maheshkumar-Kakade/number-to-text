const Converter = require('./lib/Converter')

/** Holds every registered language converter */
const container = {}

class NumberToText {
  constructor () {
    /** Expose the base Converter so language files can `new Converter()` */
    this.Converter = Converter
  }

  /**
   * Convert a number into its written‑out text form.
   *
   * @param {string|number} num       The number to convert.
   * @param {object}        [options] Optional settings:
   *                                  { language: 'en-us', separator: ',', case: 'titleCase' }.
   *                                  Supported cases: "titleCase", "lowerCase", "upperCase".
   * @returns {string}                The number written in words.
   */
  convertToText (num, options = {}) {
    // Use 'en-us' as the default language if none is provided.
    const language = (options.language || 'en-us').toLowerCase()

    if (!Object.prototype.hasOwnProperty.call(container, language)) {
      throw new Error(`converter for language "${language}" not found.`)
    }

    return container[language].convertToText(num, options)
  }

  /**
   * Register (add) a new language converter.
   *
   * @param {string}    language      Language code, e.g. 'fr', 'en-us'.
   * @param {Converter} langConverter An instance of a Converter subclass.
   * @returns {boolean}               true if added, false if the language already exists.
   */
  addConverter (language, langConverter) {
    if (Object.prototype.hasOwnProperty.call(container, language)) return false

    if (!(langConverter instanceof Converter)) {
      throw new Error('language converter is not instance of Converter')
    }

    container[language] = langConverter
    return true
  }
}

module.exports = new NumberToText()
