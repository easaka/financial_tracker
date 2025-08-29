import React from "react";

export default function BudgetList({ budgets, expenses }) {
  const getSpent = (category) => {
    return expenses
      .filter((exp) => exp.title.toLowerCase().includes(category.toLowerCase()))
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <ul className="list">
      {budgets.length === 0 && <p>No budgets yet.</p>}
      {budgets.map((budget) => {
        const spent = getSpent(budget.category);
        return (
          <li key={budget.id}>
            {budget.category}: GHS {spent.toFixed(2)} /{" "}
            <strong>GHS {budget.limit.toFixed(2)}</strong>{" "}
            {spent > budget.limit ? (
              <span className="over">⚠ Over budget!</span>
            ) : (
              <span className="ok">✅ Within budget</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
