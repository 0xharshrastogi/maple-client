const month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function parseDate(data = new Date()) {
  const day = data.getDate();
  const monthIndex = data.getMonth();
  const year = data.getFullYear();

  return `${month[monthIndex]} ${day}, ${year}`;
}
