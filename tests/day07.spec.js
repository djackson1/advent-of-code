const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  const inputs = [
    'Step C must be finished before step F can begin.',
    'Step C must be finished before step A can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.',
  ]

  describe('part a examples', () => {
    it('example 1', () => {
      expect(solutions.a(inputs.join('\n'))).to.equal('CABDFE')
    })
  })

  describe('part b examples', () => {
    it('example 1', () => {
      expect(solutions.b(inputs.join('\n'), 0, 2)).to.equal(15)
    })
  })
})