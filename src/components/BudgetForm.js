import React, { useState } from "react";

export default function BudgetForm({ addBudget }) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !limit) return;
    addBudget({ category, limit: parseFloat(limit) });
    setCategory("");
    setLimit("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Budget category (e.g. Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Limit (GHS)"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}
