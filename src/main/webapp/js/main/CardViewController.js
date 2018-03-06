'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService', '$scope', function (CardViewService) {
        var self = this;
        self.card = {};
        self.cards = [];
        self.getAllCards = getAllCards;
        self.removeCard = removeCard;

        function getAllCards() {
            return CardViewService.getAllCards();
        }

        function removeCard(id) {
            console.log('About to remove card with id ' + id);
            CardViewService.removeCard(id)
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