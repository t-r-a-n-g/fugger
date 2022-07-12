const monthIndex = [
  "jan january januar",
  "feb february februar",
  "mar mrz march märz",
  "apr april",
  "mai may",
  "jun june juni",
  "jul july julie",
  "aug august",
  "sep september",
  "oct okt october oktober",
  "nov november",
  "dec dez december dezember",
];

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

function parseDate(date, delimiter = "/") {
  if (isValidDate(date)) return { date };

  if (
    (typeof date === "string" && !date.includes(delimiter)) ||
    typeof date !== "string"
  ) {
    const newDate = new Date(date);
    if (isValidDate(newDate))
      return {
        date: new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth())),
      };
  }

  const dateParts = date.split(delimiter);
  let month = null;
  let year = null;

  for (const part of dateParts) {
    if (month === null) {
      month = monthIndex.findIndex((m) => {
        return m.includes(part.toLowerCase());
      });

      if (month < 0) year = part;
    } else {
      year = part;
    }
  }

  if (month === -1) month = 0;

  return { month, year, date: new Date(Date.UTC(year, month)) };
}

module.exports = parseDate;
