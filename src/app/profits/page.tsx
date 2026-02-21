"use client";

import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank, Target } from "lucide-react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function ProfitsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]
  </div>
);
  
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0
  </div>
);
  
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0
  </div>
);
  
  const profit = totalIncome - totalExpenses;

  const statCards = [
    { label: "Total Income", value: `$${totalIncome.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Total Expenses", value: `$${totalExpenses.toLocaleString()}`, icon: TrendingDown, color: "text-red-400" },
    { label: "Net Profit", value: `$${profit.toLocaleString()}`, icon: DollarSign, color: profit >= 0 ? "text-cyan-400" : "text-red-400" },
    { label: "Transactions", value: transactions.length.toString(), icon: Wallet, color: "text-purple-400" },
  ];

  <div style={{ marginLeft: "80px" }}>
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Profits</h1>
          <p className="text-gray-400">Track your revenue and expenses</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          <div style={{ marginLeft: "80px" }}>
            <div key={i} className="bg-[#121218] border border-[#1f1f2e] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          
  </div>
);
        })}
      </div>

      {/* Transactions */}
      <div className="bg-[#121218] border border-[#1f1f2e] rounded-xl">
        <div className="p-4 border-b border-[#1f1f2e] flex items-center justify-between">
          <h2 className="font-semibold">Transactions</h2>
          <button className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <PiggyBank className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No transactions yet</p>
            <p className="text-sm text-gray-600">Add your first income or expense to start tracking</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1f1f2e]">
            {transactions.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-xs text-gray-500">{t.category} • {t.date}</div>
                </div>
                <div className={t.type === "income" ? "text-emerald-400" : "text-red-400"}>
                  {t.type === "income" ? "+" : "-"}${t.amount}
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