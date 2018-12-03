const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))

const containsDoublesAndTriples = input => {
  const counters = input
    .split('')
    .reduce((acc, letter) => {
      if(!acc[letter]) acc[letter] = 0

      acc[letter]++

      return acc
    }, {})

  return Object
    .values(counters)
    .filter(n => (n === 2 || n === 3))
    .reduce((acc, n) => {
      acc[n] = 1
      return acc
    }, {})
}

const a = (input) => {
  const split = parseFile(input)

  const doublesAndTriples = split.reduce((acc, s) => {
    const counts = containsDoublesAndTriples(s)

    return {
      2: acc[2] + (counts[2] || 0),
      3: acc[3] + (counts[3] || 0),
    }
  }, { 
    2: 0, 
    3: 0 
  })

  return doublesAndTriples[2] * doublesAndTriples[3]
}

const getCommonChars = (a, b) => {
  const commonChars = [] 

  for ( let i = 0; i < a.length; i++ ){
    if(a[i] === b[i]) {
      commonChars.push(a[i])
    }
  }

  return commonChars
}

const b = (input) => {
  const split = parseFile(input)

  for( let i = 0; i < split.length; i++ ){
    for( let j = i + 1; j < split.length; j++ ){
      const s1 = split[i]
      const s2 = split[j]

      const commonChars = getCommonChars(s1, s2)

      if(commonChars.length === s1.length - 1) {
        return commonChars.join('')
      }
    }
  }
}

module.exports = {
  a,
  b
}