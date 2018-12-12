const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))

const drawGrid = grid => {
  for(let y = 0; y <= grid.maxY; y++){
    let s = ''
    for(let x = 0; x <= grid.maxX; x++){
      const item = grid[`${x}.${y}`]
      if(item){
        s += String(item)
      } else {
        s += '.'
      }
    }
    
    console.log(s)
  }
}

const getClosestPoint = ({ x: x2, y: y2 }, points) => {
  const distanceToPoints = {}

  points.forEach(({ x: x1, y: y1, id }) => {
    const x = Math.abs(x2 - x1)
    const y = Math.abs(y2 - y1)
    const dist = x + y

    if(!distanceToPoints[dist]) distanceToPoints[dist] = []
    distanceToPoints[dist].push(id)
  })

  const lowestDist = Object.entries(distanceToPoints)[0]

  if(lowestDist[1].length === 1) { 
    return lowestDist[1]
  } 

  return lowestDist[1].length === 1
    ? lowestDist[1]
    : -1
}

const fillGrid = grid => {
  for(let y = 0; y <= grid.maxY; y++){
    for(let x = 0; x <= grid.maxX; x++){
      const key = `${x}.${y}`
      const item = grid[key]

      if(!item) {
        const closestIdToPoint = getClosestPoint({ x, y }, grid.points)

        if(closestIdToPoint !== -1){
          grid[key] = closestIdToPoint
          grid.pointCount[closestIdToPoint]++
        }
      }
    }
  }

  return grid
}

const mostPointsInGridWithEdgesRemoved = grid => {
  const pointsToRemove = {}

  for(let x = 0; x <= grid.maxX; x++){ 
    const key1 = `${x}.0`
    const point1 = grid[key1]
    const key2 = `${x}.${grid.maxY}`
    const point2 = grid[key2]

    pointsToRemove[point1] = true
    pointsToRemove[point2] = true
  }

  for(let y = 0; y <= grid.maxY; y++){ 
    const key1 = `0.${y}`
    const point1 = grid[key1]
    const key2 = `${grid.maxX}.${y}`
    const point2 = grid[key2]

    pointsToRemove[point1] = true
    pointsToRemove[point2] = true
  }

  Object.keys(pointsToRemove).forEach(p => {
    delete grid.pointCount[p]
  })

  return Object
    .entries(grid.pointCount)
    .sort((a, b) => b[1] - a[1])[0][1]
}

const a = (coordsString) => {
  const grid = {
    maxX: 0,
    maxY: 0,
    points: [],
    pointCount: {}
  }

  coordsString
    .split('\n')
    .map((xy, idx) => {
      const id = idx + 1
      const [ x, y ] = xy.split(',').map(n => Number(n))

      if(x > grid.maxX) grid.maxX = x
      if(y > grid.maxY) grid.maxY = y

      grid[`${x}.${y}`] = id

      grid.points.push({ x, y, id })

      grid.pointCount[id] = 1
    })

  return mostPointsInGridWithEdgesRemoved(fillGrid(grid))
}

const b = (input) => {
  const split = parseFile(input)

  return split
}

module.exports = {
  a,
  b
}
