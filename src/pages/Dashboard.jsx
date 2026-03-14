import { useState } from "react";
import SummaryCards from "../components/SummaryCards";
import TransactionItem from "../components/TransactionItem";
import TransactionForm from "../components/TransactionForm";
import FilterBar from "../components/FilterBar";
import CategoryChart from "../components/CategoryChart";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

// Sample data
const SAMPLE_TRANSACTIONS = [
  { id: "1", title: "Aylık Maaş", amount: 25000, type: "gelir", category: "maas", date: "2025-03-01", note: "Mart ayı maaşı" },
  { id: "2", title: "Market Alışverişi", amount: 850, type: "gider", category: "market", date: "2025-03-03", note: "" },
  { id: "3", title: "Elektrik Faturası", amount: 420, type: "gider", category: "fatura", date: "2025-03-05", note: "" },
  { id: "4", title: "Freelance Proje", amount: 5000, type: "gelir", category: "freelance", date: "2025-03-08", note: "Logo tasarımı" },
  { id: "5", title: "Restoran", amount: 350, type: "gider", category: "yemek", date: "2025-03-10", note: "Arkadaş yemeği" },
  { id: "6", title: "Toplu Taşıma", amount: 200, type: "gider", category: "ulasim", date: "2025-03-12", note: "" },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("hepsi");
  const [searchTerm, setSearchTerm] = useState("");

  // CREATE / UPDATE
  const handleSave = (data) => {
    setTransactions((prev) => {
      const exists = prev.find((t) => t.id === data.id);
      if (exists) return prev.map((t) => (t.id === data.id ? data : t));
      return [data, ...prev];
    });
    setEditData(null);
  };

  // DELETE
  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setDeleteId(null);
  };

  // EDIT
  const handleEdit = (t) => {
    setEditData(t);
    setShowForm(true);
  };

  // FILTER + SEARCH
  const filtered = transactions
    .filter((t) => (filter === "hepsi" ? true : t.type === filter))
    .filter((t) =>
      searchTerm
        ? t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.note?.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--accent-gold)" }}>
            FinansApp
          </h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Kişisel Bütçe Takibi
          </p>
        </div>
        <button
          className="btn-gold flex items-center gap-2"
          onClick={() => { setEditData(null); setShowForm(true); }}
        >
          <span className="text-lg">+</span>
          <span className="hidden sm:inline">İşlem Ekle</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Chart + Transactions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              İşlem Geçmişi
            </h2>

            <FilterBar
              filter={filter}
              setFilter={setFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              count={filtered.length}
            />

            {filtered.length === 0 ? (
              <div
                className="card flex flex-col items-center justify-center py-16"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="text-5xl mb-4">🔍</span>
                <p className="font-medium">İşlem bulunamadı</p>
                <p className="text-sm mt-1">Yeni işlem eklemek için sağ üstteki butonu kullanın</p>
              </div>
            ) : (
              <div>
                {filtered.map((t) => (
                  <TransactionItem
                    key={t.id}
                    transaction={t}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteId(id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="lg:col-span-1">
            <h2
              className="font-display text-xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Analiz
            </h2>
            <CategoryChart transactions={transactions} />

            {/* Quick Stats */}
            <div className="card p-5 mt-4">
              <h4 className="font-semibold text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                ÖZET
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Toplam İşlem", val: transactions.length },
                  {
                    label: "Gelir İşlemi",
                    val: transactions.filter((t) => t.type === "gelir").length,
                  },
                  {
                    label: "Gider İşlemi",
                    val: transactions.filter((t) => t.type === "gider").length,
                  },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {label}
                    </span>
                    <span className="font-mono font-semibold text-sm" style={{ color: "var(--accent-gold)" }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showForm && (
        <TransactionForm
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditData(null); }}
          editData={editData}
        />
      )}

      {deleteId && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
