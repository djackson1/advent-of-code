const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))


let n = 0
const parseEntries = entries => {
  console.log(`PARSE (SIZE ${entries.length}) [N = ${n++}] {{${entries}}}`)
  const childCount = Number(entries[0])
  const metadataCount = Number(entries[1])
  let rest = entries.slice(2)

  if(childCount === 0) {
    const metadata = rest.slice(0, metadataCount)
    const r2 = rest.slice(metadataCount)
    return {
      children: [],
      metadata,
      rest: r2
    }
  }

  const children = [] 
  for(var i=0; i<childCount; i++){
    const child = parseEntries(rest)

    children.push({ 
      children: child.children,
      metadata: child.metadata,
      rest: ''
    })

    rest = child.rest
  }

  const m2 = rest.slice(0, metadataCount)
  const r2 = rest.slice(metadataCount)

  return {
    children,
    metadata: m2,
    rest: r2
  }
}

const metadataCount = leaf => {
  let value = leaf.metadata.reduce((acc, v) => (acc + Number(v)), 0)

  for(var i=0; i < leaf.children.length; i++){
    value += metadataCount(leaf.children[i])
  }

  return value
}

const a = (input) => {
  const numbers = input.split(' ')

  const tree = parseEntries(numbers)
  
  return metadataCount(tree)
}

const b = (input) => {
  const split = parseFile(input)

  return split
}

module.exports = {
  a,
  b
}
