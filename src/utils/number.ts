export const round = (num: number, precision = 0): number =>
  precision
    ? Math.round((num + Number.EPSILON) * 10 ** precision) / 10 ** precision
    : Math.round(num)
