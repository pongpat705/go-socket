
'use strict';
angular
	.module('app')
		.controller('txnCtrl', [	'$scope', '$http', '$localStorage', 
									'$timeout', '$translate', 
									'$state' , '$stateParams', 'Restangular', 
									'toastr', '$rootScope', 'patientServices',
  function txnCtrl($scope, $http, $localStorage, 
		  			$timeout, $translate, 
		  			$state, $stateParams, Restangular, 
		  			toastr, $rootScope, patientServices) {
	
	$scope.$watch("init", function(){
		if(undefined == $stateParams.menuCode){
			$state.go('app.landing',{},{reload:true});
		}
		$scope.param = $rootScope.param;

		if(undefined == $stateParams.txn){
			$state.go('app.landing',{},{reload:true});
		}
		$scope.txn = $stateParams.txn;
		$scope.loadLabs();
		$scope.myFile = null;
	});
	var menuCode = $stateParams.menuCode;
	
	$scope.saveTxn = function(){
		patientServices.genericPatch($scope.txn, $scope.txn._links.self.href).then(function(response){
			toastr.success('saved');
		}).catch(function(response) {
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
	    });
	};
	
	$scope.loadLabs = function(){
		patientServices.genericGet($scope.txn._links.medical.href).then(function(response){
			$scope.labs = response.data._embedded.ipeMedicalTechnicals;
		}).catch(function(response) {
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
	    });
	};
	
	$scope.addMedic = function(lab, link){
		patientServices.addLab(lab).then(function(response){
			var data = response.data._links.self.href;
			patientServices.patchPatientParent(data, link).then(function(response){
				toastr.success('saved');
				$scope.loadLabs();
			}).catch(function(response) {
				console.error('Error',response);
				toastr.error(response.data.message, 'Error');
		    });
		}).catch(function(response) {
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
	    });
	};
	
	$scope.delMedic = function(transactionId, labId){
		patientServices.transactionDeleteLab(transactionId, labId).then(function(response){
			$scope.loadLabs();
		}).catch(function(response) {
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
	    });
	};
	
	$scope.prevMenu = function(){
		$state.go($rootScope.prevState);
	};
	
	$scope.glucoseWarning = function(val){
		if(val > 100){
			toastr.warning($scope.param.MESSAGE.GLUCOSE_WARN_OVER.infoEn, 'Warning');
		}
		if(val < 70){
			toastr.warning($scope.param.MESSAGE.GLUCOSE_WARN_OVER.infoTh, 'Warning');
		}
	};
	
	
	$scope.uploadFile = function(){
		var file = $( "#file" );
		patientServices.uploadFile(file[0].files[0], $scope.txn, $rootScope.currentUser).then(function(response){
			toastr.success('uploaded');
			patientServices.genericGet($scope.txn._links.self.href).then(function(response){
				$scope.txn = response.data;
			}).catch(function(response) {
				console.error('Error',response);
				toastr.error(response.data.message, 'Error');
		    });
		}).catch(function(response){
			console.error('Error',response);
			toastr.error(response.data.message, 'Error');
		});
	};
	
	var wTab = [
//        { title: 'ข้อมูลติดตาม 1.1', content: 'views/app/landing/questionnair/W_01.html', code:'W_01'},
//        { title: 'ข้อมูลติดตาม 1.2', content: 'views/app/landing/questionnair/W_02.html', code:'W_02'},
//        { title: 'ข้อมูลติดตาม 1.3', content: 'views/app/landing/questionnair/W_03.html', code:'W_03'}
		{ title: 'ข้อมูลติดตาม 1', content: 'views/app/landing/questionnair/group/GROUP_W.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var pTab = [
//        { title: 'ข้อมูลติดตาม 2.1', content: 'views/app/landing/questionnair/P_01.html', code:'P_01'},
//        { title: 'ข้อมูลติดตาม 2.2', content: 'views/app/landing/questionnair/P_02.html', code:'P_02'}
        { title: 'ข้อมูลติดตาม 2', content: 'views/app/landing/questionnair/group/GROUP_P.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var uTab = [
//        { title: 'ข้อมูลติดตาม 3.1', content: 'views/app/landing/questionnair/U_01.html', code:'U_01'},
//        { title: 'ข้อมูลติดตาม 3.2', content: 'views/app/landing/questionnair/U_02.html', code:'U_02'},
//        { title: 'ข้อมูลติดตาม 3.3', content: 'views/app/landing/questionnair/U_03.html', code:'U_03'}
        { title: 'ข้อมูลติดตาม 3', content: 'views/app/landing/questionnair/group/GROUP_U.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var sTab = [
//        { title: 'ข้อมูลติดตาม 4.1', content: 'views/app/landing/questionnair/S_01.html', code:'S_01'},
//        { title: 'ข้อมูลติดตาม 4.2', content: 'views/app/landing/questionnair/S_02.html', code:'S_02'}
		{ title: 'ข้อมูลติดตาม 4', content: 'views/app/landing/questionnair/group/GROUP_S.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var eTab = [
//        { title: 'ข้อมูลติดตาม 5.1', content: 'views/app/landing/questionnair/E_01.html', code:'E_01'},
//        { title: 'ข้อมูลติดตาม 5.2', content: 'views/app/landing/questionnair/E_02.html', code:'E_02'}
        { title: 'ข้อมูลติดตาม 5', content: 'views/app/landing/questionnair/group/GROUP_E.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var labTab = [
		{ title: 'ข้อมูลห้องปฏิบัติการ', content: 'views/app/landing/questionnair/LAB.html', code:'LAB'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var daTab = [
//		{ title: 'ประจำวัน 1', content: 'views/app/landing/questionnair/DA_01.html', code:'DA_01'},
//		{ title: 'ประจำวัน 2', content: 'views/app/landing/questionnair/DA_02.html', code:'DA_02'},
//		{ title: 'ประจำวัน 3', content: 'views/app/landing/questionnair/DA_03.html', code:'DA_03'},
//		{ title: 'ประจำวัน 4', content: 'views/app/landing/questionnair/DA_04.html', code:'DA_04'},
//		{ title: 'ประจำวัน 5', content: 'views/app/landing/questionnair/DA_05.html', code:'DA_05'},
//		{ title: 'ประจำวัน 6', content: 'views/app/landing/questionnair/DA_06.html', code:'DA_06'},
//		{ title: 'ประจำวัน 7', content: 'views/app/landing/questionnair/DA_07.html', code:'DA_07'},
//		{ title: 'ประจำวัน 8', content: 'views/app/landing/questionnair/DA_08.html', code:'DA_08'},
//		{ title: 'ประจำวัน 9', content: 'views/app/landing/questionnair/DA_09.html', code:'DA_09'},
//		{ title: 'ประจำวัน 10', content: 'views/app/landing/questionnair/DA_10.html', code:'DA_10'}
		{ title: 'ข้อมูลติดตาม ประจำวัน', content: 'views/app/landing/questionnair/group/GROUP_DA.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var soTab = [
//		{ title: 'เข่าเสื่อม  1', content: 'views/app/landing/questionnair/SO_01.html', code:'SO_01'},
//		{ title: 'เข่าเสื่อม  2', content: 'views/app/landing/questionnair/SO_02.html', code:'SO_02'},
//		{ title: 'เข่าเสื่อม  3', content: 'views/app/landing/questionnair/SO_03.html', code:'SO_03'},
//		{ title: 'เข่าเสื่อม  4', content: 'views/app/landing/questionnair/SO_04.html', code:'SO_04'},
//		{ title: 'เข่าเสื่อม  5', content: 'views/app/landing/questionnair/SO_05.html', code:'SO_05'},
//		{ title: 'เข่าเสื่อม  6', content: 'views/app/landing/questionnair/SO_06.html', code:'SO_06'},
//		{ title: 'เข่าเสื่อม  7', content: 'views/app/landing/questionnair/SO_07.html', code:'SO_07'},
//		{ title: 'เข่าเสื่อม  8', content: 'views/app/landing/questionnair/SO_08.html', code:'SO_08'},
//		{ title: 'เข่าเสื่อม  9', content: 'views/app/landing/questionnair/SO_09.html', code:'SO_09'},
//		{ title: 'เข่าเสื่อม  10', content: 'views/app/landing/questionnair/SO_10.html', code:'SO_10'},
//		{ title: 'เข่าเสื่อม  11', content: 'views/app/landing/questionnair/SO_11.html', code:'SO_11'},
//		{ title: 'เข่าเสื่อม  12', content: 'views/app/landing/questionnair/SO_12.html', code:'SO_12'},
//
//        
//        { title: 'ปวดข้อ  1', content: 'views/app/landing/questionnair/PL_01.html', code:'PL_01'},
//        { title: 'ปวดข้อ  2', content: 'views/app/landing/questionnair/PL_02.html', code:'PL_02'},
//        { title: 'ปวดข้อ  3', content: 'views/app/landing/questionnair/PL_03.html', code:'PL_03'},
//        { title: 'ปวดข้อ  4', content: 'views/app/landing/questionnair/PL_04.html', code:'PL_04'},
//        { title: 'ปวดข้อ  5', content: 'views/app/landing/questionnair/PL_05.html', code:'PL_05'},
//
//        
//        { title: 'ข้อฝืด  1', content: 'views/app/landing/questionnair/SN_01.html', code:'SN_01'},
//        { title: 'ข้อฝืด  2', content: 'views/app/landing/questionnair/SN_02.html', code:'SN_02'},
//        
//        { title: 'ใช้งานข้อ  1', content: 'views/app/landing/questionnair/KO_01.html', code:'KO_01'},
//        { title: 'ใช้งานข้อ  2', content: 'views/app/landing/questionnair/KO_02.html', code:'KO_02'},
//        { title: 'ใช้งานข้อ  3', content: 'views/app/landing/questionnair/KO_03.html', code:'KO_03'},
//        { title: 'ใช้งานข้อ  4', content: 'views/app/landing/questionnair/KO_04.html', code:'KO_04'},
//        { title: 'ใช้งานข้อ  5', content: 'views/app/landing/questionnair/KO_05.html', code:'KO_05'},
//        { title: 'ใช้งานข้อ  6', content: 'views/app/landing/questionnair/KO_06.html', code:'KO_06'},
//        { title: 'ใช้งานข้อ  7', content: 'views/app/landing/questionnair/KO_07.html', code:'KO_07'},
//        { title: 'ใช้งานข้อ  8', content: 'views/app/landing/questionnair/KO_08.html', code:'KO_08'},
//        { title: 'ใช้งานข้อ  9', content: 'views/app/landing/questionnair/KO_09.html', code:'KO_09'},
//        { title: 'ใช้งานข้อ  10', content: 'views/app/landing/questionnair/KO_10.html', code:'KO_10'},
//        { title: 'ใช้งานข้อ  11', content: 'views/app/landing/questionnair/KO_11.html', code:'KO_11'},
//        { title: 'ใช้งานข้อ  12', content: 'views/app/landing/questionnair/KO_12.html', code:'KO_12'},
//        { title: 'ใช้งานข้อ  13', content: 'views/app/landing/questionnair/KO_13.html', code:'KO_13'},
//        { title: 'ใช้งานข้อ  14', content: 'views/app/landing/questionnair/KO_14.html', code:'KO_14'},
//        { title: 'ใช้งานข้อ  15', content: 'views/app/landing/questionnair/KO_15.html', code:'KO_15'}
        { title: 'ข้อมูลติดตาม ใช้งานข้อ', content: 'views/app/landing/questionnair/group/GROUP_SO_PL_SN_KO.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var plTab = [
        { title: 'ปวดข้อ  1', content: 'views/app/landing/questionnair/PL_01.html'},
        { title: 'ปวดข้อ  2', content: 'views/app/landing/questionnair/PL_02.html'},
        { title: 'ปวดข้อ  3', content: 'views/app/landing/questionnair/PL_03.html'},
        { title: 'ปวดข้อ  4', content: 'views/app/landing/questionnair/PL_04.html'},
        { title: 'ปวดข้อ  5', content: 'views/app/landing/questionnair/PL_05.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var snTab = [
		{ title: 'ข้อฝืด  1', content: 'views/app/landing/questionnair/SN_01.html'},
        { title: 'ข้อฝืด  2', content: 'views/app/landing/questionnair/SN_02.html'}
	],  
	bSelected = null,
    bPrevious = null;
	
	var koTab = [
	 	{ title: 'ใช้งานข้อ  1', content: 'views/app/landing/questionnair/KO_01.html'},
        { title: 'ใช้งานข้อ  2', content: 'views/app/landing/questionnair/KO_02.html'},
        { title: 'ใช้งานข้อ  3', content: 'views/app/landing/questionnair/KO_03.html'},
        { title: 'ใช้งานข้อ  4', content: 'views/app/landing/questionnair/KO_04.html'},
        { title: 'ใช้งานข้อ  5', content: 'views/app/landing/questionnair/KO_05.html'},
        { title: 'ใช้งานข้อ  6', content: 'views/app/landing/questionnair/KO_06.html'},
        { title: 'ใช้งานข้อ  7', content: 'views/app/landing/questionnair/KO_07.html'},
        { title: 'ใช้งานข้อ  8', content: 'views/app/landing/questionnair/KO_08.html'},
        { title: 'ใช้งานข้อ  9', content: 'views/app/landing/questionnair/KO_09.html'},
        { title: 'ใช้งานข้อ  10', content: 'views/app/landing/questionnair/KO_10.html'},
        { title: 'ใช้งานข้อ  11', content: 'views/app/landing/questionnair/KO_11.html'},
        { title: 'ใช้งานข้อ  12', content: 'views/app/landing/questionnair/KO_12.html'},
        { title: 'ใช้งานข้อ  13', content: 'views/app/landing/questionnair/KO_13.html'},
        { title: 'ใช้งานข้อ  14', content: 'views/app/landing/questionnair/KO_14.html'},
        { title: 'ใช้งานข้อ  15', content: 'views/app/landing/questionnair/KO_15.html'}
	],  
	bSelected = null,
    bPrevious = null;
	var bTabs = null;
	
	if('TXN_01' === menuCode){
		bTabs = wTab;
	} else if('TXN_02' === menuCode){
		bTabs = pTab;
	} else if('TXN_03' === menuCode){
		bTabs = uTab;
	} else if('TXN_04' === menuCode){
		bTabs = sTab;
	} else if('TXN_05' === menuCode){
		bTabs = eTab;
	} else if('PM_02' === menuCode){
		bTabs = labTab;
	} else if('PM_03' === menuCode){
		bTabs = daTab;
	} else if('PM_04' === menuCode){
		bTabs = soTab;
	}
	 
	    
	    $scope.bTabs = bTabs;
	    $scope.bSelectedIndex = 0;
	    $scope.$watch('bSelectedIndex', function(current, old){
	    	bPrevious = bSelected;
	      bSelected = bTabs[current];
	      if ( old + 1 && (old != current)) console.log('Goodbye ' + bPrevious.title + '!');
	      if ( current + 1 )                console.log('Hello ' + bSelected.title + '!');
	    });
	    
	    
	    
	    
	    
//	    $scope.addTab = function (title, view) {
//	      view = view || title + " Content View";
//	      tabs.push({ title: title, content: view, disabled: false});
//	    };
//	    $scope.removeTab = function (tab) {
//	      var index = tabs.indexOf(tab);
//	      tabs.splice(index, 1);
//	    };
	
  }
]);