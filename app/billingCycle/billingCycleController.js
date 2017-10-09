( function () {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ])
  function BillingCycleController($http, $location, msgs, tabs){
    const vm = this // vm View Model
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function(){
      const page = parseInt($location.search().page) || 1
      $http.get(`${url}?skip=${(page -1)*5}&limit=5`).then(function(response){
        vm.billingCycle = {credits:[{}], debts: [{}]}
        vm.billingCycles = response.data
        vm.calculateValues()
        tabs.show(vm, {tabList: true, tabCreate: true})

        $http.get(`${url}/count`).then(function(response){
          vm.pages = Math.ceil(response.value / 5)
          console.log('pages =', response.value)
          console.log('pages =', vm.pages)
        })

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
      vm.calculateValues()
      tabs.show( vm, { tabUpdate: true})
    }

    vm.showTabDelete = function(billingCycle){
      vm.billingCycle = billingCycle
      vm.calculateValues()
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
      vm.calculateValues()
    }

    vm.deleteCredit = (index) => {
      if(vm.billingCycle.credits.length > 1){ // para excluir pelo menos 2
        vm.billingCycle.credits.splice(index, 1)
        vm.calculateValues()
      }
    }

    // Débitos
    vm.addDebt = (index) => {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    vm.cloneDebt = function(index, {name, value}){
      vm.billingCycle.debts.splice(index +1, 0, {name, value})
      vm.calculateValues()
    }

    vm.deleteDebt = (index) => {
      if(vm.billingCycle.debts.length > 1){ // para excluir pelo menos 2
        vm.billingCycle.debts.splice(index, 1)
        vm.calculateValues()
      }
    }

    //Sumário
    vm.calculateValues = function() {
      vm.credit = 0
      vm.debt = 0

      if(vm.billingCycle) {   // prestar atenção em forEach, isNaN e parseFloat todos interferem na atualização e/ou visualização
        vm.billingCycle.credits.forEach(function({value}) {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })
        vm.billingCycle.debts.forEach(function({value}){
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }

      vm.total = vm.credit - vm.debt
      // é necessário que Eu chame esse método
      // 1o lugar dentro do método refresh lin 12
    }

    vm.refresh()

  }
}) ()
