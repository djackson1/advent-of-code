const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))

const drawGrid = (grid, { x1, y1, x2, y2}) => {
  for(let y = y1; y < y2; y++){
    let str = ''
    for(let x = x1; x < x2; x++){
      const key = `${x}.${y}`
      if(grid[key]){
        const val = grid[key]

        if(val) {
          // console.log('v',)
          str += String(val)
        }

        // if(val === )
      } else {
        str += '.'
      }
      //  && grid[x][y] !== 'X') {
      //   console.log('.')
      // }
    }
    
    console.log(str)
  }
}

const a = (coordsString) => {
// console.log('coordsString', coordsString)

  const coordXYs = coordsString.split('\n')
// console.log('coordXYs', coordXYs)

  let locationsToTest = coordXYs
    .map((str, id) => {
      const coords = str.split(',').map(s => s.trim())
      return { x: Number(coords[0]), y: Number(coords[1]), id: Number(id + 1) }
    })
  console.log('locationsToTest', locationsToTest)

  const grid = {}

  const idsWithSquares = {}

  // iterate
  for(let i = 0; i < 1000; i++) {
    console.log('loop', i)
    const newGrid = {}
    const newLocObj = {}
    const newLocationsToTest = []

    locationsToTest.forEach(({ x, y, id }) => {
      const key = `${x}.${y}`

      // if the square was free before last iteration
      if(!grid[key]) {
        if(newGrid[key] && newGrid[key] !== id) {
          // someone elses square
        } else {
          newGrid[key] = id

          newLocObj[`${x-1}.${y}`] = id
          newLocObj[`${x+1}.${y}`] = id
          newLocObj[`${x}.${y+1}`] = id
          newLocObj[`${x}.${y-1}`] = id

          // newLocationsToTest.push({ x: x - 1, y, id })
          // newLocationsToTest.push({ x: x + 1, y, id })
          // newLocationsToTest.push({ x, y: y + 1, id })
          // newLocationsToTest.push({ x, y: y  - 1, id })
        }
      }
    })

    Object
      .entries(newGrid)
      .forEach(([key, id]) => {
        grid[key] = id

        if(!idsWithSquares[id]) idsWithSquares[id] = 0
        idsWithSquares[id]++
      })
    
    locationsToTest = newLocationsToTest
  }

  
  drawGrid(grid, { x1: 0, y1: 0, x2: 10, y2: 10 })
  
  console.log('idsWithSquares', idsWithSquares)

  const validAreas = locationsToTest
    .forEach(({ id }) => (delete idsWithSquares[id]))

  
  const x = Object
    .entries(idsWithSquares)
    .sort(([ka, va], [kb, vb]) => vb - va )//[0][1]

  console.log('x', x)
    // .map(({ id }) => id)
    // .reduce((acc, id) => {
    //   if(!acc.includes(id)) acc = acc.concat(id)
    //   return acc
    // }, [])

    // .reduce((acc, id) => {
    //   if(!acc[id]) acc[id] = true
    //   return acc
    // }, {})
    // // .entries()

  return x
}

const b = (input) => {
  const split = parseFile(input)

  return split
}

module.exports = {
  a,
  b
}
