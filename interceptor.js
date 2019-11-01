import ERROR_CODES from './error-codes';

export default function Interceptor ($rootScope, $state, AlertService) {
  'ngInject';

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    
    switch (error) {
      case ERROR_CODES.AUTH_REQUIRED:
        $state.go('auth.login');
        break;
      case ERROR_CODES.ACCESS_DENIED:
        AlertService.error('Access denied.');
        $state.go('tab.expenses');
        break;
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (fromState.name === 'auth.signup' && toState.name === 'tab.expenses') {
      AlertService.success('Welcome');
    }
  });
}