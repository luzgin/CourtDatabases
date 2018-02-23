var posdApp = angular.module("courtApp", ['ngRoute', 'ngStorage']);

posdApp.constant('urls', {
    BASE: 'http://localhost:8080/',
    ORGANIZATION_SERVICE_API: 'http://localhost:8080/api/organization/',
    RESULT_SERVICE_API: 'http://localhost:8080/api/result/',
    ENTITY_SERVICE_API: 'http://localhost:8080/api/entitiesiskadm/',
    ARTICLE_SERVICE_API: 'http://localhost:8080/api/article/',
    VIALATOR_SERVICE_API: 'http://localhost:8080/api/vialator/'
});

posdApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'listVialator.html',
            controller: 'VialatorController',
            controllerAs: 'viaC',
            resolve: {
                vialatorFiz: function ($q, VialatorService) {
                    var deferred = $q.defer();
                    VialatorService.loadAllVialatorsFiz().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                },
                vialatorOrg: function ($q, VialatorService) {
                    var deferred = $q.defer();
                    VialatorService.loadAllVialatorsOrg().then(deferred.resolve, deferred.resolve);
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
        .when('/result', {
            templateUrl: 'listResult.html',
            controller: 'ResController',
            controllerAs: 'resC',
            resolve: {
                results: function ($q, ResService) {
                    var deferred = $q.defer();
                    ResService.loadAllResults().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/entityIsk', {
            templateUrl: 'listEntityIsk.html',
            controller: 'EntityController',
            controllerAs: 'entC',
            resolve: {
                entityIsk: function ($q, EntityService) {
                    var deferred = $q.defer();
                    EntityService.loadAllEntities().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/article', {
            templateUrl: 'listArticle.html',
            controller: 'ArticleController',
            controllerAs: 'artC',
            resolve: {
                entityIsk: function ($q, ArticleService) {
                    var deferred = $q.defer();
                    ArticleService.loadAllArticles().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        })
})
;
