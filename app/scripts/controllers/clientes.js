'use strict';

angular.module('presupuestosAngularApp')
  .controller('ClientesCtrl', function ($scope, $http, $timeout, ngDialog) {
    this.sectionTitle = 'Listado de Clientes';
    this.titleIsVisible = true;

    this.getAllClients = function(){
      $http.get('http://localhost:8080/api/clientes/get')
        .success(function(data) {
            $scope.clientsList = data;
        })
        .error(function(data) {
            console.log('Error: ', data);
      });
    };
    var me = this;
    $timeout(function(){
      me.getAllClients();
    }, 0);

    this.eliminarCliente = function(clientId){
      $scope.dialog = {
        title: '¿Estás seguro?',
        text: 'Estás por eliminar el cliente #' + clientId + '. <br> Esta acción no se puede deshacer',
        icon: 'exclamation-sign'
      };
      ngDialog.openConfirm({
        template: 'views/mensaje.html',
        className: 'ngdialog-theme-default',
        scope: $scope
      }).then( function(){
        $http.delete('http://localhost:8080/api/clientes/delete/' + clientId)
        .success(function() {
          me.getAllClients();
        })
        .error(function(data) {
          console.log('Error: ', data);
        });
      });
    };
  });
