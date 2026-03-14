export default function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-box text-center"
        style={{ maxWidth: 380 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🗑️</div>
        <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          İşlemi Sil
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Bu işlemi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-ghost flex-1">
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "rgba(239,68,68,0.15)",
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.3)",
            }}
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
}
