'use strict';
angular.module('courtApp').factory('NameEntityDecreeService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllNamesEntityDecree: loadAllNamesEntityDecree,
                getAllNamesEntityDecree: getAllNamesEntityDecree,
                getNameEntityDecree: getNameEntityDecree,
                createNameEntityDecree: createNameEntityDecree,
                updateNameEntityDecree: updateNameEntityDecree,
                removeNameEntityDecree: removeNameEntityDecree
            };
            return factory;

            function loadAllNamesEntityDecree() {
                var deferred = $q.defer();
                $http.get(urls.NAME_ENTITY_DECREE_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.namesEntityDecree = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllNamesEntityDecree() {
                return $localStorage.namesEntityDecree;
            }

            function getNameEntityDecree(id) {
                console.log('Fetching nameEntityDecree with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.NAME_ENTITY_DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully nameEntityDecree with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading nameEntityDecree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createNameEntityDecree(nameEntityDecree) {
                console.log('Creating nameEntityDecree');
                var deferred = $q.defer();
                $http.post(urls.NAME_ENTITY_DECREE_SERVICE_API, nameEntityDecree)
                    .then(
                        function (response) {
                            loadAllNamesEntityDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating nameEntityDecree : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateNameEntityDecree(nameEntityDecree, id) {
                console.log('Updating nameEntityDecree with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.NAME_ENTITY_DECREE_SERVICE_API + id, nameEntityDecree)
                    .then(
                        function (response) {
                            loadAllNamesEntityDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating nameEntityDecree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeNameEntityDecree(id) {
                console.log('Removing nameEntityDecree with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.NAME_ENTITY_DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllNamesEntityDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing nameEntityDecree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);