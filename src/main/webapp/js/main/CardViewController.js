'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService', 'ComplaintService', 'DateReturnService', 'DateRequestService', 'CardService','NgTableParams','$route',
        function (CardViewService, ComplaintService, DateReturnService, DateRequestService, CardService, NgTableParams, $route) {

            var self = this;
            self.cardForRemove = {};
            self.cards = [];
            self.getAllCards = getAllCards;
            self.removeCard = removeCard;
            self.setCard = setCard;
            self.setCardForRemove = setCardForRemove;

            var data = getAllCards();
            self.tableParams = new NgTableParams({
                sorting: {createDate: "desc"},
                count: 10
            }, {counts: [10, 25, 50], dataset: data});

            document.getElementById("removeButton").setAttribute('disabled', 'disabled');
            $(document).ready(function () {
                $("tbody tr").click(function () {
                    if ($(this).hasClass("color-form-title")) {
                        $(this).toggleClass("color-form-title");
                    } else {
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

            function setCardForRemove(item, tr) {
                var currentTr = document.getElementById("myTable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

                function ressetBorder() {
                    for (var i = 0; i < currentTr.length; i++) {
                        currentTr[i].style.backgroundColor = "#ffffff";
                    }
                }

                if (self.cardForRemove != item) {
                    self.cardForRemove = item;
                    ressetBorder();
                    currentTr[tr.$index].style.backgroundColor = '#9cc3e0';
                    document.getElementById("removeButton").removeAttribute('disabled');
                } else {
                    self.cardForRemove = {};
                    ressetBorder();
                    document.getElementById("removeButton").setAttribute('disabled', 'disabled');
                }
            }

            function removeCard() {
                console.log('About to remove card with id ');
                CardService.removeCard(self.cardForRemove.id)
                    .then(
                        function () {
                            Message.generate('Карточка № '+self.cardForRemove.cardNumber+' успешно удалена!', 3);
                            console.log('card  removed successfully');
                            $route.reload();


                        },
                        function (errResponse) {
                            console.error('Error while removing card, Error :' + errResponse.data);
                            Message.generate('Ошибка при удалении карточки!', 3);
                        }
                    );
                document.getElementById("removeButton").setAttribute('disabled', 'disabled');
            }
        }
    ]);