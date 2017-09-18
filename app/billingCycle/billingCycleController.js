( function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    BillingCycleController
  ])
  function BillingCycleController($http, msgs){
    const vm = this // vm View Model
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){
      $http.get(url).success(function(response){
        vm.billingCycle = {}
        vm.billingCycles = response.data
      })
    }

    vm.create = function(){
      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh() // limpando a referencia do objeto
        msgs.addSuccess('Operação realizada com sucesso!!')
        console.log('Sucesso!')
      })
      .catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.refresh()

  }
}) ()
