'use strict';
angular.module('courtApp').factory('CardViewService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllCards: loadAllCards,
                getAllCards: getAllCards,
                removeCard: removeCard,
                loadCard: loadCard,
                loadCardForRemove: loadCardForRemove,
                setCard: setCard,
                setCardForRemove: setCardForRemove
            };
            return factory;

            function loadCard() {
                $localStorage.card = {};
               // $localStorage.complaintsForDecree = {};
            }

            function loadCardForRemove() {
               // $localStorage.cardForRemove = {};
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

            function setCardForRemove(item) {
                if ($localStorage.cardForRemove == item) {
                    $localStorage.cardForRemove = {};
                } else {
                    $localStorage.cardForRemove = item;
                }
            }

            function removeCard() {
                console.log('Removing Card with id ' + $localStorage.cardForRemove.id);
                var deferred = $q.defer();
                $http.delete(urls.CARD_SERVICE_API + $localStorage.cardForRemove.id)
                    .then(
                        function (response) {
                            loadAllCards();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Card with id :' + $localStorage.cardForRemove.id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);