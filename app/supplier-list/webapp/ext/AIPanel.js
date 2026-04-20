sap.ui.define([
  "sap/ui/core/mvc/XMLView",
  "sap/fe/core/ExtensionAPI",
  "sap/m/MessageToast"
], function (XMLView, ExtensionAPI, MessageToast) {
  "use strict";

  return {
    onAnalyzeSupplier: async function (oEvent) {
      const oView = this.getView ? this.getView() : oEvent.getSource().getParent().getParent();
      const oContext = oView.getBindingContext();

      if (!oContext) {
        MessageToast.show("Tedarikçi bulunamadı.");
        return;
      }

      const sSupplierID = oContext.getProperty("ID");
      const oModel = oContext.getModel();

      MessageToast.show("AI analiz yapıyor...");

      try {
        const oOperation = oModel.bindContext("/analyzeSupplier(...)");
        oOperation.setParameter("supplierID", sSupplierID);
        await oOperation.execute();

        const oResult = oOperation.getBoundContext().getObject();
        const sText = oResult.recommendation || "Sonuç yok";
        const sRisk = oResult.riskLevel || "LOW";

        const stateMap = { HIGH: "YÜKSEK RİSK 🔴", MEDIUM: "ORTA RİSK 🟡", LOW: "DÜŞÜK RİSK 🟢" };

        const oPanel = oView.byId("aiResultPanel");
        const oText = oView.byId("aiResultText");
        const oStatus = oView.byId("riskStatus");

        if (oPanel && oText && oStatus) {
          oStatus.setText(stateMap[sRisk] || sRisk);
          oText.setHtmlText(sText.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"));
          oPanel.setVisible(true);
        }

        MessageToast.show("Analiz tamamlandı!");

      } catch (err) {
        console.error("AI Hata:", err);
        MessageToast.show("Hata: " + err.message);
      }
    }
  };
});