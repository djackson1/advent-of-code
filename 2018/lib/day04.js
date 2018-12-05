
const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))

const lpad = n => n < 10 ? `0${n}` : n

const getTimeSpentSleeping = (input) => {
  const split = parseFile(input).sort()

  const timeSleeping = {}
  const minuteAsleep = {}
  let id, asleep
  
  split.forEach(row => {
    const [ time, commandString ] = row.split(']')
    const timestamp = time.split(':')[1].substr(0, 2)
    const commands = commandString.trim().split(' ')

    if(commands[0] === 'Guard') {
      id = commands[1].substr(1)
    } else if (commands[0] === 'falls') {
      asleep = timestamp 
    } else if (commands[0] === 'wakes') {
      
      for(let i = asleep; i < timestamp; i++){
        if(!timeSleeping[id]) timeSleeping[id] = 0
        
        if(!minuteAsleep[`${id}.${i}`]) minuteAsleep[`${id}.${i}`] = 0

        timeSleeping[id]++
        minuteAsleep[`${id}.${i}`]++
      }
    }
  })

  return {
    timeSleeping,
    minuteAsleep
  }
}

const a = (input) => {
  const { timeSleeping, minuteAsleep } = getTimeSpentSleeping(input)
  
  const guard = Object.entries(timeSleeping).sort((a, b) => b[1] - a[1])[0][0]

  const minute = Object
    .entries(minuteAsleep)
    .filter(([k,v]) => k.includes(`${guard}.`))
    .sort((a, b) => b[1] - a[1])[0][0].split('.')[1]

  return guard * minute
}

const b = (input) => {
  const { minuteAsleep } = getTimeSpentSleeping(input)

  const [ guard, minute ] = Object
    .entries(minuteAsleep)
    .sort((a, b) => b[1] - a[1])[0][0].split('.')

  return guard * minute
}

module.exports = {
  a,
  b
}
