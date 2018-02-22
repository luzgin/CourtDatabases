var posdApp = angular.module("courtApp",['ngRoute', 'ngStorage']);

posdApp.constant('urls', {
    BASE: 'http://localhost:8080/',
    ORGANIZATION_SERVICE_API : 'http://localhost:8080/api/organization/'
});

posdApp.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'listOrganization.html',
            controller: 'OrgController',
            controllerAs:'orgC',
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
    });
