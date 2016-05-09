(function () {
  'use strict';
  angular
    .module('com.module.farms')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.farms', {
          abstract: true,
          url: '/farms',
          templateUrl: 'modules/farms/views/main.html'
        })
        .state('app.farms.list', {
          url: '',
          templateUrl: 'modules/farms/views/list.html',
          controllerAs: 'ctrl',
          controller: function (farms) {
            this.farms = farms;
          },
          resolve: {
            farms: function (FarmsService) {
              return FarmsService.getFarms();
            }
          }
        })
        .state('app.farms.add', {
          url: '/add',
          templateUrl: 'modules/farms/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FarmsService, farm) {
            this.farm = farm;
            this.formFields = FarmsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              FarmsService.upsertFarm(this.farm).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            farm: function () {
              return {};
            }
          }
        })
        .state('app.farms.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/farms/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FarmsService, farm) {
            console.log(farm);
            this.farm = farm;
            this.formFields = FarmsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              FarmsService.upsertFarm(this.farm).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            farm: function ($stateParams, FarmsService) {
              return FarmsService.getFarm($stateParams.id);
            }
          }
        })
        .state('app.farms.newList', {
          url: '/newList',
          templateUrl: 'modules/farms/views/newList.html',
          controllerAs: 'ctrl',
          controller: function ($state,$rootScope, $scope,FarmsService, Farm, uiGridConstants) {
            $scope.dataset = [];
            var loadData = function () {
              Farm.find({
                filter:{
                  where:{
                  }
                }
              }, function(result){
                console.log(result);
                for ( var x = 0; x < result.length; x ++){
                  var newRow = {
                    'idFarm': result[x].idFarm,
                    'idStaff':result[x].idStaff,
                    'startDate': result[x].startDate,
                    'endDate': result[x].endDate,
                    'numberPig': result[x].numberPig,
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
                  displayName: 'Mã chuồn nuôi ',
                  field: 'idFarm',
                  width: '20%'
                },
                {
                  displayName: 'Mã nhân viên',
                  field: 'idStaff',
                  aggregationType: uiGridConstants.aggregationTypes.sum,
                  width: '20%'
                },
                {
                  displayName: 'Ngày tạo chuồng',
                  field: 'startDate',
                  aggregationType: uiGridConstants.aggregationTypes.avg,
                  aggregationHideLabel: true,
                  width: '20%',
                  cellFilter: 'date',
                  footerCellFilter: 'date'
                },
                {
                  displayName: 'Ngày đóng chuồng',
                  name: 'endDate',
                  field: 'endDate',
                  aggregationType: uiGridConstants.aggregationTypes.min,
                  width: '20%',
                  cellFilter: 'date',
                  footerCellFilter: 'date'
                },
                {
                  displayName: 'Số lượng cá thể',
                  name: 'numberPig',
                  field: 'numberPig',
                  aggregationType: uiGridConstants.aggregationTypes.max,
                  width: '20%'
                }
              ],
              data: $scope.dataset,
              onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
              }
            };

          },
          resolve: {
            farm: function ($stateParams, FarmsService) {
            }
          }
        })
        .state('app.farms.view', {
          url: '/:id',
          templateUrl: 'modules/farms/views/view.html',
          controllerAs: 'ctrl',
          controller: function (farm) {
            this.farm = farm;
          },
          resolve: {
            farm: function ($stateParams, FarmsService) {
              return FarmsService.getFarm($stateParams.id);
            }
          }
        })
        .state('app.farms.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, FarmsService, farm) {
            FarmsService.deleteFarm(farm.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            farm: function ($stateParams, FarmsService) {
              return FarmsService.getFarm($stateParams.id);
            }
          }
        });
    }
  );

})();
