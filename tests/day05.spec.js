const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  describe('part a examples', () => {
    const examples = [
      { input: 'aA', result: 0 },
      { input: 'abBA', result: 0 },
      { input: 'abAB', result: 4 },
      { input: 'aabAAB', result: 6 },
      { input: 'dabAcCaCBAcCcaDA', result: 10 },
    ]

    examples.forEach(({ input, result}, idx) => {
      it(`example ${idx + 1}`, () => {
        expect(solutions.a(input)).to.equal(result)
      })
    })
  })

  describe('part b examples', () => {
    const examples = [
      // { input: 'aA', result: 0 },
      // { input: 'abBA', result: 0 },
      // { input: 'abAB', result: 4 },
      // { input: 'aabAAB', result: 6 },
      { input: 'dabAcCaCBAcCcaDA', result: 4 },
    ]

    examples.forEach(({ input, result}, idx) => {
      it(`example ${idx + 1}`, () => {
        expect(solutions.b(input)).to.equal(result)
      })
    })
  })
})

/*
In aA, a and A react, leaving nothing behind.
In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.
In abAB, no two adjacent units are of the same type, and so nothing happens.
In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.*/