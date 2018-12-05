const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))


const a = (input) => {
  const split = parseFile(input)
  
  return split
}

const b = (input) => {
  const split = parseFile(input)

  return split
}

module.exports = {
  a,
  b
}
