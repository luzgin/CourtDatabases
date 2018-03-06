var posdApp = angular.module("courtApp", ['ngRoute', 'ngStorage']);

posdApp.constant('urls', {
    BASE: 'http://localhost:8080/',
    ORGANIZATION_SERVICE_API: 'http://localhost:8080/api/organization/',
    RESULT_SERVICE_API: 'http://localhost:8080/api/result/',
    ENTITY_SERVICE_API: 'http://localhost:8080/api/entitiesiskadm/',
    ARTICLE_SERVICE_API: 'http://localhost:8080/api/article/',
    VIALATOR_SERVICE_API: 'http://localhost:8080/api/vialator/',
    AUTHOR_SERVICE_API: 'http://localhost:8080/api/author/',
    ENTITY_DECREE_SERVICE_API: 'http://localhost:8080/api/entitydecree/',
    NAME_ENTITY_DECREE_SERVICE_API: 'http://localhost:8080/api/nameentitydecree/',
    SECOND_INSTANCE_SERVICE_API: 'http://localhost:8080/api/secondInstance/',
    DECREE_SERVICE_API: 'http://localhost:8080/api/decree/',
    CONPLAINT_SERVICE_API: 'http://localhost:8080/api/complaint/',
    CARD_SERVICE_API: 'http://localhost:8080/api/cardAdm/'
});

posdApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'listCard.html',
            controller: 'CardViewController',
            controllerAs: 'cdviewC',
            resolve: {
                Complaints: function ($q, CardViewService) {
                    var deferred = $q.defer();

                    CardViewService.loadAllCards().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/card', {
            templateUrl: 'card.html',
           /* controller: 'CardViewController',
            controllerAs: 'cdviewC',
            resolve: {
                Complaints: function ($q, CardViewService) {
                    var deferred = $q.defer();

                    CardViewService.loadAllCards().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }  */
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
        .when('/vialators', {
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
        .when('/author', {
            templateUrl: 'listAuthor.html',
            controller: 'AuthorController',
            controllerAs: 'autC',
            resolve: {
                authors: function ($q, AuthorService, OrgService) {
                    var deferred = $q.defer();
                    OrgService.loadAllOrganizations();
                    AuthorService.loadAllAuthors().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/nameEntityDecree', {
            templateUrl: 'listNameEntityDecree.html',
            controller: 'NameEntityDecreeController',
            controllerAs: 'nedC',
            resolve: {
                authors: function ($q, NameEntityDecreeService) {
                    var deferred = $q.defer();
                    NameEntityDecreeService.loadAllNamesEntityDecree().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/entityDecree', {
            templateUrl: 'listEntityDecree.html',
            controller: 'EntityDecreeController',
            controllerAs: 'endC',
            resolve: {
                authors: function ($q, EntityDecreeService, NameEntityDecreeService) {
                    var deferred = $q.defer();
                    NameEntityDecreeService.loadAllNamesEntityDecree();
                    EntityDecreeService.loadAllEntitiesDecree().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/secondInstance', {
            templateUrl: 'listSecondInstance.html',
            controller: 'SecondInstanceController',
            controllerAs: 'secIC',
            resolve: {
                secondInstance: function ($q, SecondInstanceService, AuthorService, OrgService) {
                    var deferred = $q.defer();
                    AuthorService.loadAllAuthors();
                    OrgService.loadAllOrganizations();
                    SecondInstanceService.loadAllSecondInstances().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }

        })
        .when('/regulations', {
            templateUrl: 'listDecree.html',
            controller: 'DecreeController',
            controllerAs: 'decC',
            resolve: {
                Regulations: function ($q, DecreeService, AuthorService, OrgService, SecondInstanceService) {
                    var deferred = $q.defer();
                    AuthorService.loadAllAuthors();
                    OrgService.loadAllOrganizations();
                    SecondInstanceService.loadAllSecondInstances();
                    DecreeService.loadAllRegulations().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }

        })
        .when('/complaints', {
            templateUrl: 'listComplaint.html',
            controller: 'ComplaintController',
            controllerAs: 'comC',
            resolve: {
                Complaints: function ($q, ComplaintService, DecreeService, EntityService) {
                    var deferred = $q.defer();
                    EntityService.loadAllEntities();
                    DecreeService.loadAllRegulations();
                    ComplaintService.loadAllComplaints().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .otherwise({
            redirectTo: "/nameEntityDecree"
        })
})
;
