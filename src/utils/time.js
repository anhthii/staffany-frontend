const startTime = (quarterStart) => {
  // console.log("render time index", index);
  // console.log("curr", currDateArr[index].currentQuarter);

  return timeConvert(quarterStart * 15, 'start')
}

const endTime = (quarterStart, numQuarter) => {
  return timeConvert(quarterStart * 15 + numQuarter * 15, 'end')
}

function timeConvert(n, startOrEnd) {
  var num = n
  if (startOrEnd === 'end' && num % 60 === 0) {
    num = num - 1
  }

  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + ':' + leftFillNum(rminutes, 2)
}

function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, 0)
}

export { startTime, endTime }
