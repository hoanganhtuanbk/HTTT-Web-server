(function () {
  'use strict';
  angular
    .module('com.module.foods')
    .service('FoodsService', function ($state, CoreService, Food, gettextCatalog) {

      this.getFoods = function () {
        return Food.find().$promise;
      };

      this.getFood = function (id) {
        return Food.findById({
          id: id
        }).$promise;
      };

      this.upsertFood = function (dan) {
        return Food.upsert(dan).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Food saved'),
              gettextCatalog.getString('Your dan is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving dan '),
              gettextCatalog.getString('This dan could no be saved: ') + err
            );
          }
        );
      };

      this.deleteFood = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Food.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Food deleted'),
                gettextCatalog.getString('Your food is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting food'),
                gettextCatalog.getString('Your food is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'idFarm',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mã đàn lợn '),
              required: true
            }
          },
          {
            key: 'typeFood',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Loại thức ăn '),
              required: true
            }
          },
          {
            key: 'numberFood',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Số lượng '),
              required: true
            }
          },
          {
            key: 'units',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Đơn vị'),
              required: true
            }
          }
        ];
      };

    });

})();
