namespace smartprocure;

entity Supplier {
  key ID       : String(10);
  name         : String(100);
  country      : String(50);
  riskScore    : Integer;
  category     : String(50);
  email        : String(100);
  phone        : String(30);
  createdAt    : DateTime;
}

entity PurchaseOrder {
  key ID         : String(10);
  orderNumber    : String(20);
  supplier       : Association to Supplier;
  totalAmount    : Decimal(15,2);
  currency       : String(3);
  status         : String(20);
  requestedBy    : String(100);
  createdAt      : DateTime;
  items          : Composition of many POItem on items.order = $self;
}

entity POItem {
  key ID       : String(10);
  order        : Association to PurchaseOrder;
  description  : String(200);
  quantity     : Integer;
  unitPrice    : Decimal(10,2);
  currency     : String(3);
}

entity AIAnalysis {
  key ID          : String(10);
  supplier        : Association to Supplier;
  analysisDate    : DateTime;
  riskLevel       : String(20);
  recommendation  : LargeString;
  rawResponse     : LargeString;
}