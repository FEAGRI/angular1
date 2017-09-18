( function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    BillingCycleController
  ])
  function BillingCycleController($http){
    const vm = this // vm View Model
    vm.create = function(){
      const url = 'http://localhost:3003/api/billingCycles'
      $http.post(url, vm.billingCycle).success(function(response) {
        vm.billingCycle = {} // limpando a referencia do objeto
        console.log('Sucesso!')
      })
    }
  }
}) ()
