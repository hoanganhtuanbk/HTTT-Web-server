(function () {
  'use strict';
  angular
    .module('com.module.foods')
    .run(function ($rootScope, Food, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Quản lý thức ăn'), 'app.foods.list', 'fa-calendar-o');

      Food.find(function (data) {
        $rootScope.addDashboardBox('Quản lý thức ăn ', 'bg-purple', 'ion-calendar', data.length, 'app.foods.list');
      });

    });

})();
