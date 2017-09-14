(function () {

  angular.module('primeiraApp').controller('DashboradCtrl', [
    '$http',
    DashboardController
  ])

  function DashboardController($http){
    const vm = this // vm = ViewModel
    vm.getSummary = function(){
      const url = 'http://localhost:3003/api/billingSummary'
      $http.get(url).then(function(response){ // valor padrão igual a 0, independente do que veja na url acima
        const {credit = 0, debt = 0} = response.data
        vm.credit = credit
        vm.debt = debt
        vm.total = credit - debt
      })
    }

    vm.getSummary()

  }

})()
