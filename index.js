const Converter = require('./lib/Converter')
const container = {}
class NumberToText {
  /**
  *  convert number to text
  *  @param {string or number} num
  *  @param {object } options { language : "en-us" ,separator :"," ,case : "titleCase" } current support languages en-us, en-in annd de and cases are "titleCase" , "lowerCase" , "upperCase". default is { language : "en-us" ,separator :"," ,case : "titleCase" }
  */
  constructor () {
    this.Converter = Converter
  }
  convertToText (num, options) {
    options = options || {}
    const language = (options.language || 'en-us').toLowerCase()
    if (container.hasOwnProperty(language)) {
      return container[language].convertToText(num, options)
    } else {
      throw new Error('converter for language "' + language + '" not found.')
    }
  }

  addConverter (language, langConverter) {
    if (!container.hasOwnProperty(language)) {
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
