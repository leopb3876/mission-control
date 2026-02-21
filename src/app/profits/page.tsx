"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown, Plus, Trash2, Calendar } from "lucide-react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
};

type ChartData = {
  date: string;
  income: number;
  expenses: number;
  profit: number;
};

const generateEmptyChartData = (timeframe: string): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  const days = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 12;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    if (timeframe === "year") {
      date.setMonth(date.getMonth() - i);
    } else {
      date.setDate(date.getDate() - i);
    }
    data.push({
      date: timeframe === "year" 
        ? date.toLocaleDateString("en-US", { month: "short" })
        : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      income: 0,
      expenses: 0,
      profit: 0,
    });
  }
  return data;
};

export default function ProfitsPage() {
  const [timeframe, setTimeframe] = useState("week");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>(generateEmptyChartData("week"));
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newType, setNewType] = useState<"income" | "expense">("income");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setChartData(generateEmptyChartData(timeframe));
  }, [timeframe]);

  const addTransaction = () => {
    if (!newAmount || !newDescription) return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: newType,
      amount: parseFloat(newAmount),
      description: newDescription,
      category: newCategory || (newType === "income" ? "Sales" : "Expenses"),
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTx, ...transactions]);
    setNewAmount("");
    setNewDescription("");
    setNewCategory("");
    setShowAddForm(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpenses;

  const maxValue = 100; // Start small since everything is 0

  return (
    <div style={{ marginLeft: "180px", minHeight: "100vh", background: "#151520", color: "white" }}>
      <header style={{ height: "56px", background: "#1e1e30", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "#22d3ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={28} style={{ color: "#10b981" }} />
              Profits
            </h1>
            <p style={{ color: "#9ca3af" }}>Track your income & expenses</p>
          </div>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <h3 style={{ fontWeight: 600, marginBottom: "16px" }}>Add New Transaction</h3>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  onClick={() => setNewType("income")}
                  style={{ padding: "10px 20px", background: newType === "income" ? "#10b981" : "#1f1f2e", color: newType === "income" ? "#0a0a0f" : "#9ca3af", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                >
                  + Income
                </button>
                <button 
                  onClick={() => setNewType("expense")}
                  style={{ padding: "10px 20px", background: newType === "expense" ? "#ef4444" : "#1f1f2e", color: newType === "expense" ? "#fff" : "#9ca3af", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                >
                  - Expense
                </button>
              </div>
              <input
                type="number"
                placeholder="Amount (€)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                style={{ flex: 1, minWidth: "120px", background: "#151520", border: "1px solid #2a2a4e", borderRadius: "8px", padding: "12px", color: "white", fontSize: "14px", outline: "none" }}
              />
              <input
                type="text"
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{ flex: 2, minWidth: "150px", background: "#151520", border: "1px solid #2a2a4e", borderRadius: "8px", padding: "12px", color: "white", fontSize: "14px", outline: "none" }}
              />
              <input
                type="text"
                placeholder="Category (optional)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ flex: 1, minWidth: "100px", background: "#151520", border: "1px solid #2a2a4e", borderRadius: "8px", padding: "12px", color: "white", fontSize: "14px", outline: "none" }}
              />
              <button 
                onClick={addTransaction}
                style={{ padding: "12px 24px", background: "#22d3ee", color: "#0a0a0f", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingUp size={16} style={{ color: "#10b981" }} />
              Total Income
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}>€{totalIncome.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{transactions.filter(t => t.type === "income").length} transactions</div>
          </div>
          
          <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingDown size={16} style={{ color: "#ef4444" }} />
              Total Expenses
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ef4444" }}>€{totalExpenses.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>{transactions.filter(t => t.type === "expense").length} transactions</div>
          </div>
          
          <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <DollarSign size={16} style={{ color: profit >= 0 ? "#22d3ee" : "#ef4444" }} />
              Net Profit
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: profit >= 0 ? "#22d3ee" : "#ef4444" }}>
              €{profit.toLocaleString()}
            </div>
            <div style={{ fontSize: "12px", color: profit >= 0 ? "#22d3ee" : "#ef4444", marginTop: "4px" }}>
              {profit >= 0 ? "Profit" : "Loss"}
            </div>
          </div>
        </div>

        {/* Chart - Shows empty bars since all 0 */}
        <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Profit & Loss</h2>
          <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center", padding: "40px" }}>
            Add transactions above to see your profit chart
          </p>
        </div>

        {/* Transactions List */}
        <div style={{ background: "#1e1e30", border: "1px solid #2a2a4e", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>All Transactions</h2>
          
          {transactions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              No transactions yet. Add your first one above!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {transactions.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "#151520", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: "14px" }}>{t.description}</div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>{t.category} • {t.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ color: t.type === "income" ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: "14px" }}>
                      {t.type === "income" ? "+" : "-"}€{t.amount}
                    </div>
                    <button onClick={() => deleteTransaction(t.id)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: "4px" }}>
                      <Trash2 size={14} />
                    </button>
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
