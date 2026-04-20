# SmartProcure — AI-Powered Procurement on SAP BTP

> SAP BTP üzerinde çalışan, AI destekli akıllı satın alma yönetimi uygulaması

## Özellikler

- **SAP CAP Backend:** Node.js + CDS ile OData v4 servisleri
- **SAP Fiori Elements:** Responsive tedarikçi yönetim arayüzü
- **AI Entegrasyonu:** Groq (Llama 3.3) ile otomatik tedarikçi risk analizi
- **Gerçek Zamanlı Analiz:** Tedarikçi verilerine göre DÜŞÜK/ORTA/YÜKSEK risk değerlendirmesi

## Teknoloji Stack

- **Backend:** SAP CAP (Cloud Application Programming Model)
- **Frontend:** SAP Fiori Elements + UI5
- **AI:** Groq API (Llama 3.3-70B)
- **Deployment:** SAP BTP Cloud Foundry

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
echo "GROQ_API_KEY=your_api_key_here" > .env

# Uygulamayı çalıştır
cds watch
```

Tarayıcıda: `http://localhost:4004`

## Kullanım

1. Tedarikçi listesinden bir tedarikçi seç
2. Detay sayfasında sağ alttaki **"AI ile Analiz Et"** butonuna tıkla
3. AI saniyeler içinde risk analizi ve öneriler sunar

## 📊 Mimari
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│ Fiori UI    │─────▶│  CAP Backend │─────▶│  Groq AI    │
│ (UI5)       │      │  (Node.js)   │      │  (Llama 3.3)│
└─────────────┘      └──────────────┘      └─────────────┘
│
▼
┌──────────────┐
│ HANA Cloud   │
└──────────────┘

## Geliştirici

**Sercan Gure**
- LinkedIn: https://www.linkedin.com/in/sercan-gure/
- SAP Fiori / ABAP Developer

## Lisans

MIT License
