'use strict';

angular.module('presupuestosAngularApp')
  .controller('ClientesAddCtrl', function ($scope, $http, $location) {
    this.sectionTitle = 'Nuevo Cliente';
    this.titleIsVisible = true;

    $scope.cliente = {
      'clientName': '',
      'clientPayments': [],
      'clientBalance': 0,
      'clientAdress': "",
      'clientTelephone': "",
      'clientNotes': ""
    };

    this.getNewClient = function() {
      return {
        'clientName': $scope.cliente.clientName,
        'clientPayments': $scope.cliente.clientPayments,
        'clientBalance': $scope.cliente.clientBalance,
        'clientAdress': $scope.cliente.clientAdress,
        'clientTelephone': $scope.cliente.clientTelephone,
        'clientNotes': $scope.cliente.clientNotes
      };
    }

    this.validarCampos = function() {
      if ($scope.cliente.clientName.length < 3) {
        console.log('Nombre inválido');
        return false;
      }
      if (Number($scope.cliente.clientBalance) == NaN) {
        console.log('Deuda inválida');
        return false;
      }
      if ($scope.cliente.clientAdress.length < 3) {
        console.log('Dirección inválida');
        return false;
      }
      if ($scope.cliente.clientTelephone.length < 3) {
        console.log('Teléfono inválido');
        return false;
      }
      return true;
    }

    this.guardarCliente = function(){
      var clientToPost = this.getNewClient()
      if (this.validarCampos()) {
        $http.post('http://localhost:8080/api/clientes/post', clientToPost)
        .then(
          function(data) {
            $scope.presupuestosList = data;
            console.log(data);
            $location.url("/clientes");
        }, function(error) {
            console.log('Error: ', error);
        });
      }
    }

  });
