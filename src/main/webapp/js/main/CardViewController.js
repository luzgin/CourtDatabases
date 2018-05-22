'use strict';

angular.module('courtApp').controller('CardViewController',
    ['CardViewService', 'ComplaintService', 'DateReturnService', 'DateRequestService', 'CardService', 'NgTableParams', '$route', '$scope', '$rootScope',
        function (CardViewService, ComplaintService, DateReturnService, DateRequestService, CardService, NgTableParams, $route, $scope, $rootScope) {

            var self = this;
            self.cardForRemove = {};
            self.cards = [];
            self.getAllCards = getAllCards;
            self.removeCard = removeCard;
            self.setCard = setCard;
            self.setCardForRemove = setCardForRemove;
            self.showRemoveModal = showRemoveModal;
            self.getCards = getCards;
            /*
                        self.dateFrom = new Date(new Date().getFullYear(), 0, 1);
                        self.dateTo = new Date();
            */
            /*
            self.tableParams = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {createDate: "desc"}
            }, {counts: [10, 25, 50], dataset: getAllCards()});
*/

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

            function getCards() {
                if ($scope.getCardsForm.$valid) {
                    //Date from, to for search on the main page
                    $rootScope.dateFrom = new Date(document.getElementById("dateFrom").value);
                    $rootScope.dateTo = new Date(document.getElementById("dateTo").value);
                    CardViewService.getCards($rootScope.dateFrom.getFullYear() + "-" + ($rootScope.dateFrom.getMonth() + 1) + "-" + $rootScope.dateFrom.getDate(),
                        $rootScope.dateTo.getFullYear() + "-" + ($rootScope.dateTo.getMonth() + 1) + "-" + $rootScope.dateTo.getDate())
                        .then(
                            function (report) {
                            },
                            function (errResponse) {
                                console.error('Error :' + errResponse.data);
                            }
                        )
                } else {
                    if ($scope.getCardsForm.dateFrom.$error.required) {
                        $scope.getCardsForm.dateFrom.check = true;
                        document.getElementById("dateFrom").focus();
                    } else if ($scope.getCardsForm.dateTo.$error.required) {
                        $scope.getCardsForm.dateTo.check = true;
                        document.getElementById("dateTo").focus();
                    }
                }


            }

            function showRemoveModal() {
                $('#ModalRemoveCard').modal('show');
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

                if (self.cardForRemove !== item) {
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
                $('#ModalRemoveCard').modal('hide');
                console.log('About to remove card with id ');
                CardService.removeCard(self.cardForRemove.id)
                    .then(
                        function () {
                            Message.generate('Карточка № ' + self.cardForRemove.cardNumber + ' успешно удалена!', 3);
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