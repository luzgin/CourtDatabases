'use strict';
angular.module('courtApp').factory('DateReturnService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                getDateReturnForCard: getDateReturnForCard,
                getDateReturn: getDateReturn,
                createDateReturn: createDateReturn,
                updateDateReturn: updateDateReturn,
                removeDateReturn: removeDateReturn,
                loadDateReturnForCard: loadDateReturnForCard
            };
            return factory;


            function getDateReturnForCard() {
                return $localStorage.dateReturnCaseForCard;
            }

            function getDateReturn(id) {
                console.log('Fetching DateReturn with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.DATE_RETURN_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully DateReturn with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading DateReturn with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createDateReturn(entity) {
                console.log('Creating entity ');
                var deferred = $q.defer();
                $http.post(urls.DATE_RETURN_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadDateReturnForCard(entity.cardAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadDateReturnForCard(id) {
                var deferred = $q.defer();
                $http.get(urls.DATE_RETURN_SERVICE_API + "forCard/" + id)
                    .then(
                        function (response) {
                            $localStorage.dateReturnCaseForCard = response.data;
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateDateReturn(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.DATE_RETURN_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadDateReturnForCard(entity.cardAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeDateReturn(id) {
                console.log('Removing DateReturn with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.DATE_RETURN_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadDateReturnForCard($localStorage.card.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing DateReturn with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);