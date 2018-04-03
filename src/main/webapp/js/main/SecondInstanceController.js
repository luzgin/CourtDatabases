'use strict';

angular.module('courtApp').controller('SecondInstanceController',
    ['SecondInstanceService', 'OrgService', 'AuthorService', '$scope', function (SecondInstanceService, OrgService, AuthorService, $scope) {
        var self = this;
        self.secondInstance = {};
        self.secondInstances = [];
        self.authorsForOrganization = [];

        self.submit = submit;
        self.createSecondInstance = createSecondInstance;
        self.updateSecondInstance = updateSecondInstance;
        self.getAllSecondInstances = getAllSecondInstances;
        self.getAllOrganizations = getAllOrganizations;
        self.getAllAuthors = getAllAuthors;
        self.editSecondInstance = editSecondInstance;
        self.removeSecondInstance = removeSecondInstance;
        self.getAuthorsForOrganization = getAuthorsForOrganization;

        $("#ModalSaveSecondInstance").on('show.bs.modal', function () {
            if (document.getElementById("secondInstanceID").value != null) {
                $scope.$apply(function () {
                    self.secondInstance = document.getElementById("uiSecondInstance").value;
                    if (self.secondInstance != null) {
                        self.secondInstance.decreeDate = new Date(self.secondInstance.decreeDate);
                        AuthorService.setAuthorsForOrganization(self.secondInstance.organization.id);
                    }
                })
            } else {
                self.secondInstance = null;
            }
        });

        $scope.changedValue = function (item) {
            if (self.secondInstance.authorDocument != null) {
                self.secondInstance.authorDocument = null;
            }
            AuthorService.setAuthorsForOrganization(item.id)
                .then(function (response) {
                        self.authorsForOrganization = AuthorService.getAuthorsForOrganization();
                    },
                    function (errResponse) {
                        console.error('Error set authorsForOrganization');

                    })
        }

        $scope.$on('setAuthorsForOrganization', function () {
            self.authorsForOrganization = AuthorService.getAuthorsForOrganization();
        })

        function getAuthorsForOrganization() {
            return AuthorService.getAuthorsForOrganization();
        }

        function getAllSecondInstances() {
            return SecondInstanceService.getAllSecondInstances();
        }

        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }

        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }

        function submit() {
            if ($scope.secondInstanceForm.$valid) {
                console.log('Submitting');
                if (self.secondInstance.id === undefined || self.secondInstance.id === null) {
                    console.log('Saving New secondInstance', self.secondInstance);
                    createSecondInstance(self.secondInstance);
                    $('#ModalSaveSecondInstance').modal('toggle');
                } else {
                    updateSecondInstance(self.secondInstance, self.secondInstance.id);
                    console.log('secondInstance updated with id ', self.secondInstance.id);
                    $('#ModalSaveSecondInstance').modal('toggle');
                }
            } else {
                if ($scope.secondInstanceForm.organizationModalSecondInstance.$error.required){
                    $scope.secondInstanceForm.organizationModalSecondInstance.check = true;

                }else if ($scope.secondInstanceForm.authorModalSecondInstance.$error.required){
                    $scope.secondInstanceForm.authorModalSecondInstance.check = true;

                }else if ($scope.secondInstanceForm.dateModalSecondInstance.$error.required){
                    document.getElementById("dateModalSecondInstance").focus();
                    $scope.secondInstanceForm.dateModalSecondInstance.check = true;

                }
            }
        }


        function createSecondInstance(secondInstance) {
            console.log('About to create secondInstance');
            SecondInstanceService.createSecondInstance(secondInstance).then(
                function (response) {
                    console.log('secondInstance created successfully');
                    self.done = true;
                    self.secondInstance = {};
                },
                function (errResponse) {
                    console.error('Error while creating secondInstance');
                }
            );
        }

        function updateSecondInstance(secondInstance, id) {
            console.log('About to update secondInstance');
            SecondInstanceService.updateSecondInstance(secondInstance, id)
                .then(
                    function (response) {
                        console.log('secondInstance updated successfully' + self.secondInstance);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating secondInstance');
                    }
                );
        }

        function editSecondInstance(id) {
            console.log('secondInstance get');
            SecondInstanceService.getSecondInstance(id).then(
                function (secondInstance) {
                    self.secondInstance = secondInstance;
                    console.log('secondInstance get' + self.secondInstance);
                },
                function (errResponse) {
                    console.error('Error while removing secondInstance ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeSecondInstance(id) {
            console.log('About to remove secondInstance with id ' + id);
            SecondInstanceService.removeSecondInstance(id)
                .then(
                    function () {
                        console.log('secondInstance ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing secondInstance ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

    }
    ]);