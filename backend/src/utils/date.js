const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

const getFirstDayOfMonth = ({ date, year, month }) => {
  if (date) {
    if (!isValidDate(date)) return null;
    return new Date(Date.UTC(date.getFullYear(), date.getMonth()));
  }

  if (year && !Number.isNaN(month)) {
    const d = new Date(Date.UTC(year, month));
    return isValidDate(d) ? d : null;
  }

  return null;
};

// get number of months between <from> and <to>
function getMonthDiff(from, to) {
  if (!isValidDate(from) || !isValidDate(to)) return 0;

  let months;
  months = (to.getFullYear() - from.getFullYear()) * 12;
  months -= from.getMonth();
  months += to.getMonth();
  return months <= 0 ? 0 : months;
}

// get all months between <from> and <to>
function getMonthRange(from, to) {
  if (!isValidDate(from) || !isValidDate(to)) return [];
  const diff = getMonthDiff(from, to);
  let currentMonth = from.getMonth();
  let currentYear = from.getFullYear();

  const dates = [];
  for (let i = 0; i <= diff; i++) {
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear += 1;
    }

    dates.push(getFirstDayOfMonth({ year: currentYear, month: currentMonth }));
    currentMonth += 1;
  }

  return dates;
}

exports.isValidDate = isValidDate;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getMonthDiff = getMonthDiff;
exports.getMonthRange = getMonthRange;
