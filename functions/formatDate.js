// This function receives a JavaScript's Date object and returns a string in the format: YYYY-MM-DD
export default function formatDate(date) {
  const dateISO = date.toISOString();
  return dateISO.substring(0, dateISO.indexOf("T"));
}
