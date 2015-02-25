angular.module('controller.layout', [])
    .controller('LayoutCtrl', ['$rootScope', '$location', function ($scope, $location) {
        $scope.$on('$routeChangeError', function(evt, message) {
            console.log(message);
            $location.url('404');
        });
    }]);
