'use strict';
angular.module('courtApp').factory('AuthorService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllAuthors: loadAllAuthors,
                getAllAuthors: getAllAuthors,
                getAuthor: getAuthor,
                createAuthor: createAuthor,
                updateAuthor: updateAuthor,
                removeAuthor: removeAuthor
            };
            return factory;

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

            function getAllAuthors() {
                return $localStorage.authors;
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

            function createAuthor(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.AUTHOR_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadAllAuthors();
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