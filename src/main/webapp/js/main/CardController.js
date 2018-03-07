'use strict';

angular.module('courtApp').controller('CardController',
    ['CardService', 'ArticleService', 'AuthorService', 'ComplaintService', 'OrgService',
        'DecreeService', 'SecondInstanceService', 'EntityDecreeService', 'EntityService',
        'NameEntityDecreeService', 'ResService', 'VialatorService', '$scope', function (CardService, ArticleService, AuthorService, ComplaintService, OrgService,
                                        DecreeService, SecondInstanceService, EntityDecreeService, EntityService,
                                        NameEntityDecreeService, ResService, VialatorService, $scope) {
        var self = this;
        self.card = {};
        self.submit = submit;
        self.createCard = createCard;
        self.updateCard = updateCard;
        self.editCard = editCard;
        self.removeCard = removeCard;
        self.getAllArticles = getAllArticles;

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
                    console.log('card created successfully');
                    self.done = true;
                    self.card = {};
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
                        self.done = true;
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