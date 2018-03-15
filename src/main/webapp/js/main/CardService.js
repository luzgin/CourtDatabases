'use strict';
angular.module('courtApp').factory('CardService',
    ['$localStorage', '$http', '$q', 'urls', 'CardViewService', 'EntityDecreeService',
        function ($localStorage, $http, $q, urls, CardViewService, EntityDecreeService) {
            var factory = {
                getCard: getCard,
                getCardLocal: getCardLocal,
                createCard: createCard,
                updateCard: updateCard,
                removeCard: removeCard,
                loadComplaintForEdit: loadComplaintForEdit,
                setComplaintForEdit: setComplaintForEdit

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
            function loadComplaintForEdit() {
                $localStorage.complaintForEdit = {};
            }
            function setComplaintForEdit(item) {
                if ($localStorage.complaintForEdit == item) {
                    $localStorage.complaintForEdit = {};
                } else {
                    $localStorage.complaintForEdit = item;
                }
            }

            function getCardLocal() {
                return $localStorage.card;
            }

            function createCard(entity) {
                var entityDecree = {};
                entityDecree = {
                    nameEntityDecreeAdm: entity.entityDecreeAdm.nameEntityDecreeAdm,
                    prim: entity.entityDecreeAdm.prim
                };
                var deferred = $q.defer();
                EntityDecreeService.createEntityDecree(entityDecree).then(
                    function (response) {
                        entityDecree = response;
                        entity.entityDecreeAdm = entityDecree;
                        console.log('Creating entity');
                        entity.cardActiv = true;
                        $http.post(urls.CARD_SERVICE_API, entity)
                            .then(
                                function (response) {
                                    CardViewService.loadAllCards();
                                    deferred.resolve(response.data);
                                },
                                function (errResponse) {
                                    EntityDecreeService.removeEntityDecree(entity.entityDecreeAdm.id);
                                    console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                                    deferred.reject(errResponse);
                                }
                            );
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