'use strict'
let url = (process.argv[2] && process.argv[2] == 'lims') ? 'lims' : '';
module.exports = {
  NODE_ENV: '"production"',
  URL: '"' + url + '"'
}
