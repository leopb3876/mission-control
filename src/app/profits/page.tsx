"use client";

import { useState } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
} from "lucide-react";

type Venture = {
  id: string;
  name: string;
  type: "business" | "project" | "investment" | "other";
  status: "active" | "paused" | "archived";
  color: string;
};

type Transaction = {
  id: string;
  ventureId: string;
  type: "income" | "expense";
  amount: number;
  currency: string;
  description: string;
  category: string;
  date: string;
};

const initialVentures: Venture[] = [
  { id: "1", name: "Discord Community", type: "business", status: "active", color: "#7c3aed" },
  { id: "2", name: "Supplement Brand", type: "business", status: "active", color: "#00d4ff" },
  { id: "3", name: "Research Project", type: "project", status: "active", color: "#10b981" },
];

const initialTransactions: Transaction[] = [
  { id: "1", ventureId: "1", type: "income", amount: 150, currency: "USD", description: "New subscriber", category: "Subscriptions", date: "2026-02-20" },
  { id: "2", ventureId: "1", type: "income", amount: 75, currency: "USD", description: "Tier upgrade", category: "Subscriptions", date: "2026-02-18" },
  { id: "3", ventureId: "2", type: "expense", amount: 250, currency: "USD", description: "Logo design", category: "Marketing", date: "2026-02-15" },
  { id: "4", ventureId: "2", type: "expense", amount: 500, currency: "USD", description: "Business registration", category: "Legal", date: "2026-02-10" },
  { id: "5", ventureId: "3", type: "expense", amount: 50, currency: "USD", description: "API subscriptions", category: "Tools", date: "2026-02-08" },
  { id: "6", ventureId: "1", type: "income", amount: 200, currency: "USD", description: "New member", category: "Subscriptions", date: "2026-02-05" },
];

export default function ProfitsPage() {
  const [ventures, setVentures] = useState<Venture[]>(initialVentures);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedVenture, setSelectedVenture] = useState<string>("all");

  const filteredTransactions =
    selectedVenture === "all"
      ? transactions
      : transactions.filter((t) => t.ventureId === selectedVenture);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const profit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  const ventureStats = ventures.map((venture) => {
    const ventureTransactions = transactions.filter((t) => t.ventureId === venture.id);
    const income = ventureTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = ventureTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...venture, income, expenses, profit: income - expenses };
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Profits</h1>
            <p className="text-gray-400 text-sm mt-1">
              Track revenue and expenses across ventures
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* Venture Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedVenture("all")}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              selectedVenture === "all"
                ? "bg-primary text-black"
                : "bg-background text-gray-400 hover:text-white"
            }`}
          >
            All Ventures
          </button>
          {ventures.map((venture) => (
            <button
              key={venture.id}
              onClick={() => setSelectedVenture(venture.id)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedVenture === venture.id
                  ? "text-black"
                  : "bg-background text-gray-400 hover:text-white"
              }`}
              style={
                selectedVenture === venture.id
                  ? { backgroundColor: venture.color }
                  : undefined
              }
            >
              {venture.name}
            </button>
          ))}
          <button className="px-3 py-2 text-gray-500 hover:text-white text-sm">
            + Add Venture
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Income</span>
              <ArrowUpRight className="w-4 h-4 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">${totalIncome.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">This period</div>
          </div>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Expenses</span>
              <ArrowDownRight className="w-4 h-4 text-error" />
            </div>
            <div className="text-2xl font-bold text-error">${totalExpenses.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">This period</div>
          </div>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Net Profit</span>
              {profit >= 0 ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
            </div>
            <div className={`text-2xl font-bold ${profit >= 0 ? "text-success" : "text-error"}`}>
              {profit >= 0 ? "+" : "-"}${Math.abs(profit).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">{profitMargin.toFixed(1)}% margin</div>
          </div>
          <div className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Transactions</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <div className="text-xs text-gray-500 mt-1">
              {filteredTransactions.filter((t) => t.type === "income").length} income,{" "}
              {filteredTransactions.filter((t) => t.type === "expense").length} expenses
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions Table */}
          <div className="lg:col-span-2 card p-5">
            <h3 className="font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => {
                const venture = ventures.find((v) => v.id === transaction.ventureId);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          transaction.type === "income"
                            ? "bg-success/20"
                            : "bg-error/20"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-error" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{transaction.description}</div>
                        <div className="text-xs text-gray-500">
                          {venture?.name} • {transaction.category} • {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${
                        transaction.type === "income" ? "text-success" : "text-error"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Venture Summary */}
          <div className="card p-5">
            <h3 className="font-semibold mb-4">Venture Summary</h3>
            <div className="space-y-4">
              {ventureStats.map((venture) => (
                <div key={venture.id} className="p-3 bg-background rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: venture.color }}
                      />
                      <span className="font-medium text-sm">{venture.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        venture.status === "active"
                          ? "bg-success/20 text-success"
                          : venture.status === "paused"
                          ? "bg-warning/20 text-warning"
                          : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {venture.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-gray-500">Income</div>
                      <div className="text-sm text-success">${venture.income}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Expenses</div>
                      <div className="text-sm text-error">${venture.expenses}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Profit</div>
                      <div
                        className={`text-sm font-medium ${
                          venture.profit >= 0 ? "text-success" : "text-error"
                        }`}
                      >
                        ${venture.profit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-dashed border-gray-600 rounded-lg text-sm text-gray-400 hover:border-gray-400 hover:text-white transition-colors">
              + Add New Venture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
