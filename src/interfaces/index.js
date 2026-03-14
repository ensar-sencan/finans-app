// src/interfaces/index.js

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {'gelir' | 'gider'} type
 * @property {string} title
 * @property {number} amount
 * @property {string} category
 * @property {string} date
 * @property {string} [note]
 */

/**
 * @typedef {Object} Summary
 * @property {number} totalIncome
 * @property {number} totalExpense
 * @property {number} balance
 */

export const CATEGORIES_GELIR = [
  { value: "maas", label: "💼 Maaş", color: "#10b981" },
  { value: "freelance", label: "💻 Freelance", color: "#06b6d4" },
  { value: "kira", label: "🏠 Kira Geliri", color: "#8b5cf6" },
  { value: "yatirim", label: "📈 Yatırım", color: "#f59e0b" },
  { value: "diger_gelir", label: "✨ Diğer", color: "#6366f1" },
];

export const CATEGORIES_GIDER = [
  { value: "market", label: "🛒 Market", color: "#ef4444" },
  { value: "fatura", label: "⚡ Fatura", color: "#f97316" },
  { value: "ulasim", label: "🚗 Ulaşım", color: "#eab308" },
  { value: "saglik", label: "🏥 Sağlık", color: "#ec4899" },
  { value: "eglence", label: "🎮 Eğlence", color: "#a855f7" },
  { value: "egitim", label: "📚 Eğitim", color: "#3b82f6" },
  { value: "yemek", label: "🍽️ Yemek", color: "#14b8a6" },
  { value: "diger_gider", label: "📦 Diğer", color: "#64748b" },
];

export const getCategoryLabel = (value) => {
  const all = [...CATEGORIES_GELIR, ...CATEGORIES_GIDER];
  return all.find((c) => c.value === value) || { label: value, color: "#64748b" };
};
