( function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    'tabs',
    BillingCycleController
  ])
  function BillingCycleController($http, msgs, tabs){
    const vm = this // vm View Model
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){
      $http.get(url).then(function(response){
        vm.billingCycle = {}
        vm.billingCycles = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.create = function(){
      $http.post(url, vm.billingCycle).then(function(response) {
        vm.refresh() // limpando a referencia do objeto
        msgs.addSuccess('Operação realizada com sucesso!!')
        console.log
        ('Sucesso!')
      })
      .catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function(billingCycle){
      vm.billingCycle = billingCycle
      tabs.show( vm, { tabUpdate: true})
    }

    vm.showTabDelete = function(billingCycle){
      vm.billingCycle = billingCycle
      tabs.show(vm, { tabDelete: true})
    }

    vm.delete = function(){
       const deleteUrl = `${ulr}/${vm.billingCycle._id}`
       $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
         vm.refresh()
         msgs.addSuccess('Operação realizada com sucesso!!!')
       })
       .catch(function(response){
          msgs.addError(response.data.errors)
       })
    }

    vm.refresh()

  }
}) ()