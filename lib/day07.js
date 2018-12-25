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

const assignWorkers = (workerSchedules, requiredSteps, steps, extraTimePerTask) => {
  steps.forEach(step => {
    for(var i=0; i<workerSchedules.length; i++) {
      if(workerSchedules[i][1] === 0) {
        console.log('ASSIGNED WORKER', i)
        const stepCost = step.charCodeAt(0) - '@'.charCodeAt(0) + extraTimePerTask
        workerSchedules[i] = [step, stepCost]

        delete requiredSteps[step]
        break;
      }
    }
  })
}

const removeStepFromRequired = (requiredSteps, step) => {
  // console.log('ZZ', requiredSteps, step)
  Object
    .entries(requiredSteps)
    .forEach(([k, v]) => {
      requiredSteps[k] = requiredSteps[k].filter(s => s !== step)
    })
}

const b = (input, extraTimePerTask = 60, workers = 5) => {
  const rows = parseFile(input)

  let workerSchedules = Array.apply(null, Array(workers)).map(() => (['', 0]))
  // console.log('workerSchedules', workerSchedules)

  const requiredSteps = {}

  rows.forEach(s => {
    const split = s.split(' ')

    const requiredStep = split[1]
    const nextStep = split[7]

    if(!requiredSteps[requiredStep]) requiredSteps[requiredStep] = []
    if(!requiredSteps[nextStep]) requiredSteps[nextStep] = []
    requiredSteps[nextStep].push(requiredStep)
  })

  const workersWorking = workers => {
    console.log('WW', workers)
    for(var i=0; i<workers.length; i++){ 
      if(workers[i][1] > 0) {
        console.log('Y')
        return true
      }
    }
    console.log('N')
    return false
  }

  let stepString = ''
  let i = 0
  for(; (workersWorking(workerSchedules) || Object.keys(requiredSteps).length > 0); i++){
    console.log(`STEP ===== ${i}`)
    workerSchedules = workerSchedules.map(([step, cost]) => {
      console.log('S', step,cost)
      if(cost > 0) {

        if(cost === 1) {
          stepString += step
          removeStepFromRequired(requiredSteps, step)
          return ['', 0]
        } else {
          return [step, cost - 1]
        }
      }
      return [step, cost]
    })
    console.log('WORKER SCHEDULES', workerSchedules)
    console.log('REQUIRED STEPS', requiredSteps)

    const zeroStepsLeft = Object
      .entries(requiredSteps)
      .filter(([k, v]) => v.length === 0)
      .map(([k ,v]) => k)
      .sort((a,b) => a.charCodeAt(0) - b.charCodeAt(0))
    console.log('zeroStepsLeft', zeroStepsLeft)

    if(zeroStepsLeft.length > 0) {
      assignWorkers(workerSchedules, requiredSteps, zeroStepsLeft, extraTimePerTask)
    }

    if(Object.keys(requiredSteps).length === 0) {

    }
    

    console.log('XYZ',i, '-', Object.keys(requiredSteps).length)
  }

  return i - 1
}

module.exports = {
  a,
  b
}
