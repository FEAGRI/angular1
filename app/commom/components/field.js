//
( function () {
  angular.module('primeiraApp').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type:'@',
      model: "=", //  binding de 2 direções ..., tudo que alterar no controller será refletido no component e vice-versa
      readonly: '<',
    },
    controller: [
      'gridSystem',
      function(gridSystem){
        this.gridClasses - gridSystem.toCssClasses(this.grid)
      }
    ], // double mustache {{ interpolar o valor da variável e jogar aqui dentro }}
    template:`
    <div class="{{ $ctrl.gridClasses }}">
          <div class="form-group">
            <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
            <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" type="{{ $ctrl.type }}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly" />
          </div>
        </div>
    `
  })
}) ()
