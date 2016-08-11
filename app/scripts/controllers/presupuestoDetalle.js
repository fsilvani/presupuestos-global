'use strict';

angular.module('presupuestosAngularApp')
  .controller('PresupuestoDetalleCtrl', function ($scope, $http, $routeParams, ngDialog) {
    this.sectionTitle = 'Detalle de Presupuesto Id# ' + $routeParams.budgetId;
    this.titleIsVisible = true;

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('http://localhost:8080/api/presupuestos/get/' + $routeParams.budgetId)
      .success(function(data) {
        $scope.presupuesto = data;
      })
      .error(function(data) {
        console.log('Error: ', data);
    });

    $scope.getToday = () => (new Date());

    $scope.sendEmail = function(){
      console.log('prueba');
    }

  });
