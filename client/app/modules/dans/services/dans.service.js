(function () {
  'use strict';
  angular
    .module('com.module.dans')
    .service('DansService', function ($state, CoreService, Dan, gettextCatalog) {

      this.getDans = function () {
        return Dan.find().$promise;
      };

      this.getDan = function (id) {
        return Dan.findById({
          id: id
        }).$promise;
      };

      this.upsertDan = function (dan) {
        return Dan.upsert(dan).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Dan saved'),
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

      this.deleteDan = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Dan.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Dan deleted'),
                gettextCatalog.getString('Your dan is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting dan'),
                gettextCatalog.getString('Your dan is not deleted! ') + err);
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
            key: 'idPig',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mã lợn'),
              required: true
            }
          },
          {
            key: 'idPigs',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Mã chuồng nuôi'),
              required: true
            }
          },
          {
            key: 'startDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Ngày nhập chuồng'),
              required: true
            }
          },
          {
            key: 'endDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Ngày xuất chuồng'),
              required: true
            }
          },
          {
            key: 'status',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Tình trạng'),
              required: true
            }
          },
          {
            key: 'weight',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Cân nặng'),
              required: true
            }
          }
        ];
      };

    });

})();
