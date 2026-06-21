import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { formatDay, formatMoney } from '../utils/format'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <section className="transactions">
      <div className="panel-head">
        <h2 className="panel-title">Transactions</h2>
        <span className="panel-kicker">{filteredTransactions.length} shown</span>
      </div>

      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-scroll">
        <table className="ledger">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="num-col">Amount</th>
              <th className="col-action" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{formatDay(t.date)}</td>
                <td className="col-desc">{t.description}</td>
                <td>
                  <span className="cat-pill">{t.category}</span>
                </td>
                <td className={`amount ${t.type === "income" ? "is-credit" : "is-debit"}`}>
                  {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                </td>
                <td className="col-action">
                  <button
                    className="delete-btn"
                    aria-label={`Delete ${t.description}`}
                    onClick={() => setPendingDeleteId(t.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6h18" />
                      <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
                      <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="table-empty">No transactions match these filters.</div>
        )}
      </div>

      {pendingDeleteId && (
        <ConfirmDialog
          message={`Delete "${transactions.find(t => t.id === pendingDeleteId)?.description}"?`}
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={() => {
            onDelete(pendingDeleteId);
            setPendingDeleteId(null);
          }}
        />
      )}
    </section>
  );
}

export default TransactionList
