(function () {
  'use strict';
  angular
    .module('com.module.foods')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.foods', {
          abstract: true,
          url: '/foods',
          templateUrl: 'modules/foods/views/main.html'
        })
        .state('app.foods.list', {
          url: '',
          templateUrl: 'modules/foods/views/list.html',
          controllerAs: 'ctrl',
          controller: function (foods) {
            this.foods = foods;
          },
          resolve: {
            foods: function (FoodsService) {
              return FoodsService.getFoods();
            }
          }
        })
        .state('app.foods.add', {
          url: '/add',
          templateUrl: 'modules/foods/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FoodsService, food) {
            this.food = food;
            this.formFields = FoodsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              FoodsService.upsertFood(this.food).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            food: function () {
              return {};
            }
          }
        })
        .state('app.foods.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/foods/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, FoodsService, food) {
            console.log(food);
            this.food = food;
            this.formFields = FoodsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              FoodsService.upsertFood(this.food).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            food: function ($stateParams, FoodsService) {
              return FoodsService.getFood($stateParams.id);
            }
          }
        })
        .state('app.foods.newList', {
          url: '/newList',
          templateUrl: 'modules/foods/views/newList.html',
          controllerAs: 'ctrl',
          controller: function ($state,$rootScope, $scope,FoodsService, Food, uiGridConstants) {
            $scope.dataset = [];
            var loadData = function () {
              Food.find({
                filter:{
                  where:{
                  }
                }
              }, function(result){
                console.log(result);
                for ( var x = 0; x < result.length; x ++){
                  var newRow = {
                    'idFood': result[x].idFood,
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
                  field: 'idFood',
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
            food: function ($stateParams, FoodsService) {
            }
          }
        })

        .state('app.foods.view', {
          url: '/:id',
          templateUrl: 'modules/foods/views/view.html',
          controllerAs: 'ctrl',
          controller: function (food) {
            this.food = food;
          },
          resolve: {
            food: function ($stateParams, FoodsService) {
              return FoodsService.getFood($stateParams.id);
            }
          }
        })
        .state('app.foods.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, FoodsService, food) {
            FoodsService.deleteFood(food.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            food: function ($stateParams, FoodsService) {
              return FoodsService.getFood($stateParams.id);
            }
          }
        });
    }
  );

})();
