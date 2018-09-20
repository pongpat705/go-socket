'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */

angular
  .module('app', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngStorage',
    'ngCookies',
    'permission', 'permission.ui',
    'toastr'
  ])
  .constant('COLORS', {
    font: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    'default': $('<div>').appendTo('body').addClass('bg-default').css('background-color'),
    primary: $('<div>').appendTo('body').addClass('bg-primary').css('background-color'),
    success: $('<div>').appendTo('body').addClass('bg-success').css('background-color'),
    warning: $('<div>').appendTo('body').addClass('bg-warning').css('background-color'),
    danger: $('<div>').appendTo('body').addClass('bg-danger').css('background-color'),
    info: $('<div>').appendTo('body').addClass('bg-info').css('background-color'),
    white: $('<div>').appendTo('body').addClass('bg-white').css('background-color'),
    dark: $('<div>').appendTo('body').addClass('bg-dark').css('background-color'),
    border: '#e4e4e4',
    bodyBg: $('body').css('background-color'),
    textColor: '#6B6B6B',
  })
  .run(['$http', '$rootScope', '$q', '$state', 'PermissionStore', '$sessionStorage',
        function($http, $rootScope, $q, $state, PermissionStore, $sessionStorage) {


	  $rootScope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams, options){

		  $rootScope.currentState = toState.name;
		  if(toState.name != fromState.name){
			  $rootScope.prevState = fromState.name;
		  }
		  if(undefined != $sessionStorage.roleList){
			  PermissionStore
				.defineManyPermissions($sessionStorage.roleList, function(permissionName, transitionProperties) {
					//FIXME
					return true;
			  });
		  }

	  });

	  $rootScope.checkPermission = function(permission){
		  var permissions = PermissionStore.getStore();
		  if (null == permissions[permission]) {
			  return false;
		  }
		  return true;
	  };

	  $rootScope.isCurrentState = function(param1){
		  if ($rootScope.currentState == param1) {
			  return true;
		  } else {
			  return false;
		  }
	  };

	  $rootScope.unAuthorized = function(response){
		  $uibModalStack.dismissAll();
		  $state.go('user.signout');
	  }

	  $rootScope.initParams = function(){
		  var promises = [];
//		  promises.push( $http.get(_params.global.contextPath + '/api/data/pricing?size=100&sort=maxUser,asc' ).then(function(response){
//			  $rootScope.priceList = response.data._embedded.pricing;
//			  window.console && console.log('$rootScope.priceList  >>> ');
//			  window.console && console.log($rootScope.priceList);
//		  }) );

		  return $q.all(promises);
	  };

    }]);
