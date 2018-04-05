'use strict';

angular.module('courtApp').controller('DateRequestController',
    ['DateRequestService', 'CardService', '$scope', function (DateRequestService, CardService, $scope) {
        var self = this;
        self.dateRequest = {};
        self.dateRequests = [];

        self.submit = submit;
        self.createDateRequest = createDateRequest;
        self.updateDateRequest = updateDateRequest;
        self.getAllDateRequests = getAllDateRequests;
        self.editDateRequest = editDateRequest;
        self.removeDateRequest = removeDateRequest;


        function getAllDateRequests() {
            return DateRequestService.getAllDateRequests();
        }

        function submit() {
            if ($scope.dateRequestForm.$valid) {
                console.log('Submitting');
                if (self.dateRequest.id === undefined || self.dateRequest.id === null) {
                    self.dateRequest.date.setHours(3);
                    console.log('Saving New dateRequest', self.dateRequest);
                    createDateRequest(self.dateRequest);
                    $('#ModalSaveDateRequest').modal('toggle');
                } else {
                    updateDateRequest(self.dateRequest, self.dateRequest.id);
                    console.log('dateRequest updated with id ', self.dateRequest.id);
                    $('#ModalSaveDateRequest').modal('toggle');
                }
            } else {
                if ($scope.dateRequestForm.organizationModalDateRequest.$error.required) {
                    $scope.dateRequestForm.organizationModalDateRequest.check = true;
                    document.getElementById("organizationModalDateRequest").focus();
                } else if ($scope.dateRequestForm.dateModalDateRequest.$error.required) {
                    $scope.dateRequestForm.dateModalDateRequest.check = true;
                    document.getElementById("dateModalDateRequest").focus();
                }
            }
        }

        function createDateRequest(dateRequest) {
            console.log('About to create dateRequest');
            CardService.getCard(document.getElementById("cardId").value).then(
                function (response) {
                    dateRequest.cardAdm = response;
                    DateRequestService.createDateRequest(dateRequest).then(
                        function (response) {
                            console.log('dateRequest created successfully');
                            self.dateRequest = {};
                        },
                        function (errResponse) {
                            console.error('Error while creating dateRequest');
                        }
                    );
                },
                function (errResponse) {
                    console.error('Error while creating dateRequest');
                }
            )

        }

        function updateDateRequest(dateRequest, id) {
            console.log('About to update dateRequest');
            DateRequestService.updateDateRequest(dateRequest, id)
                .then(
                    function (response) {
                        console.log('dateRequest updated successfully' + self.dateRequest);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating dateRequest');
                    }
                );
        }

        function editDateRequest(id) {
            console.log('dateRequest get');
            DateRequestService.getDateRequest(id).then(
                function (dateRequest) {
                    self.dateRequest = dateRequest;
                    console.log('dateRequest get' + self.dateRequest);
                },
                function (errResponse) {
                    console.error('Error while removing dateRequest ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeDateRequest(id) {
            console.log('About to remove dateRequest with id ' + id);
            DateRequestService.removeDateRequest(id)
                .then(
                    function () {
                        console.log('dateRequest ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing dateRequest ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        $scope.$on('editRequestCase', function (editRequestCase, item) {
            self.dateRequest = item.c;
            self.dateRequest.date = new Date(self.dateRequest.date);
        })
        $scope.$on('createRequestCase', function () {
            self.dateRequest = {};
        })
    }
    ]);