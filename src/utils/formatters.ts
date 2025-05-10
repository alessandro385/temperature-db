export function formatYear(date: Date): string {
  return date.getFullYear().toString();
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}