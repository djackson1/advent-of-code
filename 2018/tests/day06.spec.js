const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  describe('part a examples', () => {
    const coords = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9"

    it(`example 1`, () => {
      expect(solutions.a(coords)).to.equal(17)
    })
  })

  // describe('part b examples', () => {
  //   const examples = [
  //     // { input: 'aA', result: 0 },
  //     // { input: 'abBA', result: 0 },
  //     // { input: 'abAB', result: 4 },
  //     // { input: 'aabAAB', result: 6 },
  //     { input: 'dabAcCaCBAcCcaDA', result: 4 },
  //   ]

  //   examples.forEach(({ input, result}, idx) => {
  //     it(`example ${idx + 1}`, () => {
  //       expect(solutions.b(input)).to.equal(result)
  //     })
  //   })
  // })
})