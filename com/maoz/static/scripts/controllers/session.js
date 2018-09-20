'use strict';
angular
	.module('app')
		.controller('sessionCtrl', [	'$scope', '$state', '$auth', 
										'$http', 'PermissionStore', '$rootScope', 
										'toastr', '$q', '$interval', 'Restangular', 
										'$uibModalStack', '$sessionStorage',
function sessionCtrl(	$scope, $state, $auth, 
						$http, PermissionStore, $rootScope, 
						toastr, $q,  $interval, Restangular,
						$uibModalStack, $sessionStorage) {
	
	$scope.login = function(){
		toastr.clear();
		var isTokenValid = false;
		
		$auth.login($scope.user)
		  .then(function(response) {
			  PermissionStore.clearStore();
			  
			  var token = response.headers('maoz-token');
			  $auth.setToken(token.replace('Bearer ', ''));
		    // setting roles,objects after login success
			  
			  isTokenValid = true;
			  
			  $interval(function(){
				  if(isTokenValid){
					  var authenService = Restangular.one('/ipe/service/isAuthen');
					  authenService.get().then(function(response){
						  isTokenValid = true;
					  }).catch(function(response){
						  isTokenValid = false;
						  $rootScope.unAuthorized();
					  });
				  }
			  }, 10*1000);
			  
			  PermissionStore.definePermission('isAuthenticated', function(){
				  return isTokenValid;
			  });
			  var parseService = Restangular.one('/ipe/service/parse');
			  parseService.get().then(function(response){
				  var roles = response.authorities;
				  var roleList = [];
				  
				  $rootScope.currentUser = response.name;
				  
				  angular.forEach(roles, function(value, key) {
					  this.push(value.authority);
				  }, roleList);
				  
				  $sessionStorage.roleList = roleList;
				  
				  PermissionStore
				  	.defineManyPermissions(roleList, function(permissionName, transitionProperties) {
				  		//FIXME
				  		 if ('app.user' == transitionProperties.toState.name){
							  $uibModalStack.dismissAll();
						  }
				  		return true;
				  	});
				  
				  //if role = ADMIN
				  if(roleList.indexOf('ROLE_ADMIN') > -1){
					  $state.go('app.user');
				  } else if((roleList.indexOf('ROLE_STUD')> -1)){
					  $state.go('app.patient');
				  } else if((roleList.indexOf('ROLE_STUD_PT')> -1)){
					  $state.go('app.pt');
				  } else if((roleList.indexOf('ROLE_STUD_PH')> -1)){
					  $state.go('app.ph');
				  } else if((roleList.indexOf('ROLE_PROF')> -1)){
					  $state.go('app.patient');
				  } else {
					  $state.go('app.landing');
				  }
				  	
			  }).catch(function(response) {
				  toastr.error(response.data.message, 'Error');
				  console.error('ERROR',response.data.error_detail);
			  });
			  
//			  utilsService.parseToken().then(function(response){
//				  var objects = Object.keys(response.data.user.permission.objects);
//				  var roles = response.data.user.permission.roles;
//				  PermissionStore
//	          		.defineManyPermissions(objects, function (permissionName, transitionProperties) {
//	          			var result = isTokenValid;
//	          			toastr.clear();//clear toast when page is changed.
//	          			
//	          			if (transitionProperties.toState.name.startsWith('app.param')) {
//	          				result = result && permissionName=='MAP_MN_PARAMETER';
//	          			}
//	          			if (transitionProperties.toState.name.startsWith('app.systems')) {
//	          				result = result && permissionName=='MAP_MN_SYSTEM';
//	          			}
//	          			if (result == false) {
//	          				toastr.error($rootScope.authConsoleMessage['NO_OBJECTS'].descriptionEn, 'Error');
//	          				$scope.authError();
//	          			}
//	          			
//	          			return result;
//	          		});	
//				  
//				  if (response.data.user.permission.objects['MAP_MN_PARAMETER'] || response.data.user.permission.objects['MAP_MN_SYSTEM']) {
//					  toastr.clear();
//					  $rootScope.userProfile = response.data.user.profile;
//					  $state.go('app.systems');
//				  } else {
//					  toastr.error($rootScope.authConsoleMessage['NO_OBJECTS'].descriptionEn, 'Error');
//					  $scope.authError();
//				  }
//				  
//				  
//			  });
		  })
		  .catch(function(response) {
			  toastr.error(response.data.message, 'Error');
			  console.error('ERROR',response.data.error_detail);
		  });
		};
	
  $scope.myInterval = 5000;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 1200 + slides.length + 1;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/800',
      id: currIndex++
    });
  };
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
}

]);