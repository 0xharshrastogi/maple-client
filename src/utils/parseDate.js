export default function parseDate(data = new Date()) {
  const day = data.getDay();
  const month = data.getMonth();
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
}
