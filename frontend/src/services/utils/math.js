function round(num) {
  if (Number.isNaN(num)) return NaN;

  const m = Number((Math.abs(num) * 100).toPrecision(15));
  const rounded = (Math.round(m) / 100) * Math.sign(num);

  return Number.isNaN(rounded) ? 0 : Math.abs(rounded);
}

function calculateDiff(actual, budget) {
  let abs = 0;
  let pct = 0;

  if (Number.isNaN(actual) || Number.isNaN(budget)) return { abs, pct };

  if (actual !== 0) {
    const type = actual < 0 ? "S" : "H";
    if (type === "S") {
      // actual is negative, so we need to add budget to it, to get the difference (-4000 + 2000 = -2000)
      abs = budget + actual;
    } else abs = actual - budget;
  }

  if (budget > 0 && actual !== 0) pct = (abs / budget) * 100;
  else pct = "N/A";

  return { abs, pct };
}

export { round, calculateDiff };
