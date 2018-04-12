'use strict';

angular.module('courtApp').controller('ComplaintController',
    ['ComplaintService', 'DecreeService', 'EntityService', 'CardService', '$scope', function (ComplaintService, DecreeService, EntityService, CardService, $scope) {
        var self = this;
        self.complaint = {};
        self.complaints = [];

        self.submit = submit;
        self.createComplaint = createComplaint;
        self.updateComplaint = updateComplaint;
        self.getAllComplaints = getAllComplaints;
        self.getAllRegulations = getAllRegulations;
        self.getAllEntities = getAllEntities;
        self.editComplaint = editComplaint;
        self.removeComplaint = removeComplaint;

        //self.complaint.complainDate = new Date(self.complaint.complainDate);

        function getAllComplaints() {
            return ComplaintService.getAllComplaints();
        }

        function getAllRegulations() {
            return DecreeService.getAllRegulations();
        }

        function getAllEntities() {
            return EntityService.getAllEntities();
        }

        function submit() {
            if ($scope.complaintForm.$valid) {
                console.log('Submitting');
                if (self.complaint.summPoshlini < 0) {
                    $scope.complaintForm.amountModalComplaint.check = true;
                    Message.generate('Сумма должна быть больше 0', 2);
                    document.getElementById("amountModalComplaint").focus();
                } else {
                    if (self.complaint.id === undefined || self.complaint.id === null) {
                        self.complaint.complainDate.setHours(3);
                        console.log('Saving New complaint', self.complaint);
                        createComplaint(self.complaint);
                        $('#ModalSaveComplaint').modal('toggle');
                    } else {
                        updateComplaint(self.complaint, self.complaint.id);
                        console.log('complaint updated with id ', self.complaint);
                        $('#ModalSaveComplaint').modal('toggle');
                    }
                }
            } else {
                if ($scope.complaintForm.dateComplaintModalComplaint.$error.required) {
                    $scope.complaintForm.dateComplaintModalComplaint.check = true;
                    Message.generate('Не верно указана дата создания жалобы!', 2);
                    document.getElementById("dateComplaintModalComplaint").focus();
                } else if ($scope.complaintForm.entityIskModalComplaint.$error.required) {
                    $scope.complaintForm.entityIskModalComplaint.check = true;
                    Message.generate('Не выбрана сужность жалобы!', 2);
                } else if ($scope.complaintForm.authorModalComplaint.$error.required) {
                    $scope.complaintForm.authorModalComplaint.check = true;
                    Message.generate('Укажите автора жалобы!', 2);
                    document.getElementById("authorModalComplaint").focus();
                } else if ($scope.complaintForm.amountModalComplaint.$error.required) {
                    $scope.complaintForm.amountModalComplaint.check = true;
                    Message.generate('Укажите сумму госпошлины!', 2);
                    document.getElementById("amountModalComplaint").focus();
                } else if ($scope.complaintForm.radioModalComplaint.$error.required) {
                    $scope.complaintForm.radioModalComplaint.check = true;
                    Message.generate('Укажите статус ответа!', 2);
                }
            }
        }

        function createComplaint(complaint) {
            console.log('About to create complaint');
            CardService.getCard(document.getElementById("cardId").value).then(
                function (response) {
                    complaint.cardAdm = response;
                    DecreeService.getDecree(document.getElementById("decreeId").value).then(
                        function (response) {
                            complaint.decreeAdm = response;
                            ComplaintService.createComplaint(complaint).then(
                                function (response) {
                                    console.log('complaint created successfully');
                                    Message.generate('Жалоба успешно добавлена', 1);
                                    self.complaint = {};
                                },
                                function (errResponse) {
                                    Message.generate('Ошибка при сохранении жалобы', 3);
                                    console.error('Error while creating complaint');
                                }
                            );
                        },
                        function (errResponse) {
                            console.error('Error while creating complaint');
                        }
                    )
                },
                function (errResponse) {
                    console.error('Error while creating complaint');
                }
            )
        }

        function updateComplaint(complaint, id) {
            console.log('About to update complaint');
            ComplaintService.updateComplaint(complaint, id)
                .then(
                    function (response) {
                        Message.generate('Жалоба успешно изменена', 1);
                        console.log('complaint updated successfully' + self.complaint);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении жалобы', 3);
                        console.error('Error while updating complaint');
                    }
                );
        }

        function editComplaint() {
            console.log('complaint get');
            ComplaintService.getComplaint(self.complaint).then(
                function (complaint) {
                    self.complaint = complaint;
                    console.log('complaint get' + self.complaint);
                },
                function (errResponse) {
                    console.error('Error while removing complaint ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeComplaint(id) {
            console.log('About to remove complaint with id ' + id);
            ComplaintService.removeComplaint(id)
                .then(
                    function () {
                        Message.generate('Жалоба успешно удалена', 0);
                        console.log('complaint ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при удалении жалобы', 3);
                        console.error('Error while removing complaint ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        $scope.$on('editComplaint', function (editComplaint, item) {
            self.complaint = item.a;
            self.complaint.complainDate = new Date(self.complaint.complainDate);
        })
        $scope.$on('createComplaint', function () {
            self.complaint = {};
        })
    }
    ]);