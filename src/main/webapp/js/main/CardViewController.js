'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService', '$scope', function (CardViewService) {
        var self = this;
        self.cards = [];
        self.getAllCards = getAllCards;
        self.removeCard = removeCard;
        self.setCard = setCard;

        function getAllCards() {
            return CardViewService.getAllCards();
        }
        function setCard(item) {
            CardViewService.setCard(item);
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