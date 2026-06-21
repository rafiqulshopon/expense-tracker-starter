import { useState } from "react";
import "./App.css";
import Summary from "./components/Summary";
import SpendingByCategory from "./components/SpendingByCategory";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Salary",
      amount: "5000",
      type: "income",
      category: "salary",
      date: "2025-01-01",
    },
    {
      id: 2,
      description: "Rent",
      amount: "1200",
      type: "expense",
      category: "housing",
      date: "2025-01-02",
    },
    {
      id: 3,
      description: "Groceries",
      amount: "150",
      type: "expense",
      category: "food",
      date: "2025-01-03",
    },
    {
      id: 4,
      description: "Freelance Work",
      amount: "800",
      type: "expense",
      category: "salary",
      date: "2025-01-05",
    },
    {
      id: 5,
      description: "Electric Bill",
      amount: "95",
      type: "expense",
      category: "utilities",
      date: "2025-01-06",
    },
    {
      id: 6,
      description: "Dinner Out",
      amount: "65",
      type: "expense",
      category: "food",
      date: "2025-01-07",
    },
    {
      id: 7,
      description: "Gas",
      amount: "45",
      type: "expense",
      category: "transport",
      date: "2025-01-08",
    },
    {
      id: 8,
      description: "Netflix",
      amount: "15",
      type: "expense",
      category: "entertainment",
      date: "2025-01-10",
    },
  ]);

  const categories = [
    "food",
    "housing",
    "utilities",
    "transport",
    "entertainment",
    "salary",
    "other",
  ];

  const handleAdd = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-brand">
          <span className="masthead-mark" aria-hidden="true">
            $
          </span>
          <h1 className="masthead-title">Finance Tracker</h1>
        </div>
        <div className="masthead-meta">
          <span className="masthead-count">{transactions.length} entries</span>
        </div>
      </header>

      <Summary transactions={transactions} />

      <SpendingByCategory transactions={transactions} />

      <TransactionForm categories={categories} onAdd={handleAdd} />

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDelete={handleDelete}
      />

      <footer className="app-footer">
        Stored in memory — resets when you reload.
      </footer>
    </div>
  );
}

export default App;
