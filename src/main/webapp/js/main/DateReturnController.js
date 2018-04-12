'use strict';

angular.module('courtApp').controller('DateReturnController',
    ['DateReturnService', 'CardService', '$scope', function (DateReturnService, CardService, $scope) {
        var self = this;
        self.dateReturn = {};
        self.dateReturns = [];

        self.submit = submit;
        self.createDateReturn = createDateReturn;
        self.updateDateReturn = updateDateReturn;
        self.getAllDateReturns = getAllDateReturns;
        self.editDateReturn = editDateReturn;
        self.removeDateReturn = removeDateReturn;

        self.done = false;

        function getAllDateReturns() {
            return DateReturnService.getAllDateReturns();
        }

        function submit() {
            if ($scope.dateReturnForm.$valid) {
                console.log('Submitting');
                if (self.dateReturn.id === undefined || self.dateReturn.id === null) {
                    self.dateReturn.date.setHours(3);
                    console.log('Saving New dateReturn', self.dateReturn);
                    createDateReturn(self.dateReturn);
                    $('#ModalSaveDateReturn').modal('toggle');
                } else {
                    updateDateReturn(self.dateReturn, self.dateReturn.id);
                    console.log('dateReturn updated with id ', self.dateReturn.id);
                    $('#ModalSaveDateReturn').modal('toggle');
                }
            } else {
                if ($scope.dateReturnForm.organizationModalDateReturn.$error.required) {
                    $scope.dateReturnForm.organizationModalDateReturn.check = true;
                    document.getElementById("organizationModalDateReturn").focus();
                    Message.generate('Укажите организацию, куда возвращается дело!', 2);
                }else  if ($scope.dateReturnForm.dateModalDateReturn.$error.required) {
                    Message.generate('Укажите дату отправки!', 2);
                    $scope.dateReturnForm.dateModalDateReturn.check = true;
                    document.getElementById("dateModalDateReturn").focus();
                }
            }
        }

        function createDateReturn(dateReturn) {
            console.log('About to create dateReturn');
            CardService.getCard(document.getElementById("cardId").value).then(
                function (response) {
                    dateReturn.cardAdm = response;
                    DateReturnService.createDateReturn(dateReturn).then(
                        function (response) {
                            Message.generate('Информация о возвращаемом деле успешно добавлена', 1);
                            console.log('dateReturn created successfully');
                            self.dateReturn = {};
                        },
                        function (errResponse) {
                            Message.generate('Ошибка при добавлении информации о возвращаемом деле', 3);
                            console.error('Error while creating dateReturn');
                        }
                    );
                },
                function (errResponse) {
                    console.error('Error while creating dateReturn');
                }
            )

        }

        function updateDateReturn(dateReturn, id) {
            console.log('About to update dateReturn');
            DateReturnService.updateDateReturn(dateReturn, id)
                .then(
                    function (response) {
                        Message.generate('Информация о возвращаемом деле успешно изменена', 1);
                        console.log('dateReturn updated successfully' + self.dateReturn);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении информации о возвращаемом деле', 3);
                        console.error('Error while updating dateReturn');
                    }
                );
        }

        function editDateReturn(id) {
            console.log('dateReturn get');
            DateReturnService.getDateReturn(id).then(
                function (dateReturn) {
                    self.dateReturn = dateReturn;
                    console.log('dateReturn get' + self.dateReturn);
                },
                function (errResponse) {
                    console.error('Error while removing dateReturn ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeDateReturn(id) {
            console.log('About to remove dateReturn with id ' + id);
            DateReturnService.removeDateReturn(id)
                .then(
                    function () {
                        Message.generate('Информация о возвращаемом деле успешно удалена', 0);
                        console.log('dateReturn ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при удалении информации о возвращаемом деле', 3);
                        console.error('Error while removing dateReturn ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        $scope.$on('editReturnCase', function (editReturnCase, item) {
            self.dateReturn = item.b;
            self.dateReturn.date = new Date(self.dateReturn.date);
        })
        $scope.$on('createReturnCase', function () {
            self.dateReturn = {};
        })

    }
    ]);