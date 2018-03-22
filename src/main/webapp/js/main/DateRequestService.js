'use strict';
angular.module('courtApp').factory('DateRequestService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                getDateRequestForCard: getDateRequestForCard,
                getDateRequest: getDateRequest,
                createDateRequest: createDateRequest,
                updateDateRequest: updateDateRequest,
                removeDateRequest: removeDateRequest,
                loadDateRequestForCard: loadDateRequestForCard
            };
            return factory;


            function getDateRequestForCard() {
                return $localStorage.dateRequestCaseForCard;
            }

            function getDateRequest(id) {
                console.log('Fetching DateRequest with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.DATE_REQUEST_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully DateRequest with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading DateRequest with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createDateRequest(entity) {
                console.log('Creating entity ');
                var deferred = $q.defer();
                $http.post(urls.DATE_REQUEST_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadDateRequestForCard(entity.cardAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadDateRequestForCard(id) {
                var deferred = $q.defer();
                $http.get(urls.DATE_REQUEST_SERVICE_API + "forCard/" + id)
                    .then(
                        function (response) {
                            $localStorage.dateRequestCaseForCard = response.data;
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateDateRequest(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.DATE_REQUEST_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadDateRequestForCard(entity.cardAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeDateRequest(id) {
                console.log('Removing DateRequest with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.DATE_REQUEST_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadDateRequestForCard($localStorage.card.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing DateRequest with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);