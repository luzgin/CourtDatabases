var posdApp = angular.module("courtApp", ['ngSanitize', 'ngRoute','ngTable', 'ngStorage', 'ui.select']);
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
    COMPLAINT_SERVICE_API: 'http://localhost:8080/api/complaint/',
    CARD_SERVICE_API: 'http://localhost:8080/api/cardAdm/',
    DATE_RETURN_SERVICE_API: 'http://localhost:8080/api/returnCase/',
    DATE_REQUEST_SERVICE_API: 'http://localhost:8080/api/requestCase/',
    AUTHENTICATE: 'http://localhost:8080/api/authenticate/',
    USER_SERVICE_API: 'http://localhost:8080/api/users/'
});



posdApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/html/listCard.html',
            controller: 'CardViewController',
            controllerAs: 'cdviewC',
            data: {
                authorities: ['USER']
            },
            resolve: {
                Complaints: function ($q, CardViewService) {
                    var deferred = $q.defer();
                    CardViewService.clearLocal();
                    CardViewService.loadAllCards().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/login', {
            templateUrl: '/html/login.html',
        })
        .when('/card', {
            templateUrl: '/html/card.html',
            data: {
                authorities: ['USER']
            },
            resolve: {
                Complaints: function ($q, CardService, ArticleService, AuthorService, ComplaintService, OrgService,
                                      DecreeService, SecondInstanceService, EntityDecreeService, EntityService,
                                      NameEntityDecreeService, ResService, VialatorService) {
                    var deferred = $q.defer();
                    ArticleService.loadAllArticles();
                    AuthorService.loadAllAuthors();
                    AuthorService.loadAllAuthorsForOrganization();
                    ComplaintService.loadAllComplaints();
                    OrgService.loadAllOrganizations();
                    DecreeService.loadAllRegulations();
                    SecondInstanceService.loadAllSecondInstances();
                    EntityDecreeService.loadAllEntitiesDecree();
                    EntityService.loadAllEntities();
                    NameEntityDecreeService.loadAllNamesEntityDecree();
                    ResService.loadAllResults();
                    VialatorService.loadAllVialators().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/report', {
            templateUrl: '/html/report.html',
            controller: 'ReportController',
            controllerAs: 'repC',
            data: {
                authorities: ['USER']
            }
        })
        .when('/checkAnswerDate', {
            templateUrl: '/html/checkAnswerDate.html',
            controller: 'ReportController',
            controllerAs: 'repC',
            data: {
                authorities: ['USER']
            }
        })
        .when('/organizations', {
            templateUrl: '/html/listOrganization.html',
            controller: 'OrgController',
            controllerAs: 'orgC',
            data: {
                authorities: ['USER']
            },
            resolve: {
                organizations: function ($q, OrgService) {
                    var deferred = $q.defer();
                    OrgService.loadAllOrganizations().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }

        })
        .when('/results', {
            templateUrl: '/html/listResult.html',
            controller: 'ResController',
            controllerAs: 'resC',
            data: {
                authorities: ['ADMIN']
            },
            resolve: {
                results: function ($q, ResService) {
                    var deferred = $q.defer();
                    ResService.loadAllResults().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/entityIsks', {
            templateUrl: '/html/listEntityIsk.html',
            controller: 'EntityController',
            controllerAs: 'entC',
            data: {
                authorities: ['ADMIN']
            },
            resolve: {
                entityIsk: function ($q, EntityService) {
                    var deferred = $q.defer();
                    EntityService.loadAllEntities().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/articles', {
            templateUrl: '/html/listArticle.html',
            controller: 'ArticleController',
            controllerAs: 'artC',
            data: {
                authorities: ['USER']
            },
            resolve: {
                entityIsk: function ($q, ArticleService) {
                    var deferred = $q.defer();
                    ArticleService.loadAllArticles().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/vialators', {
            templateUrl: '/html/listVialator.html',
            controller: 'VialatorController',
            controllerAs: 'viaC',
            data: {
                authorities: ['USER']
            },
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
        .when('/authors', {
            templateUrl: '/html/listAuthor.html',
            controller: 'AuthorController',
            controllerAs: 'autC',
            data: {
                authorities: ['USER']
            },
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
            templateUrl: '/html/listNameEntityDecree.html',
            controller: 'NameEntityDecreeController',
            controllerAs: 'nedC',
            data: {
                authorities: ['ADMIN']
            },
            resolve: {
                authors: function ($q, NameEntityDecreeService) {
                    var deferred = $q.defer();
                    NameEntityDecreeService.loadAllNamesEntityDecree().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/entityDecree', {
            templateUrl: '/html/listEntityDecree.html',
            controller: 'EntityDecreeController',
            controllerAs: 'endC',
            data: {
                authorities: ['ADMIN']
            },
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
            templateUrl: '/html/listSecondInstance.html',
            controller: 'SecondInstanceController',
            controllerAs: 'secIC',
            data: {
                authorities: ['ADMIN']
            },
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
            templateUrl: '/html/listDecree.html',
            controller: 'DecreeController',
            controllerAs: 'decC',
            data: {
                authorities: ['ADMIN']
            },
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
            templateUrl: '/html/listComplaint.html',
            controller: 'ComplaintController',
            controllerAs: 'comC',
            data: {
                authorities: ['ADMIN']
            },
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
        .when('/users', {
            templateUrl: '/html/listUsers.html',
            controller: 'UserController',
            controllerAs: 'userC',
            data: {
                authorities: ['SUPER_ADMIN'],
            },
            resolve: {
                Users: function ($q, UserService) {
                    var deferred = $q.defer();
                    UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        })
        .when('/access-denied', {
            templateUrl: '/html/access-denied.html',
        })
        .when('/page-not-found', {
            templateUrl: '/html/page-not-found.html',
        })
        .otherwise({
            redirectTo: "/page-not-found"
        })

    //  $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

});

posdApp.run(function (AuthService, $rootScope, $location) {
    $rootScope.dateFrom = new Date(new Date().getFullYear(), 0, 1);
    $rootScope.dateTo = new Date();
    $rootScope.$on("$routeChangeStart", function (event, toState) {
        $rootScope.viewMenuAccses = AuthService.user;
        if (!AuthService.user) {
            $location.path("/login");
            localStorage.clear();
        } else {
            if (toState.$$route.data && toState.$$route.data.authorities) {
                var hasAccess = false;
                for (var i = 0; i < AuthService.user.authorities.length; i++) {
                    var authorities = AuthService.user.authorities[i];
                    if (toState.$$route.data.authorities == authorities) {
                        hasAccess = true;
                        break;
                    }
                }
                if (!hasAccess) {
                    event.preventDefault();
                    $location.path("/access-denied");
                }
            }
        }
    });
})
posdApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);
            items.forEach(function (item) {
                var itemMatches = false;
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});
posdApp.directive('ngLoad', function ($timeout, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope) {
            if (scope.$last === true) {
                $timeout(function () {
                    $rootScope.$broadcast('printTable');
                });
            }
        }
    }
});
var Message = {
    TYPE_INFO: 0,
    TYPE_SUCCESS: 1,
    TYPE_WARNING: 2,
    TYPE_DANGER: 3,

    generate: function (aText, aOptType_int) {
        var lTypeIndexes = [this.TYPE_INFO, this.TYPE_SUCCESS, this.TYPE_WARNING, this.TYPE_DANGER];
        var ltypes = ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'];
        var ltype = ltypes[this.TYPE_INFO];

        if (aOptType_int !== undefined && lTypeIndexes.indexOf(aOptType_int) !== -1) {
            ltype = ltypes[aOptType_int];
        }

        var lText = '';
        lText += "<h6>" + aText + "</h6>";
        var lMessage_e = $("<div class='alert " + ltype + "'>" + lText + "</div>");
        var start = Date.now();
        var timer = setInterval(function () {
            var timePassed = Date.now() - start;
            addOpacity(timePassed);
            if (timePassed >= 300) {
                clearInterval(timer);
                return;
            }
        }, 20);

        function addOpacity(timePassed) {
            document.getElementById("notifies").style.opacity = timePassed / 300;
        }

        setTimeout(function () {
            document.getElementById("notifies").style.opacity = 0;
            lMessage_e.alert('close');
        }, 4000);
        document.getElementById("notifies").style.opacity = 0;
        lMessage_e.prependTo($("#notifies"));

    }
};