class Converter {
  convertToText (options) {
    throw new Error('convertToText is not implemented by ' + this.constructor.name + ' .')
  }
}
module.exports = Converter
