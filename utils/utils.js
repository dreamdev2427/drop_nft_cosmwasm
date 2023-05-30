export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export function convertMicroDenomToDenom(amount, denom = 6) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / 10 ** 6
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenom(amount, denom = 6) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount * 10 ** 6
  return isNaN(amount) ? '0' : String(amount).split('.')[0];
}

export const numberWithCommas = (x, digits = 3) => {
  if (isEmpty(x)) return '0';
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}