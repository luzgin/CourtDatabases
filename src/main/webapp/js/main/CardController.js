'use strict';

angular.module('courtApp').controller('CardController',
    ['$localStorage', 'CardService', 'ArticleService', 'AuthorService', 'ComplaintService', 'OrgService',
        'DecreeService', 'SecondInstanceService', 'EntityDecreeService', 'EntityService',
        'NameEntityDecreeService', 'ResService', 'VialatorService', '$scope', function ($localStorage, CardService, ArticleService, AuthorService, ComplaintService, OrgService,
                                                                                        DecreeService, SecondInstanceService, EntityDecreeService, EntityService,
                                                                                        NameEntityDecreeService, ResService, VialatorService, $scope) {
        var self = this;
        self.card = CardService.getCardLocal();
        self.submit = submit;
        self.createCard = createCard;
        self.updateCard = updateCard;
        self.editCard = editCard;
        self.removeCard = removeCard;
        self.getAllArticles = getAllArticles;
        self.getAllNamesEntityDecree = getAllNamesEntityDecree;
        self.getAllEntitiesDecree = getAllEntitiesDecree;
        self.getAllResults = getAllResults;
        self.getAllRegulations = getAllRegulations;
        self.getAllSecondInstances = getAllSecondInstances;
        self.getAllAuthors = getAllAuthors;
        self.getAllVialators = getAllVialators;
        self.parseToDate = parseToDate;
        self.convertToDate = convertToDate;
        self.getComplaintsForDecree = getComplaintsForDecree;
        // редактирование посталовления self.editDecree = editDecree;

        self.card.createDate = parseToDate(self.card.createDate);
        if (self.card.resultDate != null) {
            self.card.resultDate = parseToDate(self.card.resultDate);
        }
        if (self.card.decreeAdm != null) {
            self.card.decreeAdm.decreeDate = parseToDate(self.card.decreeAdm.decreeDate);
            if (self.card.decreeAdm.secondInstanceAdm != null) {
                self.card.decreeAdm.secondInstanceAdm.decreeDate = parseToDate(self.card.decreeAdm.secondInstanceAdm.decreeDate);
            }
        }

        /* редактирвоание постановления
        function editDecree(id) {
            console.log('decree set');
            DecreeController.editDecree(id);
        }
        */
        function getAllArticles() {
            return ArticleService.getAllArticles();
        }
        function getComplaintsForDecree() {
            return ComplaintService.getComplaintsForDecree();
        }

        function parseToDate(date) {
            return new Date(date);
        }

        function convertToDate(date) {
            var d = new Date(date);
            var s;
            if (d.getDate() < 10) {
                s = "0" + (d.getDate())
            } else {
                s = d.getDate()
            }
            s = s + ".";
            if (d.getMonth() < 10) {
                s = s + "0" + (d.getMonth() + 1)
            } else {
                s = s + d.getMonth()
            }
            d = s + "." + d.getFullYear();
            return d;
        }

        function getAllNamesEntityDecree() {
            return NameEntityDecreeService.getAllNamesEntityDecree();
        }

        //пересмотреть и удалить
        function getAllEntitiesDecree() {
            return EntityDecreeService.getAllEntitiesDecree();
        }

        function getAllResults() {
            return ResService.getAllResults();
        }

        function getAllRegulations() {
            return DecreeService.getAllRegulations();
        }

        function getAllSecondInstances() {
            return SecondInstanceService.getAllSecondInstances();
        }

        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }

        function getAllVialators() {
            return VialatorService.getAllVialators();
        }

        function submit() {
            console.log('Submitting');
            if (self.card.id === undefined || self.card.id === null) {
                console.log('Saving New card', self.card);
                createCard(self.card);
            } else {
                updateCard(self.card, self.card.id);
                console.log('card updated with id ', self.card.id);
            }
        }

        function createCard(card) {
            console.log('About to create card');
            CardService.createCard(card).then(
                function (response) {
                    self.card.id = response.id;
                    ComplaintService.loadComplaintsForDecree(self.card.decreeAdm.id);
                    console.log('card created successfully');
                },
                function (errResponse) {
                    console.error('Error while creating card');
                }
            );
        }

        function updateCard(card, id) {
            console.log('About to update card');
            CardService.updateCard(card, id)
                .then(
                    function (response) {
                        console.log('card updated successfully' + self.card);
                    },
                    function (errResponse) {
                        console.error('Error while updating card');
                    }
                );
        }

        function editCard(id) {
            console.log('card get');
            CardService.getCard(id).then(
                function (card) {
                    self.card = card;
                    console.log('card get' + self.card);
                },
                function (errResponse) {
                    console.error('Error while removing card ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeCard(id) {
            console.log('About to remove card with id ' + id);
            CardService.removeCard(id)
                .then(
                    function () {
                        console.log('card ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing card ' + id + ', Error :' + errResponse.data);
                    }
                );
        }
    }
    ]);