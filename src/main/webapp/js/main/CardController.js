'use strict';

angular.module('courtApp').controller('CardController',
    ['$localStorage','CardService', 'ArticleService', 'AuthorService', 'ComplaintService', 'OrgService',
        'DecreeService', 'SecondInstanceService', 'EntityDecreeService', 'EntityService',
        'NameEntityDecreeService', 'ResService', 'VialatorService', '$scope', function ($localStorage, CardService, ArticleService, AuthorService, ComplaintService, OrgService,
                                        DecreeService, SecondInstanceService, EntityDecreeService, EntityService,
                                        NameEntityDecreeService, ResService, VialatorService, $scope, DecreeController) {
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
        // редактирование посталовления self.editDecree = editDecree;

        self.card.createDate = new Date(self.card.createDate);
        if (self.card.resultDate != null){
            self.card.resultDate = new Date((self.card.resultDate));
        }
        if (self.card.decreeAdm != null){
            self.card.decreeAdm.decreeDate = new Date(self.card.decreeAdm.decreeDate);
            if (self.card.decreeAdm.secondInstanceAdm != null){
                self.card.decreeAdm.secondInstanceAdm.decreeDate = new Date(self.card.decreeAdm.secondInstanceAdm.decreeDate);
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
                        console.log('card updated successfully'+ self.card);
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
                    console.log('card get'+ self.card);
                },
                function (errResponse) {
                    console.error('Error while removing card ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeCard(id){
            console.log('About to remove card with id '+id);
            CardService.removeCard(id)
                .then(
                    function(){
                        console.log('card '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing card '+id +', Error :'+errResponse.data);
                    }
                );
        }
    }
    ]);