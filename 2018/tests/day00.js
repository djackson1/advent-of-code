const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  describe('part a examples', () => {
    it('example 1', () => {
      const inputs = [
        '1',
        '2'
      ]
      expect(solutions.a(inputs.join('\n'))).to.equal(4)
    })
  })

  // describe('part b examples', () => {
  //   it('example 1', () => {
  //     const inputs = [
  //       '#1 @ 1,3: 4x4',
  //       '#2 @ 3,1: 4x4',
  //       '#3 @ 5,5: 2x2'
  //     ]
  //     expect(solutions.b(inputs.join('\n'))).to.equal(3)
  //   })
  // })
})