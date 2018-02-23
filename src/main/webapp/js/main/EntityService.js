'use strict';
angular.module('courtApp').factory('EntityService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllEntities: loadAllEntities,
                getAllEntities: getAllEntities,
                getEntity: getEntity,
                createEntity: createEntity,
                updateEntity: updateEntity,
                removeEntity: removeEntity
            };
            return factory;

            function loadAllEntities() {
                var deferred = $q.defer();
                $http.get(urls.ENTITY_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.entities = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllEntities() {
                return $localStorage.entities;
            }

            function getEntity(id) {
                console.log('Fetching Entity with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.ENTITY_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Entity with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createEntity(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.ENTITY_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadAllEntities();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateEntity(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.ENTITY_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllEntities();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeEntity(id) {
                console.log('Removing Entity with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.ENTITY_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllEntities();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);