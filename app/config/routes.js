// injeção de dependência do angular
angular.module('primeiraApp').config([
  '$stateProvider',  // está presente dentro do ui-router, serve para fazer nossas navegações
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html" // carregará o template no "ui-view" que está dentro do index.html
    }).state('billingCycle', {
      url: "/billingCycles",
      templateUrl: "billingCycle/tabs.html"
    })
    $urlRouterProvider.otherwise('/dashboard')
  }
])
