import { getCategoryLabel } from "../interfaces";

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const { title, amount, type, category, date, note } = transaction;
  const cat = getCategoryLabel(category);

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <div
      className="card fade-in-up flex items-center gap-4 px-5 py-4 group"
      style={{ marginBottom: "8px" }}
    >
      {/* Category Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
      >
        {cat.label.split(" ")[0]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
          <span className={type === "gelir" ? "tag-gelir" : "tag-gider"}>
            {type}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {cat.label.split(" ").slice(1).join(" ")}
          </span>
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>•</span>
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            {formattedDate}
          </span>
          {note && (
            <>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>•</span>
              <span className="text-xs truncate max-w-[140px]" style={{ color: "var(--text-secondary)" }}>
                {note}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        <div
          className="font-mono font-bold text-lg"
          style={{ color: type === "gelir" ? "var(--accent-green)" : "var(--accent-red)" }}
        >
          {type === "gelir" ? "+" : "-"}₺{formattedAmount}
        </div>
      </div>

      {/* Actions - visible on hover */}
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onEdit(transaction)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors"
          style={{
            background: "rgba(201,168,76,0.1)",
            color: "var(--accent-gold)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
          title="Düzenle"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors"
          style={{
            background: "rgba(239,68,68,0.1)",
            color: "#f87171",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
          title="Sil"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
