'use strict';
angular.module('courtApp').factory('VialatorService',
    ['$localStorage', '$http', '$q', 'urls','$rootScope',
        function ($localStorage, $http, $q, urls,$rootScope) {
            var factory = {
                loadAllVialators: loadAllVialators,
                loadAllVialatorsFiz: loadAllVialatorsFiz,
                loadAllVialatorsOrg: loadAllVialatorsOrg,
                getAllVialators: getAllVialators,
                getAllVialatorsFiz: getAllVialatorsFiz,
                getAllVialatorsOrg: getAllVialatorsOrg,
                getVialator: getVialator,
                createVialator: createVialator,
                updateVialator: updateVialator,
                removeVialator: removeVialator
            };
            return factory;

            function loadAllVialators() {
                var deferred = $q.defer();
                $http.get(urls.VIALATOR_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.vialators = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadAllVialatorsFiz() {
                var deferred = $q.defer();
                $http.get(urls.VIALATOR_SERVICE_API + "fiz")
                    .then(
                        function (response) {
                            $localStorage.vialatorsFiz = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadAllVialatorsOrg() {
                var deferred = $q.defer();
                $http.get(urls.VIALATOR_SERVICE_API + "org")
                    .then(
                        function (response) {
                            $localStorage.vialatorsOrg = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllVialators() {
                return $localStorage.vialators;
            }

            function getAllVialatorsFiz() {
                return $localStorage.vialatorsFiz;
            }

            function getAllVialatorsOrg() {
                return $localStorage.vialatorsOrg;
            }

            function getVialator(id) {
                console.log('Fetching Vialator with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.VIALATOR_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Vialator with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Vialator with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createVialator(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.VIALATOR_SERVICE_API, entity)
                    .then(
                        function (response) {
                            $rootScope.$broadcast('setVialatorForCard', {a: response.data});
                            loadAllVialators();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateVialator(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.VIALATOR_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllVialatorsFiz();
                            loadAllVialatorsOrg();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeVialator(id) {
                console.log('Removing Vialator with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.VIALATOR_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllVialatorsFiz();
                            loadAllVialatorsOrg();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Vialator with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);