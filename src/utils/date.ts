const format = (date: DateConstructorParam, options: Intl.DateTimeFormatOptions): string =>
  new Intl.DateTimeFormat('ru', options).format(new Date(date))

export const formatWeekday = (date: DateConstructorParam): string => format(date, { weekday: 'short' })

export const formatDate = (date: DateConstructorParam): string => format(date, { dateStyle: 'short' })

export const formatTime = (date: DateConstructorParam, showSeconds = false): string =>
  format(date, { timeStyle: showSeconds ? 'medium' : 'short' })

export const formatDatesRange = (from: Date, to: Date): string =>
  `${formatDate(from)}, ${formatWeekday(from)}, ${formatTime(from)} - ${formatTime(to)}`

export const formatDuration = (seconds: number): string =>
  formatTime(new Date((seconds + (new Date).getTimezoneOffset() * 60) * 1000), true)
