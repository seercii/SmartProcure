sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"smartprocure/supplierlist/test/integration/pages/SuppliersList",
	"smartprocure/supplierlist/test/integration/pages/SuppliersObjectPage"
], function (JourneyRunner, SuppliersList, SuppliersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('smartprocure/supplierlist') + '/test/flp.html#app-preview',
        pages: {
			onTheSuppliersList: SuppliersList,
			onTheSuppliersObjectPage: SuppliersObjectPage
        },
        async: true
    });

    return runner;
});

