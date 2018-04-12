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
            self.stringToDate = stringToDate;

            function stringToDate(st) {
                var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                var dt;
                try {
                    dt = new Date(st.replace(pattern, '$3-$2-$1'));
                } catch (e) {
                    dt = new Date(st);
                }
                return dt;
            }

            $("#ModalSaveDecree").on('show.bs.modal', function (e) {
                if (document.getElementById("decreeId").value != null) {
                    $scope.$apply(function () {
                        self.decree = document.getElementById("uiDecree").value;
                        if (self.decree != null) {
                            self.decree.decreeDate = stringToDate(self.decree.decreeDate);
                            AuthorService.setAuthorsForOrganization(self.decree.organization.id)
                                .then(function (response) {
                                        self.authorsForOrganization = AuthorService.getAuthorsForOrganization();
                                    },
                                    function (errResponse) {
                                        console.error('Error set authorsForOrganization');

                                    });
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
                    //перевод в дату в формате yyyy-MM-dd
                    if (self.decree.secondInstanceAdm != null) {
                        self.decree.secondInstanceAdm.decreeDate = stringToDate(self.decree.secondInstanceAdm.decreeDate);
                    }
                    if (self.decree.id === undefined || self.decree.id === null) {
                        self.decree.decreeDate.setHours(3);
                        console.log('Saving New decree', self.decree);
                        createDecree(self.decree);
                    } else {
                        updateDecree(self.decree, self.decree.id);
                        console.log('decree updated with id ', self.decree.id);
                    }
                    $('#ModalSaveDecree').modal('toggle');
                } else {
                    if ($scope.decreeForm.uiOrganizationModalDecree.$error.required) {
                        Message.generate('Не выбрана организация!', 2);
                        $scope.decreeForm.uiOrganizationModalDecree.check = true;
                    } else if ($scope.decreeForm.authorModalDecree.$error.required) {
                        Message.generate('Не выбрана автор постановления!', 2);
                        $scope.decreeForm.authorModalDecree.check = true;
                    } else if ($scope.decreeForm.dateModalDecree.$error.required) {
                        Message.generate('Не верно указана дата постановления!', 2);
                        $scope.decreeForm.dateModalDecree.check = true;
                    } else if ($scope.decreeForm.enteredIntoForceModalDecree.$error.required) {
                        Message.generate('Не выбран статус вступления!', 2);
                        $scope.decreeForm.enteredIntoForceModalDecree.check = true;
                    }
                }
            }

            function createDecree(decree) {
                console.log('About to create decree');
                DecreeService.createDecree(decree).then(
                    function (response) {
                        Message.generate('Постановление успешно добавлено!', 1);
                        console.log('decree created successfully');
                        self.decree = {};
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при добавлении постановления!', 3);
                        console.error('Error while creating decree');
                    }
                );
            }

            function updateDecree(decree, id) {
                console.log('About to update decree');
                DecreeService.updateDecree(decree, id)
                    .then(
                        function (response) {
                            Message.generate('Постановление успешно изменено!', 1);
                            console.log('decree updated successfully' + self.decree);
                            self.done = true;
                        },
                        function (errResponse) {
                            Message.generate('Ошибка при измеении постановления!', 3);
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

            $scope.$on('setSecondInstanceForDecree', function (setSecondInstanceForDecree, item) {
                self.decree.secondInstanceAdm = item.a;

            })

        }
    ]);