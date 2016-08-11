'use strict';

/**
 * @ngdoc overview
 * @name presupuestosAngularApp
 * @description
 * # presupuestosAngularApp
 *
 * Main module of the application.
 */
angular
  .module('presupuestosAngularApp', [
    'ngAnimate',
    'ngTouch',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngDialog'
  ])
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/presupuestos', {
        templateUrl: 'views/presupuestos.html',
        controller: 'PresupuestosCtrl',
        controllerAs: 'presupuestos'
      })
      .when('/presupuestoDetalle/:budgetId', {
        templateUrl: 'views/presupuestoDetalle.html',
        controller: 'PresupuestoDetalleCtrl',
        controllerAs: 'presupuestoDetalle'
      })
      .when('/presupuestosAdd', {
        templateUrl: 'views/presupuestosAdd.html',
        controller: 'PresupuestosAddCtrl',
        controllerAs: 'presupuestosAdd'
      })
      .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes'
      })
      .when('/clientesAdd', {
        templateUrl: 'views/clientesAdd.html',
        controller: 'ClientesAddCtrl',
        controllerAs: 'clientesAdd'
      })
      .when('/clienteDetalle/:clientId', {
        templateUrl: 'views/clienteDetalle.html',
        controller: 'ClienteDetalleCtrl',
        controllerAs: 'clienteDetalle'
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);

  }).controller('appCtrl', function($scope){
    $scope.webSection = 'home';

    $scope.changeWebSection = function(webSection){
      $scope.webSection = webSection;
    }
  });
