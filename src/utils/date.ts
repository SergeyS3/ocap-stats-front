const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
  (new Intl.DateTimeFormat('ru', options)).format(date)

export const formatWeekday = (date: Date) => format(date, { weekday: 'short' })

export const formatDate = (date: Date) => format(date, { dateStyle: 'short' })

export const formatTime = (date: Date, showSeconds = false) =>
  format(date, { timeStyle: showSeconds ? 'medium' : 'short' })

export const formatDatesRange = (from: Date, to: Date) =>
  `${formatDate(from)}, ${formatWeekday(from)}, ${formatTime(from)} - ${formatTime(to)}`

export const formatDuration = (seconds: number) =>
  formatTime(new Date((seconds + (new Date).getTimezoneOffset() * 60) * 1000), true)
