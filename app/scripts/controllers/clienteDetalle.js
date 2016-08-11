'use strict';

angular.module('presupuestosAngularApp')
  .controller('ClienteDetalleCtrl', function ($scope, $http, $routeParams) {
    this.sectionTitle = 'Detalle de Cliente Id#: ' + $routeParams.clientId;
    this.titleIsVisible = true;
    var me = this;
    $scope.clientDetailShowing = 'pagos';

    $scope.changeClientDetail = function(section){
      $scope.clientDetailShowing = section;
    }

    $scope.pago = {
      "paymentMount": 0,
      "client": '',
      "paymentDate": new Date(),
      "paymentMethod": '',
      "paymentNotes": ''
    }

    // Cuando se cargue la página, pide del API todos los TODOs
    this.obtenerClientes = function(){
      $http.get('http://localhost:8080/api/clientes/get/' + $routeParams.clientId)
      .success(function(data) {
        $scope.cliente = data;
      })
      .error(function(data) {
        console.log('Error: ', data);
      });
    }
    this.obtenerClientes();

    this.validarPago = function(){
      if($scope.pago.paymentMount <= 0){
        console.log('Monto incorrecto');
        return false;
      }
      if($scope.pago.paymentMethod.length < 3){
        console.log('Metodo incorrecto');
        return false;
      }
      if($scope.pago.paymentDate.length < 3){
        console.log('Fecha incorrecta');
        return false;
      }
      return true;
    }

    this.validarCliente = function(){
      if ($scope.cliente.clientName.length < 3) {
        console.log('Nombre inválido');
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

    $scope.actualizarCliente = function(){
      if(me.validarCliente()){
        var clientToUpdate = {
          _id: $scope.cliente._id,
          clientName: $scope.cliente.clientName,
          clientAdress: $scope.cliente.clientAdress,
          clientTelephone: $scope.cliente.clientTelephone,
          clientNotes: $scope.cliente.clientNotes
        }
        $http.put('http://localhost:8080/api/clientes/update', clientToUpdate)
          .success(function(data) {
            me.obtenerClientes();
            $scope.clientDetailShowing = 'pagos';
          })
          .error(function(data) {
            console.log('Error: ', data);
        });
      }
    }

    $scope.registrarPago = function(){
      if(me.validarPago()){
        $scope.pago.client = $scope.cliente._id;
        $http.post('http://localhost:8080/api/pagos/post', $scope.pago)
          .success(function(data) {
            me.obtenerClientes();
            $scope.clientDetailShowing = 'pagos';
          })
          .error(function(data) {
            console.log('Error: ', data);
        });
      }
    }
  });
