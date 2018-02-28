'use strict';
angular.module('courtApp').factory('SecondInstanceService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllSecondInstances: loadAllSecondInstances,
                getAllSecondInstances: getAllSecondInstances,
                getSecondInstance: getSecondInstance,
                createSecondInstance: createSecondInstance,
                updateSecondInstance: updateSecondInstance,
                removeSecondInstance: removeSecondInstance
            };
            return factory;

            function loadAllSecondInstances() {
                var deferred = $q.defer();
                $http.get(urls.SECOND_INSTANCE_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.secondInstances = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllSecondInstances() {
                return $localStorage.secondInstances;
            }

            function getSecondInstance(id) {
                console.log('Fetching SecondInstance with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.SECOND_INSTANCE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully SecondInstance with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading SecondInstance with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createSecondInstance(secondInstance) {
                console.log('Creating secondInstance');
                var deferred = $q.defer();
                $http.post(urls.SECOND_INSTANCE_SERVICE_API, secondInstance)
                    .then(
                        function (response) {
                            loadAllSecondInstances();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating secondInstance : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateSecondInstance(secondInstance, id) {
                console.log('Updating secondInstance with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.SECOND_INSTANCE_SERVICE_API + id, secondInstance)
                    .then(
                        function (response) {
                            loadAllSecondInstances();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating secondInstance with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeSecondInstance(id) {
                console.log('Removing SecondInstance with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.SECOND_INSTANCE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllSecondInstances();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing SecondInstance with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
]);