import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoney } from "../utils/format";

const DEBIT = "#b23a2b";
const INK = "#16191c";
const INK_MUTED = "#6b7480";
const RULE = "#e3e6e3";

function sumExpensesByCategory(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
}

function toChartData(totalsByCategory) {
  return Object.entries(totalsByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function SpendingByCategory({ transactions }) {
  const data = toChartData(sumExpensesByCategory(transactions));

  return (
    <section className="chart-card">
      <div className="panel-head">
        <h2 className="panel-title">Spending by category</h2>
        <span className="panel-kicker">expenses only</span>
      </div>
      {data.length === 0 ? (
        <p className="chart-empty">
          No expenses recorded yet — add one to see the breakdown.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={RULE} />
            <XAxis
              dataKey="name"
              tick={{ fill: INK_MUTED, fontSize: 12 }}
              axisLine={{ stroke: RULE }}
              tickLine={false}
            />
            <YAxis
              width={52}
              tick={{ fill: INK_MUTED, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(22,25,28,0.04)" }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e3e6e3",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(20,23,26,0.08)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "8px 10px",
              }}
              labelStyle={{
                color: "#6b7480",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
              itemStyle={{ color: INK }}
              formatter={(value) => [formatMoney(value), "spent"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={DEBIT}
                  fillOpacity={Math.max(0.4, 1 - index * 0.14)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingByCategory;
