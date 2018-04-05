'use strict';

angular.module('courtApp').controller('DecreeController',
    ['DecreeService', 'AuthorService', 'OrgService', 'SecondInstanceService', '$scope', '$rootScope',
        function (DecreeService, AuthorService, OrgService, SecondInstanceService, $scope, $rootScope) {
            var self = this;
            self.decree = {};
            self.regulations = [];
            self.authorsForOrganization = [];
            self.submit = submit;
            self.createDecree = createDecree;
            self.updateDecree = updateDecree;
            self.getAllRegulations = getAllRegulations;
            self.getAuthorsForOrganization = getAuthorsForOrganization;
            self.getAllOrganizations = getAllOrganizations;
            self.getAllSecondInstance = getAllSecondInstance;
            self.editDecree = editDecree;
            self.removeDecree = removeDecree;
            self.setOrganizationForAuthor = setOrganizationForAuthor;

            self.decree.decreeDate = new Date(self.decree.decreeDate);

            $("#ModalSaveDecree").on('show.bs.modal', function (e) {
                if (document.getElementById("decreeId").value != null) {
                    $scope.$apply(function () {
                        self.decree = document.getElementById("uiDecree").value;
                        if (self.decree != null) {
                            self.decree.decreeDate = new Date(self.decree.decreeDate);
                            AuthorService.setAuthorsForOrganization(self.decree.organization.id);
                        }
                    })
                }
            });

            $scope.changedValue = function (item) {
                if (self.decree.authorDocument != null) {
                    self.decree.authorDocument = null;
                }
                AuthorService.setAuthorsForOrganization(item.id) //загрузка авторов в переменную для выбраного select
                    .then(function (response) {
                            self.authorsForOrganization = AuthorService.getAuthorsForOrganization();
                        },
                        function (errResponse) {
                            console.error('Error set authorsForOrganization');

                        })
            }
            $scope.$on('setAuthorsForOrganization', function () { //загрузка авторов в переменную для выбраного select после добавления автора
                self.authorsForOrganization = AuthorService.getAuthorsForOrganization();
            })

            function setOrganizationForAuthor(item) {
                $rootScope.$broadcast('setOrganizationForAuthor', {a: item});
            }

            function getAllRegulations() {
                return DecreeService.getAllRegulations();
            }

            function getAuthorsForOrganization() {
                return self.authorsForOrganization;
            }

            function getAllOrganizations() {
                return OrgService.getAllOrganizations();
            }

            function getAllSecondInstance() {
                return SecondInstanceService.getAllSecondInstances();
            }

            function submit() {
                if ($scope.decreeForm.$valid) {
                    console.log('Submitting');
                    if (self.decree.id === undefined || self.decree.id === null) {
                        self.decree.decreeDate.setHours(3);
                        console.log('Saving New decree', self.decree);
                        createDecree(self.decree);
                    } else {
                        updateDecree(self.decree, self.decree.id);
                        console.log('decree updated with id ', self.decree.id);
                    }
                    $('#ModalSaveDecree').modal('toggle');
                } else {  //TODO: добавить в выподающие сообщения
                    if ($scope.decreeForm.uiOrganizationModalDecree.$error.required){
                        $scope.decreeForm.uiOrganizationModalDecree.check = true;
                    }else if ($scope.decreeForm.authorModalDecree.$error.required){
                        $scope.decreeForm.authorModalDecree.check = true;
                    }else if ($scope.decreeForm.dateModalDecree.$error.required){
                        $scope.decreeForm.dateModalDecree.check = true;
                    }else if ($scope.decreeForm.enteredIntoForceModalDecree.$error.required){
                        $scope.decreeForm.enteredIntoForceModalDecree.check = true;
                    }
                }
            }

            function createDecree(decree) {
                console.log('About to create decree');
                DecreeService.createDecree(decree).then(
                    function (response) {
                        console.log('decree created successfully');
                        self.decree = {};
                    },
                    function (errResponse) {
                        console.error('Error while creating decree');
                    }
                );
            }

            function updateDecree(decree, id) {
                console.log('About to update decree');
                DecreeService.updateDecree(decree, id)
                    .then(
                        function (response) {
                            console.log('decree updated successfully' + self.decree);
                            self.done = true;
                        },
                        function (errResponse) {
                            console.error('Error while updating decree');
                        }
                    );
            }

            function editDecree(id) {
                console.log('decree get');
                DecreeService.getDecree(id).then(
                    function (decree) {
                        self.decree = decree;
                        console.log('decree get successfully' + self.decree);
                    },
                    function (errResponse) {
                        console.error('Error while removing decree ' + id + ', Error :' + errResponse.data);
                    }
                );
            }

            function removeDecree(id) {
                console.log('About to remove decree with id ' + id);
                DecreeService.removeDecree(id)
                    .then(
                        function () {
                            console.log('decree ' + id + ' removed successfully');
                        },
                        function (errResponse) {
                            console.error('Error while removing decree ' + id + ', Error :' + errResponse.data);
                        }
                    );
            }

        }
    ]);