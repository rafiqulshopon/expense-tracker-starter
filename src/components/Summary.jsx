import { useEffect, useRef, useState } from "react";
import { formatMoney } from "../utils/format";

function useCountUp(target, duration = 800) {
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [value, setValue] = useState(reduceMotion ? target : 0);
  const valueRef = useRef(value);

  useEffect(() => {
    const from = valueRef.current;
    let frame;
    let start = null;
    const tick = (now) => {
      if (reduceMotion) {
        valueRef.current = target;
        setValue(target);
        return;
      }
      if (start === null) start = now;
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const next = from + (target - from) * eased;
      valueRef.current = next;
      setValue(next);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduceMotion]);

  return value;
}

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const positive = balance >= 0;
  const animated = useCountUp(balance);

  return (
    <section className="statement-hero" aria-label="Balance summary">
      <div className="hero-label">
        <span className="hero-label-text">Net balance</span>
        <span className={`hero-status ${positive ? "is-credit" : "is-debit"}`}>
          <span className="status-dot" aria-hidden="true" />
          {positive ? "in the black" : "in the red"}
        </span>
      </div>

      <div
        className={`hero-balance ${positive ? "is-credit" : "is-debit"}`}
        title={formatMoney(balance)}
      >
        {formatMoney(Math.round(animated))}
      </div>

      <div className="hero-subline">
        <div className="hero-stat is-credit">
          <span className="hero-stat-label">Income</span>
          <span className="hero-stat-value">{formatMoney(totalIncome)}</span>
        </div>
        <span className="hero-stat-sep" aria-hidden="true" />
        <div className="hero-stat is-debit">
          <span className="hero-stat-label">Expenses</span>
          <span className="hero-stat-value">{formatMoney(totalExpenses)}</span>
        </div>
      </div>
    </section>
  );
}

export default Summary;
