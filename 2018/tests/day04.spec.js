const chai = require('chai')
const expect = chai.expect
const path = require('path')
const DAY_NUMBER = path.basename(__filename).substr(3, 2)
const solutions = require(path.resolve(__dirname, `../lib/day${DAY_NUMBER}`))

describe(`day ${DAY_NUMBER}`, () => {
  const inputs = [
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-05 00:55] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-04 00:02] Guard #99 begins shift'
  ]

  describe('part a examples', () => {
    it('example 1', () => {
      expect(solutions.a(inputs.join('\n'))).to.equal(240)
    })
  })

  describe('part b examples', () => {
    it('example 1', () => {
      expect(solutions.b(inputs.join('\n'))).to.equal(4455)
    })
  })
})