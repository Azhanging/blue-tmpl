
const path = require('path');

class Util {
  resolve(dir) {
    return path.join(__dirname, '..', dir);
  }
}

module.exports = new Util();