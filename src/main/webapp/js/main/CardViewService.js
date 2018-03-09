'use strict';
angular.module('courtApp').factory('CardViewService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllCards: loadAllCards,
                getAllCards: getAllCards,
                removeCard: removeCard,
                loadCard: loadCard,
                setCard: setCard,
            };
            return factory;

            function loadCard() {
                $localStorage.card ={};
            }
            function loadAllCards() {
                var deferred = $q.defer();
                $http.get(urls.CARD_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.cards = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllCards() {
                return $localStorage.cards;
            }
            function setCard(item) {
                $localStorage.card = item;
            }

            function removeCard(id) {
                console.log('Removing Card with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.CARD_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllCards();
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