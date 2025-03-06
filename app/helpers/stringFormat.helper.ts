export function truncateString(string: string, maxLength = 20): string {
  if (string.length > maxLength) {
    return `${string.slice(0, maxLength)}...`
  }
  return string
}
