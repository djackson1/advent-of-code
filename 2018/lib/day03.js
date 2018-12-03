const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))


const extractClaims = s => {
  const split = s.split('@')
  const id = Number(split[0].substr(1))
  const [ coords, size ] = split[1].split(':')
  const coordsSplit = coords.split(',')
  const sizeSplit = size.split('x')

  
  return {
    x: Number(coordsSplit[0]),
    y: Number(coordsSplit[1]),
    w: Number(sizeSplit[0]),
    h: Number(sizeSplit[1]),
    id
  }
}

const a = (input) => {
  const split = parseFile(input)

  const grid = {}

  split.forEach(s => {
    const { x, y, w, h } = extractClaims(s)

    for( let i = x; i < x + w; i++ ){
      for( let j = y; j < y + h; j++ ){
        const key = `${i}.${j}`
        if(!grid[key]) grid[key] = 0

        grid[key]++
      } 
    }
  })

  return Object
    .values(grid)
    .filter(v => v > 1)
    .length
}

const b = (input) => {
  const split = parseFile(input)

  const grid = {}

  split.forEach(s => {
    const { x, y, w, h, id } = extractClaims(s)

    for( let i = x; i < x + w; i++ ){
      for( let j = y; j < y + h; j++ ){
        const key = `${i}.${j}`
        if(!grid[key]) grid[key] = { ids: [], count: 0 }

        grid[key].ids.push(id)
        grid[key].count++
      } 
    }
  })

  const nonOverlapping = split
    .reduce((acc, v, idx) => {
      acc[idx + 1] = idx + 1
      return acc
    }, {})

  Object
    .values(grid)
    .map(({ ids }) => {
      if(ids.length > 1) {
        ids.forEach(id => {
          delete nonOverlapping[id]
        })
      }
    })

  return Object.values(nonOverlapping)[0]
}

module.exports = {
  a,
  b
}