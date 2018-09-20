angular
	.module('app')
		.controller('logoutCtrl',[	'$scope', '$state', '$auth',
									'$http', 'PermissionStore', '$rootScope', '$sessionStorage',
	function LogoutCtrl($scope, $state, $auth,
						$http, PermissionStore, $rootScope, $sessionStorage) {
    $auth.logout()
      .then(function() {
    	  PermissionStore.clearStore();
    	  $sessionStorage.$reset();
    	  $state.go('user.signin');
      });

}]);
