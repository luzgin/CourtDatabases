'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService','ComplaintService','DateReturnService', '$scope', function (CardViewService,ComplaintService,DateReturnService) {
        var self = this;
        self.cardForRemove = {};
        self.cards = [];
        self.getAllCards = getAllCards;
        self.removeCard = removeCard;
        self.setCard = setCard;
        self.setCardForRemove = setCardForRemove;

        function getAllCards() {
            return CardViewService.getAllCards();
        }

        function setCard(item) {
            CardViewService.setCard(item);
            ComplaintService.loadComplaintsForDecree(item.decreeAdm.id);
            DateReturnService.loadDateReturnForCard(item.id);
        }

        function setCardForRemove(item) {
            CardViewService.setCardForRemove(item);

            /*   закрашивание строки таблицы при наведении, раскоментить main.css
            $(document).ready(function(){
                $('table tr').on('click', function(e) {
                    $('table tr').removeClass('marked');
                    $(this).addClass('marked');
                });
            });
            */
        }

        function removeCard() {
            console.log('About to remove card with id ');
            CardViewService.removeCard()
                .then(
                    function () {
                        console.log('card  removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing card, Error :' + errResponse.data);
                    }
                );
        }
    }
    ]);