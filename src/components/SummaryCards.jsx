export default function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "gelir")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "gider")
    .reduce((s, t) => s + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const fmt = (n) =>
    new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2 }).format(n);

  const cards = [
    {
      label: "Toplam Gelir",
      value: fmt(totalIncome),
      prefix: "+₺",
      icon: "📈",
      cls: "stat-income",
      valueColor: "var(--accent-green)",
    },
    {
      label: "Toplam Gider",
      value: fmt(totalExpense),
      prefix: "-₺",
      icon: "📉",
      cls: "stat-expense",
      valueColor: "var(--accent-red)",
    },
    {
      label: "Net Bakiye",
      value: fmt(Math.abs(balance)),
      prefix: balance >= 0 ? "+₺" : "-₺",
      icon: balance >= 0 ? "💰" : "⚠️",
      cls: "stat-balance",
      valueColor: balance >= 0 ? "var(--accent-gold)" : "var(--accent-red)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((c) => (
        <div key={c.label} className={`card ${c.cls} p-6`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{c.icon}</span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-secondary)" }}
            >
              {c.label}
            </span>
          </div>
          <div
            className="font-mono font-bold text-2xl tracking-tight"
            style={{ color: c.valueColor }}
          >
            {c.prefix}
            {c.value}
          </div>
          <div className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            {transactions.filter((t) =>
              c.label === "Toplam Gelir"
                ? t.type === "gelir"
                : c.label === "Toplam Gider"
                ? t.type === "gider"
                : true
            ).length}{" "}
            işlem
          </div>
        </div>
      ))}
    </div>
  );
}
