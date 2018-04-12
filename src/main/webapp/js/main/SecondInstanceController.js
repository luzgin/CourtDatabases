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
        self.stringToDate = stringToDate;

        function stringToDate(st) {
            var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
            var dt;
            try{
                dt = new Date(st.replace(pattern, '$3-$2-$1'));
            }catch(e) {
                dt = new Date(st);
            }
            return dt;
        }

        $("#ModalSaveSecondInstance").on('show.bs.modal', function () {
            if (document.getElementById("secondInstanceIDModalDecree").value != null) {
                $scope.$apply(function () {
                    self.secondInstance = document.getElementById("uiSecondInstance").value;
                    if (self.secondInstance != null) {
                        self.secondInstance.decreeDate = stringToDate(self.secondInstance.decreeDate);
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
                    self.secondInstance.decreeDate.setHours(3);
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
                    Message.generate('Укажите организацию!', 2);

                }else if ($scope.secondInstanceForm.authorModalSecondInstance.$error.required){
                    $scope.secondInstanceForm.authorModalSecondInstance.check = true;
                    Message.generate('Укажите автора!', 2);

                }else if ($scope.secondInstanceForm.dateModalSecondInstance.$error.required){
                    Message.generate('Укажите дату!', 2);
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
                    Message.generate('Вторая инстанция успешно добавлена!', 1);
                    self.secondInstance = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении второй инстанции', 3);
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
                        Message.generate('Вторая инстанция успешно изменена!', 1);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении второй инстанции', 3);
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