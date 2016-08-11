'use strict';

angular.module('presupuestosAngularApp')
  .controller('PresupuestosCtrl', function ($scope, $http, $timeout, ngDialog) {
    this.sectionTitle = 'Listado de Presupuestos';
    this.titleIsVisible = true;
    var me = this;

    $scope.clientes = [];
    this.getClients = function(){
      $http.get('http://localhost:8080/api/clientes/get')
        .success(function(data) {
            $scope.clientes = data;
            me.getAllBudgets();
        })
        .error(function(data) {
            console.log('Error: ', data);
      });
    }
    this.getClients();

    $scope.presupuestosList = [];
    this.getAllBudgets = function(){
      $http.get('http://localhost:8080/api/presupuestos/get')
        .success(function(data) {
          $scope.presupuestosList = data;
        })
        .error(function(data) {
            console.log('Error: ', data);
      });
    }

    this.eliminarPresupuesto = function(budgetId){

      $scope.dialog = {
        title: '¿Estás seguro?',
        text: 'Estás por eliminar el presupuesto #' + budgetId + '. <br> Esta acción no se puede deshacer',
        icon: 'exclamation-sign'
      };
      ngDialog.openConfirm({
        template: 'views/mensaje.html',
        className: 'ngdialog-theme-default',
        scope: $scope
      }).then( function(data){
        $http.delete('http://localhost:8080/api/presupuestos/delete/' + budgetId)
        .success(function(data) {
          me.getAllBudgets();
        })
        .error(function(data) {
          console.log('Error: ', data);
        });
      });

    }
  });
