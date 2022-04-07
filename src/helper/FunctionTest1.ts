

export function sum(array : Array<number>) {
  var item = 0
  if(array.length > 0) {
    item = array.reduce(
      (previousValue, currentValue) => {
        if(currentValue > 20 && (currentValue % 20) === 0 ){
          return previousValue + 20
        }
        return previousValue + currentValue
      } ,
      0
    )
  }

  function showResult(cb: any) {
    return cb(item)
  }

  return showResult
}


