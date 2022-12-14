export function compare(a: number | string, b: number | string, isAsc: boolean) {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  if (typeof a === 'string' && typeof b === 'string') {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }
  return a === b ? 0 : (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
