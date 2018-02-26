'use strict';
angular.module('courtApp').factory('EntityDecreeService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllEntitiesDecree: loadAllEntitiesDecree,
                getAllEntitiesDecree: getAllEntitiesDecree,
                getEntityDecree: getEntityDecree,
                createEntityDecree: createEntityDecree,
                updateEntityDecree: updateEntityDecree,
                removeEntityDecree: removeEntityDecree,
                getStatus: getStatus
            };
            return factory;

            function loadAllEntitiesDecree() {
                var deferred = $q.defer();
                $http.get(urls.ENTITY_DECREE_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.entitiesDecree = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getStatus() {
                return $localStorage.status;
            }
            function getAllEntitiesDecree() {
                return $localStorage.entitiesDecree;
            }

            function getEntityDecree(id) {
                console.log('Fetching EntityDecree with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.ENTITY_DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully EntityDecree with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading EntityDecree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createEntityDecree(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.ENTITY_DECREE_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadAllEntitiesDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateEntityDecree(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.ENTITY_DECREE_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllEntitiesDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeEntityDecree(id) {
                console.log('Removing EntityDecree with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.ENTITY_DECREE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllEntitiesDecree();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing EntityDecree with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);