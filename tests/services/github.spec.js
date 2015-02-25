describe("Service > GitHub", function () {
    var httpBackend;

    beforeEach(module('service.github'));

    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(inject(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    }));

    describe('When there is NO route data available', function () {
        it("should return the empty owner value", inject(function (_github) {
            var owner = _github.getOwner();
            expect(owner).toBe("");
        }));

        it("should return the empty repo value", inject(function (_github) {
            var repo = _github.getRepo();
            expect(repo).toBe("");
        }));
    });

    describe('When there is route data available', function () {

        beforeEach(inject(function ($injector) {
            var route = $injector.get('$route');
            route.current = { params: { owner: "andrew", repo: "example" } };
        }));

        it("should allow access to the assigned owner value", inject(function (_github) {
            var owner = _github.getOwner();
            expect(owner).toBe("andrew");
        }));

        it("should allow access to the assigned repo value", inject(function (_github) {
            var repo = _github.getRepo();
            expect(repo).toBe("example");
        }));

        it("should load all event data from github", inject(function (_github) {
            httpBackend.expectGET('https://api.github.com/repos/andrew/example/events').respond(200);

            _github.getEvents();
            httpBackend.flush();
        }));

        it("should load all issue data from github", inject(function (_github) {
            httpBackend.expectGET('https://api.github.com/repos/andrew/example/issues').respond(200);

            _github.getIssues();
            httpBackend.flush();
        }));

        it("should load all pull request data from github", inject(function (_github) {
            httpBackend.expectGET('https://api.github.com/repos/andrew/example/pulls').respond(200);

            _github.getPullRequests();
            httpBackend.flush();
        }));

        it("should load all branch data from github", inject(function (_github) {
            httpBackend.expectGET('https://api.github.com/repos/andrew/example/branches').respond(200);

            _github.getBranches();
            httpBackend.flush();
        }));
    });
});
