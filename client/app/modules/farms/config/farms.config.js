(function () {
  'use strict';
  angular
    .module('com.module.farms')
    .run(function ($rootScope, Farm, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Quản lý chuồng trại'), 'app.farms.list', 'fa-calendar-o');

      Farm.find(function (data) {
        $rootScope.addDashboardBox('Quản lý chuồng trại ', 'bg-purple', 'ion-calendar', data.length, 'app.farms.list');
      });

    });

})();
