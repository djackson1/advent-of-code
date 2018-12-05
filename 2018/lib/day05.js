const processReaction = str => {
  let str2 = str
  let hasChanged = false

  // apparently recursion breaks the maximum call size...
  for(;;) {
    hasChanged = false
    for(var i = 0; i < str2.length - 1; i++){
      const a = str2[i].charCodeAt(0)
      const b = str2[i+1].charCodeAt(0)
      if(Math.abs(a-b) === 32) {
        str2 = str2.substr(0, i) + str2.substr(i + 2)
        hasChanged = true
        break
      }
    }

    if(!hasChanged) {
      return str2
    }
  }
}

const removeAllOfUnitType = (str, type) => {
  return str.split(type).join('')
}

const a = (input) => {
  return processReaction(input).length
}

const b = (input) => {
  // 'a' = 97
  // 'A' = 65
  let lowestPolymer = 999999

  for(var i = 65; i <= 90; i++) {
    const removedUnit = removeAllOfUnitType(removeAllOfUnitType(input, String.fromCharCode(i)), String.fromCharCode(i+32))
    const lowestReaction = processReaction(removedUnit).length

    if(lowestReaction < lowestPolymer){
      lowestPolymer = lowestReaction
    }
  }

  return lowestPolymer
}

module.exports = {
  a,
  b
}
