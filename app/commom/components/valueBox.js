//
( function () {
  angular.module('primeiraApp').component('valueBox', {
    bindings: {
      grid:'@',
      colorClass:'@',
      value:'@',
      text:'@',
      iconClass: '@',
    },
    controller: [
      'gridSystem', // mesmo nome do gridSystemFactory.js
      function(gridSystem){ // mesmo nome
      // this.$onInit = () => { Arrow Function igual a linha abaixo
      // ou
      // this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
         this.$onInit = function (){ // $onInit vai inicializar sempre que o bindings(lin4) estiverem inicializados
           this.gridClasses = gridSystem.toCssClasses(this.grid)
         }
      }
    ],
    template:`
    <div class="{{ $ctrl.gridClasses }}">
        <div class="small-box {{ $ctrl.colorClass }}">
            <div class="inner">
                <h3>{{ $ctrl.value }}</h3>
                <p>{{ $ctrl.text }}</p>
            </div>
            <div class="icon">
              <i class="fa {{ $ctrl.iconClass }}"></i>
            </div>
        </div>
    </div>
    `
  })
}) ()
