const parseFile = (input) => {
  return input
    .split('\n')
    .filter(n => n)
}

module.exports = {
  parseFile
}
