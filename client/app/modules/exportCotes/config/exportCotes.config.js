(function () {
  'use strict';
  angular
    .module('com.module.exportCotes')
    .run(function ($rootScope, ExportCote, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Quản lý xuất chuồng'), 'app.exportCotes.list', 'fa-calendar-o');

      ExportCote.find(function (data) {
        $rootScope.addDashboardBox('ExportCotes', 'bg-purple', 'ion-calendar', data.length, 'app.exportCotes.list');
      });

    });

})();
