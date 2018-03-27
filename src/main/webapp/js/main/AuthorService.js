'use strict';
angular.module('courtApp').factory('AuthorService',
    ['$localStorage', '$http', '$q', 'urls','$rootScope',
        function ($localStorage, $http, $q, urls, $rootScope) {
            var factory = {
                loadAllAuthors: loadAllAuthors,
                getAllAuthors: getAllAuthors,
                loadAllAuthorsForOrganization: loadAllAuthorsForOrganization,
                getAuthorsForRegionalCourt: getAuthorsForRegionalCourt,
                getAuthorsForOrganization: getAuthorsForOrganization,
                setAuthorsForOrganization: setAuthorsForOrganization,
                getAuthor: getAuthor,
                createAuthor: createAuthor,
                updateAuthor: updateAuthor,
                removeAuthor: removeAuthor,
                getStatus: getStatus
            };
            return factory;
            var authorsForOrganization = []; //список авторов для выбранной организации в select

            function loadAllAuthors() {
                var deferred = $q.defer();
                $http.get(urls.AUTHOR_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.authors = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function setAuthorsForOrganization(id) { //список авторов для выбранной организации в select
                var deferred = $q.defer();
                $http.get(urls.AUTHOR_SERVICE_API + "org/" + id)
                    .then(
                        function (response) {
                            authorsForOrganization = response.data;
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Author with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getStatus() {
                return $localStorage.status;
            }

            function getAllAuthors() {
                return $localStorage.authors;
            }
            function getAuthorsForOrganization() {
                return authorsForOrganization;
            }

            function getAuthorsForRegionalCourt() {
                return $localStorage.authorsRegionalCourt;
            }

            function getAuthor(id) {
                console.log('Fetching Author with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.AUTHOR_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Author with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Author with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadAllAuthorsForOrganization() {
                var c = decodeURI("Витебский областной суд");
                var deferred = $q.defer();
                $http.get(urls.AUTHOR_SERVICE_API + "forOrganization/" + encodeURIComponent(c) + "/" + 1)
                    .then(
                        function (response) {
                            $localStorage.authorsRegionalCourt = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            console.error('Error while loading Author with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createAuthor(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                entity.activWork = 'true';
                $http.post(urls.AUTHOR_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadAllAuthors();
                            setAuthorsForOrganization(entity.organization.id)
                                .then( //после добавления автора, обновление информации об авторах в переменных контроллеров
                                    function (response) {
                                        $rootScope.$broadcast('setAuthorsForOrganization');
                                    },
                                    function (errResponse) {
                                    }
                                );
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateAuthor(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.AUTHOR_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllAuthors();
                            setAuthorsForOrganization(entity.organization.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeAuthor(id) {
                console.log('Removing Author with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.AUTHOR_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllAuthors();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Author with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);