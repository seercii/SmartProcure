using smartprocure as db from '../db/schema';

service ProcurementService @(path:'/procurement') {

  entity Suppliers as projection on db.Supplier
    actions {
      action analyzeSupplier() returns {
        riskLevel     : String;
        recommendation: String;
      };
    };

  entity PurchaseOrders as projection on db.PurchaseOrder;
  entity POItems as projection on db.POItem;
  entity AIAnalyses as projection on db.AIAnalysis;

  action comparePurchaseOrders(orderIDs: array of String) returns {
    summary: String;
  };
}