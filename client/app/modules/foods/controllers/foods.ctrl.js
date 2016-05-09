/**
 * Created by tuanpham on 3/13/16.
 */
(function () {
  'use strict';
  angular
    .module('com.module.foods')
    .controller(function ($rootScope,$scope, Food) {
    Food.find({
      filter:{
        where:{

        }
      }
    }, function(result){
      $scope.food = result
    })

    });

})();
