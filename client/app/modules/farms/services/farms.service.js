(function () {
  'use strict';
  angular
    .module('com.module.farms')
    .service('FarmsService', function ($state, CoreService, Farm, gettextCatalog) {

      this.getFarms = function () {
        return Farm.find().$promise;
      };

      this.getFarm = function (id) {
        return Farm.findById({
          id: id
        }).$promise;
      };

      this.upsertFarm = function (dan) {
        return Farm.upsert(dan).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Farm saved'),
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

      this.deleteFarm = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Farm.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Farm deleted'),
                gettextCatalog.getString('Your farm is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting farm'),
                gettextCatalog.getString('Your farm is not deleted! ') + err);
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
              label: gettextCatalog.getString('Mã chuồng nuôi'),
              required: true
            }
          },
          {
            key: 'idStaff',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mã nhân viên'),
              required: true
            }
          },
          {
            key: 'startDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Ngày tạo chuồng'),
              required: true
            }
          },
          {
            key: 'endDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Ngày đóng chuồng'),
              required: true
            }
          },
          {
            key: 'numberPig',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Số lượng cá thể '),
              required: true
            }
          }
        ];
      };

    });

})();
