

const parseFile = (input) => {
  return input
    .split('\n')
    .filter(n => n)
}

const extractSignAndNumber = str => {
  return {
    sign: str.subtr(0, 1),
    number: Number(str.subtr(1))
  }
}

const a = (input) => {
  const split = parseFile(input)

  return split.reduce((acc, n) => {
    const { sign, number } = extractSignAndNumber(n)

    if(sign === '+') return acc + number
    if(sign === '-') return acc - number
  }, 0)
}

const b = (input) => {
  const split = parseFile(input)

  let lastFrequency = 0
  const storedFrequencies = { 0: true }

  // not sure how many times we'll loop, so just make this a big value
  for( let i = 0; i < 1000000; i++ ){
    const value = split[i % split.length]
    const { sign, number } = extractSignAndNumber(value)

    const newFrequency = sign === '+' 
      ? lastFrequency + number 
      : lastFrequency - number

    // if we've hit a stored value return it
    if(storedFrequencies[newFrequency]) {
      return newFrequency
    }

    // update map of frequencies and last value
    storedFrequencies[newFrequency] = true
    lastFrequency = newFrequency
  }

  return -999999
}

module.exports = {
  a,
  b
}