(function () {
  'use strict';
  angular
    .module('com.module.exportCotes')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.exportCotes', {
          abstract: true,
          url: '/exportCotes',
          templateUrl: 'modules/exportCotes/views/main.html'
        })
        .state('app.exportCotes.list', {
          url: '',
          templateUrl: 'modules/exportCotes/views/list.html',
          controllerAs: 'ctrl',
          controller: function (exportCotes) {
            this.exportCotes = exportCotes;
          },
          resolve: {
            exportCotes: function (ExportCotesService) {
              return ExportCotesService.getExportCotes();
            }
          }
        })
        .state('app.exportCotes.add', {
          url: '/add',
          templateUrl: 'modules/exportCotes/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ExportCotesService, exportCote) {
            this.exportCote = exportCote;
            this.formFields = ExportCotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ExportCotesService.upsertExportCote(this.exportCote).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            exportCote: function () {
              return {};
            }
          }
        })
        .state('app.exportCotes.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/exportCotes/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ExportCotesService, exportCote) {
            console.log(exportCote);
            this.exportCote = exportCote;
            this.formFields = ExportCotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ExportCotesService.upsertExportCote(this.exportCote).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            exportCote: function ($stateParams, ExportCotesService) {
              return ExportCotesService.getExportCote($stateParams.id);
            }
          }
        })
        .state('app.exportCotes.view', {
          url: '/:id',
          templateUrl: 'modules/exportCotes/views/view.html',
          controllerAs: 'ctrl',
          controller: function (exportCote) {
            this.exportCote = exportCote;
          },
          resolve: {
            exportCote: function ($stateParams, ExportCotesService) {
              return ExportCotesService.getExportCote($stateParams.id);
            }
          }
        })
        .state('app.exportCotes.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ExportCotesService, exportCote) {
            ExportCotesService.deleteExportCote(exportCote.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            exportCote: function ($stateParams, ExportCotesService) {
              return ExportCotesService.getExportCote($stateParams.id);
            }
          }
        });
    }
  );

})();
