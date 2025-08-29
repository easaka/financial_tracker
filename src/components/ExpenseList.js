import React from "react";

export default function ExpenseList({ expenses }) {
  return (
    <ul className="list">
      {expenses.length === 0 && <p>No expenses yet.</p>}
      {expenses.map((exp) => (
        <li key={exp.id}>
          {exp.title} - <strong>GHS {exp.amount.toFixed(2)}</strong>
        </li>
      ))}
    </ul>
  );
}
