'use strict';
angular.module('app').controller('AppCtrl', ['$scope', '$http', '$localStorage', '$timeout', '$stateParams', '$state', '$rootScope',
  function AppCtrl($scope, $http, $localStorage, $timeout, $state, $stateParams, $rootScope) {
    $scope.mobileView = 767;
    $scope.app = {
      name: 'Reactor',
      year: (new Date()).getFullYear(),
      layout: {
        isSmallSidebar: false,
        isChatOpen: false,
        isFixedHeader: true,
        isFixedFooter: false,
        isBoxed: false,
        isStaticSidebar: false,
        isRightSidebar: false,
        isOffscreenOpen: false,
        isConversationOpen: false,
        isQuickLaunch: false,
        sidebarTheme: '',
        headerTheme: ''
      },
      isMessageOpen: false,
      isContactOpen: false,
      isConfigOpen: false
    };

    if (angular.isDefined($localStorage.layout)) {
      $scope.app.layout = $localStorage.layout;
    } else {
      $localStorage.layout = $scope.app.layout;
    }

    $scope.$watch('app.layout', function() {
      $localStorage.layout = $scope.app.layout;
    }, true);

    $scope.$on('$viewContentLoaded', function() {
      angular.element('.pageload').fadeOut(1500);
      $timeout(function() {
        angular.element('body').removeClass('page-loading');
      }, 2000);
    });

    $scope.getRandomArbitrary = function() {
      return Math.round(Math.random() * 100);
    };

    $scope.searchFocus = false;
    $scope.focusOn = function() {
      $scope.searchFocus = true;
    };
    $scope.focusOff = function() {
      $timeout(function() {
        $scope.searchFocus = false;
      }, 100);
    };
    //fluke



  }
]);

angular.module('app').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
