const chai = require('chai')
const expect = chai.expect
const path = require('path')
const solutions = require(path.resolve(__dirname, `../lib/day01`))


describe('day 01', () => {
  describe('part a examples', () => {
    it('example 1', () => {
      expect(solutions.a('+3\n+5')).to.equal(8)
    })
  })

  describe('part b', () => {
    it('example 1', () => {
      expect(solutions.b('+1\n-1')).to.equal(0)
    })

    it('example 2', () => {
      expect(solutions.b('+3\n+3\n+4\n-2\n-4')).to.equal(10)
    })

    it('example 3', () => {
      expect(solutions.b('-6\n+3\n+8\n+5\n-6')).to.equal(5)
    })

    it('example 4', () => {
      expect(solutions.b('+7\n+7\n-2\n-7\n-4')).to.equal(14)
    })
  })
})