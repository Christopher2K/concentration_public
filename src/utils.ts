export function formatSeconds(duration: number) {
  const hours = (duration / 3600) >> 0
  const minutes = ((duration - hours * 3600) / 60) >> 0
  const seconds = duration - hours * 3600 - minutes * 60

  return [hours, minutes, seconds].map(formatIntoTwoDigitNumber).join(':')
}

export function formatIntoTwoDigitNumber(num: number): string {
  if (num.toString().length === 1) {
    return `0${num}`
  }

  return num.toString()
}
