(function () {
  'use strict';
  angular
    .module('com.module.dans')
    .run(function ($rootScope, Dan, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Quản lý cá thể'), 'app.dans.list', 'fa-calendar-o');

      Dan.find(function (data) {
        $rootScope.addDashboardBox('Quản lý cá thể ', 'bg-purple', 'ion-calendar', data.length, 'app.dans.list');
      });

    });

})();
