import { useState } from 'react'

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const amountNum = Number(amount);

    const nextErrors = {};
    if (!trimmedDescription) nextErrors.description = "Description is required.";
    if (!amount) nextErrors.amount = "Amount is required.";
    else if (Number.isNaN(amountNum) || amountNum <= 0)
      nextErrors.amount = "Enter an amount greater than 0.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAdd({
      id: Date.now(),
      description: trimmedDescription,
      amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  const visibleErrors = Object.entries(errors).filter(([, msg]) => msg);

  return (
    <section className="add-transaction">
      <div className="panel-head">
        <h2 className="panel-title">Add transaction</h2>
        <span className="panel-kicker">new entry</span>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className={errors.description ? "is-invalid" : undefined}
          aria-invalid={Boolean(errors.description)}
        />
        <input
          type="number"
          inputMode="decimal"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          className={errors.amount ? "is-invalid" : undefined}
          aria-invalid={Boolean(errors.amount)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {visibleErrors.length > 0 && (
          <ul className="form-errors" role="alert">
            {visibleErrors.map(([field, msg]) => (
              <li key={field}>{msg}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="add-btn">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm
