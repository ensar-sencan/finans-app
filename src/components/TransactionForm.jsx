import { useState, useEffect } from "react";
import { CATEGORIES_GELIR, CATEGORIES_GIDER } from "../interfaces";

const emptyForm = {
  title: "",
  amount: "",
  type: "gider",
  category: "market",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

export default function TransactionForm({ onSave, onClose, editData }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        amount: String(editData.amount),
        type: editData.type,
        category: editData.category,
        date: editData.date,
        note: editData.note || "",
      });
    }
  }, [editData]);

  const categories = form.type === "gelir" ? CATEGORIES_GELIR : CATEGORIES_GIDER;

  const handleTypeChange = (type) => {
    const defaultCat = type === "gelir" ? "maas" : "market";
    setForm((f) => ({ ...f, type, category: defaultCat }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.amount || Number(form.amount) <= 0) return;
    onSave({
      ...form,
      amount: parseFloat(form.amount),
      id: editData?.id || crypto.randomUUID(),
    });
    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold" style={{ color: "var(--accent-gold)" }}>
            {editData ? "İşlemi Düzenle" : "Yeni İşlem Ekle"}
          </h2>
          <button onClick={onClose} className="btn-ghost text-xl px-3 py-1">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
            {["gider", "gelir"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
                style={
                  form.type === t
                    ? {
                        background: t === "gelir" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                        color: t === "gelir" ? "#4ade80" : "#f87171",
                        border: `1px solid ${t === "gelir" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                      }
                    : { color: "var(--text-secondary)" }
                }
              >
                {t === "gelir" ? "📈 Gelir" : "📉 Gider"}
              </button>
            ))}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              İşlem Başlığı
            </label>
            <input
              className="input-field"
              placeholder="örn. Aylık maaş, Market alışverişi..."
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Tutar (₺)
              </label>
              <input
                className="input-field font-mono"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Kategori
              </label>
              <select
                className="input-field"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Tarih
            </label>
            <input
              className="input-field"
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Not <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>(isteğe bağlı)</span>
            </label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Ek notunuz..."
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">İptal</button>
            <button type="submit" className="btn-gold flex-1">
              {editData ? "💾 Güncelle" : "➕ Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
