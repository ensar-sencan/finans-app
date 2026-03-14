export default function FilterBar({ filter, setFilter, searchTerm, setSearchTerm, count }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      {/* Search */}
      <div className="relative flex-1">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
          style={{ color: "var(--text-secondary)" }}
        >
          🔍
        </span>
        <input
          className="input-field pl-8"
          placeholder="İşlem ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div
        className="flex rounded-xl overflow-hidden p-1 gap-1"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {[
          { val: "hepsi", label: "Tümü" },
          { val: "gelir", label: "📈 Gelir" },
          { val: "gider", label: "📉 Gider" },
        ].map(({ val, label }) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={
              filter === val
                ? {
                    background: "var(--accent-gold)",
                    color: "#0a0a0f",
                  }
                : { color: "var(--text-secondary)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div
        className="flex items-center px-4 rounded-xl text-sm font-mono shrink-0"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        {count} kayıt
      </div>
    </div>
  );
}
