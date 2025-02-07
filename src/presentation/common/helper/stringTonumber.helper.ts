export function stringToNumber(value: string): number | null {
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}
