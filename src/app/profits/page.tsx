"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown, Plus, Calendar } from "lucide-react";

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

// Sample historical data
const generateChartData = (timeframe: string): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  let days = timeframe === "week" ? 7 : timeframe === "month" ? 30 : timeframe === "year" ? 12 : 7;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    if (timeframe === "year") {
      date.setMonth(date.getMonth() - i);
    } else {
      date.setDate(date.getDate() - i);
    }
    
    const baseIncome = Math.floor(Math.random() * 500) + 100;
    const baseExpense = Math.floor(Math.random() * 300) + 50;
    
    data.push({
      date: timeframe === "year" 
        ? date.toLocaleDateString("en-US", { month: "short" })
        : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      income: baseIncome,
      expenses: baseExpense,
      profit: baseIncome - baseExpense,
    });
  }
  return data;
};

export default function ProfitsPage() {
  const [timeframe, setTimeframe] = useState("week");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "income", amount: 250, description: "Product sale", category: "Sales", date: "2026-02-20" },
    { id: "2", type: "expense", amount: 50, description: "Ads", category: "Marketing", date: "2026-02-19" },
    { id: "3", type: "income", amount: 150, description: "Affiliate commission", category: "Affiliate", date: "2026-02-18" },
    { id: "4", type: "expense", amount: 25, description: "Tools subscription", category: "Software", date: "2026-02-17" },
    { id: "5", type: "income", amount: 500, description: "Product sale", category: "Sales", date: "2026-02-15" },
  ]);
  
  const [chartData, setChartData] = useState<ChartData[]>(generateChartData("week"));

  useEffect(() => {
    setChartData(generateChartData(timeframe));
  }, [timeframe]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransactions(prev => {
        if (Math.random() > 0.7) {
          const newTx: Transaction = {
            id: Date.now().toString(),
            type: Math.random() > 0.5 ? "income" : "expense",
            amount: Math.floor(Math.random() * 200) + 20,
            description: Math.random() > 0.5 ? "New sale" : "New expense",
            category: Math.random() > 0.5 ? "Sales" : "Operations",
            date: new Date().toISOString().split("T")[0],
          };
          return [newTx, ...prev];
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpenses;

  // Calculate chart totals
  const chartIncome = chartData.reduce((sum, d) => sum + d.income, 0);
  const chartExpenses = chartData.reduce((sum, d) => sum + d.expenses, 0);
  const chartProfit = chartIncome - chartExpenses;

  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expenses))) * 1.2;

  return (
    <div style={{ marginLeft: "80px", minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      <header style={{ height: "56px", background: "#121218", borderBottom: "1px solid #1f1f2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0 }}>
        <span style={{ fontWeight: 600 }}>Mission Control</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9ca3af" }}>
            <div style={{ width: "8px", height: "8px", background: "#22d3ee", borderRadius: "50%" }} />
            Mori online
          </div>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom right, #22d3ee, #a855f7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>L</div>
        </div>
      </header>

      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={28} style={{ color: "#10b981" }} />
              Profits
            </h1>
            <p style={{ color: "#9ca3af" }}>Track your income, expenses & profit</p>
          </div>
          
          {/* Timeframe Selector */}
          <div style={{ display: "flex", gap: "8px", background: "#121218", padding: "4px", borderRadius: "8px" }}>
            {["week", "month", "year"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                style={{
                  padding: "8px 16px",
                  background: timeframe === t ? "#22d3ee" : "transparent",
                  color: timeframe === t ? "#0a0a0f" : "#9ca3af",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingUp size={16} style={{ color: "#10b981" }} />
              Income ({timeframe})
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#10b981" }}>€{chartIncome.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#10b981", marginTop: "4px" }}>+{transactions.filter(t => t.type === "income").length} transactions</div>
          </div>
          
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <TrendingDown size={16} style={{ color: "#ef4444" }} />
              Expenses ({timeframe})
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ef4444" }}>€{chartExpenses.toLocaleString()}</div>
            <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>-{transactions.filter(t => t.type === "expense").length} transactions</div>
          </div>
          
          <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#9ca3af", fontSize: "14px" }}>
              <DollarSign size={16} style={{ color: chartProfit >= 0 ? "#22d3ee" : "#ef4444" }} />
              Net Profit ({timeframe})
            </div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: chartProfit >= 0 ? "#22d3ee" : "#ef4444" }}>
              €{chartProfit.toLocaleString()}
            </div>
            <div style={{ fontSize: "12px", color: chartProfit >= 0 ? "#22d3ee" : "#ef4444", marginTop: "4px" }}>
              {chartProfit >= 0 ? "Profit" : "Loss"}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>Profit & Loss Over Time</h2>
          
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "200px", padding: "0 8px" }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                {/* Bars */}
                <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "160px" }}>
                  <div style={{ 
                    width: "12px", 
                    height: `${(d.income / maxValue) * 160}px`, 
                    background: "#10b981", 
                    borderRadius: "2px 2px 0 0",
                    minHeight: "4px",
                  }} />
                  <div style={{ 
                    width: "12px", 
                    height: `${(d.expenses / maxValue) * 160}px`, 
                    background: "#ef4444", 
                    borderRadius: "2px 2px 0 0",
                    minHeight: "4px",
                  }} />
                </div>
                {/* Label */}
                <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "8px" }}>{d.date}</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #1f1f2e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#10b981", borderRadius: "2px" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Income</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#ef4444", borderRadius: "2px" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>Expenses</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ background: "#121218", border: "1px solid #1f1f2e", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Recent Transactions</h2>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "#22d3ee", color: "#0a0a0f", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
              <Plus size={14} />
              Add
            </button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#0a0a0f", borderRadius: "8px" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "14px" }}>{t.description}</div>
                  <div style={{ fontSize: "11px", color: "#6b7280" }}>{t.category} • {t.date}</div>
                </div>
                <div style={{ color: t.type === "income" ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: "14px" }}>
                  {t.type === "income" ? "+" : "-"}€{t.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
