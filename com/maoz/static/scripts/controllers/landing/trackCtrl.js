
'use strict';
angular
	.module('app')
		.controller('trackCtrl', [	'$scope', '$http', '$localStorage', 
									'$timeout', '$translate',  
									'$state' , '$stateParams', 'Restangular', 
									'toastr', '$rootScope', 'patientServices',
  function trackCtrl($scope, $http, $localStorage, 
		  			$timeout, $translate, 
		  			$state, $stateParams, Restangular, 
		  			toastr, $rootScope, patientServices) {
	
	$scope.$watch("init", function(){
		if('' == $rootScope.currentUser){
			$state.go('user.signout');
		}
		$scope.param = $rootScope.param;
		$scope.getTransaction();
	});
	
	$scope.patientProfile = {};
	$scope.patient = {};
	
	$scope.prevMenu = function(){
		$state.go('app.landing');
	}
	
	$scope.getTransaction = function(){
		var currentDate = new Date();
		var day = currentDate.getDate();
		var month = currentDate.getMonth()+1;
		var year = currentDate.getFullYear();
		var formatedDate = year+'/'+month+'/'+day;
		patientServices.findByCreatedDate(formatedDate, $rootScope.currentUser).then(function(response){
			$scope.txn = response.data._embedded.ipePatientTransactions[0];
			
		}).catch(function(response) {
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
	    });
	};
	
	
	$scope.selectPatient = function(menuCode){
		$state.go('app.txn',{menuCode : menuCode, txn:$scope.txn})
	};
	
	
  }
]);