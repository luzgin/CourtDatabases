'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService', 'ComplaintService', 'DateReturnService', 'DateRequestService', 'CardService', '$scope',
        function (CardViewService, ComplaintService, DateReturnService, DateRequestService, CardService) {
            var self = this;
            self.cardForRemove = {};
            self.cards = [];
            self.getAllCards = getAllCards;
            self.removeCard = removeCard;
            self.setCard = setCard;
            self.setCardForRemove = setCardForRemove;

            $(document).ready(function () {
                $("tbody tr").click(function () {
                    if($(this).hasClass("color-form-title")){
                        $(this).toggleClass("color-form-title");
                    }else{
                        $('table tr').removeClass('color-form-title');
                        $(this).toggleClass("color-form-title");
                    }
                })
            });

            function getAllCards() {
                return CardViewService.getAllCards();
            }

            function setCard(item) {
                CardViewService.setCard(item);
                ComplaintService.loadComplaintsForDecree(item.decreeAdm.id);
                DateReturnService.loadDateReturnForCard(item.id);
                DateRequestService.loadDateRequestForCard(item.id);
            }

            function setCardForRemove(item) {
                if (self.cardForRemove != item) {
                    self.cardForRemove = item;
                } else {
                    self.cardForRemove = {};
                }
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
                CardService.removeCard(self.cardForRemove.id)
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