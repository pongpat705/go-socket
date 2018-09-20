
'use strict';
angular
	.module('app')
		.controller('landingCtrl', [	'$scope', '$http', '$localStorage',
									'$timeout',  '$state' , '$stateParams',
									'toastr', '$rootScope',
  function landingCtrl($scope, $http, $localStorage,
		  			$timeout,  $state, $stateParams,
		  			toastr, $rootScope) {

	$scope.$watch("init", function(){
		if('' == $rootScope.currentUser){
			$state.go('user.signout');
		}
		$scope.param = $rootScope.param;
			$scope.findPatientTransaction();
	});

	$scope.patientProfile = {};
	$scope.patient = {};

	$scope.findPatientTransaction = function(){

	};

	$scope.patchPatient = function(patient, link){
	
	};


	$scope.selecTrack = function(){
		$state.go('app.track',{txn:$scope.txn})
	};

	$scope.selectMenu = function(menuCode){
		$state.go('app.txn',{menuCode: menuCode, txn:$scope.txn})
	};


  }
]);
