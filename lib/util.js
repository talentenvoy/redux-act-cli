class Util {
  static firstLetterCaps(str) {
    return `${str[0].toUpperCase()}${str.slice(1, str.length).toLowerCase()}`
  }
  static toUpperCase(str) {
    return str.toUpperCase();
  }
}

module.exports = Util;