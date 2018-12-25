const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))


describe(`day ${DAY_NUMBER}`, () => {
  describe('part a examples', () => {
    it('example 1', () => {
      const inputs = [
        'abcdef',
        'bababc',
        'abbcde',
        'abcccd',
        'aabcdd',
        'abcdee',
        'ababab'
      ]
      expect(solutions.a(inputs.join('\n'))).to.equal(12)
    })
  })

  describe('part b', () => {
    it('example 1', () => {
      const inputs = [
        'abcde',
        'fghij',
        'klmno',
        'pqrst',
        'fguij',
        'axcye',
        'wvxyz'
      ]
      expect(solutions.b(inputs.join('\n'))).to.equal('fgij')
    })
  })

  //   it('example 2', () => {
  //     expect(solutions.b('+3\n+3\n+4\n-2\n-4')).to.equal(10)
  //   })

  //   it('example 3', () => {
  //     expect(solutions.b('-6\n+3\n+8\n+5\n-6')).to.equal(5)
  //   })

  //   it('example 4', () => {
  //     expect(solutions.b('+7\n+7\n-2\n-7\n-4')).to.equal(14)
  //   })
  // })
})