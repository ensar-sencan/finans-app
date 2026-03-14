import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getCategoryLabel } from "../interfaces";

export default function CategoryChart({ transactions }) {
  const giderler = transactions.filter((t) => t.type === "gider");

  const grouped = giderler.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([cat, value]) => {
    const info = getCategoryLabel(cat);
    return {
      name: info.label.split(" ").slice(1).join(" ") || cat,
      value: parseFloat(value.toFixed(2)),
      color: info.color,
    };
  }).sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center" style={{ minHeight: 220 }}>
        <span className="text-4xl mb-3">📊</span>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
          Henüz gider kaydı yok
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        <div
          className="rounded-xl px-4 py-3 text-sm"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <div className="font-semibold">{d.name}</div>
          <div className="font-mono mt-1" style={{ color: d.payload.color }}>
            ₺{new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2 }).format(d.value)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <h3 className="font-display text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
        Gider Dağılımı
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
