const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'

  describe('part a examples', () => {
    it('example 1', () => {
      expect(solutions.a(input)).to.equal(138)
    })
  })

  describe('part b examples', () => {
    it('example 1', () => {
      expect(solutions.b(input)).to.equal(66)
    })
  })
})