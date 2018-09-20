'use strict';

angular.module('app').config(['toastrConfig', function(toastrConfig){
	angular.extend(toastrConfig, {
		newestOnTop		: true,
		autoDismiss		: true,
		timeOut			: 0,
		tapToDismiss	: true,
		preventOpenDuplicates : true,
		maxOpened		: 1,	
		closeButton		: true,
	    iconClasses		: {
					        error	: 'toast-error',
					        info	: 'toast-info',
					        success	: 'toast-success',
					        warning	: 'toast-warning'
					      },  
	    positionClass	: 'toast-top-full-width'
	});
}]);