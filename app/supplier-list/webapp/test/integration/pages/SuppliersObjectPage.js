sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'smartprocure.supplierlist',
            componentId: 'SuppliersObjectPage',
            contextPath: '/Suppliers'
        },
        CustomPageDefinitions
    );
});