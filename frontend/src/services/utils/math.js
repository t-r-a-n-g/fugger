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

  const type = actual < 0 ? "S" : "H";
  if (type === "S") {
    // actual is negative, so we need to add budget to it, to get the difference (-4000 + 2000 = -2000)
    abs = budget + actual;
  } else abs = actual - budget;

  if (budget > 0) pct = (abs / budget) * 100;
  else pct = "N/A";

  return { abs, pct };
}

// function calculateTransferData(trsf) {
//   let transferAbs = null;
//   let actualColor = "error.main";
//
//   const transfer = {
//     ...trsf,
//     actual: Math.abs(trsf.actual),
//   };
//
//   if (transfer.type === "S") {
//     transferAbs = transfer.budget - transfer.actual;
//   } else {
//     actualColor = "success.main";
//     transferAbs = transfer.actual - transfer.budget;
//   }
//
//   let transferPerct = null;
//   if (transfer.budget > 0)
//     transferPerct = (transferAbs / transfer.budget) * 100;
//   else transferPerct = transfer.type === "H" ? 100 : -100;
//
//   let transferAbsColor = null;
//   if (transferAbs < 0) transferAbsColor = "error.main";
//   else if (transferAbs > 0) transferAbsColor = "success.main";
//
//   return {
//     abs: round(transferAbs),
//     perct: round(transferPerct),
//     actual: round(transfer.actual),
//     budget: round(transfer.budget),
//     absColor: transferAbsColor,
//     actualColor,
//   };
// }
export { round, calculateDiff };
