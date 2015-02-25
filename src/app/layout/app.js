angular.module('package.layout', ['ngRoute', 'controller.layout'])
    .config(['$routeProvider', function ($routes) {
        $routes
            .when('/404', {
                templateUrl: 'templates/app/layout/404.html'
            });
    }]);
