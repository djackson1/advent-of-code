const path = require('path')
const { parseFile } = require(path.resolve(__dirname, '../utilities/files'))


let n = 0
const parseEntries = entries => {
  console.log(`PARSE (SIZE ${entries.length}) [N = ${n++}] {{}}`)
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

const metadataCount2 = leaf => {
  if(leaf.children.length === 0) {
    return leaf.metadata
  }

  return leaf.metadata.reduce((acc, c) => {
    const c2 = leaf.children[c - 1]

    if(c2) {
      return acc + metadataCount2(c2)
    }
    
    return Number(acc)
  }, 0)
}

const recalculateTree = tree => {
  if(tree.children.length > 0){ 
    for(var i=0; i<tree.children.length; i++) {
      tree.children[i] = recalculateTree(tree.children[i])
    }
    return tree
  } else {
    return {
      children: [],
      metadata: tree.metadata.reduce((acc, a) => (acc + a), 0)
    }
  }
}

const a = (input) => {
  const numbers = input.split(' ')

  const tree = parseEntries(numbers)
  
  return metadataCount(tree)
}

const b = (input) => {
  const numbers = input.split(' ').map(n => Number(n))

  const tree = parseEntries(numbers)

  const tree2 = recalculateTree(tree)
  // console.log('t2', JSON.stringify(tree2, null, 2))

  return metadataCount2(tree)
}

module.exports = {
  a,
  b
}
