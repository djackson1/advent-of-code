const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))


const a = (input) => {
  const rows = parseFile(input)

  // console.log('rows', rows)

  const steps = []
  const requiredSteps = {}

  rows.forEach(s => {
    const split = s.split(' ')

    const requiredStep = split[1]
    const nextStep = split[7]

    if(!steps.includes(requiredStep)) steps.push(requiredStep)  
    if(!steps.includes(nextStep)) steps.push(nextStep)  
    
    if(!requiredSteps[requiredStep]) requiredSteps[requiredStep] = []
    if(!requiredSteps[nextStep]) requiredSteps[nextStep] = []
    requiredSteps[nextStep].push(requiredStep)
  })

  // console.log('steps', steps)
  // console.log('requiredSteps', requiredSteps)

  let stepString = ''

  for(var i=0; i<steps.length; i++){
    // console.log(`STEP ====== ${i}`)
    // console.log('requiredSteps', requiredSteps)
    const entries = Object.entries(requiredSteps)

    const zeroStepsLeft = entries
      .filter(([k, v]) => v.length === 0)
      .sort((a,b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
    // console.log('zeroStepsLeft', zeroStepsLeft)

    const nextStep = zeroStepsLeft[0][0]
    // console.log('nextStep', nextStep)

    delete requiredSteps[nextStep]

    steps.forEach(step => {
      // console.log('ZZ', requiredSteps, nextS)
      if(!requiredSteps[step]) return 

      // console.log(' requiredSteps[nextStep]', requiredSteps[step])

      requiredSteps[step] = requiredSteps[step].filter(s => s !== nextStep)
    })

    stepString += nextStep

  }
  
  return stepString
}

const b = (input) => {
  const split = parseFile(input)

  return split
}

module.exports = {
  a,
  b
}
