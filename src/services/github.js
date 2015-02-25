angular.module('service.github', ['ngResource', 'ngRoute'])
    .service('_github', ['$resource', '$route', function ($resource, $route) {
        var owner = $route.current.params.owner || '',
            repo = $route.current.params.repo || '';

        this.getOwner = function () {
            return owner;
        };

        this.getRepo = function () {
            return repo;
        };

        this.getEvents = function(limit) {
            var endpoint = $resource('https://api.github.com/repos/:owner/:repo/events');

            return endpoint.query({ owner: owner, repo: repo, per_page: limit });
        };

        this.getIssues = function(limit) {
            var endpoint = $resource('https://api.github.com/repos/:owner/:repo/issues');

            return endpoint.query({ owner: owner, repo: repo, per_page: limit });
        };

        this.getPullRequests = function (limit) {
            var endpoint = $resource('https://api.github.com/repos/:owner/:repo/pulls');

            return endpoint.query({ owner: owner, repo: repo, per_page: limit });
        };

        this.getBranches = function (limit) {
            var endpoint = $resource('https://api.github.com/repos/:owner/:repo/branches');

            return endpoint.query({ owner: owner, repo: repo, per_page: limit });
        };
    }]);
