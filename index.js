const Converter = require('./lib/Converter')
const container = {}
const DEFAULT_LOCALE = 'en-us'
class NumberToText {
  /**
  *  convert number to text
  *  @param {string or number} num
  *  @param {object } options { language : "en-us" ,separator :"," ,case : "titleCase" } current support languages en-us, en-in annd de and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
  */
  constructor () {
    this.Converter = Converter
  }

  convertToText (num, options = {}) {
    const registeredLanguages = Object.keys(container)
    if (!registeredLanguages.length) {
      throw new Error('no converters registered.')
    }

    if (!options.language) {
      options.language = registeredLanguages.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : registeredLanguages[0]
    }

    const language = options.language.toLowerCase()
    if (!Object.prototype.hasOwnProperty.call(container, language)) {
      throw new Error('converter for language "' + language + '" not found.')
    }

    return container[language].convertToText(num, options)
  }

  addConverter (language, langConverter) {
    if (!Object.prototype.hasOwnProperty.call(container, language)) {
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
