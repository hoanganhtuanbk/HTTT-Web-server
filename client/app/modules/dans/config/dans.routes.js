(function () {
  'use strict';
  angular
    .module('com.module.dans')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.dans', {
          abstract: true,
          url: '/dans',
          templateUrl: 'modules/dans/views/main.html'
        })
        .state('app.dans.list', {
          url: '',
          templateUrl: 'modules/dans/views/list.html',
          controllerAs: 'ctrl',
          controller: function (dans) {
            this.dans = dans;
          },
          resolve: {
            dans: function (DansService) {
              return DansService.getDans();
            }
          }
        })
        .state('app.dans.add', {
          url: '/add',
          templateUrl: 'modules/dans/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DansService, dan) {
            this.dan = dan;
            this.formFields = DansService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DansService.upsertDan(this.dan).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            dan: function () {
              return {};
            }
          }
        })
        .state('app.dans.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/dans/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, DansService, dan) {
            console.log(dan);
            this.dan = dan;
            this.formFields = DansService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              DansService.upsertDan(this.dan).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            dan: function ($stateParams, DansService) {
              return DansService.getDan($stateParams.id);
            }
          }
        })
        .state('app.dans.newList', {
          url: '/newList',
          templateUrl: 'modules/dans/views/newList.html',
          controllerAs: 'ctrl',
          controller: function ($state,$rootScope, $scope,DansService, Dan, uiGridConstants) {
            $scope.dataset = [];
            var loadData = function () {
              Dan.find({
                filter:{
                  where:{
                  }
                }
              }, function(result){
                console.log(result);
                for ( var x = 0; x < result.length; x ++){
                  var newRow = {
                    'idPig': result[x].idPig,
                    'idPigs':result[x].idPigs,
                    'startDate': result[x].startDate,
                    'endDate': result[x].endDate,
                    'status': result[x].status,
                    'weight': result[x].weight,
                    'registered': Date.now()
                  };
                  $scope.dataset.push(newRow)
                }
              });
            };

            loadData();

            $scope.gridOptions = {
              showGridFooter: true,
              showColumnFooter: true,
              enableFiltering: true,
              columnDefs: [
                {
                  displayName: 'Mã lợn',
                  field: 'idPig',
                  width: '10%'
                },
                {
                  displayName: 'Mã chuồng nuôi',
                  field: 'idPigs',
                  aggregationType: uiGridConstants.aggregationTypes.sum,
                  width: '20%'
                },
                {
                  displayName: 'Ngày nhập chuồng',
                  field: 'startDate',
                  aggregationType: uiGridConstants.aggregationTypes.avg,
                  aggregationHideLabel: true,
                  width: '20%',
                  cellFilter: 'date',
                  footerCellFilter: 'date'
                },
                {
                  displayName: 'Ngày xuất chuồng',
                  name: 'endDate',
                  field: 'endDate',
                  aggregationType: uiGridConstants.aggregationTypes.min,
                  width: '20%',
                  cellFilter: 'date',
                  footerCellFilter: 'date'
                },
                {
                  displayName: 'Tình trạng',
                  name: 'status',
                  field: 'status',
                  aggregationType: uiGridConstants.aggregationTypes.max,
                  width: '15%'
                },
                {
                  displayName: 'Cân nặng',
                  name: 'weight',
                  field: 'weight',
                  width: '15%',
                  footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color: Red;color: White">custom template</div>'
                }
              ],
              data: $scope.dataset,
              onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
              }
            };

          },
          resolve: {
            dan: function ($stateParams, DansService) {
            }
          }
        })
        .state('app.dans.view', {
          url: '/:id',
          templateUrl: 'modules/dans/views/view.html',
          controllerAs: 'ctrl',
          controller: function (dan) {
            this.dan = dan;
          },
          resolve: {
            dan: function ($stateParams, DansService) {
              return DansService.getdan($stateParams.id);
            }
          }
        })
        .state('app.dans.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, DansService, dan) {
            DansService.deleteDan(dan.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            dan: function ($stateParams, DansService) {
              return DansService.getDan($stateParams.id);
            }
          }
        });
    }
  );

})();
