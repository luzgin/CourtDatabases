var posdApp = angular.module("courtApp", ['ngRoute', 'ngStorage']);

posdApp.constant('urls', {
    BASE: 'http://localhost:8080/',
    ORGANIZATION_SERVICE_API: 'http://localhost:8080/api/organization/',
    RESULT_SERVICE_API: 'http://localhost:8080/api/result/'
});

posdApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'listResult.html',
            controller: 'Resontroller',
            controllerAs: 'resC',
            resolve: {
                organizations: function ($q, ResService) {
                    var deferred = $q.defer();
                    ResService.loadAllResults().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/organization', {
            templateUrl: 'listOrganization.html',
            controller: 'OrgController',
            controllerAs: 'orgC',
            resolve: {
                organizations: function ($q, OrgService) {
                    var deferred = $q.defer();
                    OrgService.loadAllOrganizations().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }

        })
        .otherwise({
            redirectTo: "/"
        })
})
;
