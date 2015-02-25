angular.module('package.dashboard', ['ngRoute', 'controller.dashboard', 'service.github'])
    .config(['$routeProvider', function ($routes) {
        $routes
            .when('/dashboard', {
                controller: "DashboardCtrl",
                controllerAs: "dashboard",
                templateUrl: 'templates/app/dashboard/dashboard.html',
                resolve: {
                    eventData: ['_github', function (github) {
                        return github.getEvents(100).$promise;
                    }],
                    issueData: ['_github', function (github) {
                        return github.getIssues(100).$promise;
                    }],
                    branchData: ['_github', function (github) {
                        return github.getBranches(100).$promise;
                    }],
                    pullData: ['_github', function (github) {
                        return github.getPullRequests(100).$promise;
                    }]
                }
            })

            .otherwise({ redirectTo: '/dashboard' });
    }]);
