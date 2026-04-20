using ProcurementService from './procurement-service';

annotate ProcurementService.Suppliers with @(
  UI.HeaderInfo: {
    TypeName: 'Tedarikçi',
    TypeNamePlural: 'Tedarikçiler',
    Title: { Value: name },
    Description: { Value: category }
  },
  UI.LineItem: [
    { Value: name,      Label: 'Tedarikçi Adı' },
    { Value: country,   Label: 'Ülke' },
    { Value: category,  Label: 'Kategori' },
    { Value: riskScore, Label: 'Risk Skoru' },
    { Value: email,     Label: 'E-posta' }
  ],
  UI.Facets: [
    {
      $Type: 'UI.ReferenceFacet',
      Label: 'Tedarikçi Bilgileri',
      Target: '@UI.FieldGroup#Contact'
    },
    {
      $Type: 'UI.ReferenceFacet',
      Label: 'Risk Bilgileri',
      Target: '@UI.FieldGroup#Risk'
    }
  ],
  UI.FieldGroup#Contact: {
    Data: [
      { Value: name,    Label: 'Tedarikçi Adı' },
      { Value: country, Label: 'Ülke' },
      { Value: category,Label: 'Kategori' },
      { Value: email,   Label: 'E-posta' },
      { Value: phone,   Label: 'Telefon' }
    ]
  },
  UI.FieldGroup#Risk: {
    Data: [
      { Value: riskScore, Label: 'Risk Skoru' },
      { Value: createdAt, Label: 'Kayıt Tarihi' }
    ]
  }
);