const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Stored dates are date-only ISO strings ("2025-01-01"), which `new Date()`
// parses as UTC midnight. Formatting in UTC keeps the displayed day stable
// regardless of the viewer's timezone (otherwise UTC-N users see the prior day).
const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatMoney(value) {
  return moneyFormatter.format(Number(value) || 0);
}

export function formatDay(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return dayFormatter.format(d);
}
