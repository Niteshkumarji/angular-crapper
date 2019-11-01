export default function loadingSpinner () {
  // Creates:
  //
  const directive = {
    restrict: 'E',
    controller: controller,
    controllerAs: 'lsc',
    template: `<div ng-show="lsc.show" class="loading-spinner" layout="column" layout-fill layout-align="center center">
      <div class="spinner-item"></div>
    </div>`
  };

  function controller($scope, Loading) {
    'ngInject';

    $scope.$on('notifySpinner', (e, data) => {
      this.show = data.visibility;
    });
  }

  return directive;
}