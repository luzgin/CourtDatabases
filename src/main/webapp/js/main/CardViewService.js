'use strict';
angular.module('courtApp').factory('CardViewService',
    ['$localStorage', '$http', '$q', 'urls', '$rootScope',
        function ($localStorage, $http, $q, urls, $rootScope) {
            var factory = {
                loadAllCards: loadAllCards,
                getAllCards: getAllCards,
                clearLocal: clearLocal,
                setCard: setCard,
                getCards: getCards
            };
            return factory;

            function clearLocal() {
                var deferred = $q.defer();
                $localStorage.card = {};
                $localStorage.dateRequestCaseForCard = {};
                $localStorage.dateReturnCaseForCard = {};
                return deferred.promise;
            }

            function getCards(dateFrom, dateTo) {

                var deferred = $q.defer();
                $http.get(urls.CARD_SERVICE_API + "getCards/" + dateFrom + "/" + dateTo)
                    .then(
                        function (response) {
                            $localStorage.cards = response.data;
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error report');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;

            }

            function loadAllCards() {
                var deferred = $q.defer();
                $http.get(urls.CARD_SERVICE_API + "getCards/"
                    +
                    ($rootScope.dateFrom.getFullYear() + "-" + ($rootScope.dateFrom.getMonth() + 1) + "-" + $rootScope.dateFrom.getDate())
                    + "/" +
                    ($rootScope.dateTo.getFullYear() + "-" + ($rootScope.dateTo.getMonth() + 1) + "-" + $rootScope.dateTo.getDate())
                )
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
        }
    ]);