angular.module('package.dashboard', ['ngRoute', 'controller.dashboard', 'service.github'])
    .config(['$routeProvider', function ($routes) {
        $routes
            .when('/dashboard', {
                controller: "DashboardCtrl", controllerAs: "dashboard", templateUrl: 'templates/app/dashboard/dashboard.html',
                resolve: {
                    eventData: ['_github', '$route', function (github, $route) {
                        github.setOwner($route.current.params.owner || '');
                        github.setRepo($route.current.params.repo || '');

                        return github.getEvents(100).$promise;
                    }],
                    issueData: ['_github', '$route', function (github, $route) {
                        github.setOwner($route.current.params.owner || '');
                        github.setRepo($route.current.params.repo || '');

                        return github.getIssues(100).$promise;
                    }],
                    branchData: ['_github', '$route', function (github, $route) {
                        github.setOwner($route.current.params.owner || '');
                        github.setRepo($route.current.params.repo || '');

                        return github.getBranches(100).$promise;
                    }],
                    pullData: ['_github', '$route', function (github, $route) {
                        github.setOwner($route.current.params.owner || '');
                        github.setRepo($route.current.params.repo || '');

                        return github.getPullRequests(100).$promise;
                    }]
                }
            })

            .otherwise({ redirectTo: '/dashboard' });
    }]);
