export function formatJSDateToISODate(date: Date) {
  return date.toISOString().split("T")[0]
}
