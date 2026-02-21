"use client";

import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function ProfitsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      {/* Header */}
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom right, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>
            L
          </div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
          <DollarSign size={24} style={{ color: "#10b981" }} />
          Profits
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "32px" }}>Track your income & expenses</p>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingUp size={16} style={{ color: "#10b981" }} />
              Income
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#10b981" }}>€{totalIncome.toLocaleString()}</div>
          </div>
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingDown size={16} style={{ color: "#ef4444" }} />
              Expenses
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ef4444" }}>€{totalExpenses.toLocaleString()}</div>
          </div>
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <DollarSign size={16} style={{ color: "#22d3ee" }} />
              Net Profit
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: profit >= 0 ? "#22d3ee" : "#ef4444" }}>
              €{profit.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontWeight: 600 }}>Transactions</h2>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: 500, cursor: "pointer" }}>
              <Plus size={14} />
              Add
            </button>
          </div>
          
          {transactions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              <p>No transactions yet</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {transactions.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#0a0a0f", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{t.description}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{t.category} • {t.date}</div>
                  </div>
                  <div style={{ color: t.type === "income" ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                    {t.type === "income" ? "+" : "-"}€{t.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}