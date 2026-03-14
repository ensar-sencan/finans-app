# 💰 Kişisel Finans Yönetim Uygulaması

Modern ve kullanıcı dostu bir kişisel bütçe takip uygulaması. Gelir ve giderlerinizi kolayca yönetin, kategorize edin ve özet raporları görüntüleyin.

## 🔗 Canlı Demo

👉 [https://69b4ac56f91a716fd551aa0c--guileless-stardust-61c8d2.netlify.app](https://69b4ac56f91a716fd551aa0c--guileless-stardust-61c8d2.netlify.app)

---

## ✨ Özellikler

- ➕ **Gelir/Gider Ekleme** — Kategori, tarih ve not ile işlem ekle
- 📋 **İşlem Listeleme** — Tüm işlemleri tarihe göre sıralı listele
- ✏️ **İşlem Güncelleme** — Mevcut işlemleri düzenle
- 🗑️ **İşlem Silme** — Onay modalı ile güvenli silme
- 🔍 **Arama & Filtreleme** — İsme göre ara, türe göre filtrele
- 📊 **Kategori Grafiği** — Gider dağılımını pasta grafikte gör
- 💼 **Özet Kartları** — Toplam gelir, gider ve net bakiye

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool |
| [Tailwind CSS](https://tailwindcss.com/) | CSS framework |
| [Recharts](https://recharts.org/) | Grafik kütüphanesi |

---

## 📁 Proje Yapısı

```
finans-app/
├── src/
│   ├── components/
│   │   ├── TransactionForm.jsx     # ➕ Ekle / ✏️ Güncelle formu
│   │   ├── TransactionItem.jsx     # 📋 Tek işlem satırı + 🗑️ Sil
│   │   ├── SummaryCards.jsx        # Gelir / Gider / Bakiye kartları
│   │   ├── CategoryChart.jsx       # Pasta grafik (Recharts)
│   │   ├── FilterBar.jsx           # Arama ve filtreleme
│   │   └── DeleteConfirmModal.jsx  # Silme onay modalı
│   ├── pages/
│   │   └── Dashboard.jsx           # Ana sayfa (tüm state burada)
│   ├── interfaces/
│   │   └── index.js                # Kategori & tip tanımları
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml                    # Netlify deploy ayarı
└── package.json
```

---

## ⚙️ Kurulum & Çalıştırma

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/finans-app.git

# 2. Klasöre gir
cd finans-app

# 3. Bağımlılıkları yükle
npm install

# 4. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

---

## 🏗️ Build & Deploy

```bash
# Production build al
npm run build

# Build önizleme
npm run preview
```

Proje [Netlify](https://netlify.com) üzerinde otomatik deploy için `netlify.toml` ile yapılandırılmıştır.

---

## 📋 Proje Gereksinimleri

Bu proje, Web Geliştirme — Javascript eğitim programı kapsamında hazırlanmıştır.

| Gereksinim | Durum |
|---|---|
| Modern JS framework (ReactJS) | ✅ |
| Tailwind CSS | ✅ |
| Components / Pages / Interfaces klasörleri | ✅ |
| **Ekle** işlemi (Create) | ✅ |
| **Listeleme** işlemi (Read) | ✅ |
| **Güncelleme** işlemi (Update) | ✅ |
| **Silme** işlemi (Delete) | ✅ |
| Netlify ile yayına alma | ✅ |
| GitHub'da public repo | ✅ |

---

## 👤 Geliştirici

**Ensar Şencan**
- GitHub: [@ensar-sencan](https://github.com/ensar-sencan)

---

## 📄 Lisans

MIT License
