'use strict';
angular.module('courtApp').factory('DecreeService',
    ['$localStorage', '$http', '$q', 'urls','$rootScope',
        function ($localStorage, $http, $q, urls, $rootScope) {
            var factory = {
                loadAllRegulations: loadAllRegulations,
                getAllRegulations: getAllRegulations,
                getDecree: getDecree,
                createDecree: createDecree,
                updateDecree: updateDecree,
                removeDecree: removeDecree
            };
            return factory;

            function loadAllRegulations() {
                var deferred = $q.defer();
                $http.get(urls.DECREE_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.regulations = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllRegulations() {
                return $localStorage.regulations;
            }

            function getDecree(id) {
                console.log('Fetching Decree with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Decree with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Decree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createDecree(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.DECREE_SERVICE_API, entity)
                    .then(
                        function (response) {
                            $rootScope.$broadcast('setDecreeForCard', {a: response.data});
                            loadAllRegulations();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateDecree(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.DECREE_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllRegulations();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeDecree(id) {
                console.log('Removing Decree with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllRegulations();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Decree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);