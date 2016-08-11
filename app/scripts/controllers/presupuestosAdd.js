'use strict';

angular.module('presupuestosAngularApp')
  .controller('PresupuestosAddCtrl', function ($scope, $http, $location, $timeout) {
    this.sectionTitle = 'Nuevo Presupuesto';
    this.titleIsVisible = true;
    var me = this;

    $scope.currentBalance = 0;
    this.updateCurrentBalance = function(client){
      $scope.currentBalance = client.clientBalance;
    }

    $scope.clientes = [];
    $http.get('http://localhost:8080/api/clientes/get')
      .success(function(data) {
          $scope.clientes = data;
          me.cargarDatos();
      })
      .error(function(data) {
          console.log('Error: ', data);
    });

    this.cargarDatos = function(){
      $scope.budgetItem = {
        'itemCount': "",
        'itemCode': "",
        'itemDescription': "",
        'unitPrice': "",
        'totalPrice': "",
      };

      $scope.budget = {
        'billNumber': "",
        'client': '',
        'budgetDate': new Date(),
        'budgetNotes': "",
        'budgetItems': [],
        'budgetSubtotal': 0,
        'budgetDiscount': 0,
        'budgetIva': 21,
        'budgetTotal': 0
      };
      $timeout(function(){
        // agrega el primer item vacío
        me.agregarItem();
      }, 0);
    }

    this.agregarItem  = function(){
      $scope.budget.budgetItems.push(angular.copy($scope.budgetItem));
      this.calcBudget();
    }

    this.eliminarItem  = function(itemIndex){
      if($scope.budget.budgetItems.length > 1){
        $scope.budget.budgetItems.splice(itemIndex, 1);
        this.calcBudget();
      }
    }

    this.getNewPresupuesto = function() {
      return {
        "billNumber": $scope.budget.billNumber,
        "client": $scope.budget.client._id,
        "budgetDate": $scope.budget.budgetDate,
        "budgetNotes": $scope.budget.budgetNotes,
        "budgetItems": $scope.budget.budgetItems,
        "budgetSubtotal": $scope.budget.budgetSubtotal,
        "budgetDiscount": $scope.budget.budgetDiscount,
        "budgetIva": $scope.budget.budgetIva,
        "budgetTotal": $scope.budget.budgetTotal
      };
    }

    this.calcBudget = function(){
      $scope.budget.budgetSubtotal = 0;
      var itemsLength = $scope.budget.budgetItems.length;
      for (var i = 0; i < itemsLength; i++) {
        $scope.budget.budgetItems[i].totalPrice = $scope.budget.budgetItems[i].itemCount * $scope.budget.budgetItems[i].unitPrice;
        $scope.budget.budgetSubtotal += $scope.budget.budgetItems[i].totalPrice;
      }
      $scope.budget.budgetTotal = $scope.budget.budgetSubtotal - ($scope.budget.budgetSubtotal * $scope.budget.budgetDiscount / 100) + ($scope.budget.budgetSubtotal * $scope.budget.budgetIva / 100);
    }

    this.validarCampos = function() {
      if ($scope.budget.client.length < 0) {
        console.log('Cliente inválido');
        return false;
      }
      if ($scope.budget.budgetDate == '') {
        console.log('Fecha inválido');
        return false;
      }
      if (Number($scope.budget.budgetDiscount) == NaN) {
        console.log('Descuento inválido');
        return false;
      }
      if (Number($scope.budget.budgetIva) == NaN) {
        console.log('IVA inválida');
        return false;
      }
      var itemsLength = $scope.budget.budgetItems.length;
      for(var i = 0; i < itemsLength; i++){
        if ($scope.budget.budgetItems[i].itemCount <= 0) {
          console.log('Canidad inválida');
          return false;
        }
        if ($scope.budget.budgetItems[i].itemCode.length < 2) {
          console.log('Código inválido');
          return false;
        }
        if ($scope.budget.budgetItems[i].itemDescription.length < 3) {
          console.log('Descripción inválida');
          return false;
        }
        if (Number($scope.budget.budgetItems[i].unitPrice) == NaN) {
          console.log('Precio inválido');
          return false;
        }
      }
      return true;
    }

    this.guardarPresupuesto = function(){
      var presupuestoToPost = this.getNewPresupuesto();
      if (this.validarCampos()) {
        $http.post('http://localhost:8080/api/presupuestos/post', presupuestoToPost)
        .then(
          function(data) {
            $scope.presupuestosList = data;
            $location.url("/presupuestos");
        }, function(error) {
            console.log('Error: ', error);
        });
      }
    }

    $scope.getToday = () => (new Date());

  });
