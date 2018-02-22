'use strict';
angular.module('courtApp').factory('ResService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllResults: loadAllResults,
                getAllResults: getAllResults,
                getResult: getResult,
                createResult: createResult,
                updateResult: updateResult,
                removeResult: removeResult
            };
            return factory;

            function loadAllResults() {
                var deferred = $q.defer();
                $http.get(urls.RESULT_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.results = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllResults() {
                return $localStorage.results;
            }

            function getResult(id) {
                console.log('Fetching result with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.RESULT_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully result with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading result with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createResult(result) {
                console.log('Creating result');
                var deferred = $q.defer();
                $http.post(urls.RESULT_SERVICE_API, result)
                    .then(
                        function (response) {
                            loadAllResults();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating result : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateResult(result, id) {
                console.log('Updating result with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.RESULT_SERVICE_API + id, result)
                    .then(
                        function (response) {
                            loadAllResults();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating result with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeResult(id) {
                console.log('Removing result with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.RESULT_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllResults();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing result with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);