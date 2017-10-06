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
        vm.billingCycle = {credits:[{}], debts: [{}]}
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

    vm.update = () => {
      const updateUrl =  `${url}/${vm.billingCycle._id}`
      $http.put(updateUrl, vm.billingCycle).then(function(response){
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      })
      .catch(function(response){
        msgs.addError(response.data.erros)
      })
    }
    vm.delete = function(){
       const deleteUrl = `${url}/${vm.billingCycle._id}`
       $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
         vm.refresh()
         msgs.addSuccess('Operação realizada com sucesso!!!')
       })
       .catch(function(response){
          msgs.addError(response.data.errors)
       })
    }

    // botões das Listas de Créditos creditList.html e Débitos debtList.html
    // Créditos
    vm.addCredit = (index) => {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = function(index, {name, value}){
      vm.billingCycle.credits.splice(index +1, 0, {name, value})
    }

    vm.deleteCredit = (index) => {
      if(vm.billingCycle.credits.length > 1){ // para excluir pelo menos 2
        vm.billingCycle.credits.splice(index, 1)
      }
    }

    // Débitos
    vm.addDebt = (index) => {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    vm.cloneDebt = function(index, {name, value}){
      vm.billingCycle.debts.splice(index +1, 0, {name, value})
    }

    vm.deleteDebt = (index) => {
      if(vm.billingCycle.debts.length > 1){ // para excluir pelo menos 2
        vm.billingCycle.debts.splice(index, 1)
      }
    }


    vm.refresh()

  }
}) ()
