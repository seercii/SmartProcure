const cds = require('@sap/cds');
require('dotenv').config();

module.exports = cds.service.impl(async function () {

  const { Suppliers, PurchaseOrders, AIAnalyses } = this.entities;

  this.on('analyzeSupplier', 'Suppliers', async (req) => {
    const supplierID = req.params[0].ID || req.params[0];
    console.log('SUPPLIER ID:', supplierID);

    const found = await SELECT.one.from(Suppliers).where({ ID: supplierID });
    console.log('FOUND:', JSON.stringify(found));

    if (!found) return req.error(404, 'Supplier not found');

    const orders = await SELECT.from(PurchaseOrders)
      .where({ supplier_ID: supplierID });

    const totalSpend = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const orderCount = orders.length;

    const prompt = `Sen bir SAP satın alma uzmanısın. Aşağıdaki tedarikçiyi analiz et:

Tedarikçi Adı: ${found.name}
Ülke: ${found.country}
Kategori: ${found.category}
Mevcut Risk Skoru: ${found.riskScore}/100
Toplam Sipariş Sayısı: ${orderCount}
Toplam Harcama: ${totalSpend}

Lütfen şunları belirt:
1. Risk seviyesi (DÜŞÜK / ORTA / YÜKSEK)
2. Neden bu risk seviyesinde?
3. Önerilen aksiyon
4. Alternatif tedarikçi stratejisi

Kısa ve net cevap ver, madde madde.`;

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1024
          })
        }
      );

      console.log('STATUS:', response.status);
      const data = await response.json();
      console.log('GROQ:', JSON.stringify(data).substring(0, 300));

      const responseText = data.choices?.[0]?.message?.content || 'Analiz yapılamadı';
      const riskLevel = responseText.includes('YÜKSEK') ? 'HIGH'
        : responseText.includes('ORTA') ? 'MEDIUM' : 'LOW';

      await INSERT.into(AIAnalyses).entries({
        ID: cds.utils.uuid(),
        supplier_ID: supplierID,
        analysisDate: new Date().toISOString(),
        riskLevel,
        recommendation: responseText,
        rawResponse: responseText
      });

      return { riskLevel, recommendation: responseText };

    } catch (err) {
      console.log('HATA:', err.message);
      return { riskLevel: 'ERROR', recommendation: err.message };
    }
  });

  this.on('comparePurchaseOrders', async (req) => {
    const { orderIDs } = req.data;

    const orders = await SELECT.from(PurchaseOrders)
      .where({ ID: { in: orderIDs } });

    const ordersText = orders.map(o =>
      `Sipariş: ${o.orderNumber}, Tutar: ${o.totalAmount} ${o.currency}, Durum: ${o.status}`
    ).join('\n');

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{
              role: 'user',
              content: `Bu satın alma siparişlerini karşılaştır ve özet çıkar:\n${ordersText}`
            }],
            max_tokens: 1024
          })
        }
      );

      const data = await response.json();
      const summary = data.choices?.[0]?.message?.content || 'Karşılaştırma yapılamadı';
      return { summary };

    } catch (err) {
      console.log('HATA:', err.message);
      return { summary: err.message };
    }
  });
});