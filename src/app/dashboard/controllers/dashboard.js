angular.module('controller.dashboard', ['service.github'])
    .controller('DashboardCtrl', ['_github', 'eventData', 'issueData', 'branchData', 'pullData', function (github, events, issues, branches, pulls) {
        this.events = events;
        this.issues = issues;
        this.branches = branches;
        this.pulls = pulls;

        this.owner = github.getOwner();
        this.repo = github.getRepo();
    }]);
