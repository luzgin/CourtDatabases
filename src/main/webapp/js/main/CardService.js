'use strict';
angular.module('courtApp').factory('CardService',
    ['$localStorage', '$http', '$q', 'urls', 'CardViewService',
        function ($localStorage, $http, $q, urls, CardViewService) {
            var factory = {
                getCard: getCard,
                createCard: createCard,
                updateCard: updateCard,
                removeCard: removeCard
            };
            return factory;

            function getCard(id) {
                console.log('Fetching Card with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.CARD_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Card with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Card with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createCard(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.CARD_SERVICE_API, entity)
                    .then(
                        function (response) {
                            CardViewService.loadAllCards();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateCard(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.CARD_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            CardViewService.loadAllCards();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeCard(id) {
                console.log('Removing Card with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.CARD_SERVICE_API + id)
                    .then(
                        function (response) {
                            CardViewService.loadAllCards();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Card with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);