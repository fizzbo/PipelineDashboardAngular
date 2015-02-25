angular.module('service.github', ['ngResource'])
    .service('_github', ['$resource', function ($resource) {
        var owner, repo;

        this.setOwner = function (newOwner) {
            owner = newOwner;
        };

        this.getOwner = function () {
            return owner;
        };

        this.setRepo = function (newRepo) {
            repo = newRepo;
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
