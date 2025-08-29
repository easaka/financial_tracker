// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [form, setForm] = useState({ type: "income", category: "", amount: "" });

  // Load from local storage on startup
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("financeData")) || {};
    setIncome(savedData.income || []);
    setExpenses(savedData.expenses || []);
    setBudgets(savedData.budgets || {});
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      "financeData",
      JSON.stringify({ income, expenses, budgets })
    );
  }, [income, expenses, budgets]);

  const addEntry = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) return;

    const entry = { category: form.category, amount: Number(form.amount) };

    if (form.type === "income") {
      setIncome([...income, entry]);
    } else {
      setExpenses([...expenses, entry]);
    }

    setForm({ ...form, category: "", amount: "" });
  };

  const setBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: Number(amount) });
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="app">
      <h1>💰 Personal Finance Tracker</h1>
      <div className="summary">
        <div className="card income">Income: GHS {totalIncome}</div>
        <div className="card expenses">Expenses: GHS {totalExpenses}</div>
        <div className="card balance">Balance: GHS {balance}</div>
      </div>

      <form onSubmit={addEntry} className="entry-form">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <div className="lists">
        <div className="list">
          <h2>Income</h2>
          {income.map((i, idx) => (
            <div key={idx} className="list-item">
              {i.category}: GHS {i.amount}
            </div>
          ))}
        </div>

        <div className="list">
          <h2>Expenses</h2>
          {expenses.map((e, idx) => (
            <div key={idx} className="list-item">
              {e.category}: GHS {e.amount}
              {budgets[e.category] && (
                <span
                  className={
                    e.amount > budgets[e.category] ? "over-budget" : "within-budget"
                  }
                >
                  {e.amount > budgets[e.category]
                    ? "⚠ Over Budget"
                    : "✅ Within Budget"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="budgets">
        <h2>Set Budgets</h2>
        {["Food", "Transport", "Rent", "Entertainment", "Other"].map((cat) => (
          <div key={cat} className="budget-item">
            <label>{cat}:</label>
            <input
              type="number"
              placeholder="Enter budget"
              value={budgets[cat] || ""}
              onChange={(e) => setBudget(cat, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
