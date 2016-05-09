(function () {
  'use strict';
  angular
    .module('com.module.exportCotes')
    .service('ExportCotesService', function ($state, CoreService, ExportCote, gettextCatalog) {

      this.getExportCotes = function () {
        return ExportCote.find().$promise;
      };

      this.getExportCote = function (id) {
        return ExportCote.findById({
          id: id
        }).$promise;
      };

      this.upsertExportCote = function (exportCote) {
        return ExportCote.upsert(exportCote).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('ExportCote saved'),
              gettextCatalog.getString('Your exportCote is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving exportCote '),
              gettextCatalog.getString('This exportCote could no be saved: ') + err
            );
          }
        );
      };

      this.deleteExportCote = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            ExportCote.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('ExportCote deleted'),
                gettextCatalog.getString('Your exportCote is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting exportCote'),
                gettextCatalog.getString('Your exportCote is not deleted! ') + err);
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
            key: 'idUser',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Mã nhân viên'),
              required: true
            }
          },
          {
            key: 'userName',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Họ và tên'),
              required: true
            }
          },
          {
            key: 'companyName',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Tên công ty ')
            }
          },
          {
            key: 'dateExport',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Ngày xuất chuồng')
            }
          },
          {
            key: 'numberDan',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Số lượng (con) ')
            }
          },
          {
            key: 'price',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Tổng tiền')
            }
          }
        ];
      };

    });

})();
