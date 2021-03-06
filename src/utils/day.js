// convert integer date to string
function getDateStringFromInt(int) {
  const str = String(int)
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6, 8)
  return year + '-' + month + '-' + day
}

function generateWeekDates(weekDateStart) {
  const start = new Date(getDateStringFromInt(weekDateStart))
  const week = []
  for (let i = 1; i <= 7; i++) {
    let first = start.getDate() - start.getDay() + i
    let day = new Date(start.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
  }

  return week
}

function isToday(date) {
  return new Date().toISOString().slice(0, 10) == date
}

function getDayName(dateStr, locale) {
  var date = new Date(dateStr)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(i) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return months[i]
}

export {
  getDateStringFromInt,
  generateWeekDates,
  getDayName,
  isToday,
  getMonthName,
}
